import axios, { AxiosRequestConfig, Canceler } from 'axios'
import qs from 'qs'
import { isFunction } from '../is'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) => {
  // JSON.parse(JSON.stringify(config.data))是为了解决当data中存在属性为NaN的情况，能把NaN序列化转成null，经过axios的请求后，null会变成空值
  const configData = typeof config.data === 'object' && config.data !== null ? JSON.parse(JSON.stringify(config.data)) : config.data
  return [config.method, config.url, qs.stringify(configData), qs.stringify(config.params)].join('&')
}

/**
 * @description 添加请求，创建取消请求的令牌，把token和接口信息作为键值对保存到map
 * @param config 
 */
export const addPending = (config: AxiosRequestConfig) => {
  const url = getPendingUrl(config)
  if (!pendingMap.has(url)) {
    // 如果 pending 中不存在当前请求，则添加进去,
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        // 把第一个接口的token保存起来
        pendingMap.set(url, cancel)
      })
  } else {
    // 如何pending中存在当前请求，则马上取消当前请求，并移除，这种方式是取消第二次重复请求，保留第一次请求
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancle: Canceler) => {
      cancle(`重复的请求被主动拦截:  method: ${config.method} --> ${config.url} --> ${qs.stringify(config.data)},${qs.stringify(config.params)}`)
    })
  }
}

/**
 * @description 清除当前请求队列的数据。这个方法保留第一个请求，取消后面发起的请求
 * @param config 
 */
export const removePendingMap = (config: AxiosRequestConfig) => {
  config.data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
  const url = getPendingUrl(config)
  pendingMap.delete(url)
}

/**
 * cancel这里调用有个问题,就是如果你在response的响应体
 * @description  移除请求，这个方法是同时多个重复接口，清除前面多余接口，保留最后一次请求
 * @param {CustomAxiosRequestConfig} config 
 */
export const removePending = (config: AxiosRequestConfig) => {
  const url = getPendingUrl(config)
  if (pendingMap.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pendingMap.get(url)
    // js的短路运算
    console.log(cancel)
    // cancel && cancel(`重复的请求被主动拦截:  method: ${config.method} --> ${config.url} --> ${qs.stringify(config.data)},${qs.stringify(config.params)}`);
    pendingMap.delete(url)
  }
}

/**
 * 用于可以在页面上一次性取消所有接口的请求
 * @description: 清空所有pending
 */
export const removeAllPending = () => {
  pendingMap.forEach((cancel: (message: string) => void) => {
    const _cancle: any = cancel;
    cancel && isFunction(cancel) && _cancle('清除多个重复请求')
  })
  pendingMap.clear()
}
/**
 * @description: 重置
 */
export const reset = () => {
  pendingMap = new Map<string, Canceler>()
}
