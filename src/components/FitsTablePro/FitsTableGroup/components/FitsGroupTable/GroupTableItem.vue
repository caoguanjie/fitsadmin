<template>
    <div class="group-table-item">
        <div class="tools">
            <div class="left">
                <el-icon v-if="data.hideLoading" class="expand-icon" @click="isExpand = !isExpand">
                    <ArrowDown v-if="isExpand" />
                    <ArrowRight v-else />
                </el-icon>
                <el-icon v-else class="loading-icon" :size="20">
                    <Loading />
                </el-icon>
                <el-checkbox v-if="hasCheckbox" v-model="isGroupCheck" @change="setRowCheckbox($event as boolean)"
                    label="" />
                <div class="group-name">
                    <slot name="groupName" :groupName="data.NAME">
                        <el-tooltip effect="dark" :content="data.NAME + ''" placement="top-start" :hide-after="0">
                            <div class="box"> {{ data.NAME }} </div>
                        </el-tooltip>
                    </slot>
                </div>
                <div class="total">{{ groupPagination.total }}条记录</div>
            </div>
            <div class="right">
                <slot name="right" :groupData="data" />
            </div>
        </div>
        <div v-show="isExpand && data.hideLoading">
            <vxe-table ref="myTable" :data="tableData" :show-header="false" border="inner" :loading="false"
                empty-text=" " show-overflow :row-config="{ isHover: true }"
                @toggle-row-expand="emit('expandChange', $event)" @checkbox-change="rowCheckboxChange">
                <vxe-column v-for="(item, index) in headers" :key="index" v-bind="item">
                    <template #content="scoped" v-if="item.type === 'expand'">
                        <slot name="expand" :row="scoped.row" :index="scoped.rowIndex" />
                    </template>
                    <template #default="scoped" v-if="item.field">
                        <slot :field="item.field" :row="scoped.row" :index="scoped.rowIndex">
                            <span>{{ scoped.row[item.field as string] }}</span>
                        </slot>
                    </template>
                </vxe-column>
                <template #empty>
                    <div style="padding: 30px 0;">
                        <fits-empty />
                    </div>
                </template>
            </vxe-table>
            <div class="bottom-tool">
                <div class="more" v-show="hasLoadMore" @click="loadMoreData">加载更多</div>
                <div class="expand" @click="isExpand = false">
                    <el-icon>
                        <ArrowUp />
                    </el-icon>
                    <span>收起</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, reactive, ref, toRefs, watch } from 'vue';
import { ArrowUp, ArrowDown, ArrowRight, Loading } from '@element-plus/icons-vue';
import { IFitsLoadMoreParams, IFitsTableGroup, IFitsTableHeaders } from '../../type';
import { VxeTableInstance } from 'vxe-table';
import { FitsEmpty } from '@/fits-components/Data/FitsEmpty'
const emit = defineEmits(["loadMore", "expandChange", "updateGroupCheckbox"])
const props = defineProps<{ data: IFitsTableGroup, headers: IFitsTableHeaders[], isDefaultExpand: boolean }>()
const state = reactive({
    isExpand: true, // 是否展开分组表格,
    isGroupCheck: false, // 是否勾选分组
    groupPagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
    },
})
const { isExpand, isGroupCheck, groupPagination } = toRefs(state)
const { data, headers } = toRefs(props)
const myTable = ref<VxeTableInstance>() // 表格实例

// 表格数据
const tableData = computed(() => {
    return data.value.DataSource?.GroupList || []
})
// 是否显示分组表格勾选框
const hasCheckbox = computed(() => {
    return tableData.value.length > 0 && headers.value.some(h => h.type === "checkbox")
})
// 是否显示加载更多
const hasLoadMore = computed(() => {
    const maxPageIndex = Math.ceil(groupPagination.value.total / groupPagination.value.pageSize)
    return groupPagination.value.total > groupPagination.value.pageSize && groupPagination.value.pageIndex < maxPageIndex
})

watch(() => props.isDefaultExpand, val => {
    isExpand.value = val
}, { immediate: true })

watch(() => props.data, () => {
    setTimeout(() => {
        // 获取分组表格的总数
        const count = props.data?.DataSource?.ItemCount
        if (count !== undefined && count !== null) {
            groupPagination.value.total = count
        }
    }, 0);
}, { immediate: true, deep: true })

/**
 * 当复选框值发生改变的时候，需要告诉父组件，然后父组件判断是否所有分组都选中了，以此来设置表头的复选按钮
 */
watch(isGroupCheck, (val) => {
    emit("updateGroupCheckbox", val)
})

/**
 * 单独点击行的复选框（通过其他方式修改复选框的值不会触发这个方法，只有点击才会触发（vxe-table的方法））
 */
async function rowCheckboxChange() {
    await nextTick()
    const currentSelectLength = myTable.value?.getCheckboxRecords().length || 0
    // 判断当前表格勾选的复选框个数是否等于当前表格展示的条数，如果等于则表示勾选了全组
    isGroupCheck.value = tableData.value.length > 0 && currentSelectLength === tableData.value.length
}

/**
 * 加载更多
 */
async function loadMoreData() {
    isGroupCheck.value = false
    groupPagination.value.pageSize += 10
    const data: IFitsLoadMoreParams = {
        groupID: props.data.ID,
        pagingParams: {
            pageSize: groupPagination.value.pageSize,
            pageIndex: 1,
        }
    }
    emit("loadMore", data)
}

/**
 * 设置表格checkbox
 */
function setRowCheckbox(isChecked: boolean) {
    isGroupCheck.value = isChecked
    myTable.value?.setAllCheckboxRow(isChecked)
}

defineExpose({
    myTable,
    setRowCheckbox,
    groupID: props.data.ID,
    groupName: props.data.NAME,
})
</script>

<style lang="scss" scoped>
// loading图标旋转动画
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.group-table-item {
    margin-top: 10px;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;

    &:nth-last-of-type(1) {
        margin-bottom: 10px;
    }

    .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        min-height: 30px;
        background-color: #ffffff;
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        padding: 0 10px;

        .left {
            display: flex;
            align-items: center;
            flex: 1;
            height: 100%;

            &>.el-checkbox {
                margin: 0 20px 0 0;
            }

            .expand-icon {
                margin-right: 20px;
                cursor: pointer;
            }

            .loading-icon {
                margin-right: 20px;
                animation: rotation 3s linear infinite;
            }

            .total {
                width: 120px;
                font-family: SimSun;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 28px;
                letter-spacing: 0px;
                color: #999999;
            }

            :deep(.group-name) {
                width: 150px;
                overflow: hidden;

                .box {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-family: SimSun;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 28px;
                    letter-spacing: 0px;
                    color: #666666;
                }
            }

            color: #999999;
        }

        .right {
            height: 100%;
            display: flex;
            align-items: center;

            .el-icon {
                cursor: pointer;
            }
        }

        .el-checkbox {
            margin-left: 20px;
        }
    }

    .bottom-tool {
        display: flex;
        align-items: center;
        height: 30px;
        min-height: 30px;
        background-color: #ffffff;
        padding: 0 20px;
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #999999;
        position: relative;

        div {
            cursor: pointer;

            span {
                margin-left: 20px;
            }
        }

        .expand {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>