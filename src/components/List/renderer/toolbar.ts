
import { ElTooltip } from 'element-plus'
import { VxeButton, VXETable } from 'vxe-table'
import ToolbarCustomColumn from '@/components/List/components/ToolbarCustomColumn.vue'
import ToolbarFullscreen from '@/components/List/components/ToolbarFullscreen.vue'





// 创建工具栏-搜索工具
VXETable.renderer.add('ToolbarSearch', {
    renderToolbarTool(renderOpts, params) {
        console.log(params)
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts

        return h(ElTooltip,
            { effect: 'dark', placement: "top", content: props.msg ?? '是否关闭搜索', hideAfter: 0 },
            {
                // Vue3 使用h函数 推荐使用函数式插槽，以便获得更佳的性能。
                default: () =>
                    h(VxeButton,
                        {
                            icon: 'vxe-icon-search',
                            onClick: () => {
                                console.log($grid.formConfig)
                                events.click()
                            }

                        },
                    )
            }
        )
    }
})


// 创建工具栏-刷新当前表单
VXETable.renderer.add('ToolbarRefresh', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts
        console.log($grid)
        return h(ElTooltip,
            { effect: 'dark', placement: "top", content: props.msg ?? '刷新表格数据', hideAfter: 0 },
            {
                // Vue3 使用h函数 推荐使用函数式插槽，以便获得更佳的性能。
                default: () =>
                    h(VxeButton,
                        {
                            icon: 'vxe-icon-refresh',
                            onClick: () => {
                                events.click()
                            }

                        }
                    )
            }
        )
    }
})


// 创建工具栏-常用查询
VXETable.renderer.add('ToolbarSetting', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts
        console.log($grid)
        return h(ElTooltip,
            { effect: 'dark', placement: "top", content: props.msg ?? '常用查询设置', hideAfter: 0 },
            {
                // Vue3 使用h函数 推荐使用函数式插槽，以便获得更佳的性能。
                default: () =>
                    h(VxeButton,
                        {
                            icon: 'vxe-icon-setting',
                            onClick: () => {
                                events.click()
                            }

                        },
                    )
            }
        )
    }
})

// 创建工具栏-导出
VXETable.renderer.add('ToolbarExport', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts
        return h(ElTooltip,
            { effect: 'dark', placement: "top", content: props.msg ?? '导出当前表格', hideAfter: 0 },
            {
                // Vue3 使用h函数 推荐使用函数式插槽，以便获得更佳的性能。
                default: () =>
                    h(VxeButton,
                        {
                            icon: 'vxe-icon-download',
                            onClick: () => {
                                events.click()
                            }

                        }
                    )
            }
        )
    }
})

// 创建工具栏-全屏
VXETable.renderer.add('ToolbarFullscreen', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { props = {} } = renderOpts
        return h(ToolbarFullscreen,
            {
                msg: props.msg ?? '全屏',
                grid: $grid
            }
        )
    }
})

// 创建工具栏-自定列
VXETable.renderer.add('ToolbarCustomColumn', {
    renderToolbarTool(renderOpts, params) {
        const { $grid }: any = params
        const { events = {}, props = {} } = renderOpts
        return h(ToolbarCustomColumn,
            {
                msg: props.msg ?? '自定义列显示',
                grid: $grid
            }
            // { effect: 'dark', placement: "top", content: props.msg ?? '自定义列显示', hideAfter: 0 },
            // {
            //     // Vue3 使用h函数 推荐使用函数式插槽，以便获得更佳的性能。
            //     default: () =>
            //         h(VxeButton,
            //             {
            //                 icon: 'vxe-icon-custom-column',
            //                 id: 'FitsCustomColumn',
            //                 onClick: () => {
            //                     events.click()
            //                 }

            //             },
            //         )
            // }
        )
    }
})