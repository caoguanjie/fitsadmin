import { reactive, Ref, shallowRef } from "vue";
import echarts from './register-echarts';
import { FitsEchartsProps } from "./type";

/**
 * @param container 用于渲染echarts的dom容器
 */
export default function useBarEcharts(containerDom: Ref<HTMLElement | undefined>) {
    // dom初始化echarts后的容器，Options变化时就需要通过这个容器来重新setOptions，或者浏览器缩放重置echarts大小也需要这个变量
    /**
     * 这里需要使用shallowRef，使用ref会导致echarts使用滑块组件报错，echarts官方github能找到相关问题
     * https://github.com/apache/echarts/issues/14974
     */
    const barEchartsInstance = shallowRef<echarts.ECharts>()
    const state = reactive({
        // 柱状图默认6种渐变颜色
        barColors: [
            { startColor: "#ab66fd", endColor: "#f89aff" },
            { startColor: "#61abff", endColor: "#4081ff" },
            { startColor: "#fcee69", endColor: "#eed820" },
            { startColor: "#ffb64f", endColor: "#ffc384" },
            { startColor: "#00d0e5", endColor: "#00e6c1" },
            { startColor: "#e03047", endColor: "#fb6277" },
        ],
    })

    /**
     * 初始化柱状图
     */
    function initBarEchart(config: FitsEchartsProps) {
        barEchartsInstance.value = echarts.init(containerDom.value as HTMLElement);
        setBarOptions(config)
    }

    /**
     * 设置柱状图配置项
     */
    function setBarOptions(config: FitsEchartsProps) {
        const legendPositon = config.legend?.positon // 图例定位
        const isShowLegend = config.legend?.show // 是否显示图例
        const legendLength = config.legend?.data?.length || 0 // 图例个数
        const xAxisLength = config.xAxisNames?.length || 0 // x轴项目个数
        const barWidth = 24 // 柱条宽度
        const barGap = 0.5 // 柱条间距 0.5 * barWidth = 12
        // 图表容器宽度，还需要减去容器的left和right边距以及y轴宽度
        const viewWidth = Math.max((barEchartsInstance.value?.getWidth() || 0) - 60 - 60 - 50, 0);
        // 一个项目的宽度
        const oneProjectWidth = legendLength * barWidth + Math.max(legendLength - 1, 0) * barWidth * barGap
        // 是否内容溢出，如果内容溢出则自动开启缩放组件（还需要减去容器的right和left，还需要减去y轴宽度）
        const isOverflow = (oneProjectWidth * xAxisLength) > viewWidth
        const _end = getDataZoomEnd(barWidth, barWidth * barGap, legendLength, xAxisLength, viewWidth)
        const series = (config.legend?.data || []).map((item, index) => {
            const color = (typeof item.color === "string") ? item.color : new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                item.color ? item.color : [
                    { offset: 0, color: state.barColors[index % 6].startColor },
                    { offset: 1, color: state.barColors[index % 6].endColor },
                ]
            );
            const obj = {
                type: 'bar',
                name: item.name,
                data: (config.data && config.data[index]) || [],
                stack: config.isStack ? "total" : undefined, // 堆叠模式
                barWidth: "24px", // 柱子宽度
                barGap: "50%",
                itemStyle: {
                    //柱状图图圆角
                    borderRadius: config.hasBarRadius ? [40, 40, 0, 0] : [0, 0, 0, 0],
                    // 设置柱子背景色
                    color
                }
            }
            return obj
        })
        const option = {
            // 设置echarts在容器的位置
            grid: {
                left: 60,
                right: 60,
                bottom: isShowLegend && (legendPositon === "bottomCenter") ? 93 : 63, // 如果图例不显示到下方就63，显示到下方就93（设计稿的距离）
                top: 55,
            },
            // 图例
            legend: {
                itemHeight: 8, // 设置图例图标的高
                itemWidth: 8, // 设置图例图标的宽
                icon: "circle", // 设置图例图标的类型，这里是圆形
                textStyle: {
                    fontFamily: "PingFangSC-Regular", // 设置图例文字字体
                    color: "rgba(0, 0, 0, 0.45)" // 设置图例文字颜色
                },
                show: isShowLegend, // 是否显示图例
                // 图例位置
                top: legendPositon === "bottomCenter" ? undefined : "16",
                bottom: legendPositon === "bottomCenter" ? "24" : undefined,
                left: legendPositon === "topLeft" ? "55" : legendPositon === "topRight" ? undefined : "center",
                right: legendPositon === "topRight" ? "60" : undefined
            },
            // 提示组件
            tooltip: {
                // 设置提示框样式
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderColor: "rgba(0, 0, 0, 0.6)",
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: "normal"
                }
            },
            xAxis: {
                type: 'category',
                data: config.xAxisNames,
                axisTick: {
                    show: false // 是否显示坐标轴刻度
                },
                axisLabel: {
                    margin: 9, // 刻度标签与轴线之间的距离
                    lineHeight: 17, // 行高
                    color: "rgba(0, 0, 0, 0.45)", // 刻度字体颜色
                    fontFamily: "PingFangSC-Regular", //刻度字体
                    interval: 0, // 坐标轴刻度标签的显示间隔，默认值是auto（如果x轴刻度名过长会自动计算隐藏那些刻度），如果设置成0则全部显示，但会重叠 
                    formatter: function (name: string) {
                        // 图例个数
                        const legendWith = legendLength * barWidth
                        const gapWith = Math.max(legendLength - 1, 0) * (barWidth * barGap)
                        // 能占最大宽度
                        const _maxWidth = legendWith + gapWith - barWidth // 减去一个barWidth是为了好看
                        // 一行能占的文字个数
                        const oneLineLength = Math.floor(_maxWidth / 12)
                        if (name && name.length > oneLineLength * 2) {
                            return `${name.substring(0, oneLineLength)}\n${name.substring(oneLineLength, oneLineLength * 2 - 1)}...`
                        } else if (name.length > oneLineLength && name.length <= oneLineLength * 2) {
                            return `${name.substring(0, oneLineLength)}\n${name.substring(oneLineLength, oneLineLength * 2)}`
                        } else {
                            return name
                        }
                    }
                }
            },
            yAxis: {
                axisLabel: {
                    color: "rgba(0, 0, 0, 0.45)", // 刻度字体颜色
                    fontFamily: "PingFangSC-Regular", //刻度字体
                    width: 50,
                    overflow: "truncate"
                }
            },
            series,
            // 缩放组件
            dataZoom: [
                {
                    type: "inside", // 内置型数据区域缩放组件
                    orient: "horizontal", // 布局方式是横还是竖
                    zoomOnMouseWheel: false, // 表示鼠标滚轮不能触发缩放。
                    moveOnMouseWheel: false, // 表示鼠标移动不能触发平移
                    moveOnMouseMove: false, // 表示鼠标移动不能触发平移
                    preventDefaultMouseMove: true, // 是否阻止 mousemove 事件的默认行为,
                    start: 0,
                    endValue: _end,
                    filterMode: "filter", // 数据过滤模式,
                    rangeMode: ["value", "value"]
                },
                {
                    type: 'slider', // 滑动条
                    show: isOverflow ? true : config.isShowZoom, // 是否显示滑块组件（如果内容溢出则显示，否则看用户配置）
                    height: 18, // 滑块高度
                    showDataShadow: false, // 是否在滑块组件中显示数据阴影
                    zoomLock: false, // 是否锁定选择区域（或叫做数据窗口）的大小,如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
                    fillerColor: "#dae2f4", // 选中范围的填充颜色
                    borderColor: "#dae2f4", // 边框颜色
                    // 手柄图标（不能使用url，只能使用svg的path），问题记录：https://github.com/apache/echarts/issues/15780
                    handleIcon: "path://M571.076923 39.384615h-118.153846A137.846154 137.846154 0 0 0 315.076923 177.230769v669.538462A137.846154 137.846154 0 0 0 452.923077 984.615385h118.153846a137.846154 137.846154 0 0 0 137.846154-137.846154v-669.538462A137.846154 137.846154 0 0 0 571.076923 39.384615zM472.615385 728.615385a19.692308 19.692308 0 0 1-39.384616 0v-433.23077a19.692308 19.692308 0 0 1 39.384616 0z m118.153846 0a19.692308 19.692308 0 0 1-39.384616 0v-433.23077a19.692308 19.692308 0 0 1 39.384616 0z",
                    brushSelect: false, // 是否开启刷选功能,
                    bottom: 0,
                },
            ],
        };
        // 因为有可能会多次调用setOption，设置为true表示不合并
        barEchartsInstance.value && barEchartsInstance.value.setOption(option, true);
    }

    /**
     * 自动缩放组件的范围（最佳体验的范围）
     * @param barWidth 柱子的宽度，单位px
     * @param barGap 柱子与柱子之间的间隙，单位px
     * @param barNum 一个项目有多少条柱子，应该传图例长度
     * @param dataLength  有多少个项目，应该传x轴长度
     * @param viewWidth  图表容器的宽度
   */
    function getDataZoomEnd(barWidth: number, barGap: number, barNum: number, dataLength: number, viewWidth: number) {
        // 一个项目占的宽度
        const oneProjectWidth = barWidth * barNum + barGap * (barNum - 1)
        if (oneProjectWidth * dataLength < viewWidth) {
            return dataLength - 1
        } else {
            const maxProjectLength = Math.floor(viewWidth / oneProjectWidth)
            return Math.max(0, maxProjectLength - 1)
        }
    }

    return {
        initBarEchart,
        barEchartsInstance,
        setBarOptions
    }
}