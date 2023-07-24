<template>
    <div class="upload-example">
        <fits-upload>
            <template #uploadTemplate>
                <div>这是顶部插槽</div>
            </template>
            <template #text>
                <div>这是文字插槽</div>
            </template>
            <template #icon-unUpload>
                <el-image style="width: 100%; height: 100%" :src="url" />
            </template>
            <template #bottomText>
                <div>这是图标底部的插槽</div>
            </template>
            <template #uploadBottom>
                <div>这是底部插槽</div>
            </template>
        </fits-upload>
    </div>
</template>

<script setup lang="ts">
import { FitsUpload } from '@/fits-components';

let url = ref(new URL(`../../../../assets/document-icons/png/pdf.png`, import.meta.url).href)

</script>

<style lang="scss" scoped>

</style>
  