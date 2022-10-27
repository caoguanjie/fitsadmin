<template>
    <el-button @click="visible = true" type="primary">
        打开侧边弹窗
    </el-button>

    <fits-drawer :visible="visible" :dialogProp="dialogProp" :showFooter="false" @cancel="visible = false"
        @submit="visible = false">
        <h1>我是基础弹窗</h1>
        <h2>我是基础弹窗</h2>
        <h3>我是基础弹窗</h3>
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
    </fits-drawer>
</template>

<script lang="ts" setup>
import { FitsDrawer } from '@/fits-components';
const visible = ref(false)
const dialogProp = reactive({
    title: '侧边弹窗',
    withHeader: false
})
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>