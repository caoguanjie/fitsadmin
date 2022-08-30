<template>
    <div class="dialog">
        <el-dialog ref="elDialogRef" v-model="isVisible" v-bind="props"
            :custom-class="props?.customClass ? props.customClass + ' fits-dialog' : 'fits-dialog'"
            :close-on-click-modal="false" :top="myProps.marginTop" draggable>
            <div class="dialog-body" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-scrollbar :noresize="true">
                    <slot name="body"></slot>
                </el-scrollbar>
            </div>
            <template #footer>
                <slot name="btnLeft" class="dialog-footer">
                    <el-button size="small" @click="emitCancle">
                        取 消
                    </el-button>
                    <el-button size="small" @click="emitSave" type="primary">
                        确 定
                    </el-button>
                </slot>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch, nextTick } from "vue";

const prop = withDefaults(defineProps<{
    visible: boolean,
    loading?: boolean,
    props?: any
}>(), {
    visible: false,
    loading: false,
    props: {}
})

const emit = defineEmits(["update:modelValue", 'cancle', 'submit', 'open'])

const state: any = reactive({
    isVisible: false,
    myProps: prop.props
})
const { isVisible, myProps } = toRefs(state);

const elDialogRef = ref()

watch(() => prop.visible, (newVal: boolean) => {
    console.log(prop);

    isVisible.value = newVal
    newVal && emit('open')
    !newVal && emit('cancle')
    nextTick(() => {
        updatedWindowHeight();
    });
})

/**
 * 保存事件
 */
function emitSave() {
    emit("submit");
    // isVisible.value = false;
}

/**
 * 关闭事件
 */
function emitCancle() {
    emit("cancle");
    // isVisible.value = false;
}

/**
 * 这里的代码主要是，当弹窗内容超过540的高度的时候，自动居中
 * 当弹窗内容低于540高度的时候，marginTop: -10vh。也能达到大概居中的目的
 */
function updatedWindowHeight() {
    // 实际弹窗部分
    const dialogWindowHeight = elDialogRef.value.dialogContentRef.$el.getBoundingClientRect().height
    // 黑色阴影的div
    const dialogWrapWindowHeight = elDialogRef.value.dialogContentRef.$parent.$parent.$el.getBoundingClientRect().height;
    if (dialogWindowHeight > 540) {
        myProps.value.marginTop = "0";
    } else {
        myProps.value.marginTop = dialogWrapWindowHeight < 540 ? "20px" : "-10vh";
    }
}
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<style lang="scss">
.dialog {
    .el-dialog {
        min-width: 700px;
    }

    .el-overlay-dialog {
        display: flex;
        align-items: center;
    }
}

.fits-dialog {
    & {
        border-radius: 8px;
    }

    .el-dialog__body {
        overflow: hidden;
        padding: 0;
        min-height: 300px;

        .dialog-body {
            height: 100%;
            min-height: 300px;
        }
    }

    .svgicon {
        margin-right: 5px;
    }

    .el-dialog__header {
        background-color: #e1e4e8;
        border-radius: 8px 8px 0 0;
        margin-right: 0;
        padding: 12px 0 12px 16px;
        height: 44px;
    }

    .el-dialog__title {
        font-size: 16px;
        color: #333333;
        line-height: normal;
    }

    .el-dialog__headerbtn {
        top: 0;
        height: 28px;
        width: 28px;
        margin: 8px 16px 8px 0;

        // font-size: 18px;
        svg {
            color: #666666;
        }
    }

    .el-dialog__footer {
        padding: 10px 24px;
        border-top: 1px solid #dcdfe6;

        // text-align: center;
        .el-button {
            padding: 8px 24px;
            border-radius: 0;
            height: 32px;
            font-size: 12px;
        }

        .el-button+.el-button {
            margin-left: 16px;
        }
    }

    .el-scrollbar__wrap {
        max-height: calc(90vh - 120px);
    }

    .el-scrollbar__view {
        padding: 16px 32px;
    }
}
</style>
