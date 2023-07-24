import http from "@/utils/http";
import { AxiosPromise } from "axios";
import { WorkOrderTypeResponseData } from "./type";

/**
 * 工单类型统计
 */
export function getWorkOrderType(params: any): AxiosPromise<WorkOrderTypeResponseData> {
    return http({
        url: '/DashBoard/WorkOrderTypeStatisticsChart',
        method: 'get',
        params: params
    });
}