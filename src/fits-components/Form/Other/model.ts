import { FitsFormCreateModel } from "../FormCreate/model"

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
 * @desc 表单弹窗的类型
 * @param visible 弹窗是否可见
 * @param forms 由一个或多个表单模块组成的数组
 * @param prop 弹窗、抽屉的其他配置
 * @param formType 表单展现形式
 */
export class FitsFormDialogModel {
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
