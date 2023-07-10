


import ToolbarCustomColumns from './ToolbarCustomColumn.vue'
import ToolbarFullscreens from './ToolbarFullScreens.vue'
import ToolbarSearchs from './ToolbarSearch.vue'
import ToolbarRefreshs from './ToolbarRefresh.vue'
import ToolbarExports from './ToolbarExport.vue'
import ToolbarSettings from './ToolbarSetting.vue'
import ListSeachBtnGrouds from './ListSeachBtnGroud.vue'
import { withInstall } from '@/fits-components/withInstall'

const ToolbarCustomColumn = withInstall(ToolbarCustomColumns)
const ToolbarFullscreen = withInstall(ToolbarFullscreens)
const ToolbarSearch = withInstall(ToolbarSearchs)
const ToolbarRefresh = withInstall(ToolbarRefreshs)
const ToolbarExport = withInstall(ToolbarExports)
const ToolbarSetting = withInstall(ToolbarSettings)
const ListSeachBtnGroud = withInstall(ListSeachBtnGrouds)
export { ToolbarCustomColumn, ToolbarFullscreen, ToolbarSearch, ListSeachBtnGroud, ToolbarRefresh, ToolbarExport, ToolbarSetting }
