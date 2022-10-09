---
# 设置作者
author: wuzeling
# 设置写作时间
date: 2022-10-08
---
# FitsDrawer 抽屉

### 基础用法
<demo src="../../../src/views/components-manage/drawer/BasicDrawer.vue" title="基础用法" desc="需要设置 `visible` 属性，为 `true` 时显示。`dialogProp` 属性用于设置弹窗组件的配置。"></demo>
<br/> 

### 自定义头部、底部内容
<demo src="../../../src/views/components-manage/drawer/SlotDrawer.vue" title="自定义头部、底部内容" desc="通过使用插槽 `header` 和 `footer`，可以自定义头部和底部按钮区域的内容。通过设置 `submitText` 和 `cancelText`，分别定义确定按钮和取消按钮的显示文字。"></demo>
<br/> 

### 隐藏头部、底部内容
<demo src="../../../src/views/components-manage/drawer/HideDrawer.vue" title="隐藏头部、底部内容" desc="通过设置 `dialogProp.withHeader = false` 和 `showFooter = false` 可以隐藏抽屉的头部和底部内容区域。"></demo>
<br/> 

### FitsDrawer 抽屉的属性
| 属性 | 说明 | 类型  | 必填项 | 默认值 |
| :-- | :-- | :-- | :---- | :---- |
| visible | 控制弹窗是否可见 | boolean | 必填 | false |
| submitText | 确定按钮的文字 | string | 非必填 | 确定 |
| cancelText | 取消按钮的文字 | string | 非必填 | 取消 |
| showFooter | 是否显示弹窗的底部区域 | boolean | 非必填 | true |
| dialogProp | 抽屉组件的配置 | [drawerProps](https://element-plus.org/zh-CN/component/drawer.html#drawer-%E5%B1%9E%E6%80%A7) | 非必填 | - |

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
