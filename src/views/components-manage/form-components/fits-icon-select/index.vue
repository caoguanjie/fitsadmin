<template>
    <div class="FitsIconSelectIndex">

        <fits-card title="基础用法" desc="基础的图标选择组件展示。组件默认开启内部输入框搜索过滤">
            <icon-select-basic-use />
        </fits-card>

        <fits-card title="默认值" desc="通过传递 modelValue 属性可以给图标选择组件传递默认值，该值必须是图标的名称">
            <icon-select-default-value />
        </fits-card>

        <fits-card title="多选" desc="通过设置 select.multiple 开启多选模式。多选模式下，默认会展示出所有的选项。
                    可以通过设置 select.collapseTags 将选中值按文字的形式展示，设置
                    select.collapseTagsTooltip 决定鼠标悬停于折叠标签的文本时，是否显示所有选中的标签">
            <icon-select-multiple />
        </fits-card>

        <fits-card title="隐藏输入框" desc="通过设置 showInput=false 可以隐藏下拉内部输入框。">
            <icon-select-filter />
        </fits-card>
    </div>
</template>

<script lang="ts" setup>
import IconSelectBasicUse from './IconSelectBasicUse.vue';
import IconSelectDefaultValue from './IconSelectDefaultValue.vue';
import IconSelectMultiple from './IconSelectMultiple.vue';
import IconSelectFilter from './IconSelectFilter.vue';
</script>
<style lang="scss" scoped>
.FitsIconSelectIndex {
    padding: 16px;
    background: #fff;
}
</style>

<style lang="scss">
.FitsIconSelectIndex {
    .fits-card {
        min-width: 500px;
    }

    .el-select {
        width: 70% !important;
    }

    .innerTitle {
        font-weight: 700;
        margin-bottom: 8px;
        color: #303133;
    }
}
</style>
