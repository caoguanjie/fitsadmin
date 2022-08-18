/**
 * axios 阿克修斯
 * http服务需要具体以下功能：
 * 1. 要转化特殊字符
 * 2. 要识别浏览器的不同状态码
 * 3. 对请求服务进行拦截，处理get和post、put等不同类型的请求参数
 * 4. 对捕获错误统一报错（包括请求超时，统一报错）
 * 5. 在HTTP请求发起时，开启loading动画
 * 6. 在HTTP请求结束时，关闭loading动画
 * 7. 对请求成功返回的状态进行预处理
 * 8. 对请求失败的异常信息进行预处理
 * 9. 同一个页面多个请求只发起一个loading动画
 * 10. 多次点击按钮，只能触发一次请求，能做到取消请求
 * 11、支持同步请求，主要作用于默默登录，登录完之后，不影响原来的接口返回参数
 * 12、http的长轮询研究一下
 * 13、接受请求超时或者http状态为5xx的时候，进行重试接口
 */
import axios, { AxiosInstance } from 'axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from './interceptors'
import ENV from "@/environment/index"
const service: AxiosInstance = axios.create({
  baseURL: ENV.project.api_address + '/api/', // url = base url + request url
  timeout: ENV.project.http_timeout,
  retries: 2, // 重试的次数
  retryDelay: 2000 // 每一次重试，会延迟多少秒
})

// 请求拦截
service.interceptors.request.use(requestSuccess, requestFail)

// 响应拦截
service.interceptors.response.use(responseSuccess, responseFail)

export default service
