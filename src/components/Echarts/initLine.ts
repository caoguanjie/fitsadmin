import { reactive, ref, shallowRef } from "vue";
import * as echarts from 'echarts';
import { FitsEchartsProps } from "./type";

export default function useLineEcharts() {
    // 渲染echarts的div dom
    const lineEcharts = ref()
    // dom初始化echarts后的容器，Options变化时就需要通过这个容器来重新setOptions，或者浏览器缩放重置echarts大小也需要这个变量
    /**
     * 这里需要使用shallowRef，使用ref会导致echarts使用滑块组件报错，echarts官方github能找到相关问题
     * https://github.com/apache/echarts/issues/14974
     */
    const lineEchartsInstance = shallowRef<echarts.ECharts>()
    const state = reactive({
        // 折线图默认6种颜色
        lineColors: ["#5b8ff9", "#5ad8a6", "#e8684a", "#6094ff", "#a17bf4", "#f6ae4f"],
    })

    /**
     * 初始化折线图
     */
    function initLineEchart(config: FitsEchartsProps) {
        lineEchartsInstance.value = echarts.init(lineEcharts.value);
        setLineOptions(config)
    }

    /**
     * 设置折线图配置项
     */
    function setLineOptions(config: FitsEchartsProps) {
        const legendPositon = config.legend.positon
        const isShowLegend = config.legend.show
        const series = (config.legend.data || []).map((item, index) => {
            const color = (typeof item.color === "object") ? new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                item.color
            ) : (item.color || state.lineColors[index % 6])
            const areaColor = (typeof item.color === "object") ? item.color[0].color : (item.color || state.lineColors[index % 6])

            const obj = {
                type: 'line',
                name: item.name,
                data: config.data[index] || [],
                smooth: config.isSmooth,
                lineStyle: {
                    color,  // 设置线条颜色
                },
                itemStyle: {
                    color // 设置线条拐点边框颜色
                },
                areaStyle: config.isShowArea ? {
                    opacity: 0.25,
                    // 设置面积背景色
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: areaColor }, { offset: 1, color: "#fff" }])
                } : undefined
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
                trigger: 'axis',
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
                    alignWithLabel: true // 刻度在中间，保证刻度线和标签对齐
                },
                axisLabel: {
                    margin: 9, // 刻度标签与轴线之间的距离
                    lineHeight: 17, // 行高
                    color: "rgba(0, 0, 0, 0.45)", // 刻度字体颜色
                    fontFamily: "PingFangSC-Regular", //刻度字体
                    // interval: 0, // 坐标轴刻度标签的显示间隔，默认值是auto（如果x轴刻度名过长会自动计算隐藏那些刻度），如果设置成0则全部显示，但会重叠 
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
                    // start: 0,
                    // end: _end
                },
                {
                    type: 'slider', // 滑动条
                    show: config.isShowZoom, // 是否显示滑块组件
                    height: 18, // 滑块高度
                    showDataShadow: false, // 是否在滑块组件中显示数据阴影
                    zoomLock: false, // 是否锁定选择区域（或叫做数据窗口）的大小,如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
                    fillerColor: "#dae2f4", // 选中范围的填充颜色
                    borderColor: "#dae2f4", // 边框颜色
                    // 手柄图标（不能使用url，只能使用svg的path），问题记录：https://github.com/apache/echarts/issues/15780
                    handleIcon: "path://M571.076923 39.384615h-118.153846A137.846154 137.846154 0 0 0 315.076923 177.230769v669.538462A137.846154 137.846154 0 0 0 452.923077 984.615385h118.153846a137.846154 137.846154 0 0 0 137.846154-137.846154v-669.538462A137.846154 137.846154 0 0 0 571.076923 39.384615zM472.615385 728.615385a19.692308 19.692308 0 0 1-39.384616 0v-433.23077a19.692308 19.692308 0 0 1 39.384616 0z m118.153846 0a19.692308 19.692308 0 0 1-39.384616 0v-433.23077a19.692308 19.692308 0 0 1 39.384616 0z",
                    brushSelect: false, // 是否开启刷选功能,
                    bottom: 0,
                    filterMode: 'filter', // 数据过滤模式
                    // start: 0,
                    // end: _end
                },
            ],
        };
        lineEchartsInstance.value && lineEchartsInstance.value.setOption(option);
    }

    return {
        lineEcharts,
        initLineEchart,
        lineEchartsInstance
    }
}