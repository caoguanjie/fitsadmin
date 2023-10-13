/*
 * @Author: caoguanjie 
 * @Date: 2023-10-11 19:35:30 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2023-10-12 15:32:44
 */

import Cookies from 'js-cookie'
import { IStorageOption } from './types';
import { getKey, handleDecryptData, handleEncryptData, setEncryptionKey } from "./utils"


export class CreateCookies {
    /** 前缀，会自动加到 key 值的前面，默认值：'' */
    private prefix: string;
    /** 后缀，会自动加到 key 值的后面,默认值：''*/
    private suffix: string;
    /** 是否开启有效期设置,默认值：false */
    private isOpenExpires: boolean;
    /** 有效期设置，和isOpenExpires配搭使用，单位：天, 默认值：7 天 */
    private day: number
    /** 是否开启AES加密和解密数据， 默认值：false */
    private encryption: boolean;
    /** 加密时需要的密钥，自动生成，不需要设置 */
    private encryptionKey: string
    constructor(option: IStorageOption = {}) {
        const { prefix = '', suffix = '', isOpenExpires = false, day = 7, encryption = false } = option
        this.prefix = prefix
        this.suffix = suffix
        this.encryption = encryption
        this.isOpenExpires = isOpenExpires
        this.day = day
        this.encryptionKey = setEncryptionKey(encryption)
    }



    /**
     * @description 设置cookie
     * @param {string} name cookie 名称
     * @param  {any} value cookie 值 
     * @param {number} expire 过期时间, 单位：day
     * @param {boolean} isOpen 是否打开过期时间的设置
     */
    setItem(key: string, value: any, expires: number | null = this.day, isOpen: boolean | null = this.isOpenExpires) {
        const _expires = expires !== null && isOpen ? expires : undefined;
        Cookies.set(getKey(key, this.prefix, this.suffix), this.encryption ? handleEncryptData(this.encryptionKey, value) : JSON.stringify(value), { expires: _expires })
    }

    /**
     * 根据名字获取cookie值
     * @description Cookies.get()取不到值的时候会返回空字符串 ’‘
     * @param name 键名
     */
    getItem(key: string): string {
        const data = Cookies.get(getKey(key, this.prefix, this.suffix));
        if (data && this.encryption) {
            return handleDecryptData(this.encryptionKey, data)
        } else {
            return data || ''
        }

    }

    /**
     * 根据名字删除指定的cookie
     * 注意，删除不存在的cookie不会报错也不会有返回
     * @param key 
     */
    removeItem(key: string) {
        Cookies.remove(getKey(key, this.prefix, this.suffix));
    }

}


export default CreateCookies
