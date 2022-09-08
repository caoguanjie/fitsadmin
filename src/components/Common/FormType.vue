<template>
    <div class="formType">
        <fits-dialog v-if="setting.formType === 'dialog'" class="FormTypeDialog" :visible="option.visible"
            :prop="option.myProp" @cancle="closeForm" @submit="submitForm" @open="openForm">
            <template #body>
                <div class="forms-container" v-for="(item, index) in option.forms" :key="index">
                    <fits-module-name :model-value="item.title" v-if="item?.title" />
                    <fits-form-create :form="item.form" ref="DialogRef" />
                </div>
            </template>
        </fits-dialog>

        <fits-drawer :visible="option.visible" :prop="option.myProp" @cancle="closeForm" @submit="submitForm"
            @open="openForm" v-else>
            <div class="form-drawer-container" v-for="(item, index) in option.forms" :key="index">
                <el-scrollbar>
                    <div class="title" v-show="item?.title">
                        <svg-icon :icon-class="item?.iconClass" />
                        {{ item.title }}
                    </div>
                    <fits-form-create :form="item.form" ref="DrawerRef" />
                </el-scrollbar>
            </div>
        </fits-drawer>
    </div>
</template>

<script lang="ts" setup>
import FitsDialog from '@/components/Dialog/FitsDialog.vue'
import FitsDrawer from '@/components/Dialog/FitsDrawer.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import useStore from '@/store';
import { nextTick, ref } from 'vue';
import { FitsFormTypeModel } from './model';
import FitsModuleName from "@/components/Form/FitsModuleName.vue";
import FitsFormCreate from '@/components/Common/FitsFormCreate.vue';

const props = defineProps<{
    option: FitsFormTypeModel
}>();

const emit = defineEmits(['cancle', 'submit'])

const { setting } = useStore();

const DialogRef = ref()
const DrawerRef = ref()
const currentFormRef = computed(() => setting.formType === 'dialog' ? DialogRef.value : DrawerRef.value)

defineExpose({
    currentFormRef
})

/**
 * @desc 打开窗口之前清空之前残留的验证
 */
function openForm() {
    nextTick(() => {
        currentFormRef.value.forEach((item: any) => {
            item.fApi.clearValidateState()
        })
    })
}

/**
 * @desc 关闭表单，重置数据
 */
function closeForm() {
    currentFormRef.value.forEach((item: any) => {
        item.fApi.resetFields()
        // item.fApi.reload()
    })
    emit("cancle")
}

/**
 * @desc 提交表单操作，所有表单都通过校验才发送提交事件
 */
function submitForm() {
    let flag = 0
    let formValue = {}
    currentFormRef.value.forEach((item: any) => {
        item.fApi.submit((formData: any) => {
            // 通过校验
            flag++
            formValue = Object.assign(formValue, formData);
        }).then(() => {
            if (flag !== props.option.forms.length) return
            emit('submit', formValue)
        })
    })
}

</script >

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
.formType {
    .FormTypeDialog {
        .el-form-item {
            margin-right: 22px;
        }

        .form-divider {
            margin: 24px 0;
        }
    }

    .form-drawer-container {
        .el-form-item {
            margin-right: 22px;
        }
    }
}
</style>
