import { PagingParams } from "@/utils/http/types";
import { CancelToken } from "axios";
import { VxeColumnProps, VxeTableInstance } from "vxe-table";

/**
 * @desc FitsTable分组表格公共组件的props
 */
export class FitsTableProps {
    headers: IFitsTableHeaders[] // 必传
    ajax: IFistGroupTableAjax // 必传
    groupConditions?: IFitsGroupConditionConfig
    expandGroupsNum?: number // （必须大于0，后端规定）
    requestGroupNums?: number
    [key: string]: any
    /**
     * @property {IFitsTableHeaders[]} headers 表头配置，必传，属性是vxe-table的VxeColumn属性，具体可以看vxe-table官网的配置
     * @property {IFitsTableRequest} ajax 请求表格数据
     * @property {IFitsGroupCondition[]} groupConditions 分组条件配置
     * @property {number} expandGroupsNum 默认展开多少个分组，如果没传则默认展开三组（必须大于0，后端规定）
     * @property {number} requestGroupNums 将一页所有分组表格，再分细n组去请求（会导致一个页面会出现多次请求表格接口）（这是后端提出接口响应慢的解决办法，可能是他们sql不好优化）
     */
    constructor({ headers, ajax, groupConditions, expandGroupsNum, requestGroupNums }: FitsTableProps) {
        this.headers = headers ?? [];
        this.ajax = ajax
        this.groupConditions = groupConditions ?? { conditions: [] };
        this.expandGroupsNum = expandGroupsNum ?? 3;
        this.requestGroupNums = requestGroupNums ?? 4;
    }
}

/**
 * @desc 表头配置，属性是vxe-table的VxeColumn属性，具体可以看vxe-table官网的配置
 */
export interface IFitsTableHeaders extends VxeColumnProps {
    [key: string]: any
}

/**
 * 分组条件配置
 */
export interface IFitsGroupConditionConfig {
    defaultChecked?: string | number
    conditions?: IFitsGroupCondition[]
}

/**
 * @desc 分组条件
 * @member name 分组名
 * @member params 分组值
 */
export interface IFitsGroupCondition {
    name: string
    value: string | number
}

/**
 * @desc 获取请求的参数
 * @member page 分页参数
 * @member form 请求参数
 * @member httpType 请求的情况（基本上用不到）
 * @member cancelToken 请求取消令牌
 * @member isLoading 是否显示loading
 */
 export interface IFistGroupTableAjaxParams {
    page: PagingParams
    form: any
    httpType: HttpType
    cancelToken?: CancelToken
    isLoading?: boolean
    [key: string]: any
}

/**
 * @desc 请求的情况（基本上用不到这个属性，除非你要做一些额外的操作。比如监听请求查询的情况，有以下三种情况）
 * @member All 查询整个表格
 * @member More 查询加载更多
 * @member Fragment 查询剩余分段表格
 */
 export type HttpType = "All" | "More" | "Fragment"

/**
 * @desc 请求表格数据接口
 */
export interface IFistGroupTableAjax {
    query: ({ page, form, cancelToken, isLoading, httpType }: IFistGroupTableAjaxParams) => Promise<{ result: IFistTableData }>
}

/**
 * @desc 分组加载更多的参数
 * @member groupID 分组id
 * @member pagingParams 分页参数
 */
export interface IFitsLoadMoreParams {
    groupID: string
    pagingParams: PagingParams
}

/**
 * @desc 整个表格数据
 * @member GroupTable 分组表格数据
 * @member TableList 普通表格数据
 * @member ItemCount 总数
 */
export interface IFistTableData {
    GroupTable: IFitsTableGroup[]
    TableList: any[]
    ItemCount: number
    [key: string]: any
}

/**
 * @desc 一组分组表格数据
 * @member ID 分组id
 * @member NAME 分组名称
 * @member hideLoading 是否隐藏loading图标
 * @member DataSource 分组数据
 */
export interface IFitsTableGroup {
    ID: string
    NAME: string
    hideLoading?: boolean
    DataSource: {
        ItemCount: number // 总条数
        GroupList: any[] // 列表数据
    }
    [key: string]: any
}

/**
 * @desc 分组表格组件的dom实例
 * @member myTable 表格实例
 * @member groupID 分组id
 * @member groupName 分组name
 * @member originColumns 表格所有列配置
 * @member setRowCheckbox 设置行复选框
 */
export interface IGroupTableInstance extends VxeTableInstance {
    myTable: VxeTableInstance
    groupID: string
    groupName: string
    // originColumns: VxeTableDefines.ColumnInfo[]
    setRowCheckbox: (isChecked: boolean) => void
}

/**
 * @desc 自定义列配置（更新列配置）
 * @member field 列字段
 * @member type 列类型
 * @member title 列标题
 * @member visible 列是否可见
 */
export interface ICustomColumnsConfig {
    field?: string
    type?: string
    title: string
    visible: boolean
    [key: string]: any
}

/**
 * @desc 存储列排序到localstorage
 */
export interface IFitsStorageColsSort {
    field?: string
    type?: string
    sort: number
    [key: string]: any
}

/**
 * @desc 存储列显示到localstorage
 */
export interface IFitsStorageColsVisible {
    field?: string
    type?: string
    visible: boolean
    [key: string]: any
}