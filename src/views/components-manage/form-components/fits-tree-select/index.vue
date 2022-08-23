<template>
    <div class="FitsTreeSelect">

        <!-- <el-tree :data="data" :show-checkbox='true' /> -->

        <el-card class="box-card">
            <template #header>
                <div class="title">基础用法</div>
                <div class="describe">基础的树形筛选组件展示</div>
            </template>
            <tree-select-basic-use />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">禁用状态</div>
                <div class="describe">
                    禁用整个树形筛选组件<br />
                    为 selectInput 设置 'disabled = true'，则整个树形筛选组件不可用。
                </div>
            </template>
            <tree-select-disabled-select />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">有禁用选项</div>
                <div class="describe">
                    为 tree.data 中的选项设置 'disabled = true'，即可禁用该选项
                </div>
            </template>
            <tree-select-disabled-option />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">过滤节点</div>
                <div class="describe">
                    开启过滤的方式有两种。一种是为 selectInput 设置 'filterable = true'；另一种是为 filterInput 设置 'show =
                    true'开启内部过滤输入框。<br />
                    默认情况下，Select 会找出所有 label 属性包含输入值的选项。<br />
                    如果希望使用其他的搜索逻辑，可以通过传入一个 filter-method 来实现。 filter-method 为一个 Function，它会在输入值发生变化时调用，参数为当前输入值。
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
                    通过设置 'tree.defaultExpandAll=true' 可以默认展开所有节点<br />
                    通过设置 'tree.draggable=true' 可以开启树节点拖拽
                </div>
            </template>
            <tree-select-draggable />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">自定义节点内容</div>
                <div class="describe">
                </div>
            </template>
            <tree-select-custom-node />
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

const data: any = [
    {
        label: 'Level one 1',
        children: [
            {
                label: 'Level two 1-1',
                // children: [
                //     {
                //         label: 'Level three 1-1-1',
                //     },
                // ],
            },
        ],
    },
    {
        label: 'Level one 2',
        children: [
            {
                label: 'Level two 2-1',
                children: [
                    {
                        label: 'Level three 2-1-1',
                        disabled: true
                    },
                ],
            },
            {
                label: 'Level two 2-2',
                children: [
                    {
                        label: 'Level three 2-2-1',
                        disabled: true
                    },
                ],
            },
        ],
    },
    {
        label: 'Level one 3',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    {
                        label: 'Level three 3-1-1',
                    },
                ],
            },
            {
                label: 'Level two 3-2',
                children: [
                    {
                        label: 'Level three 3-2-1',
                    },
                ],
            },
        ],
    },
]
</script>
<style lang="scss" scoped>
.FitsTreeSelect {
    padding: 16px;
    background: #fff;
    // height: 500px;

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
