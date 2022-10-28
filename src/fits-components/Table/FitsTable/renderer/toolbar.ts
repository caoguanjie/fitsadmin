
import { VxeFormItemProps, VXETable, VxeTableDefines } from 'vxe-table'
import { ToolbarSearch, ToolbarFullscreen, ToolbarCustomColumn, ToolbarRefresh, ToolbarExport, ToolbarSetting } from '../components/index'

import { h } from 'vue'



// 创建工具栏-搜索工具
VXETable.renderer.add('vxeToolbarSearch', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts;
        return h(ToolbarSearch,
            {
                msg: props.msg ?? '是否显示搜索条件',
                grid: $grid,
                onClick: () => {
                    events.click()
                }
            }
        )
    }
})


// 创建工具栏-刷新当前表单
VXETable.renderer.add('vxeToolbarRefresh', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts

        return h(ToolbarRefresh,
            {
                msg: props.msg ?? '刷新数据',
                grid: $grid,
                onClick: () => {
                    events.click()
                }
            }
        )
    }
})


// 创建工具栏-常用查询
VXETable.renderer.add('vxeToolbarSetting', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts
        return h(ToolbarSetting,
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
                // onClick: () => {
                //     events.click()
                // }
            }
        )
    }
})

// 创建工具栏-导出
VXETable.renderer.add('vxeToolbarExport', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts
        return h(ToolbarExport,
            {
                msg: props.msg ?? '导出当前表格',
                grid: $grid,
                onClick: () => {
                    events.click()
                }
            }
        )
    }
})

// 创建工具栏-全屏
VXETable.renderer.add('vxeToolbarFullscreen', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts;

        return h(ToolbarFullscreen,
            {
                msg: props.msg ?? '全屏',
                grid: $grid,
                event: events,
                // onClick: () => {
                //     alert(1)
                //     // events.click()
                // }
            }
        )
    }
})

// 创建工具栏-自定列
VXETable.renderer.add('vxeToolbarCustomColumn', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts

        return h(ToolbarCustomColumn,
            {
                msg: props.msg ?? '自定义列显示',
                grid: $grid,
                event: events,
                // 回传参数，emit方法
                onCustomColumnData: (arr: VxeTableDefines.ColumnInfo[]) => {
                    events.setCustomColumnData(arr)
                }
            }
        )
    }
})