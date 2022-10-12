<template>
    <el-tooltip class="box-item" effect="dark" :content="props.msg" :placement="data.placement" :hide-after="0">
        <vxe-button icon="vxe-icon-custom-column" ref="buttonRef" v-click-outside="onClickOutside" />
    </el-tooltip>

    <el-popover ref="popoverRef" :virtual-ref="buttonRef" popper-class="toolsPoper" trigger="click" virtual-triggering
        width="200px">
        <el-scrollbar max-height="500px">
            <el-checkbox-group v-model="data.checkedList" @change="handleCheckChange">
                <vue-draggable-next class="dragArea list-group w-full" :list="data.columns" @change="changeColumns"
                    :move="checkMove" @start="data.dragging = true" @end="data.dragging = false" ghost-class="ghost">
                    <transition-group name="flip-list">
                        <template v-for="element in data.columns" :key="element.field">
                            <el-checkbox :label="element.field" :disabled="handleCheckAndOperation(element)">
                                <div class="label">{{element.title}} </div>
                                <svg-icon icon-class="draggable" v-if="!handleCheckAndOperation(element)" />
                            </el-checkbox>
                        </template>
                    </transition-group>
                </vue-draggable-next>
            </el-checkbox-group>

        </el-scrollbar>
        <div class="popover-footer">
            <el-checkbox v-model="data.checkAll" :indeterminate="data.isIndeterminate" @change="handleCheckAllChange">全选
            </el-checkbox>
            <vxe-button type="text" status="primary" class="vxebtn" content="恢复预设" @click="resetColumn" />
        </div>
    </el-popover>
</template>

<script lang='ts' setup>
import { VxeButton, VxeGridConstructor, VxeTableDefines } from 'vxe-table'
import { CheckboxValueType, ClickOutside as vClickOutside } from 'element-plus'
import { VueDraggableNext } from 'vue-draggable-next'
import eventBus from '@/utils/base/EventBus';

const props = defineProps<{
    // 自定义提示信息
    msg?: string,
    // 表格公共的api
    grid: VxeGridConstructor
}>()
const data = reactive({
    columns: [] as VxeTableDefines.ColumnInfo[],
    checkedList: [] as any,
    checkAll: false,
    isIndeterminate: false,
    dragging: false,
    placement: "top" as any

})
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}
function changeColumns() {
    props.grid.reloadColumn(data.columns)
}

onMounted(() => {
    eventBus.on('IsShowSearchForm', (isShowSearchForm: boolean) => {
        data.placement = isShowSearchForm ? 'top' : 'bottom'
    })
    setTimeout(() => {
        nextTick(() => {
            console.error(props.grid)
            // 获取所有列数据
            initColumn();
        })
    }, 100)
})

/**
 * 初始化列的配置项
 */
function initColumn() {
    const _checkedList: string[] = []
    data.columns = [...props.grid.getTableColumn().fullColumn]
    data.columns.forEach((item: VxeTableDefines.ColumnInfo) => {
        if (item.visible) {
            _checkedList.push(item.field)
        }
    })
    data.checkedList = [..._checkedList]
    // 全选状态
    data.checkAll = data.checkedList.length === data.columns.length
    data.isIndeterminate = false;
}


// 全选
function handleCheckAllChange(val: CheckboxValueType) {
    const allCheckedList = data.columns.map((item) => item.field)
    // 非全选
    const _checkedList = data.columns.map((item) => handleCheckAndOperation(item) && item.field)
    data.checkedList = val ? allCheckedList : _checkedList
    data.isIndeterminate = false
    // 重新刷新表格的列
    refreshColumn()
}
// 处理每个复选框的变化
function handleCheckChange(value: CheckboxValueType[]) {
    console.log(value)
    const checkedCount = value.length
    data.checkAll = checkedCount === data.columns.length
    data.isIndeterminate = checkedCount > 0 && checkedCount < data.columns.length;
    // 重新刷新表格的列
    refreshColumn()
}
// 重置自定义列，恢复全选
function resetColumn() {
    props.grid.resetColumn();
    initColumn()
}
// 刷新列的配置项
function refreshColumn() {
    data.columns.forEach((item: VxeTableDefines.ColumnInfo) => {
        if (handleCheckAndOperation(item)) {
            item.visible = true;
        } else {
            item.visible = data.checkedList.includes(item.field)
        }
    })
    props.grid.refreshColumn();
}

/**
 * 检查是否可以移动
 * @param evt 
 */
function checkMove(evt: any) {
    return !handleCheckAndOperation(evt.draggedContext.element)
}
/**
 * 处理操作列和复选框的判断
 */
function handleCheckAndOperation(item: VxeTableDefines.ColumnInfo) {
    return item.field === undefined || ['Checkbox', 'Operation'].includes(item.field)
}
</script>
<style lang='scss' scoped>
.ghost {
    background: #e4e7ed;
}

.flip-list-move {
    transition: transform 0.3s;
}

.no-move {
    transition: transform 0s;
}

.popover-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: 40px;
    background-color: #f4f4f5;

    & .el-checkbox {
        padding: 0;
    }

    .vxebtn {
        margin-right: -7px;
    }
}

:deep(.el-checkbox) {
    display: flex;
    margin: 0;
    padding: 0 16px;

    & .el-checkbox__label {
        display: flex;
        width: 100%;

        .label {
            flex: 1;
        }

        .svg-icon {
            color: #ccc;
        }
    }
}
</style>
<style lang='scss'>
.toolsPoper {
    --el-popover-padding: 16px 0 45px;
}
</style>