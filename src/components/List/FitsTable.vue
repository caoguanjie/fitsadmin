<template>
    <!-- 只要vxe-grid组件带上 class="fits-grid"，样式就是通用的 -->
    <vxe-grid ref="xGrid" id="fitstable" v-bind="state.gridOption" v-on="gridEvents" class="fits-grid">
        <template v-for="(item , index) in state.dynamicSlotNameArray" :key="index" v-slot:[item]="slotProps">
            <slot :name="item" :row="slotProps.row" />
        </template>
    </vxe-grid>
</template>

<script lang='ts' setup>
import { VxeFormItemProps, VxeGridInstance, VxeGridListeners, VxeGridProps, VxeGridPropTypes, VxeTableDefines, VxeToolbarPropTypes } from 'vxe-table';
import "./renderer/index"
import XEUtils from 'xe-utils';
import variables from '@/styles/variables.module.scss';
import { ComponentInternalInstance } from 'vue';
import { FitsTableProps, FitsToolsBarConfig, FitstoolsOption, ToolsConfig } from './type';
import eventBus from '@/utils/base/EventBus';
import { useUserHabits } from '@/utils/base/storage-persist';
const props = defineProps<{
    option: FitsTableProps,
}>()

const xGrid = ref<VxeGridInstance>()
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// 监听了自定义列的数据变化，只执行一次，需要个变量辅助控制
let customColumnArrayOnce = true;
const _gridOption = XEUtils.clone(props.option, true)
const state = reactive({
    // 动态插槽的名字数组
    dynamicSlotNameArray: [] as string[],
    // 这里有个大坑，需要把props的proxy对象先做一个深拷贝，变成一个js普通对象，不然props里面复杂的proxy对象嵌套，随便修改都会会让属性失去响应
    gridOption: _gridOption as VxeGridProps,
})

// 统一放一个数据表内
const _userHabitState = XEUtils.merge(_gridOption.storage, { dataSheet: 'FitsTableComponent' })
// 需要双向绑定什么值，就传入什么值
const { store } = useUserHabits({
    ..._userHabitState,
    store: {
        // 是否关闭搜索条件
        isShowSearchForm: true,
        // 常用查询的数据
        customQueryArray: [],
        // 自定义列的数据
        customColumnArray: [] as VxeTableDefines.ColumnInfo[]
    }
})

/** 
 * 导出实例化的方法
 */
defineExpose({
    xGrid
})


const gridEvents: VxeGridListeners = {
    toolbarButtonClick({ code }) {
        const $grid = xGrid.value as VxeGridInstance
        console.error(code)
        // switch (code) {
        //    console.error()
        // }
    },
    toolbarToolClick({ code }) {
        const $grid = xGrid.value as VxeGridInstance
        console.error(code)
        switch (code) {
            case 'exportIcon':
                break;
            // xGrid.value?.toolbarConfig?.tools.
        }
    },
    custom({ type, $event }) {
        console.error(type, $event)
    }
}
// 初始化默认配置
initDefaultConfig()

onMounted(async () => {
    console.log(xGrid.value)
    // 常用查询功能，监听表单项是否显示
    setFormConfigItemVisible()
})

function initDefaultConfig() {
    // 检查所有的卡槽
    checkAllSlots();
    // 设置表单的默认配置
    setDefaultFormConfig();
    // 设置工具栏的默认配置
    setToolbarConfig();
    // 监听常用查询的数据要保存本地的数据回传
    setCustomQueryData()
    // 监听并保存用户操作习惯的自定义列的数据到本地
    setCustomColumnData()
}

// 监听并保存用户操作习惯的自定义列的数据到本地
function setCustomColumnData() {
    eventBus.on('setCustomColumnData', (arr: VxeTableDefines.ColumnInfo[]) => {
        store.customColumnArray = XEUtils.clone(arr, true);
    })
}


// 监听常用查询的数据要保存本地的数据回传
function setCustomQueryData() {
    eventBus.on('setCustomQueryData', (arr: any[]) => {
        store.customQueryArray = [...arr];
    })
    eventBus.on('setCustomQuerySelected', (formConfigData: any) => {
        const data = xGrid.value?.getProxyInfo()
        XEUtils.merge(data?.form, formConfigData.form)
        xGrid.value?.commitProxy('query')

    })
}

function setDefaultOption() {
    const _gridOption = XEUtils.clone(props.option as VxeGridProps, true)
    const defaultConfig = {
        // 唯一标识（被某些特定的功能所依赖）,需要的时候需要自定义传输
        id: 'FitsTable',
        // 保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）
        keepSource: true,
        // 行配置信息
        rowConfig: {
            // 只对 show-overflow 有效，每一行的高度
            height: 40
        },
    }
}

/**
 * 检查列的插槽
 */
function checkAllSlots() {
    const arr: string[] = [];
    // 检查列的插槽
    // 遍历树节点，不知道配置项有多少层对象
    XEUtils.eachTree(state.gridOption.columns, (column) => {
        if (column.slots) {
            XEUtils.each(column.slots, (value) => {
                arr.push(value);
            });
        }
    });

    // 遍历工具栏的卡槽
    XEUtils.eachTree(state.gridOption.toolbarConfig, (config) => {
        if (config.slots) {
            XEUtils.each(config.slots, (value) => {
                arr.push(value);
            });
        }
    });
    state.dynamicSlotNameArray = [...arr];
}

// 处理每个表单项应该显示几个
function handleFormItemNumber(width: number) {
    if (XEUtils.isPlainObject(state.gridOption.formConfig) && state.gridOption.formConfig?.items?.length) {

        // 每一个表单项的初始宽度，默认338px
        const formItemWidth = parseInt(variables.ListSearchFormItemWidth);

        const lineItem = width < 768 ? 2 : Math.ceil(width / formItemWidth);
        // 默认的配置 
        const items = state.gridOption.formConfig?.items as VxeFormItemProps[];
        const visibleArray = items.filter((item: VxeFormItemProps) => {
            item.visible = item.visible ?? true;
            return item.visible === false && item.folding === false
        })
        // 这里是因为可能表单搜索项过少时，能给予最大的空间
        // const targetItem = lineItem <= items.length ? lineItem : items.length
        state.gridOption.formConfig!.items = items.map((element: VxeFormItemProps, index: number) => {
            element.span = Math.floor(24 / lineItem);
            element.className !== 'searchBtns' && (element.folding = index >= lineItem - 1 + visibleArray.length)
            return element
        })
        console.log(state.gridOption.formConfig!.items)
    }
}


/**
 * 设置默认的表格配置项
 */
function setDefaultFormConfig() {
    if (XEUtils.isPlainObject(state.gridOption.formConfig) && JSON.stringify(state.gridOption.formConfig) !== '{}') {
        // 默认搜索、重置按钮
        const btnGroup: VxeFormItemProps = { align: 'center', className: "searchBtns", collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '搜索', icon: 'vxe-icon-search', status: 'primary' } }, { props: { type: 'reset', content: '重置', icon: 'vxe-icon-repeat' } }] } }
        state.gridOption.formConfig?.items?.push(btnGroup)
        const defaultFormConfig: VxeGridPropTypes.FormConfig = {
            // 全局设置，每一行的栅格数
            titleAlign: "right",
            titleWidth: '100px',
            titleOverflow: true,
            items: []
        }
        state.gridOption.formConfig = {
            ...defaultFormConfig,
            ...state.gridOption.formConfig
        }
        // XEUtils.merge(gridOption.formConfig, defaultFormConfig)
    }

}


/**
 * 获取默认的工具栏配置
 */
function setToolbarConfig() {
    if (XEUtils.isPlainObject(state.gridOption.toolbarConfig) && JSON.stringify(state.gridOption.toolbarConfig) !== '{}') {
        const toolsBtn = {
            search: {
                toolRender: {
                    name: 'ToolbarSearch',
                    events: {
                        click: () => {
                            store.isShowSearchForm = !store.isShowSearchForm;
                        }
                    }
                }
            },
            query: {
                toolRender: {
                    name: 'ToolbarSetting', events: {
                        click: () => {
                            eventBus.emit('customQuery', store.customQueryArray)
                        }
                    }
                }
            },
            refresh: {
                toolRender: {
                    name: 'ToolbarRefresh', events: {
                        click: () => {
                            xGrid.value?.commitProxy('query')
                        }
                    }
                }
            },

            export: {
                toolRender: {
                    name: 'ToolbarExport', events: {
                        click: () => {
                            xGrid.value?.openExport()
                        }
                    },
                }
            },
            fullscreen: {
                toolRender: {
                    name: 'ToolbarFullscreen',
                    props: {
                        isShowSearchForm: store.isShowSearchForm
                    },
                    events: {
                        click: () => {
                            xGrid.value?.zoom()
                            eventBus.emit('isFullscreen', store.isShowSearchForm)
                        }
                    },
                }
            },
            custom: {
                toolRender: {
                    name: 'ToolbarCustomColumn', events: {
                        click: () => {
                            eventBus.emit('initCustomColumnData', XEUtils.clone(store.customColumnArray, true))
                        }
                    },

                }
            },
        }
        const _tools: any = state.gridOption.toolbarConfig?.tools;
        let arr: any = [];
        if (XEUtils.isPlainObject(_tools)) {
            arr = _tools
        } else {
            if (_tools !== false) {
                const tool: any = state.gridOption.toolbarConfig;
                tool?.search !== false && arr.push(toolsBtn['search']);
                tool?.query !== false && arr.push(toolsBtn['query']);
                tool?.refresh !== false && arr.push(toolsBtn['refresh']);
                tool?.export !== false && arr.push(toolsBtn['export']);
                tool?.fullscreen !== false && arr.push(toolsBtn['fullscreen']);
                tool?.custom !== false && arr.push(toolsBtn['custom']);
            }

        }

        const defaultToolbarConfig: VxeGridPropTypes.ToolbarConfig = {
            zoom: false,
            export: false,
            custom: false,
            buttons: state.gridOption.toolbarConfig?.buttons,
            tools: arr as VxeToolbarPropTypes.Tools,
        }
        state.gridOption.toolbarConfig = {
            ...defaultToolbarConfig,
            ...state.gridOption.toolbarConfig,
        }
    }
}
/**
 * 工具栏-常用查询-是否显示表单的某一项
 */
function setFormConfigItemVisible() {
    eventBus.on('changFromItemStatus', (target: VxeFormItemProps) => {
        const items = state.gridOption.formConfig?.items as VxeFormItemProps[]
        items.find((item: VxeFormItemProps) => item.field === target.field && (item.visible = target.visible))
        handleFormItemNumber(xGrid.value?.$el.clientWidth)
    })
}


// 监听浏览器的变化事件
useResizeObserver(document.body, (entries) => {
    const entry = entries[0]
    // 如果有表单配置才执行计算方法
    handleFormItemNumber(xGrid.value?.$el.clientWidth)
    // 页面高度-标签栏-margin-底部状态栏
    const padding = parseInt(variables.basePadding);
    const headerHeight = entry.target.querySelector('.fits-head')?.clientHeight ?? 0;
    const footerHeight = entry.target.querySelector('.footeContainer')?.clientHeight ?? 0;
    state.gridOption.maxHeight = props.option?.maxHeight ?? (entry.contentRect.height - headerHeight - padding - footerHeight)
})


/**
 * 监听外界的表格配置项的变化，重新初始化默认配置项
 */
watch(() => props.option, (newValue) => {
    // 当option有变化时，要重新深拷贝，重新赋值
    state.gridOption = XEUtils.clone(newValue as VxeGridProps, true)
    initDefaultConfig()
}, { deep: true })


/**
 * 监听搜索区域是否显示
 */
watch(() => store.isShowSearchForm, (newValue) => {
    const _xGrid: any = xGrid.value
    _xGrid.$el.querySelector('.vxe-grid--form-wrapper').style.display = newValue ? 'block' : 'none';
    // 这步主要是解决各个工具栏被放大后，提示框被挡住的问题，可以把提示框方向变成bottom属性
    eventBus.emit('IsShowSearchForm', store.isShowSearchForm)
    if (document.body.querySelector('.is--maximize')) {
        // 这里主要解决放大化，如果隐藏搜索区域时，列表高度无法自动计算高度的问题，可以利用vxetable的内置方法，触发页面计算高度。
        xGrid.value?.reloadColumn(state.gridOption.columns as any)
    }
})
/**
 * 监听第一次从本地数据库获取自定义列数据的时候，需要重新刷新列的展示
 */
watch(() => store.customColumnArray, () => {

    if (customColumnArrayOnce) {
        xGrid.value?.reloadColumn(store.customColumnArray);
        customColumnArrayOnce = false
    }
}, { deep: true })

</script>
<style lang='scss' >
.fits-grid.is--maximize {
    padding: 0 1em;
}

.fits-grid {
    .vxe-grid--form-wrapper {

        --el-border-radius-base: 2px;

        .vxe-form {
            max-height: 500px;
            padding: 10px 0;
            border-bottom: 8px solid #f3f5f6;
            font-size: 12px;
            color: #333;
            overflow: auto;
        }

        .vxe-form--item-title {
            padding-right: 12px;
        }



    }

    .vxe-toolbar {

        .vxe-buttons--wrapper:not(:empty),
        .vxe-tools--wrapper:not(:empty) {
            padding: 16px 0;
        }

        & .vxe-checkbox--icon {
            font-size: 16px;
        }

        & .vxe-button.type--button {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            border-radius: 2px;
            padding: 0 1.5em;
            border: solid 1px #c0c4cc;
            color: #333
        }
    }

    .vxe-tools--wrapper,
    .vxe-custom--wrapper,
    .vxe-tool--item,
    .vxe-tools--operate {
        &>button {
            width: 36px;
            height: 32px;
            margin: 0 -1px 0 0;
            color: #333;
            border-color: #ccc;
            border-radius: 0 !important;
        }

        & .vxe-button:hover,
        & .vxe-button:focus {
            z-index: 1;
            color: #0e84ff !important;
            border-color: #409eff !important;
            background-color: #e8f4ff !important;
        }

        & .vxe-button:active {
            z-index: 1;
            border-color: #0202e8 !important
        }
    }

    .vxe-tools--wrapper {
        &>.vxe-tool--item:first-child>button {
            border-top-left-radius: 2px !important;
            border-bottom-left-radius: 2px !important;
        }

        &>.vxe-tool--item:last-child>button {
            border-top-right-radius: 2px !important;
            border-bottom-right-radius: 2px !important;
        }

        .vxe-tool--item+.vxe-tool--item {
            margin: 0;
        }
    }



    // 下面是按钮的布局
    .vxe-button {
        font-size: 12px;
    }


    .vxe-button.type--button.theme--primary {
        color: #fff;
        background-color: #007dff;
        border-color: #007dff
    }

    .vxe-button.type--button.theme--primary:not(.is--disabled) {

        &:active,
        &:focus,
        &:hover {
            background-color: #429cf9;
            border-color: #429cf9;
            color: #fff;
        }

        &:active {
            background-color: #007dff;
            border-color: #007dff
        }

    }

    .vxe-button.type--button.is--circle {
        padding: 0 0.5em;
    }

    .vxe-button.type--button:not(.is--disabled) {

        &:active,
        &:focus,
        &:hover {
            color: var(--el-color-primary);
            border-color: var(--el-color-primary-light-7);
            background-color: var(--el-color-primary-light-9);
        }

        &:active {
            border-color: var(--el-color-primary);
        }
    }

    // 下面是表格的样式
    .vxe-header--column,
    .vxe-body--column {


        & .vxe-checkbox--icon {
            font-size: 16px;
        }

        .vxe-cell--checkbox .vxe-checkbox--label {
            display: none;
        }

    }



    .vxe-table--render-default.border--default .vxe-table--header-wrapper {
        background-color: #eeeeee;
    }

    .vxe-table--render-default {

        .vxe-cell {
            color: #333;
            font-size: 12px;
        }


    }

    // 下面是自定义列的样式
    .vxe-custom--option-wrapper {
        & {
            margin-top: 12px;
            border: 1px solid #ebeef5;
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            border-radius: 2px;
            font-size: 14px;
        }

        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
            top: -6px;
            right: 10px;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            border-width: 6px;
            border-top-width: 0;
            border-bottom-color: #ebeef5;
            filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
        }

        &::after {
            border-bottom-color: #fff;
            top: -5px;
        }

        .vxe-custom--header {
            border-bottom: 1px solid #f3f5f6;
        }
    }

    // 下面是页脚的样式
    .vxe-pager {
        color: #333;
        font-size: 12px;
        height: 50px;

        .vxe-input--inner {
            border-radius: 2px;
            color: #333;
            font-size: 12px;
        }

        .vxe-pager--jump-next.is--disabled,
        .vxe-pager--jump-prev.is--disabled,
        .vxe-pager--next-btn.is--disabled,
        .vxe-pager--num-btn.is--disabled,
        .vxe-pager--prev-btn.is--disabled {
            color: #cccccc;
            font-size: 10px;
            width: 30px;
            height: 30px;
            border-radius: 2px;
        }

        .vxe-pager--jump-next,
        .vxe-pager--jump-prev,
        .vxe-pager--next-btn,
        .vxe-pager--num-btn,
        .vxe-pager--prev-btn .vxe-pager--goto {
            width: 30px;
            height: 30px;
            border-radius: 2px;
            font-size: 10px;
        }
    }

    .vxe-pager.is--background .vxe-pager--jump-next:not(.is--disabled).is--active,
    .vxe-pager.is--background .vxe-pager--jump-prev:not(.is--disabled).is--active,
    .vxe-pager.is--background .vxe-pager--num-btn:not(.is--disabled).is--active,
    .vxe-pager.is--perfect .vxe-pager--jump-next:not(.is--disabled).is--active,
    .vxe-pager.is--perfect .vxe-pager--jump-prev:not(.is--disabled).is--active,
    .vxe-pager.is--perfect .vxe-pager--num-btn:not(.is--disabled).is--active {
        background-color: #007dff;
    }

    .vxe-pager .vxe-pager--jump-next:not(.is--disabled):hover,
    .vxe-pager .vxe-pager--jump-prev:not(.is--disabled):hover,
    .vxe-pager .vxe-pager--next-btn:not(.is--disabled):hover,
    .vxe-pager .vxe-pager--num-btn:not(.is--disabled):hover,
    .vxe-pager .vxe-pager--prev-btn:not(.is--disabled):hover {
        // color: #007dff;
    }

    .vxe-pager .vxe-pager--jump-next:not(.is--disabled):focus,
    .vxe-pager .vxe-pager--jump-prev:not(.is--disabled):focus,
    .vxe-pager .vxe-pager--next-btn:not(.is--disabled):focus,
    .vxe-pager .vxe-pager--num-btn:not(.is--disabled):focus,
    .vxe-pager .vxe-pager--prev-btn:not(.is--disabled):focus {
        box-shadow: none;
    }


    // 表单的部分

    // 表单的按钮组的样式
    .searchBtns {
        text-align: center;

        & button {
            width: 75px;
            // margin-left: 16px;
            font-size: 12px;
            line-height: 30px;

        }

        .vxe-button.type--button:not(.is--round) {
            border-radius: 2px;
        }

        .vxe-button.type--button {
            height: 32px;
        }

        .vxe-form--item-trigger-node {
            color: var(--fits-menu-active-color);
            min-width: 70px;
        }


    }

    .vxe-table--render-default.border--default .vxe-body--column,
    .vxe-table--render-default.border--default .vxe-footer--column,
    .vxe-table--render-default.border--default .vxe-header--column,
    .vxe-table--render-default.border--inner .vxe-body--column,
    .vxe-table--render-default.border--inner .vxe-footer--column,
    .vxe-table--render-default.border--inner .vxe-header--column {
        padding: 10px 0;
        background-image: linear-gradient(#e4e7ed, #e4e7ed);
        background-repeat: no-repeat;
        background-size: 100% 1px;
        background-position: 100% 100%;

    }

    .vxe-table--render-default.border--full .vxe-body--column,
    .vxe-table--render-default.border--full .vxe-footer--column,
    .vxe-table--render-default.border--full .vxe-header--column {
        padding: 10px 0;
        background-image: linear-gradient(#e4e7ed, #e4e7ed), linear-gradient(#e4e7ed, #e4e7ed);
        background-repeat: no-repeat;
        background-size: 1px 100%, 100% 1px;
        background-position: 100% 0, 100% 100%;
    }

}





/*滚动条整体部分*/
.fits-grid ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

/*滚动条的轨道*/
.fits-grid ::-webkit-scrollbar-track {
    background-color: #FFFFFF;
}

/*滚动条里面的小方块，能向上向下移动*/
.fits-grid ::-webkit-scrollbar-thumb {
    // background-color: rgba(144, 147, 153, .3);
    background-color: #dfdfe1;
    opacity: .3;
    border-radius: 4px;
    // border: 1px solid #F1F1F1;
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
}

.fits-grid ::-webkit-scrollbar-thumb:hover {
    background-color: #c8c8cb;
    // background-color: rgba(144, 147, 153, .5);
}

.fits-grid ::-webkit-scrollbar-thumb:active {
    background-color: rgba(144, 147, 153, .7);
}

/*边角，即两个滚动条的交汇处*/
.fits-grid ::-webkit-scrollbar-corner {
    background-color: #fff;
}
</style>