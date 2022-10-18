---
# 设置作者
author: guhaodong
# 设置写作时间
date: 2022-10-17
---

# FitsGroupTable 分组表格

### 基本用法
<demo src="../../../src/views/business-example/table/group-table/components/BaseGroupTable.vue" title="基础分组表格用法" desc="必须传入headers属性（表头配置，和vxe-columns属性一致）以及ajax.query属性。groupConditions属性（分组条件）可传可不传，defaultChecked属性表示默认选中哪个分组。"></demo>
<br/>

### 插槽
<demo src="../../../src/views/business-example/table/group-table/components/SlotGroupTable.vue" title="插槽分组表格" desc="可通过插槽去重写表格单元格的内容（插槽名是字段名），另外还提供了额外的插槽：query表格查询条件插槽、noData暂无数据插槽、right组头右侧插槽、groupName组名插槽、expand展开行插槽。"></demo>
<br/>

### 默认展开
<demo src="../../../src/views/business-example/table/group-table/components/ExpandGroupTable.vue" title="默认展开分组表格" desc="通过设置expandGroupsNum属性表示默认展开多少个分组，默认展开的分组第一次请求时会返回表格数据，其余分组表格的数据通过分段请求返回（会在组头开启loading图标）。但expandGroupsNum属性的值必须大于1（后端规定的）。"></demo>
<br/>

### 分段请求
<demo src="../../../src/views/business-example/table/group-table/components/SubsectionGroupTable.vue" title="分段请求分组表格" desc="如果当前页的分组表格个数大于默认展开分组表格的个数，剩余的分组表格会开启分段请求（会在组头开启loading图标）。可以通过requestGroupNums属性设置多少个表格为一组去分段请求。"></demo>
<br/>

### 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| headers | 表头配置（与vxe-columns属性一致） | [IFitsTableHeaders](https://vxetable.cn/#/column/api)[] | 必填 | [] |
| ajax | checkbox-group的配置 | [CheckboxGroupProps](https://element-plus.org/zh-CN/component/checkbox.html#checkbox-group-%E5%B1%9E%E6%80%A7) | 必填 |  - |
| groupConditions | 分组条件配置 | IFitsGroupConditionConfig | 非必填 | { conditions: [] } |
| expandGroupsNum | 默认展开多少个分组（必须大于0，后端规定） | number | 非必填 | 3 |
| requestGroupNums | 多少个表格为一组去分段请求（解决数据量大响应时间超长的问题） | number | 非必填 | 4 |


### 方法（通过分组表格组件实例调用）
| 方法名 | 说明 | 需要参数类型 | 返回数据 |
| :-- | :-- | :-- | --- |
| fetchTableData | 主动请求一次接口 | - | - |
| getCheckGroupsData | 获取勾选的表格 | - | { groupID: string, groupName: string, checkedData: any[] }[] |
| updateColumns | 更新表格列配置 | ICustomColumnsConfig[] | - |

### 插槽
| 插槽名       | 说明               | 插槽作用域                 |
| :----------- | :----------------- | :------------------------- |
| - （字段名） | 自定义列的内容插槽 | { row, groupIndex, index } |
| query        | 表格查询条件插槽   | -                          |
| noData       | 暂无数据插槽       | -                          |
| right        | 组头右侧插槽       | { groupData }              |
| groupName    | 组名插槽           | { groupName }              |
| expand       | 展开行插槽         | { row, index }             |

