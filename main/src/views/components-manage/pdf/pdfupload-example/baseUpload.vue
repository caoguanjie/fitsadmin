<template>
    <div class="upload-example">
        <fits-upload :url="data.url" :data='{ state: 1, state2: 2 }' />
    </div>
</template>

<script setup lang="ts">
import { FitsUpload } from '@/fits-components';
import ENV from '@/environment';
const data = {
    url: `${ENV}/mock/78/api/uploadPDF`
}
</script>

<style lang="scss" scoped></style>
  