<template>
    <div class="tree-search">
        <el-select v-bind='options.select' ref="selectInputRef" v-model="selectedValue" @visible-change="VisibleChange"
            @clear="clearSelected" :popper-class="`${options.select?.popperClass} tree-popper`" @remove-tag="RemoveTag">
            <template #empty>
                <div style="padding: 10px;">
                    <el-input placeholder="请输入关键字" v-bind='options.input' v-model="filterText" class="filterInput" />
                    <el-scrollbar max-height="30vh">
                        <div class="CustomTree">
                            <el-tree ref="treeRef" :highlightCurrent="true" :filter-node-method="filterNode"
                                empty-text="暂无数据" v-bind='options.tree' :expand-on-click-node="expandNode"
                                @node-click="nodeClick" @check="Check" :indent="8" />
                        </div>
                    </el-scrollbar>
                </div>
            </template>
        </el-select>
    </div>
</template>

<script lang="ts" setup name="FitsTreeSelect">
import type Node from 'element-plus/es/components/tree/src/model/node'
import { FitsTreeSelectModel } from './select';
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import { onMounted, reactive, ref, toRefs, useAttrs, watch } from 'vue';

const props = withDefaults(defineProps<{
    options: FitsTreeSelectModel
}>(), {
    options: () => new FitsTreeSelectModel(),
})

// 不结构options，是因为toRefs只能接收响应式对象，不能是普通对象。浏览器会警告
const { options }: any = toRefs(props)

const emit = defineEmits(["update:modelValue"])

const state = reactive({
    filterText: '',
    isMultiple: options.value.select.multiple,
    expandNode: options.value.tree.showCheckbox ? !options.value.tree.checkOnClickNode : !options.value.tree.checkStrictly
})
const { filterText, isMultiple, expandNode }: any = toRefs(state);

const selectedValue: any = isMultiple.value ? ref([]) : ref('')

const _attrs: any = useAttrs()
const treeRef = ref()
const selectInputRef = ref()

defineExpose({
    treeRef
})

watch(() => _attrs.modelValue, (val: any) => {
    if (!val?.length) {
        selectedValue.value = val
        return
    }
    initValue(val)
})

watch(filterText, (val: string) => {
    treeRef.value.filter(val)
})

onMounted(() => {
    initValue(_attrs.modelValue)
})

function initValue(val: string) {
    if (!val || !val?.length) return
    // 单选
    if (!isMultiple.value) {
        treeRef.value.setCurrentKey(val)
        selectedValue.value = treeRef.value.getNode(val)?.label
        emit('update:modelValue', val)
    } else {
        // 多选，如果多选只传了字符串类型，需要做兼容
        let arr = []
        arr = typeof val === 'string' ? [val] : val
        treeRef.value.setCheckedKeys(arr)
        selectedValue.value = []
        treeRef.value.getCheckedNodes(true).map((item: any) => selectedValue.value.push(item.label))
        emit('update:modelValue', treeRef.value.getCheckedKeys(true))
    }
}

// 下拉框打开/关闭的时候清空内部输入框的值，恢复所有下拉数据
function VisibleChange() {
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
    // 多选
    if (options.value.tree.showCheckbox) {
        return
    }
    const isCheckStrictly = options.value.tree.checkStrictly
    if ((option.isLeaf && !isCheckStrictly) || isCheckStrictly) {
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

    .el-select {
        width: 100%;
    }
}

.CustomTree {
    // padding: 0 10px 10px;
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
.filterInput {
    // margin: 10px 10px 0;

    .el-input__wrapper,
    .el-input__inner {
        border-radius: 2px;
    }
}

.CustomTree {
    .el-tree-node__content {
        height: 32px;
    }

    .el-input__wrapper,
    .el-input__inner {
        cursor: pointer;
    }

    .el-tree-node.is-current>.el-tree-node__content {
        background-color: #d9edff;
    }

    .el-tree {
        user-select: none;
    }
}
</style>