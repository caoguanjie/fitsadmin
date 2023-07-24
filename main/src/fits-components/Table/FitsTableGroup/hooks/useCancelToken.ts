import axios, { Canceler } from "axios";

/**
 * @desc 主动取消接口请求
 */
export function useCancelToken() {
    let cancelArr: Canceler[] = []
    // 创建取消接口实例
    function newCancelToken() {
        return new axios.CancelToken((c) => {
            cancelArr.push(c)
        })
    }
    // 取消上一次剩余的分组表格请求的接口
    function cancelTokens() {
        cancelArr.forEach(c => c())
        cancelArr = []
    }
    return {
        cancelTokens,
        newCancelToken
    }
}
