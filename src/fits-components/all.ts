
import { FitsEmpty } from './Data/FitsEmpty'
import { FitsDialog, FitsDrawer } from './FeedBack/Dialog'
import { FitsCheckboxAll } from './Form/Checkbox'
import { FitsForm, FitsFormCreate } from './Form/FormCreate'
import { FitsInputSearch } from './Form/Input'
import { FitsFormDialog, FitsFormTitle } from './Form/Other'
import { FitsIconSelect, FitsTreeSelect } from './Form/Select'
import { FitsUpload } from './Form/Upload'
import { FitsEcharts } from './Other/Echarts'
import { FitsEditor } from './Other/WangEditor'
import { FitsTable } from './Table/FitsTable'
import { FitsTableGroup, CommonGroupTable, ConditionsGroupTable, CustomColumns, GroupCondition, GroupTableItem, TableGroupPagination } from './Table/FitsTableGroup'
import { SvgIcon } from './Basic/SvgIcon'

export * from './Form/Select'
export * from './Other/WangEditor'
export * from './Data/FitsEmpty'
export * from './FeedBack/Dialog'
export * from './Form/Checkbox'
export * from './Form/FormCreate'
export * from './Form/Input'
export * from './Form/Other'
export * from './Form/Upload'
export * from './Other/Echarts'
export * from './Table/FitsTable'
export * from './Table/FitsTableGroup'
export * from './Basic/SvgIcon'
import type { App } from "vue"

const components = [
    SvgIcon,
    FitsIconSelect,
    FitsTreeSelect,
    FitsEmpty,
    FitsDialog,
    FitsDrawer,
    FitsCheckboxAll,
    FitsFormCreate, FitsForm,
    FitsInputSearch,
    FitsFormDialog, FitsFormTitle,
    FitsIconSelect, FitsTreeSelect,
    FitsUpload,
    FitsEcharts,
    FitsEditor,
    FitsTable,
    FitsTableGroup, CommonGroupTable, ConditionsGroupTable, CustomColumns, GroupCondition, GroupTableItem, TableGroupPagination

]
export function install(app: App) {
    components.forEach((component: any) => component.install(app));
}