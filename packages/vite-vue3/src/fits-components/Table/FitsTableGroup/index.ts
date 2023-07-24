import table from './FitsTableGroup.vue'
import { withInstall } from '@/fits-components/withInstall'
import CommonGroupTables from './components/CommonGroupTable.vue'
import ConditionsGroupTables from './components/ConditionsGroupTable.vue'
import CustomColumn from './components/CustomColumns.vue'
import GroupConditions from './components/GroupConditions.vue'
import GroupTableItems from './components/GroupTableItem.vue'
import TableGroupPaginations from './components/TableGroupPagination.vue'

const FitsTableGroup = withInstall(table)
const CommonGroupTable = withInstall(CommonGroupTables)
const ConditionsGroupTable = withInstall(ConditionsGroupTables)
const CustomColumns = withInstall(CustomColumn)
const GroupCondition = withInstall(GroupConditions)
const GroupTableItem = withInstall(GroupTableItems)
const TableGroupPagination = withInstall(TableGroupPaginations)

export { FitsTableGroup, CommonGroupTable, ConditionsGroupTable, CustomColumns, GroupCondition, GroupTableItem, TableGroupPagination }
export { useColumns } from './hooks/useColumns'
export { useCancelToken } from './hooks/useCancelToken'
export * from './type'