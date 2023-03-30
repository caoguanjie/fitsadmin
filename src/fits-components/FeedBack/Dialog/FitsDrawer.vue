<template>
    <div class="drawer-container">
        <el-drawer v-model="isVisible" @close="closeDrawer" v-bind="dialogProp" :size="props.dialogProp.width">
            <!-- drawer的头部插槽 -->
            <template #header="{ close, titleId, titleClass }">
                <slot name="header" :close="close" :titleId="titleId" :titleClass="titleClass" />
            </template>
            <!-- drawer的内容 -->
            <slot />
            <!-- drawer的底部插槽 -->
            <template #footer v-if="showFooter">
                <slot name="footer">
                    <el-button @click="closeDrawer" class="cancelBtn">
                        {{ cancelText }}
                    </el-button>
                    <el-button type="primary" @click="submitDrawer" class="sureBtn">
                        {{ submitText }}
                    </el-button>
                </slot>
            </template>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch } from 'vue';

const props = withDefaults(defineProps<{
    visible: boolean,
    submitText?: string,
    cancelText?: string,
    showFooter?: boolean,
    dialogProp?: any,
}>(), {
    visible: false,
    submitText: '确定',
    cancelText: '取消',
    showFooter: true,
    dialogProp: {}
})
const emit = defineEmits(['cancel', 'submit', 'open'])

const state: any = reactive({
    isVisible: false
})
const { isVisible } = toRefs(state);

watch(() => props.visible, (newVal: boolean) => {
    isVisible.value = newVal
    newVal && emit('open')
})

function closeDrawer() {
    emit('cancel')
}

function submitDrawer() {
    emit('submit')
}
</script>
<style lang="scss" scoped>
.sureBtn {
    background-color: #007dff;
}
</style>
<style lang="scss">
.drawer-container {
    .el-drawer {
        max-width: 100%;
    }

    .el-drawer__header {
        margin-bottom: 0;
        padding: 18px 16px;

        .el-drawer__title {
            line-height: 20px;
            font-size: 16px;
            font-weight: 700;
            color: #303133;
        }

        .el-drawer__close-btn {
            line-height: 24px;
            height: 24px;
            width: 24px;
            padding: 0;
            // background: #e8e8eb;
            // border-radius: 12px;
        }
    }

    .el-drawer__body {
        background-color: #f2f2f2;
        padding: 10px;
        // display: flex;
    }

    .el-drawer__footer {
        padding: 20px 24px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);

        .el-button {
            border-radius: 2px;
            padding: 8px 24px;
            font-size: 12px;
        }

        .el-button+.el-button {
            margin-left: 16px;
        }
    }
}
</style>
