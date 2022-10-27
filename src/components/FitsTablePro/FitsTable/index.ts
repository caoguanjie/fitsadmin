import table from './FitsTable.vue'
import { withInstall } from '@/utils/base/withInstall'
import { useFitsTablePro } from './FitsTableProHook'

const FitsTable = withInstall(table)
export { useFitsTablePro, FitsTable }
export * from './type'