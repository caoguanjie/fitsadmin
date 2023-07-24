import http from "@/utils/http";
import { PagingParams } from "@/utils/http/types";

/**
* @description 业务范例-基础表格-数据代理
* @param params
* @returns
*/
export const getTableList = (params: any, pagingParams?: PagingParams) =>
    http({
        url: 'pagerProxyTable',
        method: 'get',
        params,
        pagingParams
    })