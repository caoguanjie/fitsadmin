<template>
    <div class="tree-search">
        <el-select ref="selectInputRef" v-bind='select' v-model="selectedValue" :filter-method="filterMethod"
            @visible-change="VisibleChange" @clear="clearSelected" :popper-class="`${select?.popperClass} tree-popper`">
            <template #empty>
                <el-scrollbar class="tree-scrollbar">
                    <div class="custom-tree">
                        <el-input v-bind='input?.elementProps' v-model="filterText" class="filterInput"
                            v-show="input?.show" />
                        <el-tree ref="treeRef" highlightCurrent :filter-node-method="filterNode" v-bind='tree'
                            @node-click="nodeClick" @check="Check" class="tree" />
                    </div>
                </el-scrollbar>
            </template>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'
import { FitsTreeSelectModel } from './model';

const props = withDefaults(defineProps<{ options: FitsTreeSelectModel }>(), {
    options: () => new FitsTreeSelectModel(),
})
const { input, select, tree, modelValue } = toRefs(props.options)

const emit = defineEmits(["update:modelValue"])

const state = reactive({
    selectedValue: '',
    filterText: '',
    nodeId: ''
})
const { selectedValue, filterText, nodeId } = toRefs(state);

const treeRef = ref()
const selectInputRef = ref()

defineExpose({
    treeRef
})

watch(filterText, (val: string) => {
    treeRef.value?.filter(val)
})

watch(() => modelValue?.value, (val: any) => {
    initValue(val)
})

onMounted(() => {
    initValue(modelValue?.value)
})

function initValue(val: any) {
    if (val && !selectedValue.value) {
        treeRef.value.setCurrentKey(val)
        selectedValue.value = treeRef.value.getNode(val)?.label
    }
}

// 下拉框打开/关闭的时候清空内部输入框的值，恢复所有下拉数据
function VisibleChange() {
    filterText.value = ''
    treeRef.value?.filter('')
}

function clearSelected() {
    treeRef.value.setCurrentKey(null)
}

function filterMethod(value: string) {
    treeRef.value?.filter(value)
}

function filterNode(value: string, data: TreeNodeData, node: Node) {
    if (!value) return true
    return data[(node.store.props.label as string)].includes(value)
}

function nodeClick(node: TreeNodeData, option: Node, event: any) {
    if (tree.value.showCheckbox) return
    if (option.isLeaf) {
        // 把值放进输入框，关闭下拉
        selectInputRef.value.blur()
        emit("update:modelValue", node.id);
        nodeId.value = node.id
        selectedValue.value = node[event.props.props.label]
    }
}

/**
 * @desc 复选框被点击触发的事件
 * 传递给 data 属性的数组中该节点所对应的对象、
 * 树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
 */
function Check(obj: any, checkedObj: any) {
    const arrNames: any = []
    const arr = checkedObj.checkedNodes.filter((item: any) => !item['children'])
    arr.map((item: any) => arrNames.push(item.label))
    selectedValue.value = arrNames
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
            border-radius: 0;
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