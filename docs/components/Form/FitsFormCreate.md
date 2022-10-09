---
# 设置作者
author: wuzeling
# 设置写作时间
date: 2022-09-27
---

# FitsFormCreate 表单

### 普通表单
<demo src="../../../src/views/components-manage/form/form-examples/BaseFormExample.vue" title="普通表单" desc="普通表单展示。数据类型为 `FitsFormCreateModel`。使用该表单组件必须传入 `rule`：生成表单的规则。本例为了展示提交表单的效果，还传入了 `option.onSubmit`，以提示框的形式展现提交后获得的表单数据。"></demo>
<br/>

### 行内表单
<demo src="../../../src/views/components-manage/form/form-examples/InlineFormExample.vue" title="行内表单" desc="行内表单展示。通过设置 `option.form.inline=true` 开启行内表单，并通过传入 `col` 设置显示多少列。"></demo>
<br/>

### 表单必填校验
<demo src="../../../src/views/components-manage/form/form-examples/ValidateFormExample.vue" title="表单必填校验" desc="设置必填有2种方式：<br/> **第1种**，给表单项传入 `effect.required=true` ，使用的是默认的错误提示信息，如“xxx不能为空”。如果想自定义错误信息，需要传入一个字符串而不是 `true`。<br/> **第2种**，给表单项传入 `validate` 属性，其中包含`{ required: true, message: '错误提示信息', trigger: 'change' }`对象即可。"></demo>
<br/>

### 自定义校验规则
<demo src="../../../src/views/components-manage/form/form-examples/CustomValidateFormExample.vue" title="自定义校验规则" desc="本例通过设置表单项的 `validate` 属性，展示了如何使用自定义验证规则来完成密码的二次验证。"></demo>
<br/>

### 动态增删表单项
<demo src="../../../src/views/components-manage/form/form-examples/DynamicFormExample.vue" title="动态增删表单项" desc="动态表单展示。通过获取表单组件实例，获得暴露出来的接口方法，调用相关的方法实现动态删减表单项。关于api方法调用请参照 <a href='http://www.form-create.com/v3/instance.html' target='blank'>form-create全局api</a>。"></demo>
<br/>

### 自定义组件
<demo src="../../../src/views/components-manage/form/form-examples/CustomFormExample.vue" title="自定义组件" desc="自定义表单组件展示。自定义的组件需要进行全局注册，注册后可以通过 `type` 传入注册时的组件名，调用该组件。"></demo>
<br/>

### 使用组件的插槽
<demo src="../../../src/views/components-manage/form/form-examples/SlotFormExample.vue" title="使用组件的插槽" desc="给表单项传入 `children` 数组，该数组为对象或者字符串组成。如果使用组件的默认插槽，则不需要指定slot属性。如果使用组件的指定插槽，则需要通过 `slot` 指明插槽名称。"></demo>
<br/>


### FitsFormCreateModel 表单属性
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| rule | 生成表单的规则 | [FitsFormCreateRuleProps](#fitsformcreateruleprops-表单项属性) | 必填 | - | 
| option | 表单全局配置 | [FitsFormCreateOptionModel](#fitsformcreateoptionmodel-表单全局配置属性) | 非必填 | - | 
| col | 表单展示列数 | number | 非必填 | - | 

### FitsFormCreateRuleProps 表单项属性
| 属性 | 说明 | 类型  | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| field | 表单项的字段名称 | string | 必填 | - | 
| type | 表单项类型 | string | 必填 | - | 
| component | 自定义组件 | Component | 非必填 | - | 
| title | 表单项的标签文本 | string | 非必填 | - | 
| value | 表单项的字段值 | string / number / Array / Object | 非必填 | - | 
| props | 组件的属性配置 | Object | 非必填 | - | 
| validate | 表单项的验证规则 | Array | 非必填 | - | 

表单项的验证规则：[form-create验证规则说明](http://www.form-create.com/v3/guide/other/validation-rules.html)<br/>
更多表单项属性：[form-create表单项属性](http://www.form-create.com/v3/guide/rule.html)

### FitsFormCreateOptionModel 表单全局配置属性
| 属性 | 说明 | 类型 | 回调参数 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| form | 表单显示规则配置 | [form](http://www.form-create.com/v3/element-ui/global.html#option-form) | - |`{ labelPosition: 'top', labelWidth: '80px', size: 'default'}` |
| row | 表单布局配置 | [row](http://www.form-create.com/v3/element-ui/global.html#option-row) | - |`{ gutter: 0, type: 'flex', align: 'middle', justify: 'start', tag: 'div' }` |
| submitBtn | 提交按钮的配置 | boolean / [FitsFormCreateBtnType](#fitsformcreatebtntype属性) | - | `{ show: true, size: "default", innerText: "保存", color: "#007dff" }` |
| resetBtn | 重置按钮的配置 | boolean / [FitsFormCreateBtnType](#fitsformcreatebtntype属性) | - | `{ show: true, size: "default", innerText: "取消" }` |
| onSubmit | 表单提交后的回调函数 | Function(formData,fApi) | - | - |
| onReload | 表单重载后的回调函数 | Function(fApi) | - | - |
| mounted | 表单创建成功后回调函数 | Function(fApi) | - | - |
| global | 设置所有表单项的通用配置 | Object | - | - |

### FitsFormCreateBtnType属性
| 属性 | 说明 | 类型  | 默认值 |
| :-- | :-- | :-- | :---- |
| show | 是否显示按钮 | boolean | - |
| innerText | 按钮的文字 | string | - |
| click | 按钮的点击事件 | Function(fapi) | - |

更多属性请参考 [el-button](https://element-plus.org/zh-CN/component/button.html)
