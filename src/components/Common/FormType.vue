<template>
    <!-- <div class="form-type"> -->
    <fits-dialog v-if="setting.formType === 'dialog'" class="FormTypeDialog" v-bind='$attrs' @cancle="closeForm"
        @submit="submitForm" @open="openForm">
        <template #body>
            <div class="forms-container" v-for="(item, index) in forms" :key="index">
                <fits-module-name :model-value="item.title" v-if="item?.title" />
                <fits-form-create :form="item.form" ref="FormRef" />
            </div>
            <!-- <fits-form-create :form="forms" ref="FormRef" /> -->
        </template>
    </fits-dialog>

    <fits-drawer v-bind='$attrs' @cancle="closeForm" @submit="submitForm" @open="openForm" v-else>
        <!-- <div class="form-drawer-container" v-for="item in form" :key="item.id">
            <el-scrollbar>
                <div class="title" v-show="item.title">
                    <svg-icon :icon-class="item.iconClass" />
                    {{ item.title }}
                </div>
                <form-create v-bind='item' v-model:api="item.api" />
            </el-scrollbar>
        </div> -->
    </fits-drawer>
    <!-- </div> -->
</template>

<script lang="ts" setup>
import FitsDialog from '@/components/Dialog/FitsDialog.vue'
import FitsDrawer from '@/components/Dialog/FitsDrawer.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import useStore from '@/store';
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue';
import { FitsFormModuleModel } from './model';
import FitsModuleName from "@/components/Form/FitsModuleName.vue";
import FitsFormCreate from '@/components/Common/FitsFormCreate.vue';

const props = defineProps<{
    forms: FitsFormModuleModel[];
}>();
const emit = defineEmits(['cancle', 'submit'])
const FormRef = ref()
const { setting } = useStore();

function closeForm() {
    console.log(FormRef.value.fApi);
    FormRef.value.fApi.resetFields()
    FormRef.value.fApi.reload()
    emit("cancle")
}

function submitForm() {
    let flag = 0
    let formValue = {}
    props.forms.forEach((item: any, index: number) => {
        item.api.submit((formData: any, fapi: any) => {
            //通过校验
            console.log(index + '通过');
            flag++
        }, () => {
            //没通过校验
            console.log(index + '没通过');
        }).then((data: any) => {
            formValue = Object.assign(formValue, data);
            flag === props.forms.length && emit('submit', formValue)
        })
    })
}

/**
 * 打开窗口之前清空之前残留的验证
 */
function openForm() {
    nextTick(() => {
        FormRef.value.forEach((item: any) => {
            console.log(item.fApi)
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
.FormTypeDialog {
    .form-divider {
        margin: 24px 0;
    }
}

// .form-type {

//     .el-input__wrapper,
//     .el-input__inner {
//         border-radius: 0;
//     }

//     .el-form-item {
//         margin-bottom: 28px;
//         // min-width: 250px !important;
//     }
// }

// .form-drawer-container {
//     .el-form-item {
//         width: 100%;
//     }

//     .el-form--inline .el-form-item {
//         margin-right: 20px;
//     }
// }

// .form-dialog-container {
//     .el-row {
//         justify-content: space-between;
//         margin: 0 46px;
//     }

//     .el-form-item {
//         width: 43%;
//     }
// }
</style>
