import http from "@/utils/http";
import { AxiosPromise } from "axios";
import { UserInfo } from "./type";

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfo(params: any): AxiosPromise<UserInfo> {
    return http({
        url: '/Common/User',
        method: 'get',
        params: params
    });
}

/**
 * 个人信息页获取用户基本信息和组织机构信息
 */
export function getUserDetail(params: any): AxiosPromise<UserInfo> {
    return http({
        url: '/UserInfo/UserMessage',
        method: 'get',
        params
    });
}

/**
 * 个人信息页获取用户基本信息和组织机构信息
 */
export function postUserDetail(data: any): AxiosPromise<UserInfo> {
    return http({
        url: '/user/saveInfo',
        method: 'post',
        data
    });
}

/**
 * 个人信息页修改头像
 */
export function postUserAvator(data: any): AxiosPromise<UserInfo> {
    return http({
        url: '/user/avator',
        method: 'post',
        data
    });
}

/**
 * 个人信息页修改头像
 */
export function postUserPassword(data: any): AxiosPromise<UserInfo> {
    return http({
        url: '/user/savePassword',
        method: 'post',
        data
    });
}