<template>
    <div class="upload-example">
        <fits-upload :showfile="true" @onSuccess='Success' @onError='Error' @onProgress="Progress" @onChange="Change"
            @onRemove='Remove' @onPreview="Preview" @onbeforeUpload="beforeUpload" @onExceed="Exceed" />
    </div>
</template>

<script setup lang="ts">
import FitsUpload from '@/components/DocumentsUpload/FitsUpload.vue';
const Change = (data: any) => {
    console.log("文件状态改变", data)
}
const beforeUpload = (data: any) => {
    console.log("上传前", data)
}
const Progress = (data: any) => {
    console.log("上传中", data)
}
const Success = (data: any) => {
    console.log("上传成功", data)
}
const Error = (data: any) => {
    console.log("上传失败", data)
}
const Remove = (data: any) => {
    console.log("删除上传完成的文件", data)
}
const Preview = (data: any) => {
    console.log("点击上传完成的文件", data)
}
const Exceed = (data: any) => {
    console.log("超出上传文件个数限制", data)
}
</script>

<style lang="scss" scoped>

</style>
  