<template>
    <fits-editor v-model="containerHtml" :toolbarKeys="toolbarKeys" />
</template>
  
<script setup lang="ts">
import FitsEditor from '@/fits-components/Other/WangEditor/FitsEditor.vue'
let containerHtml = ref("")
let toolbarKeys = [
    "bold",//粗体
    "|",
    "underline",//下划线
    "|",
    "italic",//斜体
    "|",
    "through",//删除线
    "code",//行内代码
    "sub",//下标
    "sup",//上标
    "clearStyle",//清除格式
    "color",//文字颜色
    "bgColor",//背景色
    "fontSize",//默认字号
    "fontFamily",//默认字体
    "indent",//增加缩进
    "delIndent",//减少缩进
    "justifyLeft",//左对齐
    "justifyRight",//右对齐
    "justifyCenter",//居中对齐
    "justifyJustify",//两端对齐
    "lineHeight",//默认行高
    "insertImage",//插入网络图片
    "deleteImage",//删除图片（需对图片操作）
    "editImage",//编辑图片（需对图片操作）
    "viewImageLink",//查看图片链接（需对图片操作，如果插入图片时没有给链接则无效）
    "imageWidth30",//图片显示宽度 30%（需对图片操作）
    "imageWidth50",///图片显示宽度 50%（需对图片操作）
    "imageWidth100",///图片显示宽度 100%（需对图片操作）
    "divider",//分割线
    "emotion",//表情
    "insertLink",//插入链接
    "editLink",//修改链接（需对链接操作）
    "unLink",//取消链接（需对链接操作）
    "viewLink",//查看链接（需对链接操作）
    "codeBlock",//插入代码块
    "blockquote",//引用
    "headerSelect",//标题
    "header1",//h1（包含 headerSelect 的下拉框中）
    "header2",//h2（包含 headerSelect 的下拉框中）
    "header3",//h3（包含 headerSelect 的下拉框中）
    "header4",//h4（包含 headerSelect 的下拉框中）
    "header5",//h5（包含 headerSelect 的下拉框中）
    "todo",//待办框
    "redo",//还原上一步的撤销
    "undo",//撤销
    "fullScreen",//全屏
    "enter",//回车
    "bulletedList",//无序列表
    "numberedList",//有序列表
    "insertTable",//插入表格
    "deleteTable",//删除表格（需对表格操作）
    "insertTableRow",//插入行(需对表格操作)
    "deleteTableRow",//删除行（需对表格操作）
    "insertTableCol",//插入列（需对表格操作）
    "deleteTableCol",//删除列（需对表格操作）
    "tableHeader",//表头阴影（需对表格操作）
    "tableFullWidth",//表格宽度自适应（需对表格操作）
    "insertVideo",//插入网络视频
    "uploadVideo",//上传本地视频
    "editVideoSize",//修改视频尺寸（需对视频操作）
    "uploadImage",//上传图片
    "codeSelectLang"//选择语言（需对代码块操作）
]
</script>

<style lang="scss" scoped>

</style>
  