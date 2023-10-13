import { PersistOptions, ReactiveFlags, Target } from "./types";
import * as CryptoJS from "crypto-js"
export const isPlainObject = (v: unknown): v is PersistOptions =>
    Object.prototype.toString.call(v) === '[object Object]';


export const isBoolean = (v: unknown): v is boolean => typeof v === 'boolean';

export const isArray = (v: unknown): v is Array<any> => Array.isArray(v);
export const isUndefined = (v: unknown): v is undefined => typeof v === 'undefined';



export function isReactive(value: unknown): boolean {
    if (isReadonly(value)) {
        return isReactive((value as Target)[ReactiveFlags.raw])
    }
    return !!(value && (value as Target)[ReactiveFlags.isReactive])
}



export function isReadonly(value: unknown): boolean {
    return !!(value && (value as Target)[ReactiveFlags.isReadonly])
}

export function isProxy(value: unknown): boolean {
    return isReactive(value) || isReadonly(value)
}


/**
 * @description 计算有效期的时间，单位：秒
 * @param day 有限期的天数，单位：天
 * @returns 有效期的毫秒级时间戳
 */
export function getExpiresTime(day: number): number {
    return 60 * 60 * 24 * day * 1000
}

/**
* 
* @param key 
* @returns 输出键值，例如指定前缀：Login。那么返回的是：LOGIN_KEY
*/
export function getKey(key: string, prefix = "", suffix = ""): string {
    return `${prefix}${prefix ? '_' : ''}${key}${suffix ? '_' : ''}${suffix}`;
}
/**
 * 随机生成任意长度的随机数
 * @param size 需要生成随机数据的长度
 * @returns 
 */
export const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

// 设置AES加密的密钥
export function setEncryptionKey(encryption: boolean): string {
    const radomHex = localStorage.getItem('uuid')
    let uuid = ''
    if (radomHex) {
        uuid = radomHex
    } else {
        const _uuid = genRanHex(16);
        localStorage.setItem('uuid', _uuid)
        uuid = _uuid
    }
    return encryption ? uuid : ''
}

/**
 * 根据加密解密的参数决定是否对值进行加密解密
 * 加密方法
 * @param encryption 
 */
export function handleEncryptData(key: string, value: any) {
    // 统一用对象保存，boolean, array, object, string,number等基本类型的值，也方便到时候解密
    const data = {
        encryptValue: value
    }
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}


/**
 * 根据加密解密的参数决定是否对值进行加密解密
 * 解密方法
 * @param encryption 
 */
export function handleDecryptData(key: string, value: string) {
    // 统一用对象保存，boolean, array, object, string,number等基本类型的值，也方便到时候解密
    const bytes = CryptoJS.AES.decrypt(value, key)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).encryptValue;
}
// 移除对象的空属性
export const removeEmpty = (obj: any) => Object.keys(obj).filter((k) => obj[k] != null).reduce((a, k) => ({ ...a, [k]: obj[k] }), {});