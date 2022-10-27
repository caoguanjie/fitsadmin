import IconSelect from './FitsIconSelect.vue'
import TreeSelect from './FitsTreeSelect.vue'
import { withInstall } from '@/utils/base/withInstall'

const FitsIconSelect = withInstall(IconSelect)
const FitsTreeSelect = withInstall(TreeSelect)
export { FitsIconSelect, FitsTreeSelect }
export * from './select'