
/**
 * @desc FitsEcharts公共组件的props
 */
export class FitsEchartsProps {
    type?: EchartsType;
    legend?: LegendConfoig
    data?: number[][] | IPieData[]; // 如果是饼图，需要传IPieData[]类型的数据
    xAxisNames?: string[]
    isShowZoom?: boolean
    hasBarRadius?: boolean // 柱状图配置
    isStack?: boolean // 柱状图配置
    isSmooth?: boolean // 折线图配置
    isShowArea?: boolean // 折线图配置
    isHasGap?: boolean // 饼图配置
    [key: string]: any
    /**
     * @property {EchartsType} type echarts图类型
     * @property {LegendConfoig} legend 图例组件配置
     * @property {number[][]} data 图表数据，如果是饼图，需要传IPieData[]类型的数据
     * @property {string[]} xAxisNames x轴刻度名
     * @property {boolean} isShowZoom 是否显示缩放组件
     * @property {boolean} hasBarRadius 柱状图是否有圆角（柱状图配置）
     * @property {boolean} isStack 数据是否堆叠（柱状图配置）
     * @property {boolean} isSmooth 线条是否平滑（折线图配置）
     * @property {boolean} isShowArea 是否展示面积（折线图配置）
     * @property {boolean} isHasGap 是否有空隙(饼图配置)
     */
    constructor({
        type = "bar",
        legend = new LegendConfoig({}),
        data = [],
        xAxisNames = [],
        isShowZoom = false,
        hasBarRadius = true,
        isStack = false,
        isSmooth = false,
        isShowArea = false,
        isHasGap = false
    }: FitsEchartsProps) {
        this.type = type
        this.legend = new LegendConfoig(legend);
        this.data = data
        this.xAxisNames = xAxisNames
        this.isShowZoom = isShowZoom
        this.hasBarRadius = hasBarRadius
        this.isStack = isStack
        this.isSmooth = isSmooth
        this.isShowArea = isShowArea
        this.isHasGap = isHasGap
    }
}

/**
 * 图表类型
 * @member bar 柱状图
 * @member line 折线图
 * @member pie 饼图
 * @member custom 自定义（如果是自定义，那echarts的配置就自己写）
 */
export type EchartsType = "bar" | "line" | "pie" | "custom"

/**
 * 图例显示位置
 * @member topLeft 显示在上左位置
 * @member topRight 显示在上右位置
 * @member topCenter 显示在上中位置
 * @member bottomCenter 显示在下中位置
 */
export type LegendPositon = "topLeft" | "topRight" | "topCenter" | "bottomCenter"

/**
 * 数据图形渐变色配置
 * @member offset 表示位置，值是0-1
 * @member color 颜色
 */
export interface IGradientColor {
    offset: number
    color: string
}

/**
 * 图例数据
 * @member name 名称
 * @member color 数据图形颜色
 */
export interface ILegendData {
    name: string
    color?: string | IGradientColor[]
}

/**
 * @desc 图例配置项
 */
export class LegendConfoig {
    show?: boolean;
    positon?: LegendPositon;
    data?: ILegendData[];
    [key: string]: any
    /**
     * @property {boolean} show 是否显示图例
     * @property {LegendPositon} positon 图例显示位置（饼图无效，饼图设置的图例都是在左侧）
     * @property {ILegendData[]} data 图例数据
     */
    constructor({ show = false, positon = "topCenter", data = [] }: LegendConfoig) {
        this.show = show
        this.positon = positon
        this.data = data
    }
}

/**
 * 饼图一项数据
 * @member name 名称
 * @member value 值
 * @member color 颜色
 */
export interface IPieData {
    name: string
    value: number,
    color?: string | IGradientColor[]
}