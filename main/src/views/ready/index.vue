<template>
    <div class="ready-container">
        <div class="welcomebg" />
        <div class="title-box">
            <div class="title">功能开发中…</div>
            <div class="title">正在努力研发中，敬请期待哦～～～</div>
            <div class="subtitle">This feature is under development, so stay tuned~~~</div>
        </div>
    </div>
</template>

<script lang='ts' setup>

</script>
<style lang='scss' scoped>
.ready-container {
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
        background: url(@/assets/Base/ready.svg) no-repeat;
        background-position: 80% 60%;
        background-size: auto 50%;
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