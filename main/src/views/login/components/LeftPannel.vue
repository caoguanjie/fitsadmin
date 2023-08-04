<template>
    <div class="left-pannel LoginLeftPannel">
        <el-carousel :interval="3000" arrow="hover" class="swiper">
            <el-carousel-item class="swiper" v-for="item of banner" :key="item.label">
                <div class="desc">{{ item.label }}</div>
                <img :src="item.imgs" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';

const banner = reactive([
    {
        label: 'fits-vue3-element 是基于 vue3-element-admin 升级的 Vue3 版本后台管理前端解决方案；使用前端主流技术栈 Vue3 + Vite2 + TypeScript + Vue Router + Pinia + Volar + Element Plus 等',
        // 在vite里面，只能这样解析URL，或者通过import导入
        imgs: new URL('../../../assets/Login/img1.svg', import.meta.url).href
    },
    {
        label: '实现功能包括不限于动态权限路由、按钮权限控制、主题切换、系统管理基础模块，各种范例展示等等',
        imgs: new URL('../../../assets/Login/img2.svg', import.meta.url).href
    },
    {
        label: 'fits-vue3-element是丰德科技前端框架组于2022年最新后台管理系统框架，基于该框架开发了资产管理系统、康复管理系统等等',
        imgs: new URL('../../../assets/Login/img3.svg', import.meta.url).href
    }
])

</script>
<style lang='scss'>
.LoginLeftPannel {

    .el-carousel__container {
        width: 100%;
        height: 100%;
    }

    .el-carousel__item {
        display: flex;
        flex-flow: column wrap;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
    }

    .el-carousel__indicators--horizontal {
        bottom: 50px;
    }



    .el-carousel__indicator.is-active button {
        background-color: #409eff;
    }

}
</style>
<style lang='scss' scoped>
$leftPannelWidth: 33%;
$leftPannelMinWidth: 430px;
// $leftPannelMaxWidth: 630px;

.left-pannel {
    width: $leftPannelWidth;
    min-width: $leftPannelMinWidth;
    display: flex;
    position: relative;
    padding: 0 20px;
    background-image: url(@/assets/Login/bg1.svg), url(@/assets/Login/bg2.svg);
    background-repeat: no-repeat;
    background-position: center top, center bottom;
    background-size: auto 262px, auto 262px;
    background-color: #e1f0ff;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-flow: column wrap;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
}

.swiper {
    width: 100%;
    height: 100%;
}

.desc {
    padding: 0 90px 80px;
    font-size: 20px;
    color: #1d4976;
}

@media only screen and (max-width: 1366px) {
    // .left-pannel {
    //     width: 430px;
    // }

    .desc {
        padding: 0 40px 30px;
        font-size: 17px;
    }
}

@media only screen and (max-width: 1000px) {
    .left-pannel {
        display: none;
    }

    .desc {
        padding: 0 40px 30px;
        font-size: 17px;
    }
}
</style>