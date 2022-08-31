import type {TreeComponentProps,} from 'element-plus/es/components/tree/src/tree.type'
import { Component, markRaw } from 'vue'
import { ArrowUp, CircleClose } from '@element-plus/icons-vue'
import { CheckboxProps, IUseCheckboxGroupProps } from 'element-plus'

/**
 * （树筛选、图标选择）选择器select的配置
 */
export class FitsSelectProps {
    /**
     * @description 是否禁用树下拉筛选组件
     */
    disabled?: boolean
    /**
     * @description 选择器的尺寸
     * @default {default}
     */
    size?: 'large' | 'default' | 'small'
    /**
     * @description 是否可以清空选项
     * @default {false}
     */
    clearable?: boolean
    /**
     * @description 下拉框的主题
     * @default {light}
     */
    effect?: 'dark' | 'light'
    /**
     * @description 占位文字
     * @default {Select}
     */
    placeholder?: string
    /**
    * @description 下拉框的自定义类名
    */
    popperClass?: string
    /**
    * @description 是否将下拉框插入至 body 元素
    * @default {true}
    */
    teleported?: boolean
    /**
    * @description 当下拉选择器未被激活并且persistent设置为false，选择器会被删除。
    * @default {true}
    */
    persistent?: boolean
    /**
     * @description 自定义清除图标组件
     * @default {CircleClose}
     */
    clearIcon?: string | Component
    /**
     * @description 下拉框的宽度是否与选择器相同
     * @default {true}
     */
    fitInputWidth?: boolean
    /**
     * @description 自定义后缀图标组件
     * @default {ArrowUp}
     */
    suffixIcon?: string | Component
    /**
     * @description 输入时是否触发表单校验
     * @default {true}
     */
    validateEvent?: boolean
    /**
     * @description 是否多选
     * @default {false}
     */
    multiple?: boolean
    /**
     * @description 多选时是否将选中值按文字的形式展示
     * @default {true}
     */
    collapseTags?: boolean
    /**
     * @description 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。要使用此属性，collapse-tags属性必须设定为 true
     * @default {true}
     */
    collapseTagsTooltip?: boolean
    constructor({
        disabled,
        size,
        clearable,
        effect,
        placeholder,
        popperClass,
        teleported,
        persistent,
        clearIcon,
        fitInputWidth,
        suffixIcon,
        validateEvent,
        multiple,
        collapseTags,
        collapseTagsTooltip
    }: any = {}) {
        this.disabled = disabled ?? false;
        this.size = size ?? 'default'
        this.clearable = clearable ?? false;
        this.effect = effect ?? 'light'
        this.placeholder = placeholder ?? '请选择';
        this.popperClass = popperClass ?? '';
        this.teleported = teleported ?? true
        this.persistent = persistent ?? true;
        this.clearIcon = clearIcon ?? markRaw(CircleClose)
        this.fitInputWidth = fitInputWidth ?? true;
        this.suffixIcon = suffixIcon ?? markRaw(ArrowUp)
        this.validateEvent = validateEvent ?? true;
        this.multiple = multiple ?? false
        this.collapseTags = collapseTags ?? false
        this.collapseTagsTooltip = collapseTagsTooltip ?? false
    }
}

/**
 * （树筛选、图标选择）输入框input的配置
 */
export class FitsInputProps {
    /**
     * @desc 是否显示过滤输入框
     */
    show: boolean
    /**
     * @desc el-input的属性
     */
    elementProps?: any
    constructor({
        show,
        elementProps
    }: any = {}) {
        this.show = show ?? true;
        this.elementProps = elementProps
    }
}

/**
 * @desc FitsTreeSelect组件的类
 */
export class FitsTreeSelectModel{
    /**
     * @desc 树组件的配置
     */
    tree: TreeComponentProps | any
    /**
     * @desc 选择器的属性配置
     */
    select?: FitsSelectProps
    /**
     * @desc 下拉框内部的输入过滤框属性配置
     */
    input?: FitsInputProps
    constructor({
        tree,
        select,
        input
    }: any = {}) {
        this.tree = tree
        this.select = new FitsSelectProps({ ...select })
        this.input = new FitsInputProps({ ...input })
    }
}

/**
 * @desc FitsIconSelect组件的类
 */
export class FitsIconSelectModel{
    /**
     * @desc 选择器的属性配置
     */
    select?: FitsSelectProps
    /**
     * @desc 下拉框内部的输入过滤框属性配置
     */
    input?: FitsInputProps
    /**
     * @desc 没有数据时展示的内容
     * @default {'NoData'}
     */
    noListText?: string
    constructor({
        select,
        input,
        noListText
    }: any = {}) {
        this.select = new FitsSelectProps({ ...select })
        this.input = new FitsInputProps({ ...input })
        this.noListText = noListText ?? 'No Data'
    }
}

/**
 * @desc FitsTreeSelect组件的类
 */
export class FitsCheckboxAllModel{
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


