/**
 * 类型
 * @member bar 柱状图
 * @member line 折线图
 * @member pie 饼图
 * @member custom 自定义
 */
export type EchartsType = "bar" | "line" | "pie" | "custom"

/**
 * FitsEcharts公共组件的props
 * @member type 类型
 */
export interface FitsEchartsProps {
    type: EchartsType
    options: any
}