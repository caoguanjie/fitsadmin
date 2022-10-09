---
# 设置作者
author: wuzeling
# 设置写作时间
date: 2022-09-23
---

# IconSelect

### 基本用法
<demo src="../../../src/views/components-manage/form-components/fits-icon-select/IconSelectBasicUse.vue" title="基本用法" desc="基础的图标选择组件展示。组件默认开启内部输入框搜索过滤。"></demo>
<br/>

### 默认值
<demo src="../../../src/views/components-manage/form-components/fits-icon-select/IconSelectBasicUse.vue" title="默认值" desc="通过传递`modelValue`属性可以给图标选择组件传递默认值，该值必须是图标的名称。"></demo>
<br/>

### 多选
<demo src="../../../src/views/components-manage/form-components/fits-icon-select/IconSelectBasicUse.vue" title="多选" desc="通过设置`select.multiple`开启多选模式。多选模式下，默认会展示出所有的选项。可以通过设置`select.collapseTags`将选中值按文字的形式展示，设置`select.collapseTagsTooltip`决定鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。"></demo>
<br/>

### 隐藏输入框
<demo src="../../../src/views/components-manage/form-components/fits-icon-select/IconSelectFilter.vue" title="隐藏输入框" desc="通过设置`showInput=false`可以隐藏下拉内部输入框。"></demo>
<br/>


### FitsIconSelectModel属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| input | 内部过滤框配置 | [ElInput](https://element-plus.org/zh-CN/component/input.html#input-%E5%B1%9E%E6%80%A7) | 非必填 | - |
| select | 选择器配置 | [FitsSelectProps](#fitsselectprops属性) | 非必填 | - |
| noListText | 没有数据时展示的内容 | string | 非必填 | 暂无数据 |
| showInput | 是否显示内部过滤输入框 | boolean | 非必填 | true |


### FitsSelectProps属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| disabled | 是否禁用树下拉筛选组件 | boolean | - | false |
| size | 系统配置 | string | large / default / small | default |
| clearable | 是否可以清空选项 | boolean | - | false |
| effect | 下拉框的主题 | string | dark / light | light |
| placeholder | 占位文字 | string | - | 请选择 |
| popperClass | 下拉框的自定义类名 | string | - | - |
| teleported | 是否将下拉框插入至`body`元素 | boolean | - | true |
| persistent | 当下拉选择器未被激活并且`persistent`设置为`false`，选择器会被删除 | boolean | - | true |
| clearIcon | 自定义清除图标组件 | string / SvgComponent | - | CircleClose |
| fitInputWidth | 下拉框的宽度是否与选择器相同 | boolean | - | true |
| suffixIcon | 自定义后缀图标组件 | string / SvgComponent | - | CaretTop |
| validateEvent | 输入时是否触发表单校验 | boolean | - |  true |
| multiple | 是否多选 | boolean | - | false |
| collapseTags | 多选时是否将选中值按文字的形式展示 | boolean | - | false |
| collapseTagsTooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。要使用此属性，`collapseTags`属性必须设定为`true` | boolean | - | false |

### 事件
| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| update:modelValue | 当选中值发生变化时触发 | 一个参数，为被选中图标的名称。类型为字符串，如果多选则为字符串数组。 |

### 插槽
暂无可用的插槽