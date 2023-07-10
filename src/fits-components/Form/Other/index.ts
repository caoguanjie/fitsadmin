import FormDialog from './FitsFormDialog.vue'
import FormTitle from './FormTitle.vue'
import { withInstall } from '@/fits-components/withInstall'

const FitsFormDialog = withInstall(FormDialog)
const FitsFormTitle = withInstall(FormTitle)

export { FitsFormDialog, FitsFormTitle }
export * from './model'