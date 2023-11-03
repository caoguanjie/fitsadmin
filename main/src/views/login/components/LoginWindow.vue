<template>
    <div class="login-form">
        <el-tooltip v-if="!isScanCodeLogin && loginSetting.appScanCode" class="box-item" effect="accout-login"
            :visible="true" :content="curentLoginText" placement="left">
            <div class="rightLogo">
                <svg-icon icon-class="accoutlogo" @click="handleLoginModel()" />
            </div>
        </el-tooltip>
        <div class="scancodelogin rightLogo" v-if="isScanCodeLogin && loginSetting.appScanCode">
            <svg-icon icon-class="ewnlogin" @click="handleLoginModel()" />
        </div>
        <div class="mainLogin" v-if="isScanCodeLogin">
            <div class="title-box">
                <div class="title">{{ title }}</div>
                <div class="subtitle">{{ subTitle }}</div>
            </div>
            <main-login style="-webkit-app-region: no-drag;" />
            <div class="app-download" v-if="loginSetting.appDownload">
                <el-popover placement="top" :hide-after="0" popper-class="loginAppdownload" :width="180" trigger="click">
                    <template #reference>
                        <el-button class="btn" text bg>
                            <svg-icon icon-class="ios" />iPhone
                        </el-button>
                    </template>
                    <div class="appimg">
                        <img src="@/assets/Login/IOSCode.png" alt="">
                        <span class="text">扫描下载iOS客户端</span>
                    </div>
                </el-popover>
                <span class="hr" />
                <el-popover placement="top" :hide-after="0" popper-class="loginAppdownload" :width="180" trigger="click">
                    <template #reference>
                        <el-button class="btn" text bg>
                            <svg-icon icon-class="android" />Android
                        </el-button>
                    </template>
                    <div class="appimg">
                        <img src="@/assets/Login/AndroidCode.png" alt="">
                        <span class="text">扫描下载Android客户端</span>
                    </div>
                </el-popover>
            </div>
        </div>
        <ScanCode v-else />
    </div>
</template>

<script lang='ts' setup>
import { SvgIcon } from '@/fits-components';
import MainLogin from './MainLogin.vue'
import ENV from '@/environment/index';
import ScanCode from './ScanCode.vue';
const { project: { title, subTitle }, login: loginSetting } = ENV

const state = reactive({
    redirect: '',
    curentLoginText: loginSetting.accountLogin ? '账号登录' : '验证码登录',
    isScanCodeLogin: true,
    // 是否开始倒计时
    isCoutDown: false,
    otherQuery: {},
});

const {
    curentLoginText,
    isScanCodeLogin,
} = toRefs(state);


/**
 * 处理登录类型
 */
function handleLoginModel() {
    state.isScanCodeLogin = !state.isScanCodeLogin;
}

</script>
<style lang='scss' scoped>
.login-form {
    width: 450px;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}

.app-download {
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-app-region: no-drag;

    .btn {
        width: 76px;
        height: 26px;
        background-color: #f8f9fc;
        border-radius: 13px;
        font-size: 12px;
        border: none;

        &>span>* {
            margin-right: 5px;
        }
    }

    .hr {
        margin: 0 10px;
        width: 2px;
        height: 13px;
        border: solid 1px #e2e2e2;
    }

}

.title-box {
    margin: 50px auto 36px;
    text-align: center;

    .title {
        font-size: 18px;
        line-height: 26px;
        margin-bottom: 6px;
        color: #333333;
    }

    .subtitle {
        font-size: 12px;
        color: #b8b8b8;

    }
}

.rightLogo {
    position: absolute;
    right: 8px;
    top: 4px;
    font-size: 48px;
    user-select: none;
    -webkit-app-region: no-drag;
}
</style>

<style lang="scss">
.loginAppdownload {
    display: flex;
    justify-content: center;
    align-items: center;
    --el-popover-padding: 20px;
    --el-box-shadow-light: 0px 0px 4px 0px rgba(0, 0, 0, 0.11);
    opacity: 0.9;

    img {
        display: block;
        width: 128px;
        height: 128px;
    }

    span.text {
        display: block;
        width: 100%;
        margin-top: 11px;
        font-size: 12px;
        color: #666666;
        text-align: center;
    }
}

.el-popper.is-accout-login {
    /* Set padding to ensure the height is 32px */
    padding: 9px 7px;
    font-size: 12px;
    color: #fff;
    background-color: #409eff;
    box-shadow: 0px 2px 4px 0px rgba(2, 24, 46, 0.28);
    border-radius: 6px;
}

.el-popper.is-accout-login .el-popper__arrow::before {
    background-color: #409eff;
    right: 0;
}
</style>