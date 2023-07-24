<template>
    <fits-editor v-model="containerHtml" :excludeKeys="excludeKeys" />
</template>
  
<script setup lang="ts">
import { FitsEditor } from '@/fits-components';
let containerHtml = ref("")
const excludeKeys = [
    // "headerSelect",//标题选择
    // "blockquote",//引用
    // "|",
    // "bold",//粗体
    "underline",//下划线
    "italic",//斜体
    "group-more-style",//（菜单组）
    "color",//文字颜色
    "bgColor",//背景色
    "|",
    "fontSize",//默认字号         
    "fontFamily",//默认字体
    "lineHeight",//默认行高
    "|",
    "bulletedList",//无序列表
    "numberedList",//有序列表
    "todo",//待办框
    "group-justify",//（菜单组）
    "group-indent",//（菜单组）
    "|",
    "emotion",//表情
    "insertLink",//插入链接
    "group-image",//（菜单组）
    "group-video",//（菜单组）
    "insertTable",//插入表格
    "codeBlock",//插入代码块
    "divider",//分割线
    "|",
    "undo",//撤销
    "redo",//还原上一步的撤销
    "|",
    "fullScreen",//全屏
]
</script>

<style lang="scss" scoped>

</style>
  