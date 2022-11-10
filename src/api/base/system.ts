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
export const getOrgin = (params: any) =>
    http({
        url: 'departmentList',
        method: 'get',
        params: params,
    })
export const getUserList = (params: any, pagingParams: PagingParams) =>
    http({
        url: 'UserList',
        method: 'get',
        params: params,
        pagingParams: pagingParams
    })

export const getDepartment = ()=>
    http({
        url:"department/manager/getDepartmentList",
        method:'get'
    })
export const getDepartmentTableList = (params: any, pagingParams: PagingParams)=> 
http({
    url:"department/manager/getDepartmentDatatable",
    method:'get',
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
