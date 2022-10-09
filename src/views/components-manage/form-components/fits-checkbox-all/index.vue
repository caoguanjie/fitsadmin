<template>
    <div class="FitsCheckboxAllIndex">

        <fits-card title="基础用法" desc="基础的复选框组件展示">
            <checkbox-all-basic-use />
        </fits-card>

        <fits-card title="默认选中" desc="通过设置 modelValue 属性可以传递默认值，该值为选项的 label 组成的数组">
            <checkbox-all-default-value />
        </fits-card>

        <fits-card title="禁用选项" desc="为 option 中的选项设置 disabled = true ，即可禁用该选项">
            <checkbox-all-disabled />
        </fits-card>

        <fits-card title="限制选择数量" desc="设置 checkboxGroup.min 和 checkboxGroup.max 可以控制选项的最小和最大数量">
            <checkbox-all-limit />
        </fits-card>

    </div>
</template>

<script lang="ts" setup>
import CheckboxAllBasicUse from './CheckboxAllBasicUse.vue';
import CheckboxAllDefaultValue from './CheckboxAllDefaultValue.vue';
import CheckboxAllDisabled from './CheckboxAllDisabled.vue';
import CheckboxAllLimit from './CheckboxAllLimit.vue';
</script>
<style lang="scss" scoped>
.FitsCheckboxAllIndex {
    padding: 16px;
    background: #fff;
}
</style>

<style lang="scss">
.FitsCheckboxAllIndex {
    .fits-card {
        min-width: 500px;
    }
}
</style>
