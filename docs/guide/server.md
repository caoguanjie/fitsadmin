---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-29
---

# 与服务端交互

## 前端请求流程

1. 视图层view，发起请求
2. 调用统一管理的`api service `请求函数；
3. 使用封装的 `src/utils/http` 发送请求
4. 通过封装的http服务的拦截器`interceptors.request`和`interceptors.response`对出入参进行自定义化改造
5. 获取服务端返回；
6. 更新 data

```flow
in=>inputoutput: view视图
st=>start: 发送请求
p1=>operation: 调用 @/api 请求函数
p2=>operation: api请求函数 调用统一的 http 服务
p3=>subroutine: 进入拦截器interceptors.request改造出参格式
p4=>end: 获取服务端返回
p5=>subroutine: 进入拦截器interceptors.response改造返回数据格式
p6=>end: 更新data
out=>inputoutput: 更新view视图
in->st->p1
p1->p2->p3->p4->p5->p6->out

```

从上面的流程可以看出，为了方便管理维护，统一的请求处理都放在` @/api` 文件夹中，并且一般按照 `业务模块` 纬度进行拆分文件，或者用二级路由命名，一级路由命名， 如：

```sh
......                        
├── src                                 
│   ├── api                    # 接口文件
│   │    ├── base              # 框架自带的一些接口范例，登录、用户信息接口
│   │    ├── system            # 系统管理相关的接口
│   │    ├── example           # 业务范例接口
└   └    └── component-manger  # 组件管理接口
......    
```

## http服务
:::tip 
更多详情请看：[进阶-HTTP服务](/guide/http)
:::
其中，`@/utils/http/* `是基于 [axios](https://github.com/axios/axios) 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等,它封装了以下内容：

1. 能转化特殊字符，例如+，-，[]
2. 能识别浏览器的不同状态码,例如：5xx/4xx/3xx
3. 对请求服务进行拦截，处理get和post、put等不同类型的请求参数
4. 对捕获错误统一报错（包括请求超时，统一报错）
5. 在HTTP请求发起或者结束，开启或者关闭loading动画
6. 对请求成功返回的状态进行预处理
7. 对请求失败的异常信息进行预处理
8. 同一个页面多个请求只发起一个loading动画
9.  多次点击按钮，只能触发一次请求，能做到拦截重复请求，取消请求
10. 支持同步请求，主要作用于默默登录，登录完之后，用户无感知获取新token，不影响原来的接口返回参数
11. 接受请求超时或者http状态为5xx的时候，进行重试接口
12. 路由切换取消当前所有pending状态的请求,并且可配置白名单

## http服务的调用方式
一个用户信息的接口

```ts
// 导入index文件中http模块
import http from "@/utils/http"

export const getUserInfo = () =>
  http({
    url: '/Common/User',
    method: 'get',
    params: {
      id: 1111,
      text: "ddd"
    },
    isLoading: true // 拓展的属性
  })
```


## http的拓展属性
在`axios`的拦截器中，我们可以拦截出入参的进行业务性的改造，为了业务需要，我拓展了很多http的新属性，后续各个业务系统可以根据自己的项目需要，再新增属于你们业务系统需要的属性，去帮助你们做http的逻辑判断处理

```ts
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

```
从上面属性可以到，其实平时我们常用到的`isLoading`这个属性，封装在http协议中的loading是属于整个浏览器遮罩的全局loading，在有一些业务中，其实是不需要的这个遮罩，例如echart的图表功能，它们的刷新，只需要刷新当前图表的数据，这个时候就需要把`isLoading`设置为`false`。

::: warning
上面拓展的很多属性，我还有很多没有封装到http服务中的，所以不能直接在`@/api`上直接赋值，因为赋值也没有作用，我逻辑判断中根本没有做限制，例如`isShowSuccessMessage`这个属性，因此在使用过程中，还是以封装的http服务里面已做的属性为主，后续自行根据业务系统进行添加
:::

## http的接口地址设置

在调用`@/api`的请求接口之前，要先确保有没有做好http接口地址的设置，在`FitsAadmin`项目中，接口设置是在环境变量`src/environment/modules/*.ts`中的，例子：

```ts


const ENV: FitsSetting = {
    project: {
        title: 'FitsAdmin后台管理系统',
        subTitle: 'FITS ADMIN PROD',
        company: '',
        version: "1.0.1",
        api_address: 'http://192.168.32.108:3000/mock/78',
        http_timeout: 15000
    }

}


export default ENV
```