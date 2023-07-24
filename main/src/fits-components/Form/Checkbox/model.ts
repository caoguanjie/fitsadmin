import { CheckboxProps, IUseCheckboxGroupProps } from 'element-plus'

/**
 * @desc FitsTreeSelect组件的类
 */
 export class FitsCheckboxAllModel {
    /**
     * @desc 选项数据
     */
    option: CheckboxProps[]
    /**
     * @desc 由选项的label组成的数组
     * @default {[]}
     */
    // modelValue?: string[]
    /**
     * @desc checkbox-group组件的属性
     */
    checkboxGroup?: IUseCheckboxGroupProps
    constructor({
        option,
        // modelValue,
        checkboxGroup
    }: any = {}) {
        this.option = option
        // this.modelValue = modelValue ?? []
        this.checkboxGroup = checkboxGroup
    }
}