---
# 设置作者
author: wuzeling
# 设置写作时间
date: 2022-09-26
---

# CheckboxAll

### 基本用法
<demo src="../../../src/views/components-manage/form-components/fits-checkbox-all/CheckboxAllBasicUse.vue" title="基本用法" desc="基础的复选框组件展示。"></demo>
<br/>

### 默认选中
<demo src="../../../src/views/components-manage/form-components/fits-checkbox-all/CheckboxAllDefaultValue.vue" title="默认选中" desc="通过设置`modelValue`属性可以传递默认值，该值为选项的`label`组成的数组。"></demo>
<br/>

### 禁用选项
<demo src="../../../src/views/components-manage/form-components/fits-checkbox-all/CheckboxAllDisabled.vue" title="禁用选项" desc="为`option`中的选项设置`disabled = true`，即可禁用该选项。"></demo>
<br/>

### 限制选择数量
<demo src="../../../src/views/components-manage/form-components/fits-checkbox-all/CheckboxAllLimit.vue" title="限制选择数量" desc="设置`checkboxGroup.min`和`checkboxGroup.max`可以控制选项的最小和最大数量。"></demo>
<br/>

### FitsCheckboxAllModel属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| option | 选项按钮 | [CheckboxProps](https://element-plus.org/zh-CN/component/checkbox.html#checkbox-%E5%B1%9E%E6%80%A7)[] | 必填 |  - |
| checkboxGroup | checkbox-group的配置 | [CheckboxGroupProps](https://element-plus.org/zh-CN/component/checkbox.html#checkbox-group-%E5%B1%9E%E6%80%A7) | 非必填 |  - |


### 事件
| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| update:modelValue | 当选中值发生变化时触发 | 一个参数，为被选中节点的`id`。类型为字符串，如果多选则为字符串数组。 |

### 插槽
暂无可用的插槽