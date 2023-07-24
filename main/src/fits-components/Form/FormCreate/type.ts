
import { Api } from "@form-create/element-ui";
import { Component } from "vue"

export class FitsFormModel {
    form?: FitsFormProps
    formItem: FitsFormItemProps[]
    btnProps?: FitsBtnConfig
    /**
     * @property {FitsFormProps}  form 表单全局配置属性
     * @property {FitsFormItemProps} formItem 表单每一项的属性配置
     */
    constructor({
        form,
        formItem,
        btnProps
    }: FitsFormModel) {
        this.form = form;
        this.formItem = formItem
        this.btnProps = btnProps
    }
}


/* @desc 生成表单规则的属性
*/
export class FitsFormItemProps {
    /**
     * @description 设置表单组件的字段名称,一般是传给后端的字段名
     */
    field: string
    /**
     * @description 设置生成组件的名称，自定义组件可以不设置
     */
    type: FormItemType | string
    /**
     * 可以通过在业务系统直接导入自定义组件使用
     * @description 定义用于规则渲染的自定义组件, 无需全局挂载自定义组件
     */
    component?: Component
    /**
     * @description 字段的名称,可以不设置
     */
    title?: string
    /**
     * @description 表单组件的初始值
     */
    value?: any
    /**
     * @description 组件的props
     */
    props?: { [key: string]: any }
    /**
     * @description 设置表单组件的验证规则
     * @explame
     */
    validate?: FitsFormItemRule[]
    /**
     * @description 更多配置项，可以看官网 http://www.form-create.com/v3/guide/rule.html
     */
    [key: string]: any
    constructor({
        field,
        type,
        component,
        title,
        value,
        props,
        validate
    }: FitsFormItemProps) {
        this.field = field
        this.type = type
        this.component = component
        this.title = title
        this.value = value
        this.props = props
        this.validate = validate
    }
}

/**
 * 表单属性
 * 都是参考elment的form属性制定
 */
export class FitsFormProps {
    /**
     * @description 行内表单模式
     * @default {false} 
     */
    inline?: boolean
    /**
     * @description 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
     * @default {right} 
     */
    labelPosition?: string
    /**
    * @description 表单域标签的后缀，不常用，就是拼接在label后面的字符串
    * @default {undefined} 
    */
    labelSuffix?: string
    /**
     * @description 是否显示必填字段的标签旁边的红色星号
     * @default {false} 
     */
    hideRequiredAsterisk?: boolean
    /**
    * @description 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。=
    * @default {125px} 
    */
    labelWidth?: string | number
    /**
     * @description 是否显示校验错误信息
     * @default {true} 
     */
    showMessage?: boolean
    /**
     * @description 是否以行内形式展示校验信息
     * @default {false} 
     */
    inlineMessage?: boolean
    /**
     * @description 是否在输入框中显示校验结果反馈图标
     * @default {false} 
     */
    statusIcon?: boolean
    /**
     * @description 是否在 rules 属性改变后立即触发一次验证
     * @default {true} 
     */
    validateOnRuleChange?: boolean
    /**
     * @description 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
     * @default {false} 
     */
    disabled?: boolean
    /**
     * @description 用于控制该表单内组件的尺寸 medium / small / mini
     * @default {default} 
     */
    size?: 'large' | 'default' | 'small'
    /**
     * @description 是否显示 label
     * @default {true} 
     */
    title?: boolean
    constructor({
        inline = false,
        labelPosition = 'right',
        labelSuffix,
        hideRequiredAsterisk = false,
        labelWidth = '125px',
        showMessage = true,
        inlineMessage = true,
        statusIcon = true,
        validateOnRuleChange = true,
        size,
        title = true,
    }: FitsFormProps) {
        this.inline = inline
        this.labelPosition = labelPosition
        this.labelSuffix = labelSuffix
        this.hideRequiredAsterisk = hideRequiredAsterisk
        this.labelWidth = labelWidth
        this.showMessage = showMessage
        this.inlineMessage = inlineMessage
        this.statusIcon = statusIcon
        this.validateOnRuleChange = validateOnRuleChange
        this.size = size
        this.title = title
    }
}

/**
 * 表单的类型，这个类似大部分是跟elment的表单组件是一致的，https://element-plus.org/zh-CN/component/autocomplete.html
 * 也有一些是fitsadminui 我司封装的自定义组件
 */
export type FormItemType =
    "div" |
    'Input' |   // 输入框
    'InputNumber' | // 数字输入框
    'AutoComplete' | // 自动补全
    'Radio' |        //  单选
    'Checkbox' |     // 多选
    'Select' |       // 选择
    'Switch' |       // 开关
    'Cascader' |     // 多级联动
    'DatePicker' |   // 日期选择器
    'TimePicker ' |  // 时间选择器
    'Upload' |      // 上传
    'Tree' |        // 树形组件
    'FitsTreeSelect' | // 自定义组件的树形结构选择
    'FitsIconSelect' | // 图标选择
    'FitsCheckboxAll' // 复选框全选


/**
 * 表单校验规则对象
 */
export interface FitsFormItemRule {
    /**
    * @description 枚举类型
    */
    enum?: string
    /**
     * @description 字段长度
     */
    len?: string
    /**
     * @description 校验文案，自定义的消息文案
     */
    message?: string
    /**
     * @description 最小长度
     */
    min?: number
    /**
    * @description 最大长度
    */
    max?: number
    /**
   * @description 正则表达式校验
   */
    pattern?: RegExp
    /**
    * @description 是否必选
    */
    required?: number
    /**
     * @description 校验前转换字段值
     */
    transform?: (value: any) => void
    /**
     * @description 内建校验类型，可选项
     * 可能出现的值是：string、number、boolean、array、date、url、email
     */
    type?: string,
    /**
     * @description 	自定义校验,一般是函数，这个跟element的配置一样
     */
    validator?: (rule: any, value: any, callback: any) => void,
    /**
     * @description 必选时，空格是否会被视为错误
     */
    whitespace?: boolean,
    /**
     * @description 验证逻辑的触发方式	
     */
    trigger?: 'blur' | 'change'

}

/**
 * 框架默认按钮，重置和提交
 */
export interface FitsBtnConfig {
    // 提交按钮
    submitBtn?: FitsBtnProps;
    // 重置按钮
    resetBtn?: FitsBtnProps;
    // 提交按钮绑定的定义事件
    onSubmit?: (formData: FormData, fApi: Api) => void
}

export interface FitsBtnProps {
    /**
     * @description 按钮的文本	
     * @default {重置、提交} 
     */
    innerText?: string;
    /**
     * 按钮是否显示
     */
    show?: boolean,
    /**
     * @description 按钮是否需要loading
     * @default {false} 
     */
    loading?: boolean,
    /**
    * @description 自定义按钮点击事件，这个点击事件会取代onSubmit事件
    * @default {false} 
    */
    click?: () => void
}