<template>
    <el-button @click="visible = true" type="primary">
        打开侧边弹窗
    </el-button>

    <fits-drawer :visible="visible" :dialogProp="dialogProp" submitText="提交" cancelText="返回" @cancel="visible = false"
        @submit="visible = false">
        <template #header="{ close, titleId, titleClass }">
            <h4 :id="titleId" :class="titleClass">自定义标题！</h4>
            <el-button type="danger" @click="close">
                <el-icon class="el-icon--left">
                    <CircleCloseFilled />
                </el-icon>
                Close
            </el-button>
        </template>
        <h1>我是基础弹窗</h1>
        <h2>我是基础弹窗</h2>
        <h3>我是基础弹窗</h3>
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
    </fits-drawer>
</template>

<script lang="ts" setup>
import { FitsDrawer } from '@/fits-components';
import { CircleCloseFilled } from '@element-plus/icons-vue'

const visible = ref(false)
const dialogProp = reactive({
    title: '侧边弹窗',
    showClose: false
})
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>