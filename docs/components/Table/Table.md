---
# 设置作者
author: wuzeling
# 设置写作时间
date: 2022-09-27
---

# FitsTable 表格

## 基本使用

### 基础表格
<demo src="../../../src/views/business-example/table/basic-table/components/BasicTable.vue" title="基础表格" desc="通过 columns 传入对象数组，配置表格的列，其中 filed 设置列的字段名，title 设置列标题， width 定义列宽。通过 data 配置表格的数据，对象的键与列字段名相对应。"></demo>
<br/>

### 悬浮提示
<demo src="../../../src/views/business-example/table/basic-table/components/ShowOverflowTable.vue" title="悬浮提示" desc="当内容过长时，通过配置 showOverflow=true 和 showHeaderOverflow=true 可以全局开启内容和表头悬浮提示。如果只需要个别列开启悬浮提示，则只为 columns 中的对象添加该属性即可。"></demo>
<br/>

### 拖动列宽
<demo src="../../../src/views/business-example/table/basic-table/components/ResizableTable.vue" title="拖动列宽" desc="通过设置 columnConfig.resizable=true 开启可拖动调整列宽。注意：如果开启拖动列宽，建议通过设置 border='full' 显示表格的所有边框，以免造成样式上的缺漏或不美观。"></demo>
<br/>

### 斑马纹表格
<demo src="../../../src/views/business-example/table/basic-table/components/StripeTable.vue" title="斑马纹表格" desc="通过 stripe=true 开启斑马纹。另外，通过配置 rowConfig.isHover=true 开启当鼠标移到行时，高亮当前行。"></demo>
<br/>

### 无边框表格
<demo src="../../../src/views/business-example/table/basic-table/components/BorderTable.vue" title="无边框表格" desc="通过 border='none' 去掉表格的所有边框。可选值还有default（默认）, full（完整边框）, outer（外边框）, inner（内边框）。"></demo>
<br/>

### 带状态表格
<demo src="../../../src/views/business-example/table/basic-table/components/StatusTable.vue" title="带状态表格" desc="通过配置 rowClassName，传入一个字符串或函数，给行附加类名。"></demo>
<br/>

### 固定列
<demo src="../../../src/views/business-example/table/basic-table/components/FixColumnTable.vue" title="固定列" desc="当横向内容过多时，将列固定在左右两侧。给列对象配置 fixed，传入'left' 或 'right'，设置固定列的位置。（注意：如果列宽足够的情况下，固定列不会浮动显示。）"></demo>
<br/>

### 单选行
<demo src="../../../src/views/business-example/table/basic-table/components/SelectRowTable.vue" title="单选行" desc="通过配置 rowConfig.isCurrent=true 属性，点击并选中行数据。之后由 current-change 事件来管理选中时触发的事件。"></demo>
<br/>

### 多选行
<demo src="../../../src/views/business-example/table/basic-table/components/MultipleSelectTable.vue" title="多选行" desc="在 columns 属性中配置一个 type='checkbox' 的对象，即可实现多选功能。之后由 checkbox-change 事件来管理手动勾选行复选框时触发的事件；另外，通过配置 checkboxConfig.range = true 开启复选框范围选择功能（启用后通过鼠标在复选框的列内滑动选中或取消指定行）。本例还演示了通过配置 checkboxConfig.checkMethod 指定了禁用地址在'幸福小区'的勾选项。"></demo>
<br/>

### 流体高度
<demo src="../../../src/views/business-example/table/basic-table/components/FluidTable.vue" title="流体高度" desc="通过配置 maxHeight 为表格指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。"></demo>
<br/>

### 排序
<demo src="../../../src/views/business-example/table/basic-table/components/SortTable.vue" title="排序" desc="给 columns 里的对象配置 sortable=true 即可开启排序。另外，可通过给 columns 里面的对象配置 sortBy 属性，自定义排序方法。本例演示了姓名列通过名字的长度进行排序。"></demo>
<br/>

### 筛选
<demo src="../../../src/views/business-example/table/basic-table/components/FilterTable.vue" title="筛选" desc="给 columns 里的对象配置 filters 和 filterMethod，可以开启筛选表格数据。filters为对象数组，定义筛选条件。filterMethod 为筛选方法，该方法的返回值用来决定该行是否显示。"></demo>
<br/>

### 树结构
<demo src="../../../src/views/business-example/table/basic-table/components/TreeTable.vue" title="树结构" desc="给 columns 里的对象配置 treeNode=true 指定该列为树节点。通过给 data 中的对象配置 children 属性，设置子节点。注意：这里还需要开启 treeConfig，哪怕没有属性，也要传一个空对象，否则子节点显示不出来。"></demo>
<br/>

### 树结构-自定义图标
<demo src="../../../src/views/business-example/table/basic-table/components/TreeIconTable.vue" title="树结构-自定义图标" desc="通过设置 treeConfig.iconOpen 和 treeConfig.iconClose 定义收起和打开树的显示图标。"></demo>
<br/>

### 树结构-懒加载
<demo src="../../../src/views/business-example/table/basic-table/components/TreeLazyTable.vue" title="树结构-懒加载" desc="通过配置 treeConfig.lazy=true 开启树形懒加载， 通过配置 treeConfig.loadMethod 定义异步加载子节点的方法。另外，还需要给 data 里的对象配置 hacChild=true 标识是否存在子节点，从而控制是否允许被点击，默认值为 false 不可点击。"></demo>
<br/>

### 表尾合计
<demo src="../../../src/views/business-example/table/basic-table/components/SummaryTable.vue" title="表尾合计" desc="通过配置 showFooter=true 开启表尾行。 再通过 footerMethod 定义表尾的数据获取方法，返回一个二维数组。另外，可以通过设置 footerRowClassName 给表尾行添加类名。"></demo>
<br/>

### 合并行、列
<demo src="../../../src/views/business-example/table/basic-table/components/MergeTable.vue" title="合并行、列" desc="通过配置 mergeCells 合并指定的单元格，该值为一个对象数组，对象的属性包括row、col、rowspan、colspan。"></demo>
<br/>

### 自定义索引
<demo src="../../../src/views/business-example/table/basic-table/components/CustomIndexTable.vue" title="自定义索引" desc="给 columns 里的对象配置 type=seq 开启序号列。另外，可通过 seqConfig.seqMethod 自定义序列号。 本例演示了自定义序列号，序列号的间隔为2。"></demo>
<br/>

### 数据代理
<demo src="../../../src/views/business-example/table/basic-table/components/ProxyTableDocs.vue" title="数据代理" desc="通过配置 proxyConfig.ajax.query，返回一个Promise，响应结果通过resolve(props)返回，其中props.list存放列表数组。另外还需要通过 proxyConfig.props 配置获取的列表属性。没有开启分页的列表只需要配置 props.list 即可，例如配置了 props.list='myList', 那么Promise返回的对象中列表属性也需要命名为 myList。"></demo>
<br/>

### 数据代理+自动加载
<demo src="../../../src/views/business-example/table/basic-table/components/ProxyAutoloadTableDocs.vue" title="数据代理+自动加载表格数据" desc="当页面渲染完成后默认会自动加载查询数据。如果不希望自动加载，则配置 autoLoad=false 并且可以通过几种方式触发查询：第一种方式，通过配置 toolbarConfig.tools 开启工具栏的工具列表，其中的 刷新数据按钮可以触发查询。第二种方式，可以在代码逻辑中通过获取表格实例并调用 commitProxy('query')方法触发查询。"></demo>
<br/>

### 数据代理+表单默认值
<demo src="../../../src/views/business-example/table/basic-table/components/ProxyDefaultTableDocs.vue" title="数据代理+表单默认值" desc="开启数据代理后，如果配置了表单并且需要给表单赋默认值，则需要将 proxyConfig.form 配置为 false(默认不配置也为false)，否则会报错且无法正确赋值。"></demo>
<br/>

### 数据代理+分页器
<demo src="../../../src/views/business-example/table/basic-table/components/ProxyPagerTableDocs.vue" title="数据代理+分页器" desc="通过配置 pagerConfig.enabled=true 开启分页，响应结果通过resolve(props)返回，其中props.total存放列表总数。"></demo>
<br/>

### 数据代理+插槽
<demo src="../../../src/views/business-example/table/basic-table/components/ProxySlotTableDocs.vue" title="数据代理+插槽" desc="当表格的表单位置是在工具栏区域时，这时候不需要将表单配置在formConfig中，而是直接使用toolbarConfig.slots.buttons 设置工具栏左侧的插槽，将搜索组件放在这个插槽内。组件需要发出一个事件，用于表格接受表单的参数，接收到参数后可以将该表单用一个响应式对象保存起来，随后调用表格的commitProxy('query')方法手动触发查询。"></demo>
<br/>

## 复杂表头

### 基本使用
<demo src="../../../src/views/business-example/table/complex-header-table/components/ComplexHeaderTable.vue" title="复杂表头" desc="通过给 columns 中的对象传递 children 属性定义子列，即可实现表头分组。"></demo>
<br/>

### 交叉高亮
<demo src="../../../src/views/business-example/table/complex-header-table/components/ComplexHighlightTable.vue" title="交叉高亮" desc="首先交叉高亮需要让表格的行和列分别高亮起来，行的高亮配置可以通过 rowConfig.isHover=true 直接开启，列的高亮没有配置项，需要自己处理，本案例用到表格的 cellMouseenter 事件，因此需要传递 tooltipConfig配置(空对象也行)。然后给每个子列添加headerClassName和className，类名是帮助我们给该列添加高亮的样式。在cellMouseenter方法中开启监听mouseover事件，具体逻辑操作可以看代码。最后需要在卸载页面的生命周期内移除监听事件。"></demo>
<br/>

## 插槽表格

### 自定义列模板
<demo src="../../../src/views/business-example/table/slot-table/components/CustomContentTable.vue" title="自定义列模板" desc="通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为default，值为自定义插槽名称。之后在FitsTable组件中通过<template #自定义插槽名称>的形式即可自定义列模板。"></demo>
<br/>

### 自定义表头
<demo src="../../../src/views/business-example/table/slot-table/components/CustomHeaderTable.vue" title="自定义表头" desc="通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为header，值为自定义插槽名称。之后在FitsTable组件中通过<template #自定义插槽名称>的形式即可自定义表头模板。本例还演示了给columns中的对象设置headerClassName表头类名。"></demo>
<br/>

### 展开行
<demo src="../../../src/views/business-example/table/slot-table/components/ExpandRowTable.vue" title="展开行" desc="给 columns 里的对象配置 type=expand 开启展开行，并通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为content，值为自定义插槽名称。之后在FitsTable组件中通过 <template #自定义插槽名称> 的形式即可自定义列模板。"></demo>
<br/>

### 自定义按钮区域
<demo src="../../../src/views/business-example/table/slot-table/components/CustomButtonsTable.vue" title="自定义按钮区域" desc="通过配置 toolbarConfig.slots 属性可以使用插槽。该属性是一个对象，其中键为 buttons，值为自定义插槽名称。之后在FitsTable组件中通过 <template #自定义插槽名称> 的形式即可自定义工具栏左侧的按钮区域。"></demo>
<br/>

### 主从表
<demo src="../../../src/views/business-example/table/slot-table/components/MasterSlaveTable.vue" title="主从表" desc="主从表也是通过展开行来实现的，可以看上面展开行表格的例子，只需要在插槽内再使用一次表格组件就完成了。"></demo>
<br/>

## 动态表格

<demo src="../../../src/views/business-example/table/dynamic-table/components/DynamicTable.vue" title="动态表格" desc="动态表格展示了表单＋表格的结合使用。表格内部的渲染器主要是通过表格插槽实现的。"></demo>
<br/>

## 拖拽表格

### 拖拽行
<demo src="../../../src/views/business-example/table/drag-table/components/DragRowTable.vue" title="拖拽行" desc="vxe-table 表格不支持拖动功能；可以结合 sortablejs 实现拖动效果。由于直接操作了 Dom 节点，需要与 Vue 的数据同步，必须设置 rowConfig.useKey=true ，并且根据 vue 的规则自行实现数据同步。"></demo>
<br/>

### 拖拽列
<demo src="../../../src/views/business-example/table/drag-table/components/DragColTable.vue" title="拖拽列" desc="vxe-table 表格不支持拖动功能；可以结合 sortablejs 实现拖动效果。由于直接操作了 Dom 节点，需要与 Vue 的数据同步，必须设置 columnConfig.useKey=true ，并且根据 vue 的规则自行实现数据同步。"></demo>
<br/>

## 编辑表格

### 编辑模式切换
<demo src="../../../src/views/business-example/table/edit-table/components/EditModeTable.vue" title="编辑模式切换" desc="给 columns 里的对象配置 editRender 属性设置渲染器名称等，即可开启可编辑功能。"></demo>
<br/>

### 点击触发编辑
<demo src="../../../src/views/business-example/table/edit-table/components/EditTriggerTable.vue" title="点击触发编辑" desc="通过配置 editConfig.trigger 设置编辑器的触发方式。可以通过单击、双击和手动方式触发。本例演示了切换单击和双击的触发方式，手动触发请移步下一个例子。"></demo>
<br/>

### 手动触发编辑
<demo src="../../../src/views/business-example/table/edit-table/components/ManualEditTable.vue" title="手动触发编辑" desc="手动的触发方式需要配置 editConfig.trigger='manual'，且只对 editConfig.mode='row'有效。"></demo>
<br/>

## 虚拟滚动
<demo src="../../../src/views/business-example/table/virtual-scroll-table/components/VirtualScrollTable.vue" title="虚拟滚动" desc="默认情况下，如果设置了 height、maxHeight，则会根据触发规则自动启用虚拟渲染（触发规则由 scroll-x.gt | scroll-y.gt 设置）。虚拟滚动启用后只会渲染指定范围内的可视区数据，其他的数据将被卷去收起，当滚动到可视区时才被渲染出来。注意：根据官网配置显示，一旦启用虚拟滚动就无法使用展开行、树结构等特殊功能。"></demo>
<br/>


### FitsTable 组件属性
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| option | 表格全局配置 | [FitsTableProps](#fitstableprops-表格属性) | 必填 | - | 
| gridEvents | 表格监听事件 | VxeGridListeners | 非必填 | - | 

### FitsTableProps 表格属性
| 属性 | 说明 | 类型  | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| toolbarConfig | 工具栏配置 | [FitsToolsBarConfig](#fitstoolsbarconfig-工具栏属性) \| VxeGridPropTypes.ToolbarConfig | 非必填 | - | 
| formConfig | 表单配置 | [FitsTableProFormConfig](#fitstableproformconfig-表单属性) \| VxeGridPropTypes.FormConfig | 非必填 | - | 
| columns | 列配置 | VxeGridPropTypes.Columns | 非必填 | - | 
| pagerConfig | 分页配置 | [FitsTableProPagerConfig](#fitstablepropagerconfig-分页属性) \| VxeGridPropTypes.PagerConfig | 非必填 | - | 
| proxyConfig | 数据代理配置 | [FitsTableProProxyConfig](#fitstableproproxyconfig-数据代理属性) \| VxeGridPropTypes.ProxyConfig | 非必填 | - | 
| storage | 数据缓存配置 | [StorageStrategy](#storagestrategy-数据缓存配置) | 非必填 | - | 
| slots | 表格插槽 | { empty?: string, form?: string, toolbar?: string, top?: string, bottom?: string, pager?: string } | 非必填 | - | 

### FitsToolsBarConfig 工具栏属性
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| buttons | 左侧按钮组列表 | [FitsToolsBtnConfig](#fitstoolsbtnconfig-工具栏左侧按钮组属性)[] | 非必填 | - |
| tools | 右侧工具列表 | [FitstoolsOption](#fitstoolsoption-工具栏右侧工具配置) | 非必填 | - |
| slots | 工具栏插槽 | { buttons?: string, tools?: string } | 非必填 | - |

### FitsToolsBtnConfig 工具栏左侧按钮组属性
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| code | 按钮的唯一id编码 | string | 非必填 | - |
| name | 按钮的名字 | string | 非必填 | - |
| status | 按钮的状态 | 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 非必填 | - |
| disabled | 是否禁用 | boolean | 非必填 | - |
| onClick | 按钮的绑定事件 | () => void | 非必填 | - |

### FitstoolsOption 工具栏右侧工具配置
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| export | 导出 | boolean | 非必填 | true |
| fullscreen | 放大缩小(全屏显示) | boolean | 非必填 | true |
| refresh | 刷新 | boolean | 非必填 | - |
| custom | 自定义列 | boolean | 非必填 | true |
| search | 是否显示搜索区域 | boolean | 非必填 | - |
| query | 常用查询 | boolean | 非必填 | true |
| enabled | 是否关闭所有功能栏 | boolean | 非必填 | true |

### FitsTableProFormConfig 表单属性
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| data | 表单数据 | Object | 非必填 | - |
| items | 表单项列表 | [fitsTableFormItemProps](#fitstableformitemprops-表单项配置)[] | 非必填 | - |

### fitsTableFormItemProps 表单项配置
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| title | 标题 | string | 非必填 | - |
| field | 字段名 | string | 非必填 | - |
| align | 内容对齐方式 | 'left' \| 'center' \| 'right' \| null | 非必填 | 'center' |
| titleAlign | 标题对齐方式 | 'left' \| 'center' \| 'right' \| null | 非必填 | - |
| titleWidth | 标题宽度 | string \| number | 非必填 | - |
| className | 类名 | string | 非必填 | 'searchBtns' |
| titlePrefix | 前缀配置项 | VxeFormItemPropTypes.TitlePrefix | 非必填 | - |
| titleSuffix | 后缀配置项 | VxeFormItemPropTypes.TitleSuffix | 非必填 | - |
| titleOverflow | 是否省略 | boolean | 非必填 | - |
| itemRender | 表单项渲染配置 | FormItemRenderOptions | 非必填 | - |
| slots | 插槽 | VxeFormItemPropTypes.Slots | 非必填 | - |

### FitsTableProPagerConfig 分页属性
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| layouts | 自定义布局 | Array<'PrevJump' \| 'PrevPage' \| 'Number' \| 'JumpNumber' \| 'NextPage' \| 'NextJump' \| 'Sizes' \| 'Jump' \| 'FullJump' \| 'PageCount' \| 'Total'> | 非必填 | ['Total', 'Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump'] |
| currentPage | 当前页 | number | 非必填 | 1 |
| pageSize | 每页大小 | number | 非必填 | 10 |
| total | 总条数 | number | 非必填 | 0 |
| pagerCount | 显示页码按钮的数量 | number | 非必填 | 7 |
| pageSizes | 每页大小选项列表 | number[] \| { label?: number/string, value?: number/string }[] | 非必填 | [10,15,20,50,100] |
| align | 列对其方式 | 'right' \| 'center' \| 'left' | 非必填 | 'right' |
| background | 带背景颜色 | boolean | 非必填 | true |
| autoHidden | 当只有一页时隐藏 | boolean | 非必填 | false |

### FitsTableProProxyConfig 数据代理属性
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| enabled | 开启数据代理模式 | boolean | 非必填 | - |
| autoLoad | 是否自动加载查询数据 | boolean | 非必填 | - |
| seq | 存在 type=index 列时有效，是否代理动态序号（根据分页动态变化） | boolean | 非必填 | - |
| sort | 是否代理排序 | boolean | 非必填 | - |
| filter | 是否代理筛选 | boolean | 非必填 | - |
| form | 是否代理表单 | boolean | 非必填 | - |
| ajax | 代理配置 | { query?(params: [ProxyAjaxQueryParams](#proxyajaxqueryparams-数据代理查询方法配置), ...args: any[]): Promise<ProxyAjaxQueryParams \| any> } | 非必填 | - |

### StorageStrategy 数据缓存配置
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| enabled | 是否开启数据缓存 | boolean | 非必填 | false |
| dataBase | 数据库名字，首字母大写 | string | 非必填 | '' |
| dataSheet | 数据表名，首字母大写 | string | 非必填 | 'FitsTableComponent' |
| key | 键值对的键值 | string | 必填 | '' |
| store | 需要缓存的变量名 | any | 非必填 | - |

### ProxyAjaxQueryParams 数据代理查询方法配置
| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| $grid | 获取表格实例的相关信息 | boolean | 非必填 | - |
| page | 获取分页相关信息 | boolean | 非必填 | - |
| sort | 获取服务端排序相关信息 | boolean | 非必填 | - |
| sorts | 获取排序相关信息 | boolean | 非必填 | - |
| filters | 获取服务端过滤相关信息 | boolean | 非必填 | - |
| form | 获取表单相关信息 | boolean | 非必填 | - |

更多属性详情请参考 [vxe-grid](https://vxetable.cn/#/grid/api)
