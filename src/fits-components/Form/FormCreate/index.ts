import FormCreate from './FitsFormCreate.vue'
import Form from './FitsForm.vue'
import { withInstall } from '@/utils/base/withInstall'

const FitsFormCreate = withInstall(FormCreate)
const FitsForm = withInstall(Form)
export { FitsFormCreate, FitsForm }
export * from './model'