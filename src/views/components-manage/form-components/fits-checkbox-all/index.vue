<template>
    <div class="FitsCheckboxAll">

        <el-card class="box-card">
            <template #header>
                <div class="title">基础用法</div>
                <div class="describe">
                    基础的复选框组件展示
                </div>
            </template>
            <checkbox-all-basic-use />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">默认选中</div>
                <div class="describe">
                    通过设置 modelValue 属性可以传递默认值，该值为选项的 label 组成的数组
                </div>
            </template>
            <checkbox-all-default-value />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">禁用选项</div>
                <div class="describe">
                    为 option 中的选项设置 disabled = true ，即可禁用该选项
                </div>
            </template>
            <checkbox-all-disabled />
        </el-card>

        <el-card class="box-card">
            <template #header>
                <div class="title">限制选择数量</div>
                <div class="describe">
                    设置 checkboxGroup.min 和 checkboxGroup.max 可以控制选项的最小和最大数量
                </div>
            </template>
            <checkbox-all-limit />
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import CheckboxAllBasicUse from './CheckboxAllBasicUse.vue';
import CheckboxAllDefaultValue from './CheckboxAllDefaultValue.vue';
import CheckboxAllDisabled from './CheckboxAllDisabled.vue';
import CheckboxAllLimit from './CheckboxAllLimit.vue';
</script>
<style lang="scss" scoped>
.FitsCheckboxAll {
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
.FitsCheckboxAll {
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
