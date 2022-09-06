<template>
    <div class="tree-search">
        <el-select ref="selectInputRef" v-bind='select' v-model="selectedValue" @visible-change="VisibleChange"
            @clear="clearSelected" :popper-class="`${select?.popperClass} tree-popper`" @remove-tag="RemoveTag">
            <template #empty>
                <el-scrollbar class="tree-scrollbar" max-height="30vh">
                    <div class="custom-tree">
                        <el-input v-bind='input?.elementProps' v-model="filterText" class="filterInput"
                            v-show="input?.show" />
                        <el-tree ref="treeRef" :highlightCurrent="true" :filter-node-method="filterNode" v-bind='tree'
                            @node-click="nodeClick" @check="Check" class="tree" />
                    </div>
                </el-scrollbar>
            </template>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs, watch, useAttrs, nextTick } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'
import { FitsTreeSelectModel } from './model';

const props = withDefaults(defineProps<{
    options: FitsTreeSelectModel
}>(), {
    options: () => new FitsTreeSelectModel(),
})

const { input, select, tree }: any = toRefs(props.options)

const emit = defineEmits(["update:modelValue"])

const state = reactive({
    selectedValue: '',
    filterText: '',
    isMultiple: false
})
const { selectedValue, filterText, isMultiple }: any = toRefs(state);

const _attrs: any = useAttrs()

const treeRef = ref()
const selectInputRef = ref()

defineExpose({
    treeRef
})

watch(() => _attrs.modelValue, (val: any) => {
    console.log('modelValue');
    initValue(val)
})

watch(filterText, (val: string) => {
    treeRef.value.filter(val)
})

onMounted(() => {
    isMultiple.value = select.value.multiple
    initValue(_attrs.modelValue)
})

function initValue(val: string) {
    if (!val?.length) return
    // 单选
    if (!isMultiple.value) {
        treeRef.value.setCurrentKey(val)
        selectedValue.value = treeRef.value.getNode(val)?.label
        emit('update:modelValue', val)
    } else {
        // 多选
        treeRef.value.setCheckedKeys(val)
        selectedValue.value = []
        treeRef.value.getCheckedNodes(true).map((item: any) => selectedValue.value.push(item.label))
        emit('update:modelValue', treeRef.value.getCheckedKeys(true))
    }
}

// 下拉框打开/关闭的时候清空内部输入框的值，恢复所有下拉数据
function VisibleChange(val: boolean) {
    filterText.value = ''
    treeRef.value?.filter('')
}

function clearSelected() {
    // 单选
    if (!isMultiple.value) {
        treeRef.value.setCurrentKey(null)
    } else {
        // 多选
        treeRef.value.setCheckedKeys([])
    }
    emit('update:modelValue', '')
}

function filterNode(value: string, data: TreeNodeData, node: Node) {
    if (!value) return true
    return data[(node.store.props.label as string)].includes(value)
}

function nodeClick(node: TreeNodeData, option: Node, event: any) {
    if (tree.value.showCheckbox) return
    if (option.isLeaf) {
        selectedValue.value = node[event.props.props.label]
        selectInputRef.value.blur()
        emit('update:modelValue', node.id)
    }
}

/**
 * @desc 复选框被点击触发的事件
 * 传递给 data 属性的数组中该节点所对应的对象、
 * 树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
 */
function Check(obj: any, treeObj: any) {
    const index = selectedValue.value.indexOf(obj.label)
    // 取消勾选
    if (index !== -1) {
        selectedValue.value.splice(index, 1)
    } else {
        // 勾选
        const leafArr = treeObj.checkedNodes.filter((item: any) => !item['children'])
        selectedValue.value = []
        leafArr.map((item: any) => selectedValue.value.push(item.label))
    }
    emit('update:modelValue', treeRef.value.getCheckedKeys(true))
}

/**
 * @desc 多选模式下取消勾选
 */
function RemoveTag(val: any) {
    const checkNodes = treeRef.value.getCheckedNodes(true)
    // 找到一样内容的节点，取消它的勾选
    const removeNode = checkNodes.find((item: any) => item.label === val)
    treeRef.value.setChecked(removeNode.id, false)
    emit('update:modelValue', treeRef.value.getCheckedKeys(true))
}

</script>

<style lang="scss" scoped>
.tree-search {
    width: 100%;
}

.custom-tree {
    padding: 10px;
    display: inline-block;
    min-width: 100%;
    box-sizing: border-box;

    .el-tree {
        color: #333333;
        margin-top: 8px;
    }
}
</style>

<style lang="scss">
.custom-tree {

    .el-checkbox+.el-tree-node__label {
        margin-left: 0 !important;
    }

    .el-checkbox+i {
        width: 12px !important;
    }

    .el-checkbox {
        margin-left: 5px !important;
    }

    .el-tree>.el-tree-node>.el-tree-node__content {
        padding-left: 8px !important;
    }

    .el-tree-node__content {
        height: 32px;
    }

    .el-tree-node__label {
        // margin-left: 8px;
    }

    .el-tree-node__expand-icon {
        padding: 0;
    }

    .el-input__wrapper,
    .el-input__inner {
        cursor: pointer;
    }

    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background-color: #d9edff;
    }

    .filterInput {

        .el-input__wrapper,
        .el-input__inner {
            border-radius: 2px;
        }
    }

    .is-leaf .el-tree-node__content {
        i {
            // width: 0;
        }

        .el-tree-node__label {
            margin-left: 20px;
        }
    }
}
</style>