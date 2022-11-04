---
# 设置作者
author: xiezhitao
# 设置写作时间
date: 2022-10-20
---

# FitsUpload 文件上传组件

### 基础用法

<demo src="../../../src/views/components-manage/pdf/pdfupload-example/baseUpload.vue" title="基础用法" desc="通过url配置上传地址"></demo> <br/>

### 上传 png 格式文件

<demo src="../../../src/views/components-manage/pdf/pdfupload-example/typeUpload.vue" title="上传 png 格式文件" desc="通过type配置组件允许上传的类型"></demo> <br/>

### 组件插槽

<demo src="../../../src/views/components-manage/pdf/pdfupload-example/slotUpload.vue" title="组件插槽" desc="通过插槽配置自定义组件"></demo> <br/>

### 组件方法

<demo src="../../../src/views/components-manage/pdf/pdfupload-example/emitUpload.vue" title="组件方法" desc="预留组件各个阶段触发的方法,查看控制台了解各个方法的触发情况。注意：因大小或类型限制在上传前就将被拦截，所以不触发上传失败"></demo> <br/>

### FitsUpload 文件上传组件的属性

| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| url | 上传接口地址 | string | 必填 | 模拟上传接口地址 |
| method | 设置接口请求的方法 | string | 非必填 | "post" |
| data | 上传时附带的额外参数 | object | 非必填 | - |
| withCredentials | 支持发送 cookie 凭证信息 | boolean | 非必填 | false |
| name | 上传的文件字段名 | string | 非必填 | "file" |
| disabled | 是否禁用上传 | boolean | 非必填 | false |
| showfile | 是否显示已上传文件列表 | boolean | 非必填 | false |
| limit | 允许上传文件的最大数量 | number | 非必填 | 5 |
| type | 允许上传的类型,[更多](https://blog.csdn.net/qq_42108192/article/details/81938674) | string | 非必填 | "application/pdf" |
| size | 允许上传的文件大小，单位（M） | number | 非必填 | 2 |
| width | 上传组件的宽度 | string | 非必填 | "50%" |
| draggable | 上传组件是否可拖动 | boolean | 非必填 | false |

### 事件

| 事件名 | 说明 | 传入参数 | 返回参数 |
| :-- | :-- | :-- | :-- |
| onbeforeUpload | 文件上传前的回调 | - | rawFile |
| onChange | 文件上传状态改变的回调，添加文件、上传成功和上传失败时都会被调用 | - | uploadFile, uploadFiles |
| onProgress | 文件上传中的回调 | - | uploadFile, uploadFiles |
| onSuccess | 文件上传成功时的回调 | - | response, uploadFile, uploadFiles |
| onError | 文件上传失败时的回调 | - | response, uploadFile, uploadFiles |
| beforeRemove | 删除已上传文件前的回调 | - | uploadFile, uploadFiles |
| onRemove | 删除已上传文件的回调 | - | uploadFile, uploadFiles |
| onPreview | 点击已上传的文件的回调 | - | uploadFile |
| onExceed | 超出文件上传个数限制的回调 | - | uploadFiles |

### 插槽

| 插槽名       | 说明                         |
| :----------- | :--------------------------- |
| uploadState  | 组件上传文件状态显示的内容   |
| text         | 组件中部图标上显示的文字内容 |
| icon         | 组件中部显示的图标内容       |
| bottomText   | 组件中部图标下显示的文字内容 |
| uploadBottom | 组件底部的文字内容           |
