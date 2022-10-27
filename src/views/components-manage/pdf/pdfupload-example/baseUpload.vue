<template>
    <div class="upload-example">
        <fits-upload :url='url' :withCredentials="true" />
    </div>
</template>

<script setup lang="ts">
const url = "http://192.168.32.108:3000/mock/78/api/uploadPDF"
</script>

<style lang="scss" scoped>

</style>
  