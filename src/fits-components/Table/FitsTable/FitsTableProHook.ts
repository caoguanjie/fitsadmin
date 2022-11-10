import XEUtils from "xe-utils";
import eventBus from "@/utils/base/EventBus";
import { useUserHabits } from "@/utils/base/storage-persist";
import { Ref } from "vue";
import { VxeFormItemProps, VxeTableDefines } from "vxe-table";
import { FitsTableProps } from "./type";
import { reactive, watch, nextTick } from 'vue';
export const useFitsTablePro = (props: FitsTableProps, xGrid: Ref<any>) => {
    const defaultProps = {
        // 唯一标识（被某些特定的功能所依赖）,需要的时候需要自定义传输
        id: props.id ?? 'FitsTable',
        // 保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）
        keepSource: false,
        // 行配置信息
        rowConfig: {
            // 只对 show-overflow 有效，每一行的高度
            height: 40
        },
        // 导出配置，一定要穿空对象
        exportConfig: {},
        storage: {
            // 是否开启数据持久化
            enabled: false,
            // 保存数值的键值对
            key: '',
            // 默认传用户id比较好
            dataBase: '',
            // 默认存入这个表
            dataSheet: 'FitsTableComponent'
        },
        // 搜索区域
        formConfig: XEUtils.isPlainObject(props.formConfig) ? {
            // 表单项
            items: [],
            // 全局设置，每一行的栅格数
            titleAlign: "right",
            titleWidth: '100px',
            titleOverflow: true,
        } : null,
        // 分页器，这里有个坑
        pagerConfig: XEUtils.isPlainObject(props.pagerConfig) ? {
            layouts: ['Total', 'Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump'],
            pageSizes: [10, 15, 20, 50, 100],
            background: true,
        } : {
            enabled: false
        },
        // 每一列显示
        columns: [],
        // 工具栏
        toolbarConfig: {
            zoom: false,
            export: false,
            custom: false,
        },
        // 树配置
        // treeConfig: {},
        // 数据代理
        // proxyConfig: {}
    }
    const vxeTableProps: any = XEUtils.merge(defaultProps, props)
    // 存储工具栏
    const toolsArray: any = [];
    const { store } = useUserHabits({
        ...vxeTableProps.storage,
        store: {
            // 是否关闭搜索条件
            isShowSearchForm: true,
            // 常用查询的数据
            customQueryArray: [],
            // 自定义列的数据
            customColumnArray: [] as VxeTableDefines.ColumnInfo[]
        }
    })
    // 生成工具栏
    handleToolbarConfig();
    // 生成搜索区域
    handleFormConfig();
    const fitsTablePro = reactive<FitsTableProps>(vxeTableProps)
    // console.warn('fitsTablePro', fitsTablePro)

    function handleToolbarConfig() {
        const toolsBtn = {
            search: {
                toolRender: {
                    name: 'FitsToolbarSearch',
                    events: {
                        click: () => {
                            store.isShowSearchForm = !store.isShowSearchForm;
                        }
                    }
                }
            },
            query: {
                toolRender: {
                    name: 'FitsToolbarSetting', events: {
                        get: () => store.customQueryArray,
                        setCustomQuerySelected: (formConfigData: any) => {
                            const data = xGrid.value?.fitsTablePro.getProxyInfo()
                            XEUtils.merge(data?.form, formConfigData.form)
                            xGrid.value?.fitsTablePro.commitProxy('query')
                        },
                        setCustomQueryData: (arr: any[]) => {
                            store.customQueryArray = [...arr];
                        },
                        changFromItemStatus: (target: VxeFormItemProps) => {
                            const items = xGrid.value?.fitsTablePro.props.formConfig?.items as VxeFormItemProps[]
                            items.find((item: VxeFormItemProps) => item.field === target.field && (item.visible = target.visible))
                            xGrid.value?.handleFormItemNumber(xGrid.value?.$el.clientWidth)
                        }
                    }
                }
            },
            refresh: {
                toolRender: {
                    name: 'FitsToolbarRefresh', events: {
                        click: () => {
                            xGrid.value?.fitsTablePro.commitProxy('query')
                        }
                    }
                }
            },

            export: {
                toolRender: {
                    name: 'FitsToolbarExport', events: {
                        click: () => {
                            xGrid.value?.fitsTablePro.openExport()
                        }
                    },
                }
            },
            fullscreen: {
                toolRender: {
                    name: 'FitsToolbarFullscreen',
                    props: {
                        isShowSearchForm: store.isShowSearchForm
                    },
                    events: {
                        get: () => {
                            return store.isShowSearchForm
                            // xGrid.value?.zoom()
                            // eventBus.emit('isFullscreen', store.isShowSearchForm)
                        }
                    },
                }
            },
            custom: {
                toolRender: {
                    name: 'FitsToolbarCustomColumn', events: {
                        geCustomColumnData: () => {
                            return XEUtils.clone(store.customColumnArray, true)
                        },
                        setCustomColumnData: (arr: VxeTableDefines.ColumnInfo[]) => {
                            store.customColumnArray = XEUtils.clone(arr, true);
                        }
                    },

                }
            },
        }
        const tools: any = vxeTableProps.toolbarConfig?.tools
        if (XEUtils.isPlainObject(tools) as any) {
            if (tools.enabled !== false) {
                tools?.search !== false && vxeTableProps?.formConfig && toolsArray.push(toolsBtn['search']);
                tools?.query !== false && vxeTableProps?.formConfig && toolsArray.push(toolsBtn['query']);
                tools?.refresh !== false && vxeTableProps?.proxyConfig && toolsArray.push(toolsBtn['refresh']);
                tools?.export !== false && toolsArray.push(toolsBtn['export']);
                tools?.fullscreen !== false && toolsArray.push(toolsBtn['fullscreen']);
                tools?.custom !== false && toolsArray.push(toolsBtn['custom']);
            }
            vxeTableProps.toolbarConfig.tools = toolsArray
        }
    }
    function handleFormConfig() {
        if (vxeTableProps.formConfig?.items.length) {
            // 默认搜索、重置按钮
            const btnGroup: VxeFormItemProps = { align: 'center', className: "searchBtns", collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '搜索', icon: 'vxe-icon-search', status: 'primary' } }, { props: { type: 'reset', content: '重置', icon: 'vxe-icon-repeat' } }] } }
            vxeTableProps.formConfig?.items?.push(btnGroup as any)
        }
    }
    /**
 * 监听搜索区域是否显示
 */
    watch(() => store.isShowSearchForm, (newValue) => {
        nextTick(() => {
            const element = xGrid.value.fitsTablePro.$el
            element.querySelector('.vxe-grid--form-wrapper').style.display = newValue ? 'block' : 'none';
            // 这步主要是解决各个工具栏被放大后，提示框被挡住的问题，可以把提示框方向变成bottom属性
            eventBus.emit('IsShowSearchForm', newValue)
            if (document.body.querySelector('.is--maximize')) {
                // 这里主要解决放大化，如果隐藏搜索区域时，列表高度无法自动计算高度的问题，可以利用vxetable的内置方法，触发页面计算高度。
                xGrid.value?.fitsTablePro.reloadColumn(fitsTablePro.columns as any)
            }
        })
    })
    /**
     * 监听第一次从本地数据库获取自定义列数据的时候，需要重新刷新列的展示
     */
    const stopWatch = watch(() => store.customColumnArray, () => {
        nextTick(() => {
            xGrid.value?.fitsTablePro.reloadColumn(store.customColumnArray);
            stopWatch()
        })
    }, { deep: true })
    return { fitsTablePro }

}


