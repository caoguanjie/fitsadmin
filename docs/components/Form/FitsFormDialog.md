---
# 设置作者
author: wuzeling
# 设置写作时间
date: 2022-09-30
---

# FitsFormDialog 表单弹窗

### 对话框表单
<demo src="../../../src/views/components-manage/form/form-examples/DialogFormExample-docs.vue" title="对话框表单" desc="通过设置 `formType='dialog'` 开启对话框形式的表单弹窗。"></demo>
<br/> 

### 抽屉表单
<demo src="../../../src/views/components-manage/form/form-examples/DrawerFormExample-docs.vue" title="抽屉表单" desc="通过设置 `formType='drawer'` 开启抽屉形式的表单弹窗。"></demo>
<br/> 

### FitsFormDialogModel 表单弹窗的属性
| 属性 | 说明 | 类型  | 默认值 |
| :-- | :-- | :-- | :---- |
| visible | 控制弹窗是否可见 | boolean | - |
| forms | 由一个或多个表单模块组成的数组 | [FitsFormModuleModel](#fitsformmodulemodel属性)[] | - |
| formType | 表单展现形式 | dialog / drawer | dialog |
| dialogProp | 弹窗 / 抽屉组件的配置 | [dialogProps](https://element-plus.org/zh-CN/component/dialog.html#%E5%B1%9E%E6%80%A7) / [drawerProps](https://element-plus.org/zh-CN/component/drawer.html#drawer-%E5%B1%9E%E6%80%A7) | - |

### FitsFormModuleModel属性
| 属性 | 说明 | 类型  | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| form | 子表单 | [FitsFormCreateModel](./FitsFormCreate.md#fitsformcreatemodel-表单属性) | 必填 | - |
| title | 表单模块名称 | string | 非必填 | - |
| iconClass | 表单模块图标 | string | 非必填 | - |