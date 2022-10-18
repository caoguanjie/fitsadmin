<template>
    <div class="fits-group-table">
        <el-scrollbar class="container-scroll">
            <!-- 用于渲染表头 -->
            <div class="hidden-table-body" :style="{ width: isAutoWidth ? 'auto' : 'fit-content' }">
                <vxe-table ref="tableHeader" :data="data.length > 0 ? [{}] : []" border="inner"
                    @checkbox-all="headerCheckboxChange" empty-text=" ">
                    <vxe-column v-for="(item, index) in headers" :key="index" v-bind="item" />
                </vxe-table>
            </div>
            <div class="group-table-wrap" :style="{ width: isAutoWidth ? 'auto' : 'fit-content' }">
                <el-scrollbar always>
                    <template v-if="data.length > 0">
                        <group-table-item ref="tables" v-for="(item, index) in data" :key="index" :headers="headers"
                            :data="item" :is-default-expand="isDefaultExpand(index, defaultExpandNum)"
                            @load-more="emit('loadMore', $event)" @expand-change="emit('expandChange', $event)"
                            @update-group-checkbox="updateGroupCheckbox($event, index)">
                            <!-- 组头内容右侧插槽区 -->
                            <template #right="group">
                                <slot name="right" :groupData="group.groupData" />
                            </template>
                            <!-- 组头左侧组名插槽区 -->
                            <template #groupName="data">
                                <slot name="groupName" :groupName="data.groupName" />
                            </template>
                            <!-- 表格展开行插槽区 -->
                            <template #expand="data">
                                <slot name="expand" :row="data.row" :index="data.index" />
                            </template>
                            <!-- 数据单元格插槽区 -->
                            <template #default="data">
                                <slot :field="data.field" :row="data.row" :index="data.index"
                                    :groupIndex="index + '-' + data.index" />
                            </template>
                        </group-table-item>
                    </template>
                    <div class="noData" v-else>
                        <!-- 暂无数据插槽区 -->
                        <slot name="noData">
                            <img src="/src/assets/group-table/noData.png" alt="">
                        </slot>
                    </div>
                </el-scrollbar>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, reactive, ref, toRefs, watch } from 'vue';
import { VxeTableDefines, VxeTableInstance } from 'vxe-table';
import { ICustomColumnsConfig, IFitsTableGroup, IFitsTableHeaders, IGroupTableInstance } from '../../type';
import GroupTableItem from "./GroupTableItem.vue"

const emit = defineEmits(["loadMore", "expandChange"])
const props = defineProps<{ headers: IFitsTableHeaders[], data: IFitsTableGroup[], defaultExpandNum: number }>()
const state = reactive({
    groupsChecked: [] as boolean[], // 保存每个组的勾选状态,
    isAutoWidth: false
})
const { headers, data, defaultExpandNum } = toRefs(props)
const { groupsChecked, isAutoWidth } = toRefs(state)
const tableHeader = ref<VxeTableInstance>()
const tables = ref<IGroupTableInstance[]>([])

/**
 * 监听分组表格的复选框勾选状况，如果全都勾选了也让表头的复选框勾选
 */
watch(groupsChecked, val => {
    const isAllSelect = val.every(item => item) && val.length === data.value.length && data.value.length > 0
    if (isAllSelect) {
        tableHeader.value?.setAllCheckboxRow(true)
    } else {
        tableHeader.value?.clearCheckboxRow()
    }
}, { immediate: true, deep: true })

watch(() => props.data, () => {
    // 当请求新数据时（比如切换页数、修改查询条件等），需要将之前存储表格勾选状态的数组置空（否则保存下来的是上一次分组勾选的状态）
    groupsChecked.value = []
})

onUnmounted(() => {
    window.removeEventListener("resize", setWidth)
})
window.addEventListener("resize", setWidth)


/**
 * 解决浏览器窗口大小改变时，分组表格宽度有动画的bug
 */
function setWidth() {
    // 窗口改变大小时先将宽度设置为auto就不会有动画
    isAutoWidth.value = true
    // 等窗口大小改变完了再设置宽度为内容宽度即可
    setTimeout(async () => {
        await nextTick()
        isAutoWidth.value = false
    }, 0);
}

/**
 * 判断该分组是否默认展开
 */
function isDefaultExpand(currentIndex: number, defaultExpandNum?: number) {
    return defaultExpandNum !== undefined ? currentIndex < defaultExpandNum : true
}

/**
 * 更新分组对应的勾选状态（是否整组勾选）
 */
function updateGroupCheckbox(isCheck: boolean, index: number) {
    groupsChecked.value[index] = isCheck
}

/**
 * 点击了表头的复选框，需要设置所有分组表格的所有行的勾选状态
 */
function headerCheckboxChange({ checked }: VxeTableDefines.CheckboxAllEventParams) {
    tables.value.forEach((table: any) => {
        table?.setRowCheckbox(checked)
    })
}

/**
 * 更新表头列配置
 */
async function updateHeaderColumns(data: ICustomColumnsConfig[]) {
    await tableHeader.value?.reloadColumn(data as any)
}

/**
 * 更新所有分组表格列配置
 */
async function updateGroupTableColumns(data: ICustomColumnsConfig[]) {
    tables.value.forEach(async table => {
        const originColumns = table?.myTable?.getTableColumn().fullColumn || []
        originColumns.forEach((col: any) => {
            const _index = data.findIndex(item => (item.field && item.field === col.field) || (item.type && item.type === col.type))
            const _ = data.find(item => (item.field && item.field === col.field) || (item.type && item.type === col.type))
            col.sort = _index
            col.visible = _?.visible
        })
        originColumns.sort((before: any, after: any) => (before.sort - after.sort))
        await table?.myTable?.reloadColumn(originColumns)
    })
}

/**
 * 更新列配置
 */
async function updateColumns(data: ICustomColumnsConfig[]) {
    await updateHeaderColumns(data)
    await updateGroupTableColumns(data)
}

/**
 * 外部可以获取分组表格勾选的数据
 */
function getCheckGroupsData() {
    const list: any[] = []
    tables.value.forEach(table => {
        // 获取每个表格勾选的行
        const checkedItems = table.myTable?.getCheckboxRecords()
        list.push({
            groupID: table.groupID,
            groupName: table.groupName,
            checkedData: checkedItems || []
        })
    })
    return list
}

defineExpose({
    getCheckGroupsData,
    updateColumns
})
</script>

<style lang="scss" scoped>
.fits-group-table {
    height: 100%;

    :deep(.container-scroll) {
        height: 100%;

        .el-scrollbar__view {
            height: 100%;
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .hidden-table-body {
            border: solid 1px #f0f0f0;
            // width: fit-content;
            min-width: 100%;

            .vxe-table {
                .vxe-body--x-space {
                    display: none;
                }

                .vxe-table--body-wrapper {
                    height: 0;
                    opacity: 0;
                    overflow: hidden;
                }
            }
        }

        .group-table-wrap {
            flex: 1;
            height: 0;
            overflow: hidden;
            // width: fit-content;
            min-width: 100%;

            .el-scrollbar {
                .el-scrollbar__wrap {
                    .el-scrollbar__view {
                        height: auto !important;
                    }
                }

                .noData {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 300px;

                    img {
                        width: 125px;
                    }
                }
            }
        }
    }
}
</style>