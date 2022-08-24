<template>
    <div class="tree-search">
        <el-select v-model="selectedValue" ref="selectInput" :filter-method="filterMethod" v-bind='$attrs.selectInput'
            @visible-change="VisibleChange" :fit-input-width="true"
            :popper-class="($attrs.selectInput as any)?.popperClass ? `${($attrs.selectInput as any)?.popperClass} tree-popper` : `tree-popper`"
            @clear="clearSelected">
            <template #empty>
                <el-scrollbar class="tree-scrollbar">
                    <div class="custom-tree">
                        <el-input v-model="filterText" placeholder="请输入关键词" v-bind='$attrs.filterInput'
                            class="filterInput" v-show="($attrs.filterInput as any)?.show" />
                        <el-tree ref="treeRef" :filter-node-method="filterNode" :highlight-current="true"
                            @node-click="nodeClick" @check="Check" v-bind='$attrs.tree' class="tree"
                            :props="{ ...defaultProps, ...($attrs.tree as any)?.props }">
                        </el-tree>
                    </div>
                </el-scrollbar>
            </template>
            <!-- <template v-for="(index, name) in $slots" v-slot:[name]>
                <slot :name="name"></slot>
            </template> -->
        </el-select>
    </div>
</template>

<script lang="ts">
/**
 * 内部过滤输入框的配置
 */
export interface FilterInput extends InputProps {
    /**
     * @description 是否显示内部的过滤输入框，非必填
     * @default {false}
     */
    show?: boolean
}

interface TreeSelectInput {
    /**
     * @description 是否禁用树下拉筛选组件
     */
    disabled: boolean
    /**
     * @description 选择输入框的尺寸
     * @default {'default'}
     */
    size: 'large' | 'default' | 'small',
    /**
     * @description 是否可以清空选项
     * @default {false}
     */
    clearable: boolean
}

/**
 * 下拉筛选树的配置
 */
export interface FitsTreeSelect {
    /**
     * @description 树默认选中值的key
     */
    modelValue?: string | number
    /**
     * @description 外部下拉输入框的配置
     */
    selectInput: TreeSelectInput
    /**
     * @description 内部过滤输入框的配置
     */
    filterInput: FilterInput
    /**
     * @description 树组件的配置
     */
    tree: TreeComponentProps
}

</script>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { InputProps, ISelectProps } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { TreeComponentProps, TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'
import { useAttrs } from 'vue'

const attrs: any = useAttrs()

const emit = defineEmits(["update:modelValue"])

const props = defineProps({
    modelValue: {
        required: false
    }
})

const state = reactive({
    selectedValue: '',
    filterText: '',
    nodeId: ''
})
const { selectedValue, filterText, nodeId } = toRefs(state);

const treeRef = ref()
const selectInput = ref()

defineExpose({
    treeRef
})

const defaultProps = {
    // class: customNodeClass,
    label: "label",
    children: "children",
    disabled: 'disabled'
}

watch(filterText, (val: string) => {
    treeRef.value?.filter(val)
})

watch(() => props.modelValue, (val: any) => {
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

function clearSelected() {
    treeRef.value.setCurrentKey(null)
}

function filterNode(value: string, data: TreeNodeData, node: Node) {
    if (!value) return true
    return data[(node.store.props.label as string)].includes(value)
}

function filterMethod(value: string) {
    treeRef.value?.filter(value)
}

function nodeClick(node: TreeNodeData, option: Node, event: any) {
    if (attrs.tree.showCheckbox && option.disabled) return
    if (option.isLeaf) {
        // 把值放进输入框，关闭下拉
        selectInput.value.blur()
        emit("update:modelValue", node.id);
        console.log(node.id);

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
    console.log(obj, checkedObj);
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
        // max-height: 30vh;
    }
}

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