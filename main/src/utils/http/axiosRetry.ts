/**
 * @description 这里主要封装关于http出现网络错误或幂等请求（GET、HEAD、OPTIONS、PUT 或 DELETE）上的 5xx 错误，http请求将会重连的操作
 */

import isRetryAllowed from 'is-retry-allowed'

const SAFE_HTTP_METHODS = ['get', 'head', 'options']
const IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(['put', 'delete'])
/**
 * @param  {Error}  error
 * @return {boolean}
 */
export const isNetworkError = (error: any) => {
    console.log(error.config)
    return (
        !error.response &&
        Boolean(error.code) && // 防止重试已取消的请求
        // error.code !== 'ECONNABORTED' && // 防止重试超时请求
        isRetryAllowed(error)
    ) // 防止重试不安全的错误
}
/**
* @param  {Error}  error
* @return {boolean}
*/
export const isRetryableError = (error: any) => {
    return (
        // error.code !== 'ECONNABORTED' &&
        (!error.response || (error.response.status >= 500 && error.response.status <= 599))
    )
}

/**
 * @param  {Error}  error
 * @return {boolean}
 */
export const isIdempotentRequestError = (error: any) => {
    if (!error.config) {
        // 无法确定是否可以重试请求
        return false
    }

    return isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.indexOf(error.config.method) !== -1
}

/**
 * @param  {Error}  error
 * @return {boolean}
 */
export const isNetworkOrIdempotentRequestErrors = (error: any) => {
    return isNetworkError(error) || isIdempotentRequestError(error)
}
