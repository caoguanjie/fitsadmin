<template>
    <div class="FitsFormCreate">
        <FormCreate v-model:api="fApi" v-model="formValue" :rule="rule" :option="form.option" class="FormCreate" />
    </div>
</template>

<script lang="ts" setup name="FitsFormCreate">
import formCreate from "@form-create/element-ui";
import { ref, onMounted } from 'vue'
import { FitsFormCreateModel } from "./model";

const props = defineProps<{
    form: FitsFormCreateModel;
}>();

//获取 formCreate 组件
const FormCreate = formCreate.$form();

const formValue = ref({});

const fApi: any = ref({})

// 解决切换表单展示形式时，浏览器的警告‘Maximum recursive updates exceeded...’ 
const rule = ref([...props.form.rule])

const itemWidth = ref()

defineExpose({
    fApi
})

onMounted(() => {
    if (props.form.col) {
        itemWidth.value = 100 / props.form.col + '%'
    }
})

</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
.el-form--inline.FormCreate {
    .el-form-item {
        padding: 0 40px;
        box-sizing: border-box;
    }
}

.FormCreate {
    .el-input__wrapper {
        border-radius: 2px !important;
        width: 100%;
    }

    .el-input,
    .el-select {
        width: 100%;
    }

    .el-button {
        border-radius: 2px;
        font-size: 12px;
        padding: 0 20px;
    }

    .el-button+.el-button {
        margin-left: 16px;
    }

    .el-form-item {
        margin-right: 0;
        margin-bottom: 28px;
        width: v-bind(itemWidth);
        min-width: 250px;
        justify-content: center;

        .el-form-item__label {

            label,
            span {
                color: #303133;
            }
        }
    }
}
</style>
