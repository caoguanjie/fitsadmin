<template>
    <!-- 只要vxe-grid组件带上 class="fits-grid"，样式就是通用的 -->
    <vxe-grid ref="fitsTablePro" id="fitstable" v-bind="state.gridOption" v-on="props.gridEvents" class="fits-grid">
        <template v-for="(item, index) in state.dynamicSlotNameArray" :key="index" v-slot:[item]="slotProps">
            <slot :name="item" :slotProps="slotProps" />
        </template>
        <template #empty>
            <fits-empty />
        </template>
    </vxe-grid>
</template>

<script lang='ts' setup name="FitsTable">
import XEUtils from 'xe-utils';
import { VxeGrid } from 'vxe-table'
import { reactive, ref, watch } from 'vue';
import FitsEmpty from '../../Data/FitsEmpty/index.vue'
import { VxeFormItemProps, VxeGridInstance, VxeGridListeners, VxeGridProps, VxeGridPropTypes } from 'vxe-table';
import { useResizeObserver } from '@vueuse/core'
import variables from '@/styles/variables.module.scss';
import { FitsTableProps } from './type';
import { useLogger } from '@/utils/base/logger'
const props = withDefaults(defineProps<{
    option: FitsTableProps,
    gridEvents?: VxeGridListeners | any
}>(), {
    gridEvents: {}
})

// 实例化vxetable的组件，里面有vxe-grid的所有api，详情：https://vxetable.cn/#/grid/api
const fitsTablePro = ref<VxeGridInstance>()


const _gridOption = XEUtils.clone(props.option, true)
const state = reactive({
    // 动态插槽的名字数组
    dynamicSlotNameArray: [] as string[],
    // 这里有个大坑，需要把props的proxy对象先做一个深拷贝，变成一个js普通对象，不然props里面复杂的proxy对象嵌套，随便修改都会会让属性失去响应
    gridOption: _gridOption as VxeGridProps,
})


/** 
 * 导出实例化的方法
 */
defineExpose({
    fitsTablePro,
    handleFormItemNumber
})

// 初始化默认配置
initDefaultConfig()


function initDefaultConfig() {
    // 检查所有的卡槽
    checkAllSlots();
    // 设置表单的默认配置
    // setDefaultFormConfig();
    // 设置工具栏的默认配置
    // setToolbarConfig();
    // 监听常用查询的数据要保存本地的数据回传
    // setCustomQueryData()
    // 监听并保存用户操作习惯的自定义列的数据到本地
    // setCustomColumnData()
    // 常用查询功能，监听表单项是否显示
    // setFormConfigItemVisible()
}



/**
 * 检查列的插槽
 */
function checkAllSlots() {
    const arr: string[] = [];
    // 检查列的插槽
    // 遍历树节点，不知道配置项有多少层对象
    XEUtils.eachTree(state.gridOption.columns, (column) => {
        if (column?.slots) {
            XEUtils.each(column.slots, (value) => {
                arr.push(value);
            });
        }
    });

    // 遍历工具栏的卡槽
    XEUtils.objectEach([state.gridOption.toolbarConfig], (config: VxeGridPropTypes.ToolbarConfig) => {
        if (config?.slots) {
            XEUtils.each(config.slots, (value) => {
                arr.push(value);
            });
        }
    });

    // 遍历搜索区域表单项的插槽
    XEUtils.eachTree(state.gridOption.formConfig?.items, (config) => {
        if (config?.slots) {
            XEUtils.each(config.slots, (value) => {
                arr.push(value);
            });
        }
    });

    // 遍历页脚区域的左侧和右侧模板插槽
    XEUtils.eachTree([state.gridOption.pagerConfig], (config: VxeGridPropTypes.PagerConfig) => {
        if (config?.slots) {
            XEUtils.each(config.slots, (value) => {
                arr.push(value);
            });
        }
    });

    // 遍历页脚区域的左侧和右侧模板插槽
    XEUtils.objectEach([state.gridOption], (config: VxeGridPropTypes.PagerConfig) => {
        if (config?.slots) {
            XEUtils.each(config.slots, (value) => {
                arr.push(value);
            });
        }
    });
    state.dynamicSlotNameArray = [...arr];
    const { log } = useLogger()
    arr.length && log.primary('FitsTable组件已有插槽', state.dynamicSlotNameArray)
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
        // 是否展示展开按钮
        let isShowExpand = true;
        state.gridOption.formConfig!.items = items.map((element: VxeFormItemProps, index: number) => {
            element.span = Math.floor(24 / lineItem);
            element.className !== 'searchBtns' && (element.folding = index >= lineItem - 1 + visibleArray.length)
            element.folding && isShowExpand && (isShowExpand = false)
            element.className === 'searchBtns' && isShowExpand && (element.collapseNode = false)
            return element
        })
        // console.log(state.gridOption.formConfig!.items)
    }
}



// 监听浏览器的变化事件
useResizeObserver(document.body, (entries) => {
    const entry = entries[0]
    // 如果有表单配置才执行计算方法
    handleFormItemNumber(fitsTablePro.value?.$el.clientWidth)
    // 页面高度-标签栏-margin-底部状态栏
    const padding = parseInt(variables.basePadding);
    const headerHeight = entry.target.querySelector('.fits-head')?.clientHeight ?? 0;
    const footerHeight = entry.target.querySelector('.footeContainer')?.clientHeight ?? 0;
    const tableFooterHeight = entry.target.querySelector('.vxe-table--footer-wrapper')?.clientHeight ?? 0;
    const pagerHeight = entry.target.querySelector('.vxe-grid--pager-wrapper') ? 0 : 10
    state.gridOption.maxHeight = props.option?.maxHeight ?? (entry.contentRect.height - headerHeight - padding - footerHeight - tableFooterHeight - pagerHeight)
})


/**
 * 监听外界的表格配置项的变化，重新初始化默认配置项
 */
watch(() => props.option, (newValue) => {
    //当option有变化时，要重新深拷贝，重新赋值
    state.gridOption = XEUtils.clone(newValue as VxeGridProps, true)
    // 如果有表单配置才执行计算方法
    handleFormItemNumber(fitsTablePro.value?.$el.clientWidth)
    initDefaultConfig()
}, { deep: true })




</script>
<style lang='scss' >
.vxe-table.cell--highlight .vxe-cell>.el-date-editor .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-date-editor .el-input__inner,
.vxe-table.cell--highlight .vxe-cell>.el-input-number .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-input-number .el-input__inner,
.vxe-table.cell--highlight .vxe-cell>.el-input-number .el-input-number__decrease,
.vxe-table.cell--highlight .vxe-cell>.el-input-number .el-input-number__increase,
.vxe-table.cell--highlight .vxe-tree-cell>.el-input-number .el-input-number__decrease,
.vxe-table.cell--highlight .vxe-tree-cell>.el-input-number .el-input-number__increase,
.vxe-table.cell--highlight .vxe-cell>.el-input:not(.el-date-editor) .el-input__inner,
.vxe-table.cell--highlight .vxe-cell>.el-autocomplete .el-input__inner,
.vxe-table.cell--highlight .vxe-cell>.el-select .el-input__inner,
.vxe-table.cell--highlight .vxe-cell>.el-cascader .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-input:not(.el-date-editor) .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-autocomplete .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-select .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-cascader .el-input__inner {
    border: 0;
}

.vxe-table .vxe-cell>.el-slider .el-slider__runway,
.vxe-table .vxe-tree-cell>.el-slider .el-slider__runway,
.vxe-table--filter-element-wrapper>.el-slider .el-slider__runway {
    margin: 8px 0;
}

.vxe-table .vxe-cell>.el-slider .el-slider__runway .el-slider__button-wrapper,
.vxe-table .vxe-tree-cell>.el-slider .el-slider__runway .el-slider__button-wrapper,
.vxe-table--filter-element-wrapper>.el-slider .el-slider__runway .el-slider__button-wrapper {
    z-index: auto;
}

.vxe-table .vxe-cell>.el-input,
.vxe-table .vxe-tree-cell>.el-input,
.vxe-form .vxe-form--item-content>.el-input,
.vxe-table .vxe-cell>.el-autocomplete,
.vxe-table .vxe-tree-cell>.el-autocomplete,
.vxe-form .vxe-form--item-content>.el-autocomplete,
.vxe-table .vxe-cell>.el-input-number,
.vxe-table .vxe-tree-cell>.el-input-number,
.vxe-form .vxe-form--item-content>.el-input-number,
.vxe-table .vxe-cell>.el-select,
.vxe-table .vxe-tree-cell>.el-select,
.vxe-form .vxe-form--item-content>.el-select,
.vxe-table .vxe-cell>.el-cascader,
.vxe-table .vxe-tree-cell>.el-cascader,
.vxe-form .vxe-form--item-content>.el-cascader,
.vxe-table .vxe-cell>.el-date-editor,
.vxe-table .vxe-tree-cell>.el-date-editor,
.vxe-form .vxe-form--item-content>.el-date-editor,
.vxe-table .vxe-cell>.el-slider,
.vxe-table .vxe-tree-cell>.el-slider,
.vxe-form .vxe-form--item-content>.el-slider {
    width: 100%;
}

.vxe-table .vxe-cell>.el-color-picker,
.vxe-table .vxe-tree-cell>.el-color-picker,
.vxe-form .vxe-form--item-content>.el-color-picker {
    vertical-align: middle;
}

.vxe-table--filter-element-wrapper {
    padding: 0.8em 1em;
}

.vxe-table--filter-element-wrapper>.el-input,
.vxe-table--filter-element-wrapper>.el-input-number,
.vxe-table--filter-element-wrapper>.el-autocomplete,
.vxe-table--filter-element-wrapper>.el-select,
.vxe-table--filter-element-wrapper>.el-rate,
.vxe-table--filter-element-wrapper>.el-slider {
    width: 180px;
}

.col--valid-error>.vxe-cell>.el-input .el-input__inner,
.col--valid-error>.vxe-cell>.el-autocomplete .el-input__inner,
.col--valid-error>.vxe-cell>.el-input-number .el-input__inner,
.col--valid-error>.vxe-cell>.el-select .el-input__inner,
.col--valid-error>.vxe-cell>.el-cascader .el-input__inner,
.col--valid-error>.vxe-cell>.el-date-picker .el-input__inner,
.col--valid-error>.vxe-tree-cell>.el-input .el-input__inner,
.col--valid-error>.vxe-tree-cell>.el-autocomplete .el-input__inner,
.col--valid-error>.vxe-tree-cell>.el-input-number .el-input__inner,
.col--valid-error>.vxe-tree-cell>.el-select .el-input__inner,
.col--valid-error>.vxe-tree-cell>.el-cascader .el-input__inner,
.col--valid-error>.vxe-tree-cell>.el-date-picker .el-input__inner {
    border-color: #f56c6c;
}

.vxe-table.cell--highlight .vxe-cell>.el-input:not(.el-date-editor) .el-input__inner,
.vxe-table.cell--highlight .vxe-cell>.el-autocomplete .el-input__inner,
.vxe-table.cell--highlight .vxe-cell>.el-select .el-input__inner,
.vxe-table.cell--highlight .vxe-cell>.el-cascader .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-input:not(.el-date-editor) .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-autocomplete .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-select .el-input__inner,
.vxe-table.cell--highlight .vxe-tree-cell>.el-cascader .el-input__inner {
    padding: 0;
}

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

    .vxe-pager .vxe-pager--jump .vxe-pager--goto {
        border-radius: 2px;
        min-width: 50px;
        font-size: 10px;
        line-height: 30px;
        height: 30px;
    }

    .vxe-pager.is--background .vxe-pager--jump-next:not(.is--disabled).is--active,
    .vxe-pager.is--background .vxe-pager--jump-prev:not(.is--disabled).is--active,
    .vxe-pager.is--background .vxe-pager--num-btn:not(.is--disabled).is--active,
    .vxe-pager.is--perfect .vxe-pager--jump-next:not(.is--disabled).is--active,
    .vxe-pager.is--perfect .vxe-pager--jump-prev:not(.is--disabled).is--active,
    .vxe-pager.is--perfect .vxe-pager--num-btn:not(.is--disabled).is--active {
        background-color: #007dff;
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