<template>
    <div class="upload-example">
        <fits-upload :url="data.url" :data='{ state: 1, state2: 2 }' />
    </div>
</template>

<script setup lang="ts">
import { FitsUpload } from '@/fits-components';
const data = {
    url: "http://192.168.32.108:3000/mock/78/api/uploadPDF"
}
</script>

<style lang="scss" scoped>

</style>
  