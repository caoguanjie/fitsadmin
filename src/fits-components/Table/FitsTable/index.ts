import table from './FitsTable.vue'
import { withInstall } from '@/utils/base/withInstall'

export { useFitsTablePro } from './FitsTableProHook'

const FitsTable = withInstall(table)

export * from './type'


export { FitsTable }