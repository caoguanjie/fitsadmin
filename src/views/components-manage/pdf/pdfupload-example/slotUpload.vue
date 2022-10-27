<template>
    <div class="upload-example">
        <fits-upload>
            <template #uploadState>
                <div>这是上传状态插槽</div>
            </template>
            <template #text>
                <div>这是文字插槽</div>
            </template>
            <template #icon>
                <div class="icon1" />
            </template>
            <template #bottomText>
                <div>这是底部文字插槽</div>
            </template>
            <template #uploadBottom>
                <div>这是上传框底部插槽</div>
            </template>
        </fits-upload>
    </div>
</template>

<script setup lang="ts">
import FitsUpload from '@/components/DocumentsUpload/FitsUpload.vue';
</script>

<style lang="scss" scoped>
.upload-example {
    .icon1 {
        background: url(@/assets/document-icons/pdf.png) no-repeat;
        width: 100%;
        height: 100%;
        background-size: 100%;
    }
}
</style>
  