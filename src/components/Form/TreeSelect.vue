<template>
    <div class="tree-search">
        <el-select v-model="selectedValue" ref="selectInput" v-bind='$attrs.selectInput' :filter-method="filterMethod"
            @visible-change="VisibleChange" :fit-input-width="true"
            :popper-class="($attrs.selectInput as any)?.popperClass ? ($attrs.selectInput as any)?.popperClass + ' tree-popper' : 'tree-popper'">
            <template #empty>
                <el-scrollbar class="tree-scrollbar">
                    <div class="custom-tree">
                        <el-input v-model="filterText" v-bind='$attrs.filterInput' class="filterInput"
                            v-show="($attrs.filterInput as any)?.show" />
                        <el-tree ref="treeRef" :filter-node-method="filterNode" :highlight-current="true"
                            @node-click="nodeClick" v-bind='$attrs.tree' class="tree"
                            :props="{ ...defaultProps, ...($attrs.tree as any)?.props }" />
                    </div>
                </el-scrollbar>
            </template>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'

const state = reactive({
    selectedValue: '',
    filterText: ''
})
const { selectedValue, filterText } = toRefs(state);

const treeRef = ref()
const selectInput = ref()

const emit = defineEmits(["update:modelValue"])

const props = withDefaults(defineProps<{
    modelValue: any
}>(), {
    modelValue: ''
})

defineExpose({
    treeRef
})

const defaultProps = {
    class: customNodeClass,
    label: "label",
    children: "children",
}

watch(filterText, (val: string) => {
    treeRef.value?.filter(val)
})

watch(() => props.modelValue, (val: string) => {
    initValue(val)
})

onMounted(() => {
    initValue(props.modelValue)
})

function initValue(val: any) {
    if (val && !selectedValue.value) {
        treeRef.value.setCurrentKey(val)
        selectedValue.value = treeRef.value.getNode(val)?.label
    }
}

function customNodeClass(data: TreeNodeData, node: Node) {
    if (node.isLeaf) {
        return 'is-leaf'
    }
    return null
}

// 下拉框打开/关闭的时候清空内部输入框的值，恢复所有下拉数据
function VisibleChange() {
    filterText.value = ''
    treeRef.value?.filter('')
}

function filterNode(value: string, data: TreeNodeData, node: Node) {
    if (!value) return true
    return data[(node.store.props.label as string)].includes(value)
}

function filterMethod(value: string) {
    treeRef.value?.filter(value)
}

function nodeClick(node: TreeNodeData, option: Node, event: any) {
    if (option.isLeaf) {
        // 把值放进输入框，关闭下拉
        selectInput.value.blur()
        emit("update:modelValue", node.id);
        selectedValue.value = node[event.props.props.label]
    }
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
.tree-popper {
    .el-scrollbar__wrap {
        max-height: 30vh;
    }
}

.custom-tree {

    .el-tree>.el-tree-node>.el-tree-node__content {
        padding-left: 8px !important;
    }

    .el-tree-node__content {
        height: 32px;
    }

    .el-tree-node__label {
        margin-left: 8px;
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
            width: 0;
        }

        .el-tree-node__label {
            margin-left: 20px;
        }
    }
}
</style>