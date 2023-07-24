
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { AxiosCanceler } from "./axiosCancle";
import { checkStatus } from './checkStatus'
import { ResultEnum } from './types'
import http from '@/utils/http'
import { isNetworkOrIdempotentRequestErrors } from './axiosRetry'
import { hideLoading, showLoading } from './axiosLoading'
import { addPending, removePendingMap } from './axiosCancle'

import router from '@/router'
import useStore from "@/store/";
import { login } from '@/api/base/login'

// const axiosCanceler = new AxiosCanceler()
// 是否正在刷新的标记
let isRefreshing = false
// 是否执行过默默获取token
let isHaveToken = false

// 重试队列，每一项将是一个待执行的函数形式
let requestQueues: (() => void)[] = []

// 重置请求参数
const resetRequestParams = (config: AxiosRequestConfig) => {
    config.url = config.oldURL
    config.params = config.oldParams
    return config
}

// 无感登录
const insensitiveLogin = (response: AxiosResponse) => {
    if (!isRefreshing) {
        isRefreshing = true
        return refreshToken(response)
    } else {
        // 当遇到正在默默登录的接口，返回一个未执行resolve的promise
        return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requestQueues.push(() => {
                resolve(http(resetRequestParams(response.config)))
            })
        })
    }
}

// 有感登录
const inductiveLogin = () => {
    const { user } = useStore()
    // token失效，弹出登录框
    user.setTokenStatus(true)
}

export const refreshToken = (response: AxiosResponse) => {
    const { user } = useStore();
    // 拿记住的账号密码重新登录
    return login(Object.assign({ code: "", phone: "" }, user.loginInfo)).then((res: AxiosResponse) => {
        // 重新请求
        const { RetCode, ReturnData } = res
        if (RetCode === ResultEnum.SUCCESS) {
            user.setToken(ReturnData.LoginToken);
            // 由于requestSuccess拦截器里面对URL进行了改造，所以这里把最原始的URL转化出来
            const config = resetRequestParams(response.config)
            // 最先的接口返回2002，也是最先返回正式的结果，剩余的接口再按顺序返回
            // 已经刷新了token，将所有队列中的请求进行重试
            if (requestQueues && requestQueues.length) {
                requestQueues.forEach(callback => callback())
                requestQueues = []
            }
            isRefreshing = false
            isHaveToken = true
            return http(config)
        } else {
            // 刷新token失败，神仙也救不了了，跳转到首页重新登录吧
            router.replace({ path: `/login?redirect=${router.currentRoute.value.path}` })
        }
    }).catch((err: any) => {
        console.error('refreshtoken error =>', err)
        // 刷新token失败，神仙也救不了了，跳转到首页重新登录吧 
    })
}
// 请求拦截器
export const requestSuccess = (request: AxiosRequestConfig) => {
    // 判断当前请求是否设置了不显示Loading
    request.isLoading !== false && showLoading()
    const { user } = useStore();
    const _params = {
        token: user.token
    }
    // 默默登录时候，需要这两个参数
    request.oldParams = request.params
    request.oldURL = request.url
    if ((request.method as any).toLocaleUpperCase() === 'GET' && request.params) {
        // fits get接口的数据，属性要用Data[id]=1111&Data[text]这个格式才能请求成功
        let url: any = request.url
        url += '?'
        const keys = Object.keys(request.params)
        for (const key of keys) {
            url += `${encodeURIComponent('Data[' + key + ']')}=${encodeURIComponent(request.params[key] ?? "")}&`
        }
        request.url = url.substring(0, url.length - 1)
        request.params = {}
    } else {
        // 公司的接口post的数据要包裹在 Data对象里面。
        // 为了解决重试接口之后，Data对象不断被重复包裹，所以要加一层判断，如果一旦存在之后，不在再包裹一层
        if (!(request.data && request.data.Data)) {
            const _data = { Data: request.data }
            request.data = _data
        }
    }
    // console.log(request)
    // 将token、APPid等信息合并到原来params上面
    request.params = Object.assign(_params, request.pagingParams)
    addPending(request)
    return request
}
// 请求失败拦截
export const requestFail = (error: AxiosRequestConfig) => {
    // 这里极少情况会进来，暂时没有找到主动触发的方法，估计只有浏览器不兼容时才会触发，欢迎后面同学补充
    // 看了几个GitHub的issue，有人甚至提出了这个方法是不必要的（因为没有触发的场景），不过还是建议大家按照官方的写法，避免不必要的错误
    // 进来之后没法发起请求
    error.isLoading !== false && hideLoading()
    return Promise.reject(error)
    // 用resolve会令这个请求的promise不会被中断，还是会把error返回到请求中的then的流程中
    // return Promise.resolve(error); 
}

/**
 * 响应成功拦截器
 * 只有返回的状态码是2xx，都会进来这里
 * 1. 返回data里面的数据，只保留公司接口规范的数据
 * 2. Axios 接口超时统一处理，请求超时的话，可以重新发起一次请求
 * 3. 误触按钮导致重复请求可以被取消
 * @param response 
 * @returns 
 */
export const responseSuccess = (response: AxiosResponse) => {
    const { setting } = useStore();
    const { user } = useStore();
    response.config && removePendingMap(response.config)
    response.config && response.config.isLoading !== false && hideLoading()// 关闭loading
    const { data } = response
    const { RetCode, Message, ReturnData } = data
    switch (RetCode) {
        case ResultEnum.SUCCESS:
            // 请求成功
            break
        case ResultEnum.ERROR:
            // 请求失败
            break
        case ResultEnum.STYSTEM_ERROR:
            // 系统异常
            break
        case ResultEnum.LOGIN_FAIL:
            // 登录失败
            // 在枚举那里注释这个LOGIN_FAIL就是身份失效，true为无感
            // if (!user.token) {
            //     if (setting.isInsensitivity) {
            //         // 无感登录
            //         return insensitiveLogin(response)
            //     } else {
            //         // 有感登录
            //         return inductiveLogin()
            //     }
            // } else {
            //     // 当由于接口快慢问题，会导致授权接口还没有返回token的时候，然后又发起了新一个请求，
            //     // 新请求因为没有token，又会直接报2002，导致又需要去请求一次授权，有时候会覆盖token或者引发其他问题。
            //     // 现在做法是，当有接口返回2002的时候，先判断本地有没有token，如果有就直接请求自身，获取数据
            //     return http(resetRequestParams(response.config))
            // }

            // 个案系统token失效拦截的逻辑
            if (setting.isInsensitivity) {
                // 无感登录
                if (!isRefreshing) {
                    if (isHaveToken) {
                        /**
                         * 这里只针对个案系统通过授权码登录的问题，授权码只能登录一次带来问题
                         * 这里原因是：
                         * 1、当一个页面有两个接口，有时间差发起请求
                         * 2、第一个接口发起授权登录，在授权登录过程中发起第二个接口，这个时候还没有token返回
                         * 3、当token返回成功后，才接收到第二个接口是2002，这个时候会再次发起授权，不符合预期
                         * 4、正常流程应该是第二个接口返回2002后，应该调用自身的接口重新请求一遍就能获取数据
                         */
                        isHaveToken = false
                        return http(resetRequestParams(response.config))
                    } else {
                        isRefreshing = true
                        return refreshToken(response)
                    }
                } else {
                    // 当遇到正在默默登录的接口，返回一个未执行resolve的promise
                    return new Promise((resolve) => {
                        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                        requestQueues.push(() => {
                            resolve(http(resetRequestParams(response.config)))
                        })
                    })
                }
            } else {
                // 有感登录
                // token失效，弹出登录框
                inductiveLogin()
            }

        // 更多状态，请参照枚举ResultEnum类型，进行业务处理
    }
    console.log(response)

    return response.data
}

/**
 * @description 响应失败拦截器 统一处理http异常
 * @param error CustomAxiosError 自定义类型
 * @returns 
 * @description 注意如果取消请求，一样走responseFail的流程
 */
export const responseFail = (error: AxiosError) => {
    error.config && removePendingMap(error.config)// 取消请求
    hideLoading() // 关闭loading
    const { response, code, message } = error || {}
    const err: string = error.toString()
    const msg: string = response && response.data && response.data.error ? response.data.error.message : ''
    // 处理请求超时
    try {
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
            console.log('接口请求超时,请刷新页面重试!')
        }
        if (err && err.includes('Network Error')) {
            console.log('网络异常，请检查您的网络是否正常！')
        }
    } catch (error: any) {
        throw new Error(error)
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error)
    if (!isCancel) {
        checkStatus((error.response as any) && (error.response as any).status, msg)
    } else {
        console.warn('请求被取消！')
    }

    // 以下是重试逻辑
    if (!error.config || !error.config.retries) {
        return Promise.reject(error)
    } else {
        const { config } = error
        config.retryCount = config.retryCount || 0
        const shouldRetry = isNetworkOrIdempotentRequestErrors(error) && config.retryCount < (config.retries as any)

        if (shouldRetry) {
            config.retryCount += 1
            return new Promise(resolve => setTimeout(() => {
                return resolve(http(resetRequestParams(config)))
            }, config.retryDelay || 1000))
        }
        return Promise.reject(error)
    }

    // 1. http状态码非2开头的都会进来这里，如404,500等
    // 2. 取消请求也会进入这里，CancelToken，可以用axios.isCancel(err)来判断是取消的请求
    // 3. 请求运行有异常也会进入这里，如故意将headers写错：axios.defaults.headers = '123',或者在request中有语法或解析错误也会进入这里
    // 进入这里意味着请求失败，axios会进入catch分支
}
