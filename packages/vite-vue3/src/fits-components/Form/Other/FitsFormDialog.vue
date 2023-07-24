<template>
    <div class="formType">
        <fits-drawer v-bind="option" @cancel="closeForm" @submit="submitForm" @open="openForm" class="FormTypeDrawer"
            v-if="option.formType === 'drawer'">
            <template #header>
                <slot name="header" />
            </template>
            <div class="form-drawer-container" v-for="(item, index) in option.forms" :key="index">
                <el-scrollbar>
                    <div class="title" v-show="item?.title">
                        <svg-icon :icon-class="item?.iconClass" />
                        {{ item.title }}
                    </div>
                    <fits-form-create :form="item.form" ref="DrawerRef" />
                </el-scrollbar>
            </div>
            <template #footer>
                <slot name="footer" />
            </template>
        </fits-drawer>
        <fits-dialog class="FormTypeDialog" v-bind="option" @cancel="closeForm" @submit="submitForm" @open="openForm"
            v-else>
            <template #header>
                <slot name="header" />
            </template>
            <div class="form-dialog-container" v-for="(item, index) in option.forms" :key="index">
                <form-title :model-value="item.title" v-if="item?.title" />
                <fits-form-create :form="item.form" ref="DialogRef" />
            </div>
            <template #footer>
                <slot name="footer" />
            </template>
        </fits-dialog>
    </div>
</template>

<script lang="ts" setup  name="FitsFormDialog">
import FitsDialog from '../../FeedBack/Dialog/FitsDialog.vue'
import FitsDrawer from '../../FeedBack/Dialog/FitsDrawer.vue'
import SvgIcon from '../../Basic/SvgIcon/index.vue'
import { nextTick, ref, computed } from 'vue';
import FormTitle from "../Other/FormTitle.vue";
import FitsFormCreate from '../../Form/FormCreate/FitsFormCreate.vue';
import { FitsFormDialogModel } from './model';

const props = defineProps<{
    option: FitsFormDialogModel,
}>();

const emit = defineEmits(['cancel', 'submit'])

const DialogRef = ref()
const DrawerRef = ref()
const currentFormRef = computed(() => props.option.formType === 'drawer' ? DrawerRef.value : DialogRef.value)

defineExpose({
    formRef: currentFormRef
});

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
    })
    emit("cancel")
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
        // margin-top: 16px;
        width: 100%;
    }
}

.form-drawer-container:first-child {
    margin-left: 0;
}
</style>

<style lang="scss">
.form-drawer-container {
    .FormCreate {
        box-sizing: border-box;
    }
}

.formType {
    .el-form-item {
        margin-right: 0;
    }

    .FormTypeDialog {
        .form-divider {
            margin-bottom: 24px;
            box-sizing: border-box;
        }
    }

    .FormTypeDrawer {
        .el-drawer__body {
            display: flex;
        }

        .FormCreate {
            padding: 16px 22px 0 16px;

            .el-form-item {
                padding: 0;
            }
        }
    }

    .FormTypeDrawer,
    .FormTypeDialog {
        .sureBtn {
            background-color: #007dff;
        }
    }

    .el-drawer {
        width: auto;
    }
}
</style>
