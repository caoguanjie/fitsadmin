<template>
  <div class="login-container">
    <img src="@/assets/Login/fitslogo.png" alt="" class="fitslogo">
    <left-pannel />
    <div class="right-pannel">
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
          <main-login />
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
      <div class="login-tips">最佳浏览环境：Chrome64及以上，1920*1080显示分辨率</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
// 组件依赖
import { SvgIcon } from '@/fits-components';
import LeftPannel from './components/LeftPannel.vue';
import ScanCode from './components/ScanCode.vue';
import MainLogin from './components/MainLogin.vue'
// API依赖
import ENV from '@/environment/index';

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

<style lang="scss" scoped>
$rightPannelWidth: 670px;
$inputHeight: 40px;
$leftPannelWidth: 630px;

.login-container {
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  min-height: 650px;
  background: #fff;

  .fitslogo {
    position: fixed;
    z-index: 99;
    width: 110px;
    left: 30px;
    top: 21px;
  }



  .right-pannel {
    min-width: $rightPannelWidth;
    flex: 1;
    display: flex;
    position: relative;
    background-image: url(@/assets/Login/bg3.svg);
    background-repeat: no-repeat;
    background-size: 883px 697px;
    background-position: 33% 42%;
    justify-content: center;
    align-items: center;
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


  .login-tips {
    position: absolute;
    bottom: 22px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    line-height: 13px;
    letter-spacing: 2px;
    color: #666666;
    min-width: 380px;

    &::after,
    &::before {
      content: "";
      position: absolute;
      display: block;
      width: 30px;
      height: 1px;
      bottom: 50%;
      transform: translateY(-50%);
      background-color: #cccccc;
    }

    &::before {
      left: -40px;
    }

    &::after {
      right: -40px;
    }
  }

  .login-form {
    width: 450px;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    position: relative;
  }

  .form-box {
    padding: 0 40px;
  }



  .app-download {
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

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

  .rightLogo {
    position: absolute;
    right: 8px;
    top: 4px;
    font-size: 48px;
    user-select: none;
  }



}
</style>
