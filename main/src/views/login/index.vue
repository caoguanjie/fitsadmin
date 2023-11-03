<template>
  <div class="login-container" v-if="!isElectron">
    <img src="@/assets/Login/fitslogo.png" alt="" class="fitslogo">
    <left-pannel />
    <div class="right-pannel">
      <LoginWindow />
      <div class="login-tips">最佳浏览环境：Chrome64及以上，1920*1080显示分辨率</div>
    </div>
  </div>
  <LoginWindow style="box-shadow: none; border: none; -webkit-app-region: drag;" v-else />
</template>

<script setup lang="ts">

import LeftPannel from './components/LeftPannel.vue';
import LoginWindow from './components/LoginWindow.vue';
import { isPlatform } from '@/utils/base/platform';
const isElectron = isPlatform('electron')

</script>



<style lang="scss" scoped>
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
    flex: 1;
    display: grid;
    place-items: center;
    position: relative;
    background-image: url(@/assets/Login/bg3.svg);
    background-repeat: no-repeat;
    background-size: 883px 697px;
    background-position: 33% 42%;

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

}
</style>
