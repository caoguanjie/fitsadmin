
/**
 * @description 检查
 * @param status 
 * @param msg 
 * @returns 
 */
export function checkStatus(status: number, msg: string): void {
    switch (status) {
      case 400:
        console.log(`${msg}`)
        break
      case 401:
        console.log('用户没有权限（令牌、用户名、密码错误）!')
        break
      case 403:
        console.log('用户得到授权，但是访问是被禁止的。!')
        break
      // 404请求不存在
      case 404:
        console.log('网络请求错误,URL地址错误')
        break
      case 405:
        console.log('网络请求错误,请求方法未允许!')
        break
      case 408:
        console.log('网络请求超时!')
        break
      case 500:
        console.log('服务器错误,请联系管理员!')
        break
      case 501:
        console.log('网络未实现!')
        break
      case 502:
        console.log('网络错误!')
        break
      case 503:
        console.log('服务不可用，服务器暂时过载或维护!')
        break
      case 504:
        console.log('网络超时!')
        break
      case 505:
        console.log('http版本不支持该请求!')
        break
      default:
        console.log(msg)
    }
  }
  
// 转换一些特殊符号
export const encode = (val: string) => {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}
