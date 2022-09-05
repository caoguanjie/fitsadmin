<template>
    <div class="home-container">
        <div class="welcomebg" />
        <div class="title-box">
            <div class="title">{{ user.nickname }}您好，</div>
            <div class="title">欢迎登录{{ title }}</div>
            <div class="subtitle">Welcome to {{ subTitle }}</div>
        </div>
        <FitsButtonTest />
    </div>
</template>

<script lang='ts' setup>

import useStore from '@/store';
import ENV from '@/environment/index';

const { project: { title, subTitle } } = ENV
const { user } = useStore()

</script>
<style lang='scss' scoped>
.home-container {
    position: relative;
    height: calc(100vh - $headHeight - $tagsViewHeight - $basePadding);
    background-color: #fff;
    background-image: linear-gradient(180deg,
            #eff5fd 0%,
            #ffffff 100%);

    background-position: top center;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .welcomebg {
        position: absolute;
        width: 100%;
        height: inherit;
        background: url(@/assets/Base/webcome.svg) no-repeat;
        background-position: 80% 60%;
        background-size: auto 55%;
    }

    .title-box {
        position: absolute;
        left: 70px;
        top: 140px;

        .title {

            font-size: 30px;
            color: #1b8afe;
            font-weight: 500;
        }

        .subtitle {
            margin-top: 10px;
            font-size: 16px;
            color: #999999;
        }
    }

}
</style>