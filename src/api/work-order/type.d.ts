/**
 * 工单类型统计响应类型声明
 */
export interface WorkOrderTypeResponseData {
    IsUpdateContract: boolean;
    ContractTreeData: IContractTreeData;
    StatisList: IStatis[];
}

export interface IContractTreeData {
    Value: string
    Id: string
    Selected: boolean
}

/**
 * 工单基本概况数据
 */
export interface IStatis {
    NewState: number
    InProcess: number
    HangUp: number
    FailureSolve: number
    SuccessSolve: number
    Closed: number
    GroupInfo: string
    [key: string]: any
}
