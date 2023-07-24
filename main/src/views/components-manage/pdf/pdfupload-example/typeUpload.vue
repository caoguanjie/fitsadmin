<template>
    <div class="upload-example">
        <fits-upload :type='type' :limit="100" />
    </div>
</template>

<script setup lang="ts">
import { FitsUpload } from '@/fits-components';

const type = ["images", "video", "audio", "pdf", "docx", "excel", "ppt", "apk", "zip", "txt", "exe"]

</script>

<style lang="scss" scoped>

</style>
  