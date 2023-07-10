import table from './FitsTable.vue'
import { withInstall } from '@/fits-components/withInstall'

export { useFitsTablePro } from './FitsTableProHook'

const FitsTable = withInstall(table)

export * from './type'
export * from './components'

export { FitsTable }