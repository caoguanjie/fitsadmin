import http from "@/utils/http";
import { PagingParams } from "@/utils/http/types";

/**
* @description 菜单管理--菜单列表
* @param params
* @returns
*/
export const getMenuList = (params: any, pagingParams: PagingParams) =>
    http({
        url: 'MenuList',
        method: 'get',
        params: params,
        pagingParams: pagingParams
    })

/**
* @description 角色管理--角色列表列表
* @param params
* @returns
*/
export const getRoleList = (params: any, pagingParams: PagingParams) =>
    http({
        url: '/role/manager/getRoleList',
        method: 'get',
        params: params,
        pagingParams: pagingParams
    })

    /**
* @description 角色管理--角色列表列表
* @param params
* @returns
*/
export const getDictItemList = (params: any, pagingParams: PagingParams) =>
http({
    url: '/base/dictionary/DicItems',
    method: 'get',
    params: params,
    pagingParams: pagingParams
})