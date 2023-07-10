import Upload from './FitsUpload.vue'
import { withInstall } from '@/fits-components/withInstall'

const FitsUpload = withInstall(Upload)
export { FitsUpload }
export * from './type'