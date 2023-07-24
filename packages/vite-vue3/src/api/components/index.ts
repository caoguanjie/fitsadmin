import http from "@/utils/http";
import { AxiosPromise } from "axios";
import { DiagnosisWordListResponseData, DiagnosisResponseData } from "./type";

/**
 * 获取诊断名词列表
 */
export function getDiagnosisWordList(params?: any): AxiosPromise<DiagnosisWordListResponseData> {
    return http({
        url: '/getDiagnosisWordList',
        method: 'get',
        params: params
    });
}

/**
 * 获取诊断数据
 */
 export function getDiagnosisData(params?: any): AxiosPromise<DiagnosisResponseData> {
    return http({
        url: '/getDiagnosisData',
        method: 'get',
        params: params
    });
}