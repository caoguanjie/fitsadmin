---

# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-31
# 不显示侧边栏菜单
index: false
# 设置在桌面模式下是否在右侧显示标题列表。
toc: false
# 关闭评论系统
comment: false
# 标题
# title: false
# 关闭页面信息
pageInfo: false
footer: 设计素材提供者 | 前端框架组 UI设计师 陈连珠
---



# 资源


## 设计资源

更多设计资源正在处于开发状态。

如果您有兴趣参与 FitsAdmin UI 的设计，请通过 `caogj@fits.com.cn` 联系我们。
<UiAssets></UiAssets>



## UI效果图

## 登录

<div class="preview">

![扫码登录](/images/ui/login/扫码登录.png)  
![刷新二维码](/images/ui/login/刷新二维码.png)  
![验证码登录](/images/ui/login/验证码登录.png)  
![账号登录](/images/ui/login/账号登录.png)  

</div>

## 首页

<div class="preview">

![pc端01](/images/ui/home/home01.png)  
![pc端02](/images/ui/home/home02.png)  
![pc端03](/images/ui/home/home03.png)  

</div>

## 个人中心

<div class="preview">

![01基本信息](/images/ui/user/01基本信息.png)  
![02组织关系](/images/ui/user/02组织关系.png)  
![03修改密码](/images/ui/user/03修改密码.png)  
![04修改密码](/images/ui/user/04修改密码.png)  

</div>


## 系统管理

<div class="preview">

![pc端01](/images/ui/system/01.png)  
![pc端02](/images/ui/system/02.png)  
![pc端03](/images/ui/system/03.png)  
![pc端03](/images/ui/system/04.png)  
![pc端03](/images/ui/system/05.png)  
![pc端03](/images/ui/system/06.png)  

</div>

## ECharts图表

<div class="preview">

![pc端01](/images/ui/echart/01.png)  
![pc端02](/images/ui/echart/02.png)  
![pc端03](/images/ui/echart/03.png)  


</div>

## Tabs切换效果

<div class="preview">

![pc端01](/images/ui/tab/01.png)  
![pc端02](/images/ui/tab/02.png)  


</div>

## 弹窗效果

<div class="preview">

![弹窗其他](/images/ui/diglog/弹窗其他.png)  
![左侧](/images/ui/diglog/左侧.png)  
![左侧详情](/images/ui/diglog/左侧详情.png)  


</div>

<script setup lang="ts">
    import { onMounted, reactive, toRefs } from 'vue';
    import UiAssets from "@UiAssets";
    onMounted(() => {
        document.querySelector('.page-title').style.display = 'none';
    })
   
</script>
<style lang='scss' scoped>


    .theme-hope-content:not(.custom),.page-title{
        max-width: 1080px;
    }
    .preview>p{
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap
    }
    img{
        display: inline-block;
        width: 32%;
        border: 1px solid #e4e7ed;
        margin-bottom: 20px;
    }
    img:hover {
    box-shadow: 0px 0px 24px rgba(0, 0, 0, .12)
}
</style>