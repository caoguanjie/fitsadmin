<template>
    <FormCreate v-model:api="fApi" v-model="formValue" :rule="rule" :option="form.option" class="FormCreate" />
</template>

<script lang="ts" setup>
import formCreate from "@form-create/element-ui";
import { FitsFormCreateModel } from "./model";
import { onMounted, ref } from "vue";

const props = defineProps<{
    form: FitsFormCreateModel;
}>();

//获取 formCreate 组件
const FormCreate = formCreate.$form();

const formValue = ref({});

const fApi: any = ref({})

// 解决切换表单展示形式时，浏览器的警告‘Maximum recursive updates exceeded...’ 
const rule = computed(() => [...props.form.rule]);

defineExpose({
    fApi
})

onMounted(() => {
    if (props.form.col) {
        fApi.value.updateOptions({
            global: {
                //设置所有组件
                '*': {
                    col: {
                        span: 24 / props.form.col
                    },
                }
            }
        });
    }
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
        width: 100%;
    }

    .el-input {
        width: 100%;
    }

    .el-button {
        border-radius: 2px;
    }
}
</style>
