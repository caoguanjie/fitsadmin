import table from './FitsTable.vue'
import { withInstall } from '@/utils/base/withInstall'
export { useFitsTablePro } from './FitsTableProHook'

const FitsTable = withInstall(table)
export { FitsTable }
export * from './type'