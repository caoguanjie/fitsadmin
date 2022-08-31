<template>
    <div class="FitsTreeSelect">

        <el-card class="box-card">
            <template #header>
                <div class="title">基础用法</div>
                <div class="describe">
                    基础的树形筛选组件展示<br>
                    当节点数据超过下拉框的长度时，会通过滚动条的形式进行展示
                </div>
            </template>
            <tree-select-basic-use />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">禁用状态</div>
                <div class="describe">
                    禁用整个树形筛选组件<br>
                    设置 select.disabled = true，则整个树形筛选组件不可用。
                </div>
            </template>
            <tree-select-disabled-select />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">有禁用选项</div>
                <div class="describe">
                    设置 tree.showCheckbox 启用节点选择框，并为 tree.data 中的选项设置 disabled = true，即可禁用该选项
                </div>
            </template>
            <tree-select-disabled-option />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">过滤节点</div>
                <div class="describe">
                    设置 input.show = true 开启内部过滤输入框。<br>
                    默认情况下，TreeSelect 会找出所有 label 属性包含输入值的选项。<br>
                    如果希望使用其他的搜索逻辑，可以通过 tree.filterNodeMethod 来实现。 filterNodeMethod 为一个 Function，它会在输入值发生变化时调用，参数为当前输入值。
                </div>
            </template>
            <tree-select-filterable />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">默认选中</div>
                <div class="describe">
                    通过传递 modelValue 属性可以给下拉树筛选组件传递默认值，该值必须跟 tree.nodeKey 指定的属性值对应
                </div>
            </template>
            <tree-select-default-value />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">默认展开所有节点、可拖拽</div>
                <div class="describe">
                    通过设置 tree.defaultExpandAll=true 可以默认展开所有节点<br>
                    通过设置 tree.draggable=true 可以开启树节点拖拽
                </div>
            </template>
            <tree-select-draggable />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">自定义节点内容</div>
                <div class="describe">
                    通过设置 tree.renderContent 渲染函数，该函数返回需要的节点区内容即可。
                </div>
            </template>
            <tree-select-custom-node />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">动态加载节点数据</div>
                <div class="describe">
                    动态加载数据仅当 tree.lazy=true 时有效。并通过 tree.load 传递一个函数，参数为 node 和 resolve ， node为当前点击的节点，
                    resolve为数据加载完成的回调
                </div>
            </template>
            <tree-select-dynamic-load />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">多选节点</div>
                <div class="describe">
                    通过配置 tree.showCheckbox=true 和 select.multiple=true 开启树节点的复选框按钮
                </div>
            </template>
            <tree-select-multiple />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import TreeSelectBasicUse from './TreeSelectBasicUse.vue';
import TreeSelectDisabledSelect from './TreeSelectDisabledSelect.vue';
import TreeSelectDisabledOption from './TreeSelectDisabledOption.vue';
import TreeSelectFilterable from './TreeSelectFilterable.vue';
import TreeSelectDefaultValue from './TreeSelectDefaultValue.vue';
import TreeSelectDraggable from './TreeSelectDraggable.vue';
import TreeSelectCustomNode from './TreeSelectCustomNode.vue';
import TreeSelectDynamicLoad from './TreeSelectDynamicLoad.vue';
import TreeSelectMultiple from './TreeSelectMultiple.vue';
import { ref } from 'vue';
const selectRef = ref()
function goBlur() {
    selectRef.value.blur()
}
const value = ref('')

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
function Blur() {
    console.log('myBlur');
}
function Focus() {
    console.log('myFocus');

}
</script>
<style lang="scss" scoped>
.FitsTreeSelect {
    padding: 16px;
    background: #fff;

    .box-card {
        width: 55vw;
        margin-bottom: 30px;

        .title {
            font-size: 20px;
            font-weight: 700;
            color: #606266;
        }

        .describe {
            font-size: 14px;
            color: #303133;
            margin-top: 18px;
        }
    }
}
</style>

<style lang="scss">
.FitsTreeSelect {
    .box-card {
        .el-card__header {
            height: auto !important;
        }

        .el-select {
            width: 70%;
        }
    }
}
</style>
