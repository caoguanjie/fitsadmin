import FormCreate from './FitsFormCreate.vue'
import Form from './FitsForm.vue'
import { withInstall } from '@/fits-components/withInstall'

const FitsFormCreate = withInstall(FormCreate)
const FitsForm = withInstall(Form)
export { FitsFormCreate, FitsForm }
export * from './model'
export * from './type'