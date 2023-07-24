<template>
  <div class="form-box LoginMainComponent">
    <el-form ref="loginFormRef" label-width="0" :model="loginForm" class="elform" :rules="loginRules"
      v-if="curentLoginType === 'accout' && loginSetting.accountLogin">
      <div class="form-title">账号登录</div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" tabindex="1" auto-complete="on" placeholder="请输入账号" class="logininput"
          clearable @keyup.enter="submitForm" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="passwordType" ref="passwordRef" tabindex="2" auto-complete="on" v-model="loginForm.password"
          placeholder="请输入密码" class="logininput pwd" @keyup.enter="submitForm" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eyeclose' : 'eyeopen'" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" tabindex="3" auto-complete="on" placeholder="请输入验证码"
          @keyup.enter="submitForm" clearable>
          <template #append> <img :src="captchaBase64" @click="handleCaptchaGenerate" class="captcha"></template>
        </el-input>
      </el-form-item>
      <el-form-item class="lastline">
        <div class="item-other">
          <div class="left_remember">
            <el-checkbox v-model="rememberme" label="记住密码" size="small" @change="handleRemenber" />
          </div>
          <div class="right_box" v-if="loginSetting.smsLogin">
            <el-button type="primary" :text="true" class="code-login" @click="changeLoginType('verifycode')">
              验证码登录
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" class="loginBtn" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>

    <el-form label-width="0" ref="loginFormRef" :model="loginForm" :rules="loginVerifyRules" class="elform"
      v-if="curentLoginType === 'verifycode' && loginSetting.smsLogin">
      <div class="form-title">验证码登录</div>
      <el-form-item prop="phone">
        <el-input v-model="loginForm.phone" type="text" maxlength="11" minlength="11" tabindex="1" auto-complete="on"
          placeholder="请输入11位手机" class="logininput" @keyup.enter="submitForm" />
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" maxLength="6" tabindex="2" auto-complete="on" class="codeinput"
          placeholder="请输入验证码" @keyup.enter="submitForm" />
        <el-button type="primary" :text="true" class="verification" :disabled="time !== 0" @click="sendMsg()">
          {{ time === 0 ? '发送验证码' : `${time}秒后重新发送` }}</el-button>
      </el-form-item>
      <el-form-item class="lastline">
        <div class="item-other" v-if="loginSetting.accountLogin">
          <div class="right_box">
            <el-button type="primary" :text="true" class="code-login" @click="changeLoginType('accout')">账号登录
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" class="loginBtn" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang='ts' setup>
import { getCaptcha } from '@/api/base/login';
import ENV from '@/environment/index';
import { LoginFormData } from '@/types/api/system/login';
import { useCountdown } from '@/utils/base/common';
import { isPhoneNumber } from '@/utils/is';
import { CheckboxValueType, ElForm, ElInput, ElMessage } from 'element-plus';
import { onMounted, reactive, ref, toRefs, watch, nextTick, computed } from 'vue';
import { SvgIcon } from '@/fits-components';
import { useRoute, useRouter } from 'vue-router';
import useStore from '@/store';
const route = useRoute();
const router = useRouter();
const { user } = useStore();
const passwordRef = ref(ElInput);
const loginFormRef = ref(ElForm);
const { time, start } = useCountdown()
const { system: { coutDownTime }, login: loginSetting } = ENV
const rememberme = computed(() => user.isRememberme)

const state = reactive({
  redirect: '',
  curentLoginType: loginSetting.accountLogin ? 'accout' : 'verifycode',
  loginForm: {
    username: user.loginInfo.username,
    password: user.loginInfo.password,
    code: '',
    phone: '',
  } as LoginFormData,
  isScanCodeLogin: true,
  loginRules: {
    username: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
    // code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }],
    password: [
      { required: true, trigger: 'blur', validator: validatePassword },
    ],
  },

  loginVerifyRules: {
    phone: [{ trigger: 'blur', validator: validatePhone }],
    code: [{ required: true, trigger: 'blur', message: '验证码不能为空12333' }],
  },
  loading: false,
  // 是否开始倒计时
  isCoutDown: false,
  passwordType: 'password',
  captchaBase64: '',
  // 大写提示禁用
  capslockTooltipDisabled: true,
  otherQuery: {},
  clientHeight: document.documentElement.clientHeight,
  showCopyright: true,
});


const {
  loading,
  loginForm,
  curentLoginType,
  loginRules,
  passwordType,
  loginVerifyRules,
  captchaBase64,
} = toRefs(state);




onMounted(() => {
  handleCaptchaGenerate();
})



watch(route, () => {
  const query = route.query;
  if (query) {
    state.redirect = query.redirect as string;
    state.otherQuery = getOtherQuery(query);
  }
},
  {
    immediate: true,
  }
);

// 登录
function submitForm() {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      state.loading = true;
      await user.login(state.loginForm);
      router.push({ path: state.redirect || '/', query: state.otherQuery });
      state.loading = false;
    } else {
      state.loading = false;
      handleCaptchaGenerate();
    }
  })
}

/**
 * 处理记住密码功能
 */
function handleRemenber(value: CheckboxValueType) {
  user.toogleIsRememberMe(value as boolean)
}

// 获取验证码
function handleCaptchaGenerate() {
  getCaptcha().then(({ ReturnData }) => {
    const { Img } = ReturnData;
    state.captchaBase64 = Img;
  });
}
/**
 * 发送验证码
 */
function sendMsg() {
  loginFormRef.value.validateField('phone', (valid: boolean) => {
    if (valid) {
      ElMessage.success('验证码已经发送！')
      start(coutDownTime)
    } else {
      return false;
    }
  })
}
/**
 * 切换登录状态
 */
function changeLoginType(type: string) {
  state.loginForm = {
    username: '',
    password: '',
    code: '',
    phone: '',
  } as LoginFormData,
    state.curentLoginType = type;
}

function validatePassword(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error('密码不能少于6位'));
  } else {
    callback();
  }
}

function validatePhone(rule: any, value: any, callback: any) {
  if (value.length === 0) {
    callback('手机号不能为空')
  } else if (value.length < 11) {
    callback('手机号不能低于11位');
  } else if (!isPhoneNumber(value)) {
    callback('手机号格式不正确')
  } else {
    callback()
  }
}


function getOtherQuery(query: any) {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}

function showPwd() {
  if (state.passwordType === 'password') {
    state.passwordType = '';
  } else {
    state.passwordType = 'password';
  }
  nextTick(() => {
    passwordRef.value.focus();
  });
}
</script>


<style lang='scss'>
.LoginMainComponent {
  .el-input__wrapper {
    padding: 0 16px;
    --el-input-bg-color: #f2f4f9;
    border: none;
    border-radius: 0;
    box-shadow: none
  }

  .pwd .el-input__wrapper {
    padding: 0 30px 0 16px;
  }

  .codeinput .el-input__wrapper {
    padding: 0 100px 0 16px
  }

  .el-input__inner {
    --el-input-inner-height: 42px;
  }

  .el-input-group__append {
    border: none;
    box-shadow: none;
    background-color: transparent;
    padding: 0 0 0 10px;
  }


  .el-checkbox {
    --el-checkbox-text-color: #999999;
  }

  .el-checkbox__inner {
    --el-checkbox-input-border: 1px solid #ccc;
  }

  .lastline {
    margin-top: -13px;
  }

  .el-button.code-login {
    text-decoration: underline;
    color: #409eff;
    font-size: 12px;

    &:hover,
    &:focus {
      color: var(--el-color-primary-light-5);
    }
  }

  .loginBtn {
    width: 100%;
    height: 40px;
  }

  .code-login:not(.el-button--text) {
    border: none;
    background-color: transparent;
  }

  .code-login.is-text:not(.is-disabled):focus,
  .code-login.is-text:not(.is-disabled):hover {
    --el-fill-color-light: #fff;

  }

  .code-login.is-text:not(.is-disabled):active {
    --el-fill-color-light: #fff;
    --el-fill-color: #fff;
  }

}
</style>
<style lang='scss' scoped>
$inputHeight: 40px;

.form-box {
  padding: 0 40px;
}

.form-title {
  font-size: 12px;
  margin-bottom: 20px;
  color: #333;
}

.captcha {
  width: 130px;
  height: $inputHeight;
  border: 1px solid #ccc;
  cursor: pointer;
}

.item-other {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &>* {
    flex: 1;
  }
}

.right_box {
  text-align: right;
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  user-select: none;
}

.verification {
  position: absolute;
  right: 0;
  top: 7px;
  font-size: 12px;
  cursor: pointer;
  color: #409eff;
  user-select: none;
  border: 0;
  background-color: transparent;
  height: 28px;
  --el-fill-color-light: transparent;

  &.is-disabled {
    color: var(--el-color-primary-light-5)
  }

  &.el-button.is-text:not(.is-disabled):focus,
  &.el-button.is-text:not(.is-disabled):hover {
    color: var(--el-color-primary-light-5)
  }
}
</style>