import exp from "constants"

// toString() 方法返回一个表示该对象的字符串。
const toString = Object.prototype.toString

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = () => void>(val: unknown): val is T {
    return is(val, 'Function')
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val)
}
/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
    return val !== null && is(val, 'Object')
}

/**
* @description:  是否为boolean类型
*/
export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean')
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
    return is(val, 'String')
}

/**
* @description:  是否为promise
*/
export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
* @description:  是否为AsyncFunction
*/
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'AsyncFunction')
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

/**
* @description:  是否为时间
*/
export function isDate(val: unknown): val is Date {
    return is(val, 'Date')
}

/**
* @description: 是否已定义
*/
export const isDef = <T = unknown>(val?: T): val is T => {
    return typeof val !== 'undefined'
}

/**
 * @description 正则判断字符串是否为非空数字类型
 */
export function isNumberType(val: any): boolean {
    const reg = new RegExp(/^(0|\+?[1-9][0-9]*)$/)
    return !!(reg.test(val))
}

/**
 * @description 正则判断字符串是否为手机号码
 */
export function isPhoneNumber(val: any) {
    const reg = new RegExp(/^1[3456789]\d{9}$/)
    return !!(reg.test(val))
}

/**
* @description 正则判断数字类型最多能输入两位小数
*/
export function isTwoNumber(val: any) {
    const reg = new RegExp(/^(-)?(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/)
    return !!(reg.test(val))
}

/**
 *  @description 判断是否是json格式
 */
export function isJSON(val: any) {
    if (!isString(val)) return false
    try {
        // 这一步是防止出现JSON.parse('"123"')这种情况出现
        if (typeof JSON.parse(val) === 'object') {
            return true
        }
    } catch (error) {
        // 不做判断
    }
    return false
}

/**
 * @description 判断是否是条形码格式
 * 条形码只支持数字、字母、空格符，-、 $
 */
export function isBarcode(val: string): boolean {
    const reg = new RegExp(/^[0-9A-Za-z-\s$]+$/)
    return !!(reg.test(val))
}

/**
 * @description 判断是否是ip格式的字符串
 */
export function isIpAddress(val: string): boolean {
    const reg = new RegExp(/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g)
    return !!(reg.test(val))
}

/**
 *   URL校验（带http|https）
 *  @description 判断是否是域名格式的字符串
 */
export function isDomainAddress(val: string) {
    const reg = new RegExp(/^(http|https):\/\/([a-zA-Z\d][\w-]+\.)+[\w-]+(\/[\w-./?#%&@=]*)?$/)
    return !!(reg.test(val))
}

/**
 * 包括ip地址和域名地址
 * @description 判断是否合法的URL地址
 */
export function isURLAddress(val: string) {
    return isIpAddress(val) || isDomainAddress(val)
}

/**
 * 检查是否外部链接，包括http链接，电话、email等等
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
    const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
    return isExternal;
}


/**
 * @description 判断是否微信浏览器
 */
export function isWechat(): boolean {
    const ua = window.navigator.userAgent.toLowerCase()
    const reg = new RegExp(/MicroMessenger/i)
    return !!reg.test(ua)
}

// /**
//  * @description 判断token是否存在，从而判断是否登录
//  */
//  export function isLogin(): boolean {
//     const store = useStore();
//     return store.state.app.token ? true : false;
// }

/**
 * @description 判断是否excel文件
 */
export function isExcel(file: File) {
    return /\.(xlsx|xls|csv)$/.test(file.name)
}

/**
 * @description 判断是否word文件
 */
export function isWord(val: any) {
    const reg = /^.*\.(?:doc)$/i;
    return !!(reg.test(val))
}

/**
 * @description 判断邮箱格式是否正确
 */
export function isEmail(val: any) {
    // const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return !!(reg.test(val))
}


/**
 * @description 正则判断字符串是否为家庭号码
 */
export function isHomeNumber(val: any) {
    const reg = new RegExp(/0\d{2,3}-\d{7,8}$/)
    return !!(reg.test(val))
}

/**
 * @description 正则判断字符串是否为短号
 */
export function isShortNumber(val: any) {
    const reg = new RegExp(/^\d{3}$/)
    return !!(reg.test(val))
}

/**
 * @description 正则判断字符串是否为密码（10位以上，包含数字、字母、符号）
 */
export function isPassword(val: any) {
    const reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{10,20}$/)
    return !!(reg.test(val))
}