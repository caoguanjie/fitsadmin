---
# 设置作者
author: wuzeling
# 设置写作时间
date: 2022-09-22
---

# FitsTreeSelect 树形选择

### 基本用法
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectBasicUse.vue" title="基本用法" desc="基础的树形筛选组件展示。当节点数据过长时，会通过滚动条的形式进行展示。默认只能选择叶子节点的数据。"></demo>
<br/>

### 选择任意级别
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectAnyLevel.vue" title="选择任意级别" desc="通过设置 `tree.checkStrictly=true`，任何节点都可以被选择，否则只有子节点可被选择。开启后通过点击箭头图标进行展开/收缩。"></demo>
<br/>

### 禁用状态
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectDisabledSelect.vue" title="禁用状态" desc="禁用整个树形筛选组件。设置 `select.disabled = true` ，禁用与组件的交互。"></demo>
<br/>

### 禁用复选框
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectDisabledOption.vue" title="禁用复选框" desc="设置 `tree.showCheckbox` 启用节点复选框，并为 `tree.data` 中的选项设置 `disabled = true` ，相应的复选框已禁用，不能点击。"></demo>
<br/>

### 过滤节点
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectFilter.vue" title="过滤节点" desc="设置 `input.show = true` 开启内部过滤输入框。 默认情况下，TreeSelect 会找出所有 `label` 属性包含输入值的选项。"></demo>
<br/>

### 自定义过滤方法
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectCustomFilter.vue" title="自定义过滤方法" desc="如果希望使用其他的搜索逻辑，可以通过设置 `tree.filterNodeMethod` 来实现。 `filterNodeMethod` 为一个函数，它会在输入值发生变化时调用，参数为当前输入值。此范例演示了 '输入什么就不返回什么' 的功能。"></demo>
<br/>

### 默认选中
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectDefaultValue.vue" title="默认选中" desc="通过传递 `modelValue` 属性可以给下拉树筛选组件传递默认值，该值必须跟 `tree.nodeKey` 指定的属性值对应。"></demo>
<br/>

### 展开所有节点、可拖拽
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectDraggable.vue" title="展开所有节点、可拖拽" desc="通过设置 `tree.defaultExpandAll=true` 可以默认展开所有节点。通过设置 `tree.draggable=true` 可以开启树节点拖拽。"></demo>
<br/>

### 自定义节点内容
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectCustomNode.vue" title="自定义节点内容" desc="通过设置 `tree.renderContent` 渲染函数，该函数返回需要的节点区内容即可。"></demo>
<br/>

### 动态加载节点数据
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectDynamicLoad.vue" title="动态加载节点数据" desc="动态加载数据仅当 `tree.lazy=true` 时有效。并通过 `tree.load` 传递一个函数，参数为 `node` 和 `resolve` ， `node` 为当前点击的节点，`resolve` 为数据加载完成的回调。"></demo>
<br/>

### 多选节点
<demo src="../../../src/views/components-manage/form-components/fits-tree-select/TreeSelectMultiple.vue" title="多选节点" desc="通过配置 `tree.showCheckbox=true` 和 `select.multiple=true` 开启树节点的复选框按钮。"></demo>
<br/>

### FitsTreeSelectModel属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| input | 内部过滤框配置 | [ElInput](https://element-plus.org/zh-CN/component/input.html#input-%E5%B1%9E%E6%80%A7) | 非必填 |  - |
| tree | 树配置 | [TreeComponentProps](https://element-plus.org/zh-CN/component/tree.html#%E5%B1%9E%E6%80%A7) | 必填 |  - |
| select | 选择器配置 | [FitsSelectProps](#fitsselectprops属性) | 非必填 |  - |

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

### 方法
获取组件实例的 `treeRef` 对象，其中包含树组件的所有方法。
[参考el-tree](https://element-plus.org/zh-CN/component/tree.html#%E6%96%B9%E6%B3%95)

### 事件
| 事件名 | 说明 | 回调参数 |
| :-- | :-- | :-- |
| update:modelValue | 当选中值发生变化时触发 | 一个参数，为被选中节点的`id`。类型为字符串，如果多选则为字符串数组。 |

### 插槽
暂无可用的插槽