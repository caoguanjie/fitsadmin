<template>
    <div class="drag-dialog">
        <el-button @click="visible = true" type="primary">
            打开弹窗
        </el-button>

        <fits-dialog :visible="visible" :dialogProp="dialogProp" @cancel="visible = false" @submit="visible = false">
            <div>我是拖拽弹窗</div>
            <div>我是拖拽弹窗</div>
            <div>我是拖拽弹窗</div>
            <div>我是拖拽弹窗</div>
            <div>我是拖拽弹窗</div>
        </fits-dialog>
    </div>
</template>

<script lang="ts" setup>
import { FitsDialog } from '@/fits-components';
const visible = ref(false)
const dialogProp = reactive({
    title: '拖拽弹窗',
    width: '30%',
    draggable: true
})
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>