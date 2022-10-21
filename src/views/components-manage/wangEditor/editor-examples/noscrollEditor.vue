<template>
    <fits-editor v-model="containerHtml" :isScroll="true" :EditorClass="'fitsediter'" />
</template>
  
<script setup lang="ts">
let containerHtml = ref("<p>正文</p><br/><p>内容</p>")
</script>

<style lang="scss">
.fitsediter {
    height: 500px !important;
}
</style>
  