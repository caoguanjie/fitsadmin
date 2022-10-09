<template>
    <el-button @click="visible=true" type="primary">
        打开弹窗
    </el-button>

    <fits-dialog :visible="visible" :dialogProp="dialogProp" @cancel="visible=false" @submit="visible=false">
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
        <div>我是基础弹窗</div>
    </fits-dialog>
</template>

<script lang="ts" setup>
const visible = ref(false)
const dialogProp = reactive({
    title: '基础弹窗',
    width: '30%',
})
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>