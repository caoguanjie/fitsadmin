---
# 设置作者
author: wuzeling
# 设置写作时间
date: 2022-10-08
---
# Dialog 弹窗

### 基础用法
<demo src="../../../src/views/components-manage/dialog/BasicDialog.vue" title="基础用法" desc="需要设置 `visible` 属性，为 `true` 时显示。`dialogProp` 属性用于设置弹窗组件的配置。"></demo>
<br/> 

### 可拖拽弹窗
<demo src="../../../src/views/components-manage/dialog/DragDialog.vue" title="可拖拽弹窗" desc="通过设置 `dialogProp.draggable = true` 开启拖拽。"></demo>
<br/> 

### 标题和底部居中
<demo src="../../../src/views/components-manage/dialog/CenterDialog.vue" title="标题和底部居中" desc="通过设置 `dialogProp.center = true` ，居中标题和底部按钮区域。"></demo>
<br/> 

### 自定义头部、底部内容
<demo src="../../../src/views/components-manage/dialog/SlotDialog.vue" title="自定义头部、底部内容" desc="通过使用插槽 `header` 和 `footer`，可以自定义头部和底部按钮区域的内容。通过设置 `submitText` 和 `cancelText`，分别定义确定按钮和取消按钮的显示文字。"></demo>
<br/> 

### 隐藏底部按钮区域
<demo src="../../../src/views/components-manage/dialog/HideFooterDialog.vue" title="隐藏底部按钮区域" desc=" 通过设置 `showFooter = false` 隐藏底部按钮区域。"></demo>
<br/> 


### FitsDialog 弹窗的属性
| 属性 | 说明 | 类型  | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| visible | 控制弹窗是否可见 | boolean | 必填 | false |
| submitText | 确定按钮的文字 | string | 非必填 | 确定 |
| cancelText | 取消按钮的文字 | string | 非必填 | 取消 |
| class | 弹窗的类名 | string | 非必填 | - |
| showFooter | 是否显示弹窗的底部区域 | boolean | 非必填 | true |
| dialogProp | 弹窗组件的配置 | [dialogProps](https://element-plus.org/zh-CN/component/dialog.html#%E5%B1%9E%E6%80%A7) | 非必填 | - |

### 事件
| 事件名 | 说明 | 参数 |
| :-- | :-- | :-- |
| cancel | 点击取消按钮的回调 | - |
| submit | 点击确定按钮的回调 | - |
| open | 弹窗打开的回调 | - |

### 插槽
| 插槽名 | 说明 |
| :-- | :-- |
| - | 弹窗的内容 |
| header | 弹窗头部区域的内容 |
| footer | 弹窗底部区域的内容 |
