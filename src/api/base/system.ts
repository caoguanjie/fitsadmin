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