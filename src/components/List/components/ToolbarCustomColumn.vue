<template>
    <el-tooltip class="box-item" effect="dark" :content="props.msg" :placement="data.placement" :hide-after="0">
        <vxe-button icon="vxe-icon-custom-column" ref="buttonRef" v-click-outside="onClickOutside" v-bind="$attrs"
            @click="handleClick()" />
    </el-tooltip>

    <el-popover ref="popoverRef" :virtual-ref="buttonRef" popper-class="toolsPoper" trigger="click" virtual-triggering
        width="200px" v-bind="$attrs" @before-leave="closeWindow">
        <el-scrollbar max-height="500px">
            <el-tree ref="treeRef" :data="data.columns" draggable class="columnBox" show-checkbox default-expand-all
                :expand-on-click-node="false" node-key="field" highlight-current :props="defaultProps"
                :check-on-click-node="true" @check="handleCheckChange" @check-change="dragingCheckChange"
                :allow-drag="allowDrag" :allow-drop="allowDrog" @node-drop="nodeDropSuccess">
                <template #default="{ node, data }">
                    <div class="custom-column-node">
                        <div class="label">{{node.label}} </div>
                        <svg-icon icon-class="draggable" v-if="!handleCheckAndOperation(data)" />
                    </div>
                </template>
            </el-tree>
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
import { CheckboxValueType, ClickOutside as vClickOutside, ElMessage, ElTree } from 'element-plus'
import eventBus from '@/utils/base/EventBus';
import XEUtils from 'xe-utils';
import { AllowDropType } from 'element-plus/es/components/tree/src/tree.type';
import type Node from 'element-plus/es/components/tree/src/model/node'




const props = defineProps<{
    // 自定义提示信息
    msg?: string,
    event: any,
    // 表格公共的api
    grid: VxeGridConstructor
}>()
const isFullscreen = ref(false)
const isShowSearchForm = ref(props.grid.props.formConfig ? true : false)
// 恢复预设的值
let recoveryData: VxeTableDefines.ColumnInfo[] = []
const data = reactive({
    columns: [] as VxeTableDefines.ColumnInfo[],
    checkedList: [] as any,
    disabledcheckedList: [] as any,
    checkAll: false,
    allCheckIDArray: [] as string[],
    isIndeterminate: false,
    dragging: false,
    isDragging: false,
    placement: "top" as any,
})
const defaultProps = {
    children: 'children',
    label: 'title',
    disabled: 'disabled',
}
const treeRef = ref<InstanceType<typeof ElTree>>()

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}

const emit = defineEmits(['CustomColumnData'])


onMounted(() => {
    eventBus.on('IsShowSearchForm', (_isShowSearchForm: boolean) => {
        isShowSearchForm.value = _isShowSearchForm
        data.placement = isFullscreen.value && !isShowSearchForm.value ? 'bottom' : 'top'
    })
    eventBus.on('isFullscreen', () => {
        isFullscreen.value = !isFullscreen.value
        data.placement = isFullscreen.value && !isShowSearchForm.value ? 'bottom' : 'top'
    })
    setTimeout(() => {
        nextTick(() => {
            // 保存需要恢复的队列
            recoveryData = XEUtils.clone(props.grid.getTableColumn().collectColumn)
        })
    }, 50)
})

function handleClick() {
    initColumn(props.event.geCustomColumnData())
}

/**
 * 初始化列的配置项
 */
function initColumn(customColumnArray: VxeTableDefines.ColumnInfo[] = []) {
    const _checkedList: string[] = []
    data.columns = customColumnArray.length ? customColumnArray : XEUtils.clone(props.grid.getTableColumn().collectColumn, true)
    const allCheckIDArray: string[] = []
    const disabledcheckedList: string[] = []
    let num = 0;
    XEUtils.eachTree(data.columns, (item: VxeTableDefines.ColumnInfo) => {
        if (item.visible) {
            if (!XEUtils.has(item, 'children')) {
                _checkedList.push(item.field)
            }
            num++
        }
        if (handleCheckAndOperation(item)) {
            disabledcheckedList.push(item.field)
        }
        allCheckIDArray.push(item.field)

    })

    // 转换数据源中的disabled，不可以点击的节点
    XEUtils.eachTree(data.columns, (item: VxeTableDefines.ColumnInfo) => {
        item.disabled = handleCheckAndOperation(item)
    })


    // 选中的数组
    data.checkedList = [..._checkedList]
    // 全选的数组
    data.allCheckIDArray = [...allCheckIDArray]
    // 不能选择的数组
    data.disabledcheckedList = [...disabledcheckedList]

    treeRef.value?.setCheckedKeys(_checkedList)
    // 全选状态
    data.checkAll = num === data.allCheckIDArray.length
    data.isIndeterminate = !data.checkAll;
}



// 全选
function handleCheckAllChange(isAllCheck: CheckboxValueType) {

    isAllCheck ? treeRef.value?.setCheckedKeys(data.allCheckIDArray) : treeRef.value?.setCheckedKeys(data.disabledcheckedList)
    if (!isAllCheck) {
        const getCheckedKeys: any[] = treeRef.value?.getCheckedKeys() ?? []
        const checkedCount = getCheckedKeys.length
        if (checkedCount === 0) {
            ElMessage.error('至少保留一列数据')
            treeRef.value?.setCheckedKeys(data.allCheckIDArray)
            data.checkAll = true
            data.isIndeterminate = false
            return
        }
    } else {
        data.checkAll = true
        data.isIndeterminate = false
    }
    // 重新刷新表格的列
    refreshColumn()
}
// 单选， 点击每个复选框的变化
function handleCheckChange(node: any) {
    const getCheckedKeys: any[] = treeRef.value?.getCheckedKeys() ?? []
    const checkedCount = getCheckedKeys.length
    if (checkedCount === 0) {
        ElMessage.error('至少保留一列数据')
        treeRef.value?.setChecked(node.field, true, false)
        return
    }
    data.checkAll = checkedCount === data.allCheckIDArray.length
    data.isIndeterminate = checkedCount > 0 && checkedCount < data.allCheckIDArray.length;
    // // 重新刷新表格的列
    refreshColumn()
}

// 重置自定义列，恢复全选
function resetColumn() {
    initColumn(recoveryData)
    props.grid.reloadColumn(recoveryData);
}

// 刷新列的配置项
function refreshColumn() {
    const getCheckedKeys: any[] = treeRef.value?.getCheckedKeys() ?? [];
    XEUtils.eachTree(data.columns, (item: VxeTableDefines.ColumnInfo) => {
        item.visible = XEUtils.has(item, 'field') && getCheckedKeys.includes(item.field)
    })
    props.grid.reloadColumn(data.columns);
}

/**
 * 判断节点能否被拖拽 如果返回 false ，节点不能被拖动
 * @param draggingNode {type: Node}
 */
function allowDrag(draggingNode: any) {
    return !handleCheckAndOperation(draggingNode.data)
}
/**
 * 拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 
 * @param draggingNode 
 * @param dropNode 
 * @param type 
 */
function allowDrog(draggingNode: Node, dropNode: Node, type: AllowDropType) {
    data.isDragging = true;
    // 不能插入到其他子节点，不同级别的不能移动
    return type !== 'inner' && draggingNode.level === dropNode.level && !handleCheckAndOperation(draggingNode.data as any) && !handleCheckAndOperation(dropNode.data as any)
}
// 拖拽成功后的回调事件
function nodeDropSuccess() {
    props.grid.reloadColumn(data.columns);
}
// 处理拖拽过程中，拖动的节点被取消选中的bug
function dragingCheckChange(node: VxeTableDefines.ColumnInfo) {
    if (data.isDragging) {
        treeRef.value?.setChecked(node.field, true, true)
        data.isDragging = false
    }
}



/**
 * 处理操作列和复选框的判断
 */
function handleCheckAndOperation(item: VxeTableDefines.ColumnInfo) {
    const target = JSON.parse(JSON.stringify(['Checkbox', 'Operation', 'Index']).toLocaleLowerCase())
    return item.field === undefined || target.includes(item.field.toLocaleLowerCase())
}

function closeWindow() {
    emit('CustomColumnData', data.columns)
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

.columnBox {
    padding: 0 16px;
}

:deep(.el-tree-node__content>.el-tree-node__expand-icon) {
    display: none;
}

.custom-column-node {
    display: flex;
    width: 100%;

    & .label {
        flex: 1;
    }

    .svg-icon {
        color: #ccc;
    }
}
</style>
<style lang='scss'>
.toolsPoper {
    --el-popover-padding: 16px 0 45px;
}
</style>