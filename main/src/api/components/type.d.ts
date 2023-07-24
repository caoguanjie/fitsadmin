/**
 * 获取诊断名词列表响应类型声明
 */
export interface DiagnosisWordListResponseData {
    RetCode: number
    Message: string
    ReturnData: {
        DiagnosisWordList: DiagnosisListItem[]
    }
}

export interface DiagnosisWordListItem {
    diagnosisWord: string
    ICDCode: string
    medicalType: string
    id: number
}
/**
 * 获取诊断数据响应类型声明
 */
 export interface DiagnosisResponseData {
    RetCode: number
    Message: string
    ReturnData: {
        DiagnosisData: DiagnosisData
    }
}

export interface DiagnosisData {
    id: number
    medicalType: string
    diagnosticType: string
    isChecked: boolean
    perRemark: string
    diagnosis: string
    postRemark: string
    isCommon: boolean
    seq: number
}