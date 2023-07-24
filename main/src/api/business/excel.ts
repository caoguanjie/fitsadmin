import http from "@/utils/http";

/**
* @description 业务范例-基础表格-数据代理
* @param params
* @returns
*/
export const downloadExcel = () =>
    http({
        url: 'downloadExcel',
        method: 'get'
    })