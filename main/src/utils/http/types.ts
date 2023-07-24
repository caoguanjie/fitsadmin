
// 拓展AxiosRequestConfig的接口，在他原来已有的基础上拓展更多的属性
declare module 'axios' {
    interface AxiosRequestConfig {
        // 是否显示loading界面
        isLoading?: boolean
        // 是否显示提示信息
        isShowMessage?: boolean
        // 成功的文本信息
        successMessageText?: string
        // 是否显示成功信息
        isShowSuccessMessage?: boolean
        // 是否显示失败信息
        isShowErrorMessage?: boolean
        // 错误的文本信息
        errorMessageText?: string
        // 分页参数
        pagingParams?: PagingParams
        // 旧的参数类型，默默登录，换token的时候，需要
        oldParams?: any
        // 旧的URL，URL在请求拦截会被改变，默默登录，换token的时候，需要
        oldURL?: string | undefined
        // 错误消息提示类型
        errorMessageMode?: 'alert' | 'toast'
        // 失败前重试的次数,默认是一次
        retries?: number
        // 控制重试请求之间延迟的回调。默认是2000毫秒，默认是1秒
        retryDelay?: number
        // 当前重试的次数，或者说当前是第几次重试
        retryCount?: number
    }
    interface AxiosResponse<T = any> {
        RetCode: number
        Message: string
        ReturnData: T
    }
}

/**
 *  @description 分页参数
 */
export interface PagingParams {
    // 页码
    pageSize: number,
    // 当前页
    pageIndex: number,
    // 排序类型
    sort?: string,
    // 排序字段
    sortProp?: string,
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // json
    TEXT = 'text/plain;charset=UTF-8',
    // form-data 一般配合qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  上传
    FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

/**
 * @description: 请求结果集
 */
export enum ResultEnum {
    SUCCESS = 1001, // 查询成功、操作成功  
    ERROR = 1002, // 操作失败、查询失败  
    STYSTEM_ERROR = 2001, // 系统异常  
    LOGIN_FAIL = 2002, // 登录身份验证失效
    DOUBLE_REQUEST = 2003, // 重复请求
    PARAMAR_ERROR = 2004, // 参数不符合要求
    APPID_LOWER = 2005, // APP版本过低
    APPID_ERROR = 2006, // APPID无效、微信获取用户信息失败
    HOT_UNPDATE = 2007, // 需要进行热更新检查
    USER_UNPDATE = 2008, // 用户信息已变更
    FORCE_OFFLINE = 2009, // 强制下线
}
