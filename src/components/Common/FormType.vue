<template>
    <div class="form-type">
        <!-- {{ form }} -->
        <fits-dialog v-if="setting.formType === 'dialog'" v-bind='$attrs' @cancle="closeForm" @submit="submitForm"
            @open="openForm">
            <template #body>
                <div class="form-dialog-container" v-for="item in form" :key="item.id">
                    <divider v-model="item.title" v-show="item.title" />
                    <form-create v-bind='item' v-model:api="item.api" v-model="item.formValue">
                    </form-create>
                </div>
            </template>
        </fits-dialog>

        <fits-drawer v-bind='$attrs' @cancle="closeForm" @submit="submitForm" @open="openForm" v-else>
            <div class="form-drawer-container" v-for="item in form" :key="item.id">
                <el-scrollbar>
                    <div class="title" v-show="item.title">
                        <svg-icon :icon-class="item.iconClass"></svg-icon>
                        {{ item.title }}
                    </div>
                    <form-create v-bind='item' v-model:api="item.api">
                    </form-create>
                </el-scrollbar>
            </div>
        </fits-drawer>
    </div>
</template>

<script lang="ts">
import { FormCreateProps } from '@form-create/element-ui'
export type FormType = 'dialog' | 'drawer'

/**
 * 表单属性类型声明
 */
export interface FormTypeProps extends FormCreateProps {
    id: string;
    formValue: object,
    title?: string;
    iconClass?: string;
}
export type FormTypeArray = FormTypeProps[]

</script>

<script lang="ts" setup>
import FitsDialog from '@/components/Dialog/FitsDialog.vue'
import FitsDrawer from '@/components/Dialog/FitsDrawer.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import useStore from '@/store';
import { nextTick } from 'vue';
import Divider from '@/components/Form/Divider.vue'

const prop = defineProps({
    form: {
        required: true,
        type: Object
    }
})
const emit = defineEmits(['cancle', 'submit'])

const { setting } = useStore();

function closeForm() {
    prop.form.forEach((item: any, index: number) => {
        item.api.resetFields()
        item.api.reload()
    })
    emit("cancle")
}

function submitForm() {
    let flag = 0
    let formValue = {}
    prop.form.forEach((item: any, index: number) => {
        item.api.submit((formData: any, fapi: any) => {
            //通过校验
            console.log(index + '通过');
            flag++
        }, () => {
            //没通过校验
            console.log(index + '没通过');
        }).then((data: any) => {
            formValue = Object.assign(formValue, data);
            flag === prop.form.length && emit('submit', formValue)
        })
    })
}

/**
 * 打开窗口之前清空之前残留的验证
 */
function openForm() {
    console.log(prop.form, 'form');
    nextTick(() => {
        prop.form.forEach((item: any, index: number) => {
            item.api.clearValidateState()
        })
    })
}
</script>
<style lang="scss" scoped>
.form-drawer-container {
    background: #fff;
    padding: 10px;
    margin-left: 10px;
    flex: 1;
    width: 390px;

    .title {
        background: #f7f8fa;
        color: #303133;
        font-weight: bold;
        font-size: 16px;
        padding: 13px 16px;
    }

    .form-create {
        margin-top: 16px;
        width: 100%;
    }
}

.form-drawer-container:first-child {
    margin-left: 0;
}

.form-dialog-container {
    margin-top: 4px;

    .form-create {
        margin-top: 24px;
    }
}

.form-dialog-container:first-child {
    margin-top: 0;
}
</style>
<style lang="scss">
.form-type {

    .el-input__wrapper,
    .el-input__inner {
        border-radius: 0;
    }

    .el-form-item {
        margin-bottom: 28px;
        // min-width: 250px !important;
    }
}

.form-drawer-container {
    .el-form-item {
        width: 100%;
    }

    .el-form--inline .el-form-item {
        margin-right: 20px;
    }
}

.form-dialog-container {
    .el-row {
        justify-content: space-between;
        margin: 0 46px;
    }

    .el-form-item {
        width: 43%;
    }
}
</style>
