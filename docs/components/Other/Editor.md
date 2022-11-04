---
# 设置作者
author: xiezhitao
# 设置写作时间
date: 2022-10-20
---

# FitsEditor 富文本编辑器

### 基础用法

<demo src="../../../src/views/components-manage/wangEditor/editor-examples/baseEditor.vue" title="基础用法" desc="给编辑器绑定String类型的变量,在编辑器内输入的内容都将以HTML保存"></demo> <br/>


### 配置上传方法

<demo  src="../../../src/views/components-manage/wangEditor/editor-examples/uploadEditor.vue" title="配置编辑器上传地址" desc="除非不使用图片上传，否则必须通过配置uploadImg方法，给编辑器绑定图片上传地址。"></demo> <br/>

### 自定义工具栏-删除默认配置

<demo src="../../../src/views/components-manage//wangEditor/editor-examples/excludeEditor.vue" title="删除默认配置" desc="如果仅仅想排除掉某些菜单，其他都保留，可以传入excludeKeys进行配置，删除工具栏某些配置"></demo> <br/>

### 自定义工具栏-重写配置

<demo src="../../../src/views/components-manage//wangEditor/editor-examples/resetEditor.vue" title="重写工具栏配置" desc="通过传入数组toolbarKeys，重新配置工具栏，显示哪些菜单，以及菜单的排序、分组。"></demo> <br/>

### 只读、编辑状态切换

<demo  src="../../../src/views/components-manage/wangEditor/editor-examples/isreadEditor.vue" title="切换编辑器只读、编辑状态" desc="有些需求是需要控制编辑器只读或者编辑状态，可以给编辑器传入isEditer切换只读、编辑状态"></demo> <br/>

### 不隐藏工具栏

<demo  src="../../../src/views/components-manage/wangEditor/editor-examples/istoolbarEditor.vue" title="只读状态下不隐藏工具栏" desc="当需要只读状态下只是不能操作，不隐藏工具栏时，可以通过配置siToolbar的值为true实现。"></demo> <br/>

### 禁用图片预览

<demo  src="../../../src/views/components-manage/wangEditor/editor-examples/isPreviewEditor.vue" title="禁用只读状态下的图片预览" desc="默认是支持只读状态下的图片预览，如果需要关闭，可以通过配置isPreview实现"></demo> <br/>

### 固定高度及更多样式

<demo  src="../../../src/views/components-manage/wangEditor/editor-examples/noscrollEditor.vue" title="修改编辑器的样式" desc="通过配置isScroll值为true和自定义类名以及!important改变编辑器的样式"></demo> <br/>

### FitsEditor 富文本编辑器的属性

| 属性 | 说明 | 类型 | 必填项 | 默认值 |
| :-- | :-- | :-- | :-- | :-- |
| excludeKeys | 删除工具栏中的默认配置 | array | 非必填 | - |
| toolbarKeys | 重新配置工具栏的配置 | array | 非必填 | - |
| isEditer | 切换编辑器只读、编辑状态 | boolean | 非必填 | true |
| isToolbar | 只读状态下是否隐藏工具栏,默认隐藏 | boolean | 非必填 | false |
| autoFocus | 是否默认自动聚焦输入框 | boolean | 非必填 | true |
| isScroll | 编辑器是否产生滚动条,默认随内容自增高度 | boolean | 非必填 | fals |
| isInfinite | 预览图片时是否循环，默认不开启 | boolean | 非必填 | false |
| isPreview | 是否开启只读状态下的图片预览，默认开启 | boolean | 非必填 | true |
| placeholder | 编辑器提示内容 | string | 非必填 | 请输入内容... |
| ToolbarClass | 工具栏自定义类名 | string | 非必填 | - |
| EditorClass | 编辑器自定义类名 | string | 非必填 | - |

### 方法

| 事件名 | 说明 | 需要参数类型 | 返回数据 |
| :-- | :-- | :-- | --- |
| uploadImg | 上传图片的方法，绑定的方法有一个 file 和一个 callback，并在 callback 中将接口返回的数据传给编辑器 | file , callback(接口返回的数据) | - |
| uploadVideo | 上传视频的方法，绑定的方法有一个 file 和一个 callback，并在 callback 中将接口返回的数据传给编辑器 | file , callback(接口返回的数据) | - |
| onCreated | 编辑器创建后触发 | - | - |
| onChanged | 编辑器改动时触发,返回编辑器中的内容 | - | string |
| getText | 编辑器改动时触发,返回编辑器中的纯文本内容 | - | string |
| beforeUploadImg | 在调用上传图片方法之前触发,返回上传的文件 | - | file |
| afterUploadImg | 上传图片之后触发,返回上传的文件 | - | file |
| beforeEditordestory | 编辑器销毁前触发 | - | - |
| afterEditordestory | 编辑器销毁后触发 | - | - |

### 插槽

暂无可用插槽
