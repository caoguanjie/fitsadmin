<template>
    <fits-editor v-model="containerHtml" />
</template>
  
<script setup lang="ts">
let containerHtml = ref("<p>正文</p><br/><p>内容</p>")
</script>

<style lang="scss" scoped>

</style>
  