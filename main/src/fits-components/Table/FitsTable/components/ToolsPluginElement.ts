// 新增vxe-table适配elment的表单项的适配方案，并且定制了工具栏的一些组件
import { h } from 'vue'
import { VXETableCore, VxeTableDefines, VxeFormItemProps, VxeGlobalRendererHandles, FormItemRenderOptions, FormItemContentRenderParams } from 'vxe-table'
import { ToolbarSearch, ToolbarFullscreen, ToolbarCustomColumn, ToolbarRefresh, ToolbarExport, ToolbarSetting, FitsTreeSelect, FitsIconSelect } from '@/fits-components'


let vxetable: VXETableCore/**
* 基于 vxe-table 表格的适配插件，用于兼容 element-ui 组件库
*/
export const VXETablePluginFits = {
    install(vxetablecore: VXETableCore) {
        const { interceptor, renderer } = vxetablecore
        vxetable = vxetablecore
        renderer.mixin({
            // 创建工具栏-搜索工具
            FitsToolbarSearch: {
                renderToolbarTool: createFitsToolBarSearch()
            },
            FitsToolbarRefresh: {
                renderToolbarTool: createFitsToolbarRefresh()
            },
            FitsToolbarSetting: {
                renderToolbarTool: createFitsToolbarSetting()
            },
            FitsToolbarExport: {
                renderToolbarTool: createFitsToolbarExport()
            },
            FitsToolbarFullscreen: {
                renderToolbarTool: createFitsToolbarFullscreen()
            },
            FitsToolbarCustomColumn: {
                renderToolbarTool: createFitsToolbarCustomColumn()
            },
            FitsTreeSelect: {
                renderItemContent: createFitsTreeSelect()
            },
            FitsIconSelect: {
                renderItemContent: createFitsIconSelect()
            },
        })
    }
}

if (typeof window !== 'undefined' && window.VXETable && window.VXETable.use) {
    window.VXETable.use(VXETablePluginFits)
}
// 创建工具栏-搜索工具
function createFitsToolBarSearch() {
    return function (renderOpts: VxeGlobalRendererHandles.RenderToolOptions, params: VxeGlobalRendererHandles.RenderToolParams) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts;
        return [h(ToolbarSearch,
            {
                msg: props.msg ?? '是否显示搜索条件',
                grid: $grid,
                onClick: () => {
                    events.click()
                }
            }
        )]
    }
}
// 创建工具栏-刷新当前表单
function createFitsToolbarRefresh() {
    return function (renderOpts: VxeGlobalRendererHandles.RenderToolOptions, params: VxeGlobalRendererHandles.RenderToolParams) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts;
        return [h(ToolbarRefresh,
            {
                msg: props.msg ?? '刷新数据',
                grid: $grid,
                onClick: () => {
                    events.click()
                }
            }
        )]
    }
}
// 创建工具栏-常用查询
function createFitsToolbarSetting() {
    return function (renderOpts: VxeGlobalRendererHandles.RenderToolOptions, params: VxeGlobalRendererHandles.RenderToolParams) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts;
        return [h(ToolbarSetting,
            {
                msg: props.msg ?? '常用查询设置',
                grid: $grid,
                event: events,
                onSetCustomQuerySelected: (formConfigData: any) => {
                    events.setCustomQuerySelected(formConfigData)
                },
                onSetCustomQueryData: (arr: any[]) => {
                    events.setCustomQueryData(arr)
                },
                onChangFromItemStatus: (target: VxeFormItemProps) => {
                    events.changFromItemStatus(target)
                }
            }
        )]
    }
}

// 创建工具栏-导出
function createFitsToolbarExport() {
    return function (renderOpts: VxeGlobalRendererHandles.RenderToolOptions, params: VxeGlobalRendererHandles.RenderToolParams) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts;
        return [h(ToolbarExport,
            {
                msg: props.msg ?? '导出当前表格',
                grid: $grid,
                onClick: () => {
                    events.click()
                }
            }
        )]
    }
}

// 创建工具栏-全屏
function createFitsToolbarFullscreen() {
    return function (renderOpts: VxeGlobalRendererHandles.RenderToolOptions, params: VxeGlobalRendererHandles.RenderToolParams) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts;
        return [h(ToolbarFullscreen,
            {
                msg: props.msg ?? '全屏',
                grid: $grid,
                event: events,
            }
        )]
    }
}

// 创建工具栏-自定列
function createFitsToolbarCustomColumn() {
    return function (renderOpts: VxeGlobalRendererHandles.RenderToolOptions, params: VxeGlobalRendererHandles.RenderToolParams) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts;
        return [h(ToolbarCustomColumn,
            {
                msg: props.msg ?? '自定义列显示',
                grid: $grid,
                event: events,
                // 回传参数，emit方法
                onCustomColumnData: (arr: VxeTableDefines.ColumnInfo[]) => {
                    events.setCustomColumnData(arr)
                }
            }
        )]
    }
}
// 创建搜索表单栏-下拉树
function createFitsTreeSelect() {
    return function (renderOpts: FormItemRenderOptions & { name: string }, params: FormItemContentRenderParams) {
        const { data, field }: any = params
        const { props }: any = renderOpts
        return [
            h(FitsTreeSelect,
                {
                    modelValue: data[field],
                    ...props,
                }
            )
        ]
    }
}
// 创建搜索表单栏-图标选择
function createFitsIconSelect() {
    return function (renderOpts: FormItemRenderOptions & { name: string }, params: FormItemContentRenderParams) {
        const { data, field }: any = params
        const { props }: any = renderOpts
        return [
            h(FitsIconSelect,
                {
                    modelValue: data[field],
                    ...props,
                }
            )
        ]
    }
}

export default VXETablePluginFits