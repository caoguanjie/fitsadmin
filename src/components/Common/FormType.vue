<template>
    <fits-dialog v-if="setting.formType === 'dialog'" class="FormTypeDialog" v-bind='$attrs' @cancle="closeForm"
        @submit="submitForm" @open="openForm">
        <template #body>
            <div class="forms-container" v-for="(item, index) in forms" :key="index">
                <fits-module-name :model-value="item.title" v-if="item?.title" />
                <fits-form-create :form="item.form" ref="FormRef" />
            </div>
        </template>
    </fits-dialog>

    <fits-drawer v-bind='$attrs' @cancle="closeForm" @submit="submitForm" @open="openForm" v-else>
        <div class="form-drawer-container" v-for="(item, index) in forms" :key="index">
            <el-scrollbar>
                <div class="title" v-show="item?.title">
                    <svg-icon :icon-class="item?.iconClass" />
                    {{ item.title }}
                </div>
                <fits-form-create :form="item.form" ref="FormRef" />
            </el-scrollbar>
        </div>
    </fits-drawer>
</template>

<script lang="ts" setup>
import FitsDialog from '@/components/Dialog/FitsDialog.vue'
import FitsDrawer from '@/components/Dialog/FitsDrawer.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import useStore from '@/store';
import { nextTick, ref } from 'vue';
import { FitsFormModuleModel } from './model';
import FitsModuleName from "@/components/Form/FitsModuleName.vue";
import FitsFormCreate from '@/components/Common/FitsFormCreate.vue';

const props = defineProps<{
    forms: FitsFormModuleModel[];
}>();

const emit = defineEmits(['cancle', 'submit'])

const { setting } = useStore();

const FormRef = ref()

/**
 * @desc 打开窗口之前清空之前残留的验证
 */
function openForm() {
    nextTick(() => {
        FormRef.value.forEach((item: any) => {
            item.fApi.clearValidateState()
        })
    })
}

/**
 * @desc 关闭表单，重置数据
 */
function closeForm() {
    FormRef.value.forEach((item: any) => {
        item.fApi.resetFields()
        item.fApi.reload()
    })
    emit("cancle")
}

/**
 * @desc 提交表单操作，所有表单都通过校验才发送提交事件
 */
function submitForm() {
    let flag = 0
    let formValue = {}
    FormRef.value.forEach((item: any) => {
        item.fApi.submit((formData: any, fapi: any) => {
            // 通过校验
            flag++
            formValue = Object.assign(formValue, formData);
        }).then(() => {
            if (flag !== props.forms.length) return
            emit('submit', formValue)
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

.form-drawer-container {
    .el-form-item {
        margin-right: 22px;
    }
}
</style>
