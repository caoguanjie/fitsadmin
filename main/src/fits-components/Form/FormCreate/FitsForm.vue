<template>
    <form-create :rule="option.formItem" v-model:api="fApi" class="form-creat-wrap" v-model="formValue"
        :option="formCreateOption" />
</template>

<script lang='ts' setup name="FitsForm">
import { Api } from '@form-create/element-ui';
import { FitsFormModel } from './type';
import { ref, toRefs, reactive } from 'vue'

const fApi = ref<Api | null>(null)
const formValue = ref({});
const props = defineProps<{
    option: FitsFormModel
}>();
defineExpose({
    fApi
})

const { option } = toRefs(props)
handleFormCreateOption();

const formCreateOption = reactive({ form: { ...props.option.form }, ...props.option.btnProps })
console.log(formCreateOption)
// 处理formcreat一些option相关的数据
function handleFormCreateOption() {
    // 添加默认的重置方法
    const resetBtn: any = props.option.btnProps?.resetBtn;
    if (props.option.btnProps?.resetBtn && !props.option.btnProps?.resetBtn?.click) {
        resetBtn.click = () => {
            fApi.value?.resetFields()
        }

    }
}




</script>
<style lang='scss'>
.form-creat-wrap {
    --el-border-radius-base: 2px;

    .el-form-item {
        width: 18%;
        min-width: 280px;
        margin-right: 18px;
        max-width: 320px;

        & .el-form-item__label {
            width: 100px !important;
        }

        & label>span {
            font-size: 12px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &>.el-form-item__content>* {
            width: 100%;
        }
    }
}
</style>