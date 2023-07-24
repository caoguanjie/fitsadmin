<template>
    <div class="customWrap">
        <el-popover ref="popover" trigger="click" :teleported="false" placement="bottom-start" :hide-after="0"
            @before-enter="popoverShow">
            <template #reference>
                <div class="customTable">自定义表格</div>
            </template>
            <div class="dropdownMenu">
                <div class="title">自定义表格列</div>
                <template v-if="customTableCols.length > 0">
                    <el-scrollbar height="300px">
                        <vue-draggable-next v-model="customTableCols" handle=".sortColsHandle">
                            <transition-group>
                                <div v-for="col in customTableCols" :key="((col.field || col.type) as string)"
                                    class="columnItem">
                                    <el-checkbox v-model="col.visible" :label="col.title || ''" />
                                    <img :src=Sort width="14" height="14" alt="" class="sortColsHandle">
                                </div>
                            </transition-group>
                        </vue-draggable-next>
                    </el-scrollbar>
                    <div class="btns">
                        <div @click="updateCols">确认</div>
                        <div @click="closePopover">取消</div>
                    </div>
                </template>
                <div v-else>暂无数据</div>
            </div>
        </el-popover>
    </div>
</template>

<script lang="ts" setup name="CustomColumns">
import { reactive, ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { VueDraggableNext } from 'vue-draggable-next'
import { CreateStorage } from '@/utils/storage/index';
import { IFitsTableHeaders } from '../type';
import { useColumns } from '../hooks/useColumns';
import { ElMessage } from 'element-plus';
import Sort from '@/assets/group-table/sort.png'
const emit = defineEmits(["updateTableColumns"])
const props = defineProps<{ headers: IFitsTableHeaders[] }>()
const state = reactive({
    customTableCols: [] as IFitsTableHeaders[],
    lastColsConfig: [] as IFitsTableHeaders[], // 因为拖拽插件是v-model的，需要一个变量保存上一次的配置，只有点击确定才修改
    storage: new CreateStorage("Fits_Table_Columns")
})
const { customTableCols, lastColsConfig, storage } = toRefs(state)
const popover = ref()
const route = useRoute()

watch(() => props.headers, val => {
    if (val && val.length > 0) {
        customTableCols.value = JSON.parse(JSON.stringify(useColumns(val, String(route.name))))
        lastColsConfig.value = JSON.parse(JSON.stringify(useColumns(val, String(route.name))))
    }
}, { deep: true, immediate: true })

/**
 * 更新表格显示列配置
 */
function updateCols() {
    const hasVisible = customTableCols.value.some(item => item.visible)
    if (!hasVisible) return ElMessage.warning("至少显示一列")
    storageVisibleColsConfig()
    storageSortColsConfig()
    lastColsConfig.value = JSON.parse(JSON.stringify(customTableCols.value))
    emit("updateTableColumns", JSON.parse(JSON.stringify(customTableCols.value)))
    closePopover()
}

/**
 * 存储列是否显示配置（因为vxe-table的自定义列不能自定义样式，所以就自己做的持久化存储）
 */
function storageVisibleColsConfig() {
    const visibleColumns = customTableCols.value.map(item => ({ field: item.field, type: item.type, visible: item.visible }))
    storage.value.set(`${String(route.name)}_Visible`, visibleColumns, null)
}

/**
 * 存储列排序配置
 */
function storageSortColsConfig() {
    const colsSort = customTableCols.value.map((item, index) => ({ field: item.field, type: item.type, sort: index }))
    storage.value.set(`${String(route.name)}_Sort`, colsSort, null)
}

/**
 * 关闭自定义列弹窗
 */
function closePopover() {
    popover.value?.hide()
}

/**
 * 监听popover弹窗打开事件
 */
function popoverShow() {
    customTableCols.value = JSON.parse(JSON.stringify(lastColsConfig.value))
}
</script>

<style lang="scss" scoped>
.customWrap {
    .customTable {
        background-color: #ffffff;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        color: #6b9edd;
        height: 32px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        font-family: SimSun;
        margin-right: 20px;
        cursor: pointer;
    }

    :deep(.el-popover) {
        padding: 0 !important;
        width: 300px !important;
        user-select: none;

        .dropdownMenu {
            padding: 20px;
            font-family: SimSun;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 0px;
            color: #666666;
            display: flex;
            flex-direction: column;

            .el-scrollbar__view {
                display: flex;
                flex-direction: column;
            }

            .title {
                font-size: 16px;
                margin-bottom: 10px;
            }

            .el-scrollbar {
                margin-bottom: 10px;

                .el-scrollbar__view {
                    display: flex;
                    flex-direction: column;

                    .columnItem {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border: 1px solid #f2f2f2;
                        padding: 8px 20px;
                        margin: 0 0 6px 0;

                        .el-checkbox {
                            height: auto;
                            margin-right: 20px;

                            .el-checkbox__label {
                                font-size: 14px;
                                line-height: 18px;
                                white-space: pre-wrap;
                            }
                        }

                        .sortColsHandle {
                            cursor: pointer;
                        }
                    }
                }
            }

            .btns {
                display: flex;
                align-items: center;
                justify-content: center;

                div {
                    padding: 8px 36px;
                    background-color: #6b9edd;
                    border-radius: 2px;
                    font-size: 14px;
                    line-height: 19px;
                    color: #ffffff;
                    white-space: nowrap;
                    cursor: pointer;

                    &:nth-child(2) {
                        border: solid 1px #f0f0f0;
                        background-color: #ffffff;
                        color: #666666;
                        margin-left: 20px;
                    }
                }
            }
        }
    }
}
</style>