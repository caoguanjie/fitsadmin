<template>
    <div class="upload-example">
        <fits-upload :type='type'>
            <template #icon>
                <div class="icon1" />
            </template>
        </fits-upload>
    </div>
</template>

<script setup lang="ts">
import FitsUpload from '@/components/DocumentsUpload/FitsUpload.vue';
const type = "image/png"
</script>

<style lang="scss" scoped>
.upload-example {
    .icon1 {
        background: url(@/assets/document-icons/png.png) no-repeat;
        width: 100%;
        height: 100%;
        background-size: 100%;
    }
}
</style>
  