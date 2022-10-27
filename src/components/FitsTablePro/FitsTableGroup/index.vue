<template>
    <div class="fits-table">
        <!-- 
            表格查询条件插槽
            因为框架的表格条件查询组件可能会存在改动的风险，并且也没有使用文档，
            所以这里先用插槽代替，后续稳定了再嵌入进来，嵌入进来其实也很方便
         -->
        <slot name="query" />
        <fits-group-conditions v-model="groupCondition"
            :conditions="(config.groupConditions?.conditions as IFitsGroupCondition[])" />
        <div class="table-wrap">
            <!-- 普通表格 -->
            <fits-common-table ref="commonTable" v-if="groupCondition === ''" :headers="config.headers"
                :data="tableData.TableList" @expand-change="emit('expandChange', $event)">
                <!-- 数据单元格插槽区 -->
                <template #default="scoped">
                    <slot :name="scoped.field" :row="scoped.row" :index="scoped.index" />
                </template>
                <!-- 暂无数据插槽区 -->
                <template #noData>
                    <slot name="noData" />
                </template>
            </fits-common-table>
            <!-- 分组表格 -->
            <fits-group-table ref="groupTables" v-else :headers="config.headers" :data="tableData.GroupTable"
                :default-expand-num="(config.expandGroupsNum as number)" @load-more="groupLoadMore"
                @expand-change="emit('expandChange', $event)">
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
                    <slot :name="data.field" :row="data.row" :index="data.index" :groupIndex="data.groupIndex" />
                </template>
                <!-- 暂无数据插槽区 -->
                <template #noData>
                    <slot name="noData" />
                </template>
            </fits-group-table>
        </div>
        <Pagination :total="tablePagination.total" v-model:page="tablePagination.pageIndex"
            v-model:limit="tablePagination.pageSize" @pagination="paginationChange" />
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref, toRefs, watch } from "vue";
import FitsCommonTable from "./components/FitsCommonTable/index.vue"
import FitsGroupConditions from "./components/FitsGroupConditions/index.vue"
import FitsGroupTable from "./components/FitsGroupTable/index.vue"
import { FitsTableProps, HttpType, ICustomColumnsConfig, IFistTableData, IFitsGroupCondition, IFitsLoadMoreParams, IFitsTableGroup } from "./type";
import { useColumns } from "./hooks/useColumns";
import { useCancelToken } from "./hooks/useCancelToken";
import _ from 'lodash';
import { ElMessage } from "element-plus";

const emit = defineEmits(["expandChange"])
const props = defineProps<{ config: FitsTableProps }>()
const state = reactive({
    groupCondition: props.config.groupConditions?.defaultChecked ?? "",
    tablePagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
    },
    tableData: {
        GroupTable: [],
        TableList: [],
        ItemCount: 0
    } as IFistTableData,
    isFirstRender: true
})
const { config } = toRefs(props)
const { groupCondition, tablePagination, tableData, isFirstRender } = toRefs(state)
const { newCancelToken, cancelTokens } = useCancelToken()
const groupTables = ref()
const commonTable = ref()

/**
 * 分组条件发生改变，请求接口（默认会先请求一遍接口）
 */
watch(groupCondition, () => {
    fetchTableData()
}, { immediate: true })

onActivated(() => {
    // 更新表格配置
    isFirstRender.value === false && updateColumns(useColumns(config.value.headers))
})

onMounted(() => {
    // 更新表格配置
    updateColumns(useColumns(config.value.headers))
    isFirstRender.value = false
})

onDeactivated(() => {
    cancelTokens()
})

onUnmounted(() => {
    cancelTokens()
})

/**
 * 页数页码改变，请求接口
 */
function paginationChange() {
    fetchTableData()
}

/**
 * 分组点击加载更多
 */
async function groupLoadMore(data: IFitsLoadMoreParams) {
    fetchTableData(data)
}

/**
 * 作用：等待取消接口在请求接口前执行
 * 原因：如果在同一时间内取消请求，然后立刻发起新的请求。他执行的顺序会先发起新的请求然后再去取消请求。
 * 所以我以为取消请求是会返回promise，但是并没有，所以也不知道取消请求是不是异步的。所以只能用这种方法，等待0秒，先执行完取消接口，在请求新接口
 */
async function awaitMoment(moment = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, moment);
    })
}

/**
 * 请求整个表格数据（后端将请求某个分组表格和请求整个表格都合并到同一个接口了）
 * @params groupParams 某个分组表格的请求参数（如果是某个分组加载更多，则必传）
 */
async function fetchTableData(groupParams?: IFitsLoadMoreParams) {
    cancelTokens()
    await awaitMoment()
    // 如果有groupParams表示是某个分组加载更多，不需要清空
    if (!groupParams) {
        tableData.value.GroupTable = []
        tableData.value.TableList = []
        await nextTick()
    }
    const defaultExpandGroupsNum = config.value.expandGroupsNum as number
    const _params = Object.assign({ GroupIndex: defaultExpandGroupsNum }, { GroupCondition: groupCondition.value, GroupValue: groupParams?.groupID || "" })
    const _pagingParams = groupParams ? groupParams.pagingParams : { pageIndex: tablePagination.value.pageIndex, pageSize: tablePagination.value.pageSize }
    if (!config.value.ajax?.query) return console.error("请传入query属性！")
    try {
        const httpType: HttpType = groupParams?.groupID ? "More" : "All"
        const res = await config.value.ajax.query({ page: _pagingParams, form: _params, httpType })
        // console.log(_params, _pagingParams);
        // console.log(res);
        if (groupParams) {
            // 有groupParams表示本次请求数据是某个分组点击加载更多，只需要更新对应分组表格的数据即可
            const groupTable = tableData.value.GroupTable.find(table => table.ID === groupParams?.groupID)
            if (groupTable) {
                const list = res?.result?.GroupTable[0]?.DataSource?.GroupList || []
                groupTable.DataSource.GroupList = list
            }
        } else {
            tablePagination.value.total = res?.result?.ItemCount || 0
            // 第一次请求整个页面分组表格数据，默认展开的分组接口第一次是会返回该分组的表格数据的（需要隐藏loading图标）。其余分组需要分段再次请求（不需要loading图标）
            if (groupCondition.value !== "") {
                const hideLoadingLength = Math.max(tableData.value.GroupTable.length, defaultExpandGroupsNum)
                tableData.value.GroupTable = (res?.result?.GroupTable || []).map((item: any, index: number) => {
                    if (index < hideLoadingLength) {
                        // 分组表格就根据这个字段来判断是否隐藏loading，true表示隐藏
                        item.hideLoading = true
                    }
                    return item
                })
                // 分段请求剩余的分组表格数据
                if (tableData.value.GroupTable.length > defaultExpandGroupsNum) {
                    fragmentFetch(_params)
                }
            } else {
                tableData.value.TableList = res?.result?.TableList || []
            }
        }
    } catch (error: any) {
        ElMessage.error(error)
    }
    await nextTick()
    // 每次请求都需要重新设置所有分组表格的列可见配置，不然列配置会对不上
    await updateColumns(useColumns(config.value.headers))
}

/**
 * 分段请求剩余分组表格
 */
async function fragmentFetch(params: any) {
    const defaultExpandGroupsNum = config.value.expandGroupsNum as number
    delete params.GroupIndex
    // 分组，然后请求（_.chunk是lodash库的方法）
    const idGroups = _.chunk(tableData.value.GroupTable.slice(defaultExpandGroupsNum), config.value.requestGroupNums).map(arr => {
        return arr.map(item => item.ID).join(",")
    })
    idGroups.forEach(async idStr => {
        params.GroupValue = idStr
        try {
            // 分组表格页码基数是10条数据
            const res = await config.value.ajax.query({
                page: { pageIndex: 1, pageSize: 10 },
                form: params,
                cancelToken: newCancelToken(),
                isLoading: false,
                httpType: "Fragment"
            })
            res?.result?.GroupTable?.forEach((groupTableData: IFitsTableGroup) => {
                // 找到自己的表格对象，然后赋值列表数据
                const _item = (tableData.value.GroupTable).find(table => table.ID === groupTableData.ID)
                if (_item) {
                    _item.hideLoading = true
                    _item.DataSource.GroupList = groupTableData.DataSource.GroupList || []
                }
            })
        } catch (error: any) {
            ElMessage.error(error)
        }
    })
}

/**
 * 更新列配置（自定义列）
 */
async function updateColumns(data: ICustomColumnsConfig[]) {
    await nextTick()
    // 更新普通表格
    commonTable.value?.updateColumns && (await commonTable.value?.updateColumns(data))
    // 更新分组表格
    groupTables.value?.updateColumns && (await groupTables.value?.updateColumns(data))
}

/**
 * 外部可以获取分组表格勾选的数据
 */
function getCheckGroupsData() {
    return groupTables.value?.getCheckGroupsData()
}

defineExpose({
    fetchTableData,
    getCheckGroupsData,
    updateColumns
})
</script>

<style lang="scss" scoped>
.fits-table {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    height: 100%;

    .table-wrap {
        flex: 1;
        overflow: hidden;

        // 普通表格和分组表格的公共样式
        :deep(.vxe-table) {
            font-family: Microsoft YaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #666666;

            // 因为设置vxe-table的loading为false没有效果（不需要loading），所以只能通过样式隐藏了
            .vxe-loading {
                display: none;
            }

            .vxe-table--border-line {
                border: none;
            }

            // 表头样式
            .vxe-table--header-wrapper {
                .vxe-body--x-space {
                    background: #f0f0f0;
                    margin-bottom: 0;
                }

                .vxe-header--column {
                    background-color: #fbfbfb;
                    padding: 6px 0;
                    font-family: SimSun;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 19px;
                    letter-spacing: 0px;
                    color: #999999;
                    border-right: 1px solid #f0f0f0;

                    &:nth-last-child(1) {
                        border: none;
                    }

                    .vxe-cell--checkbox {
                        .vxe-checkbox--icon {
                            font-size: 16px;
                            font-weight: initial;
                        }
                    }
                }
            }

            .no-data {
                margin: 30px 0;
                width: 125px;
            }

            .vxe-checkbox--icon {
                font-size: 16px;
                font-weight: normal;
            }

            .vxe-body--row {
                .vxe-cell {
                    .vxe-table--expanded {

                        // 解决官方bug：展开行后，收起图标未更换成展开图标
                        .vxe-table--expand-btn {
                            display: inline-block;
                        }
                    }
                }
            }

            .row--hover {
                background: #e2e9fc;
            }
        }
    }
}
</style>