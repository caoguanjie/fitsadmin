<template>
    <div class="FitsIconSelect">

        <el-card class="box-card">
            <template #header>
                <div class="title">基础用法</div>
                <div class="describe">
                    基础的图标选择组件展示<br>
                    组件默认开启内部输入框搜索过滤
                </div>
            </template>
            <icon-select-basic-use />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">默认值</div>
                <div class="describe">
                    通过传递 modelValue 属性可以给图标选择组件传递默认值，该值必须是图标的名称
                </div>
            </template>
            <icon-select-default-value />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">多选</div>
                <div class="describe">
                    通过设置 select.multiple 开启多选模式。多选模式下，默认会展示出所有的选项<br>
                    可以通过设置 select.collapseTags 将选中值按文字的形式展示，设置
                    select.collapseTagsTooltip 决定鼠标悬停于折叠标签的文本时，是否显示所有选中的标签
                </div>
            </template>
            <icon-select-multiple />
        </el-card>

    </div>
</template>

<script lang="ts" setup>
import IconSelectBasicUse from './IconSelectBasicUse.vue';
import IconSelectDefaultValue from './IconSelectDefaultValue.vue';
import IconSelectMultiple from './IconSelectMultiple.vue';

</script>
<style lang="scss" scoped>
.FitsIconSelect {
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
.FitsIconSelect {
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
