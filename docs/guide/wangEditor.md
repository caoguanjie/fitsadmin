---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-23
---


# wangEditor富文本编辑器

::: tip 推荐教程
[Vue3 官方示例](https://www.wangeditor.com/v5/for-frame.html#%E8%B0%83%E7%94%A8-api)
:::

## 安装wangEditor和Vue3组件
```sh
npm install @wangeditor/editor --save
npm install @wangeditor/editor-for-vue@next --save
```

## wangEditor组件封装

```html
<!-- src/components/WangEditor/index.vue -->
<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" style="border-bottom: 1px solid #ccc" :mode="mode" />
    <!-- 编辑器 -->
    <Editor :defaultConfig="editorConfig" v-model="defaultHtml" @onChange="handleChange"
      style="height: 500px; overflow-y: hidden;" :mode="mode" @onCreated="handleCreated" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, shallowRef, reactive, toRefs } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// API 引用
import { uploadFile } from "@/api/system/file";

const props = defineProps({
  modelValue: {
    type: [String],
    default: ''
  },
})

const emit = defineEmits(['update:modelValue']);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const state = reactive({
  toolbarConfig: {},
  editorConfig: {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 自定义图片上传
        async customUpload(file: any, insertFn: any) {
          console.log("上传图片")
          uploadFile(file).then(response => {
            const url = response.data
            insertFn(url)
          })
        }
      }
    }
  },
  defaultHtml: props.modelValue,
  mode: 'default'
})

const { toolbarConfig, editorConfig, defaultHtml, mode } = toRefs(state)


const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}


function handleChange(editor: any) {
  emit('update:modelValue', editor.getHtml())
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

</script>

<style src="@wangeditor/editor/dist/css/style.css">
</style>

```

## 使用案例
```html
<template>
  <div class="component-container">
  	<editor v-model="modelValue.detail" style="height: 600px" />
  </div>
</template>

<script setup lang="ts">
	import Editor from "@/components/WangEditor/index.vue";
</script>
```
![图 4](/images/20220823055148.png)  
