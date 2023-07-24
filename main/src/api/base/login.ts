
import http from '@/utils/http';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { Captcha, LoginFormData, LoginResponseData } from './type';
/**
 * 登录
 * @param data
 */
export function login(params: LoginFormData): AxiosPromise<LoginResponseData> {
  return http({
    url: '/Login',
    method: 'get',
    params,
  });
}

/**
 * 注销
 */
export function logout() {
  return http({
    url: '/logout',
    method: 'delete',
  });
}

/**
 * 获取图片验证码
 */
export function getCaptcha(): AxiosPromise<Captcha> {
  return http({
    url: '/captcha?t=' + new Date().getTime().toString(),
    method: 'get',
  });
}


