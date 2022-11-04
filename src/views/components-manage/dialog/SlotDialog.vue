<template>
    <el-button @click="visible = true" type="primary">
        打开弹窗
    </el-button>

    <fits-dialog :visible="visible" :dialogProp="dialogProp" submitText="提交" cancelText="返回" @cancel="visible = false"
        @submit="visible = false">
        <!-- 自定义头部 -->
        <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
                <span :id="titleId" :class="titleClass">自定义头部！</span>
                <el-button type="danger" @click="close">
                    <el-icon class="el-icon--left">
                        <CircleCloseFilled />
                    </el-icon>
                    Close
                </el-button>
            </div>
        </template>
        <!-- 内容区域 -->
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
    </fits-dialog>
</template>

<script lang="ts" setup>
import { FitsDialog } from '@/fits-components';
import { CircleCloseFilled } from '@element-plus/icons-vue'

const visible = ref(false)
const dialogProp = reactive({
    title: '基础弹窗',
    showClose: false
})
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.my-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>