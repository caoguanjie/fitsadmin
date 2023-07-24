<template>
    <fits-editor v-model="containerHtml" />
</template>
  
<script setup lang="ts">
import { FitsEditor } from '@/fits-components';
let containerHtml = ref("<p>正文</p><br/><p>内容</p>")
</script>

<style lang="scss" scoped>

</style>
  