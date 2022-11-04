import FitsDialogs from './FitsDialog.vue'
import FitsDrawers from './FitsDrawer.vue'
import { withInstall } from '@/utils/base/withInstall'

const FitsDialog = withInstall(FitsDialogs)
const FitsDrawer = withInstall(FitsDrawers)
export { FitsDialog, FitsDrawer }