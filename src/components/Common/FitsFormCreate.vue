<template>
    <FormCreate v-model:api="fApi" v-model="value" :rule="form.rule" :option="form.option" class="FormCreate" />
</template>

<script lang="ts" setup>
import formCreate from "@form-create/element-ui";
import { FitsFormCreateModel } from "./model";
import { ref } from "vue";

defineProps<{
    form: FitsFormCreateModel;
}>();

//获取 formCreate 组件
const FormCreate = formCreate.$form();

const fApi: any = ref({})
const value = ref({})

defineExpose({
    fApi
})

</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.FormCreate {
    label {
        color: #303133;
    }

    .el-input__wrapper {
        border-radius: 2px !important;
    }
}
</style>
