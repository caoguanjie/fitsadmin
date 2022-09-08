<template>
    <div class="drawer-container">
        <el-drawer v-model="isVisible" @close="closeDrawer" v-bind="prop">
            <!-- drawer的内容 -->
            <slot />
            <template #footer>
                <div class="drawer-footer">
                    <el-button @click="closeDrawer">
                        取消
                    </el-button>
                    <el-button type="primary" @click="submitDrawer">
                        确定
                    </el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch } from 'vue';

const props = withDefaults(defineProps<{
    visible: boolean,
    prop?: any
}>(), {
    visible: false,
    prop: {}
})
const emit = defineEmits(['cancle', 'submit', 'open'])

const state: any = reactive({
    isVisible: false
})
const { isVisible } = toRefs(state);

watch(() => props.visible, (newVal: boolean) => {
    isVisible.value = newVal
    newVal && emit('open')
})

function closeDrawer() {
    emit('cancle')
}

function submitDrawer() {
    emit('submit')
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.drawer-container {
    .el-drawer {
        max-width: 80% !important;
        width: auto !important;
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
            background: #e8e8eb;
            border-radius: 12px;
        }
    }

    .el-drawer__body {
        background-color: #f2f2f2;
        padding: 10px;
        display: flex;
    }

    .el-drawer__footer {
        padding: 20px 24px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
    }

    .drawer-footer {
        padding: 0;

        .el-button {
            border-radius: 0;
            padding: 8px 24px;
            font-size: 12px;
        }

        .el-button+.el-button {
            margin-left: 16px;
        }
    }
}
</style>
