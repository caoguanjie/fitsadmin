<template>
    <div class="scanCode">
        <div class="title">
            <div class="big">APP扫码快捷登录</div>
            <div class="subtitle">使用{{ title }}APP扫描二维码安全登陆</div>
        </div>
        <div class="img">
            <img src="@/assets/Login/democode.png" alt="" />
            <div class="mark" v-loading="loading" element-loading-text="正在加载中..."
                element-loading-background="rgba(0, 0, 0, 0.6)">
            </div>
        </div>

    </div>
</template>

<script lang='ts' setup>
import ENV from '@/environment/index';
import { onMounted, ref } from 'vue';
const { project: { title } } = ENV;
const loading = ref(false)

onMounted(() => {
    setTimeout(() => {
        loading.value = true
    }, 3000)
})


</script>
<style lang='scss'>
.mark {
    .el-loading-spinner {
        margin-top: -40px;
    }

    .el-loading-spinner .el-loading-text {
        font-size: 14px;
        color: #fff;
        opacity: 1;
    }

    .el-loading-spinner .path {
        --el-color-primary: #fff;
    }

}
</style>
<style lang='scss' scoped>
.scanCode {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px 30px;
}

.big {
    text-align: center;
    font-size: 18px;
    color: #333333;
}

.subtitle {
    text-align: center;
    padding: 10px 0 40px;
    font-size: 14px;
    color: #999999;
}

.img {
    width: 200px;
    height: 200px;
    padding: 10px;
    border-radius: 8px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
}

.mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
    // background-color: rgba($color: #000000, $alpha: 0.6);

    & * {
        cursor: pointer;
        color: #fff;
    }

}
</style>