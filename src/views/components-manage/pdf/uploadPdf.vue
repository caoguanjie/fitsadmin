<template>
    <div class="upload-example">
        <fits-card title="基础用法" desc="上传组件的基础用法，配置上传地址，可以通过拖动和点击上传">
            <base-upload />
        </fits-card>

        <fits-card title="上传不同格式文件" desc="通过配置type，修改上传框允许上传的文件类型，中间图标需要通过插槽配置">
            <type-upload />
        </fits-card>

        <fits-card title="组件插槽" desc="设置了多个插槽，可以自定义修改插槽各个样式">
            <slot-upload />
        </fits-card>

        <fits-card title="组件方法" desc="预留了多个方法，满足条件时触发,通过控制台查看回调触发情况">
            <emit-upload />
        </fits-card>
    </div>
</template>

<script setup lang="ts">
import baseUpload from "@/views/components-manage/pdf/pdfupload-example/baseUpload.vue"
import typeUpload from "@/views/components-manage/pdf/pdfupload-example/typeUpload.vue"
import slotUpload from "@/views/components-manage/pdf/pdfupload-example/slotUpload.vue"
import emitUpload from "@/views/components-manage/pdf/pdfupload-example/emitUpload.vue"
import FitsCard from '@/components/Card/FitsCard.vue'
</script>

<style lang="scss" scoped>

</style>
  