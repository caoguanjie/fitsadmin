import { OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs, RowProps } from '@form-create/element-ui/types/config'
import { ButtonProps } from 'element-plus'
import { Component } from 'vue'
import { Options } from '@form-create/core/types/index'

/**
 * @desc FitsFormCreate表单类型
 * @param form 子表单
 * @param title 表单模块名，非必填
 * @param iconClass 表单模块图标，非必填
 */
export interface FitsFormModuleModel {
    form: FitsFormCreateModel
    title?: string
    iconClass?: string
}

/**
 * @desc FitsFormCreate表单类型
 * @param rule 生成表单规则
 * @param option 表单全局配置，非必填，使用默认配置
 * @param col 表单展示列数
 */
export class FitsFormCreateModel {
    rule: FitsFormCreateRuleProps[]
    option?: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    col?: number
    constructor({
        rule,
        option,
        col,
    }: any = {}) {
        this.rule = rule
        this.option = new FitsFormCreateOptionModel({ ...option })
        this.col = col
    }
}

/**
 * @desc 生成表单规则的属性
 */
interface FitsFormCreateRuleProps {
    /**
     * @description 设置表单组件的字段名称
     */
    field: string
    /**
     * @description 设置生成组件的名称
     */
    type: string
    /**
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
    validate?: any[]
    /**
     * @description 更多配置项，可以看官网 http://www.form-create.com/v3/guide/rule.html
     */
    [key: string]: any
}

/**
 * @desc 表单全局配置的类型（包括基础配置和UI框架配置）
 * @param form 表单整体显示规则配置
 * @param submitBtn 提交按钮样式和布局配置
 * @param row 表单组件布局配置
 * @param onSubmit 表单提交回调函数
 * @param onReload 表单重置回调函数
 * @param global 设置所有组件的通用规则
 */
export class FitsFormCreateOptionModel {
    form?: any
    submitBtn: boolean | FitsFormCreateBtnType;
    resetBtn?: boolean | FitsFormCreateBtnType;
    row?: RowProps
    onSubmit?: (formData: object, fApi: object) => void
    onReload?: (fApi: object) => void
    mounted?: (fApi: object) => void
    global?: any
    constructor({
        form,
        submitBtn,
        resetBtn,
        row,
        onSubmit,
        onReload,
        mounted,
        global
    }: any = {}) {
        this.form = Object.assign({}, this.InitForm(), form);
        this.submitBtn = typeof submitBtn === 'boolean' ? submitBtn : Object.assign({}, this.InitSubmitBtn(), submitBtn)
        this.resetBtn = typeof resetBtn === 'boolean' ? resetBtn : Object.assign({}, this.InitResetBtn(), resetBtn)
        this.row = row || Object.assign({}, this.InitRow(), row);
        this.onSubmit = onSubmit
        this.onReload = onReload || function (fApi: any) {
            fApi.resetFields();
        }
        this.mounted = mounted
        this.global = global
    }

    InitForm() {
        return {
            labelPosition: 'top',
            labelWidth: '80px',
            size: 'default',
        }
    }

    // submitBtn.click优先级高于onSubmit，两个都传了，只会执行submitBtn.click
    InitSubmitBtn() {
        return {
            show: true,
            size: "default",
            innerText: "保存",
            color: '#007dff',
            // className: 'el-button fitsFormSubmitBtn'
        }
    }

    InitResetBtn() {
        return {
            show: true,
            size: "default",
            innerText: "取消",
            click: function (fApi: any) {
                fApi.resetFields();
                // 解决重置表单为空值后出现校验
                setTimeout(() => {
                    fApi.clearValidateState();
                }, 0)
            }
        }
    }

    InitRow() {
        return {
            gutter: 0,
            type: 'flex',
            align: 'middle',
            justify: 'start',
            tag: 'div',
        }
    }
}

/**
 * @desc 表单全局配置的类型（包括基础配置和UI框架配置）
 * @param show 是否显示按钮
 * @param innerText 按钮的文字
 * @param click 按钮的点击事件
 */
type FitsFormCreateBtnType = ButtonProps & {
    show?: boolean;
    innerText?: string;
    click?: () => void;
}


/**
 * @desc 表单弹窗的类型
 * @param visible 弹窗是否可见
 * @param forms 由一个或多个表单模块组成的数组
 * @param prop 弹窗、抽屉的其他配置
 * @param formType 表单展现形式
 */
export class FitsFormTypeModel {
    visible: boolean
    forms: FitsFormModuleModel[]
    dialogProp?: any
    formType?: string
    constructor({
        visible,
        forms,
        dialogProp,
        formType
    }: any = {}) {
        this.visible = visible
        this.forms = forms
        this.dialogProp = dialogProp
        this.formType = formType || 'dialog'
    }
}
