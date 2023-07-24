<template>
    <el-button-group class="button-group">
        <el-button type="primary" @click="isEdit = false"> 只读</el-button>
        <el-button type="primary" @click="isEdit = true">编辑</el-button>
    </el-button-group>
    <fits-editor :isToolbar="true" v-model="containerHtml" :isEditer="isEdit" />
</template>
  
<script setup lang="ts">
import { FitsEditor } from '@/fits-components';
let containerHtml = ref("<p>内容</p></br><img src='https://caoguanjie.github.io/fitsadmin/images/20220810082733.png'></img>")
let isEdit = ref(true)
</script>

<style lang="scss" scoped>
.button-group {
    margin-bottom: 20px;
}
</style>
  