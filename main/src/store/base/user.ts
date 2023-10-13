import { defineStore } from 'pinia';
import { LoginFormData } from '@/api/base/type';
import { login, logout } from '@/api/base/login';
import { getUserInfo } from '@/api/base/user';

import AwaitToTask from '@/utils/base/awaitToTask';
import { resetRouter } from '@/router';


const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
    nickname: '',
    avatar: '',
    roles: [] as string[],
    perms: [],
    userInfo: {},
    introduction: "",
    isRememberme: true,
    loginInfo: {
      username: 'admin',
      password: '123456'
    },
    isTokenInvalid: false,
  }),
  actions: {
    /**
     * 设置用户信息
     * @param userInfo
     */
    setInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    /**
     * 设置登录信息，为记住密码功能服务
     * @param userInfo
     */
    setRemember(loginInfo: { username: string, password: string }) {
      if (this.isRememberme) {
        this.loginInfo = loginInfo
      } else {
        this.loginInfo = { username: "", password: "" }
      }
    },
    /**
     *
     * @param token
     */
    setToken(token: string) {
      this.token = token;
    },
    /**
     * 切换记住密码的状态
     */
    toogleIsRememberMe(isRememberme: boolean) {
      this.isRememberme = isRememberme;
    },
    /**
     * 设置登录状态
     * @param status
     */
    setTokenStatus(status: boolean) {
      this.isTokenInvalid = status;
    },
    async RESET_STATE() {
      // pinia内置的方法，将store中的状态重置到初始状态
      this.$reset();
    },
    /**
     * 登录
     */
    async login(loginData: LoginFormData) {
      const params = {
        username: loginData.username.trim(),
        password: loginData.password,
        code: loginData.code,
        phone: loginData.phone
      };
      const [err, data]: any = await AwaitToTask(login(params));
      if (err) return Promise.reject(new Error("登录失败"));
      const { ReturnData, RetCode } = data;
      this.setToken(ReturnData.LoginToken);
      this.setRemember({ username: loginData.username.trim(), password: loginData.password })
      return { ReturnData, RetCode };
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      if (this.token === "") {
        throw Error("没有token，不允许访问");
      }
      const { ReturnData } = await getUserInfo({
        /* Your params here */
      });

      const { Roles, Name, HeadImg, Remark } = ReturnData;
      // 角色一定不能为空
      this.roles = Roles;
      this.nickname = Name;
      this.avatar = HeadImg;
      this.introduction = Remark;
      this.userInfo = ReturnData;
    },

    async getUserMessage() {
      if (this.token === "") {
        throw Error("getUserMessage: token is undefined!");
      }
      // return await getUserMessage({});
    },


    /**
     *  注销
     */
    async logout() {
      const [err]: any = await AwaitToTask(logout());
      if (err) return Promise.reject(new Error("注销账号失败"));
      resetRouter();
      this.setToken("");
      this.roles = [];
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        this.setToken("");
        this.RESET_STATE();
        resolve(null);
      });
    },
  },
  /**
   *  开启数据缓存
   * 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
   * pinia的插件storage默认情况下，存储设置为 sessionStorage，但您可以通过设置密钥来指定要用于每个策略的存储。
   * 下面的例子就是利用js-cookie插件做token的缓存
   */
  persist: [
    {
      type: 'indexedDB',
      paths: ["userInfo", "isRememberme", "loginInfo"],
    },
    {
      key: 'accessToken',
      type: 'cookies',
      encryption: false,
      paths: ["token"],
    },
  ],

})

export default useUserStore;
