import { reactive, Ref, shallowRef } from "vue";
import echarts from './register-echarts';
import { FitsEchartsProps } from "./type";

/**
 * @param container 用于渲染echarts的dom容器
 */
export default function usePieEcharts(containerDom: Ref<HTMLElement | undefined>) {
    // dom初始化echarts后的容器，Options变化时就需要通过这个容器来重新setOptions，或者浏览器缩放重置echarts大小也需要这个变量
    const pieEchartsInstance = shallowRef<echarts.ECharts>()
    const state = reactive({
        // 饼图默认4种颜色
        pieColors: ["rgba(91, 143, 249, 0.85)", "rgba(90, 216, 166, 0.85)", "#febe55", "#86c36e"],
    })

    /**
     * 初始饼图
     */
    function initPieEchart(config: FitsEchartsProps) {
        pieEchartsInstance.value = echarts.init(containerDom.value as HTMLElement);
        setPieOptions(config)
        onChartMouseEvents()
    }

    /**
     * 设置图表，因为高亮某个模块时，饼图外部需要显示引导线并显示百分比，饼图中间内部需要显示文本，
     * 由于echarts没有同时显示的配置，并且经过测试，高亮的时候，想要同时在外部和内部显示文本是不可能的，因为他们是互斥的。
     * 网上的做法都是渲染两个一样的饼图，然后重合到一块，然后高亮是一个在外部显示文本，一个在内部显示文本，
     * 但是网上的做法是默认都展示的，而不是展示高亮那一块（网上也找不到有高亮时内外部同时显示文本的案例）。
     * 我们的解决办法是显示两个饼图，位置一样，重叠到一块。由于echarts是有Z轴的，所以移入到第一个饼图时能高亮，但是下一层的饼图并不会高亮，
     * 所以就需要结合事件来完成，但是这两个饼图的大多数配置都是一样的，所以写成一个方法生成
     */
    function setSeries(charName: "upperChart" | "lowerChart", config: FitsEchartsProps) {
        // upperChart表示上层饼图，lowerChart表示下层饼图，因为有Z轴的关系，所以有上下层的说法
        return {
            zlevel: charName === "upperChart" ? 1 : 0, // 设置层级关系
            name: charName,
            type: "pie",
            radius: ["40%", "70%"],
            label: {
                show: false,
                // 上层表格高亮时在外部显示百分比，下层表示高亮时在中间显示项目名称
                position: charName === "upperChart" ? "outside" : "center",
                color: "#303133",
                fontFamily: "MicrosoftYaHei",
                // 上层表格高亮时在外部显示百分比，下层表示高亮时在中间显示项目名称
                formatter(str: any) {
                    return charName === "upperChart" ? str.percent + "%" : (str.name.length > 7 ? str.name.slice(0, 7) + "..." : str.name)
                }
            },
            labelLine: {
                show: true, // 隐藏标识线
            },
            itemStyle: {
                borderRadius: config.isHasGap ? 10 : 0,
                borderColor: "#fff",
                borderWidth: config.isHasGap ? 4 : 0, // 设置每个项目间的空隙,
            },
            // 高亮状态时的扇区和标签样式
            emphasis: {
                label: {
                    show: true,
                    fontWeight: charName === "upperChart" ? "normal" : "bold",
                    fontSize: charName === "upperChart" ? 12 : 18,
                },
                labelLine: {
                    show: true,
                    lineStyle: {
                        color: "#4382ff"
                    }
                }
            },
            data: (config.data || []).map((item) => {
                return Array.isArray(item) ? item : {
                    name: item.name,
                    value: item.value,
                    itemStyle: {
                        color: typeof item.color === "object" ? new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            item.color
                        ) : (item.color || state.pieColors.shift())
                    }
                }
            })
        }
    }

    /**
     * 设置饼图配置项
     */
    function setPieOptions(config: FitsEchartsProps) {
        const isShowLegend = config.legend?.show
        const option = {
            // 设置echarts在容器的位置
            grid: {
                left: 60,
                right: 60,
                bottom: 60,
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
                left: 0,
                top: "middle",
                orient: "vertical"
            },
            series: [
                setSeries("upperChart", config),
                setSeries("lowerChart", config),
            ],
        };
        pieEchartsInstance.value && pieEchartsInstance.value.setOption(option);
    }

    /**
     * 监听图表的鼠标事件
     * 鼠标移入上层图表时，让下层图表的同一个项目也高亮
     * 鼠标移出上层图表时，也让下层图表取消高亮
     */
    function onChartMouseEvents() {
        // 监听上层图表鼠标移入事件
        pieEchartsInstance.value?.on('mouseover', { seriesName: "upperChart" }, params => {
            pieEchartsInstance.value?.dispatchAction({
                type: "highlight",
                seriesName: "lowerChart",
                name: params.name //高亮对应的项目
            });

        });
        // 监听上层图表鼠标移出事件
        pieEchartsInstance.value?.on('mouseout', { seriesName: "upperChart" }, () => {
            // 下层图表取消高亮
            pieEchartsInstance.value?.dispatchAction({
                type: "downplay",
                seriesName: "lowerChart",
            });
        });
    }

    return {
        initPieEchart,
        pieEchartsInstance
    }
}