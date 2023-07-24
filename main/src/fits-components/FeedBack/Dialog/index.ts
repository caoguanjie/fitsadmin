import FitsDialogs from './FitsDialog.vue'
import FitsDrawers from './FitsDrawer.vue'
import { withInstall } from '@/fits-components/withInstall'

const FitsDialog = withInstall(FitsDialogs)
const FitsDrawer = withInstall(FitsDrawers)
export { FitsDialog, FitsDrawer }