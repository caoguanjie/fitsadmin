/*
 * @Author: caoguanjie 
 * @Date: 2023-10-11 16:36:00 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2023-10-12 16:00:35
 */

import { IStorageOption } from './types';
import { getExpiresTime, getKey, handleDecryptData, handleEncryptData, setEncryptionKey } from './utils';



export class CreateStorage {
    /** 默认值： localStorage*/
    private storage: Storage;
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
        const { prefix = '', suffix = '', storage = localStorage, isOpenExpires = false, day = 7, encryption = false } = option
        this.storage = storage;
        this.prefix = prefix
        this.suffix = suffix
        this.encryption = encryption
        this.isOpenExpires = isOpenExpires ?? false
        this.day = day ?? 7
        this.encryptionKey = setEncryptionKey(this.encryption)
    }

    /**
     * @description 设置缓存
     * @param key 缓存键
     * @param value 缓存值
     * @param expires 到期时间
     * @param isOpen 是否开启到期时间的计算
     */
    setItem(key: string, value: any, expires: number | null = this.day, isOpen: boolean | null = this.isOpenExpires) {
        const stringData = isOpen ? JSON.stringify({
            value,
            expires: expires !== null ? new Date().getTime() + getExpiresTime(expires) : null
        }) : JSON.stringify(value)
        this.storage.setItem(getKey(key, this.prefix, this.suffix), this.encryption ? handleEncryptData(this.encryptionKey, stringData) : stringData)
    }

    /**
     * @description 读取缓存
     * @param {string} key 缓存键
     * @param {any} def 默认值，不传的话默认值为null
     * @returns 返回缓存值，如果超出有效期，则返回null或者用户自定义的默认值
     */
    getItem(key: string, def: any = null) {
        let item = this.storage.getItem(getKey(key, this.prefix, this.suffix));
        if (item) {
            try {
                if (this.encryption) {
                    // 如果是加密过的字符串，先解密
                    item = handleDecryptData(this.encryptionKey, item) || ''
                }
                const data = JSON.parse(item as string);
                const { value, expires } = data;
                // 在有效期内返回
                if (expires) {
                    if (expires >= Date.now()) {
                        return value;
                    } else {
                        // 如果超过到期时间了，就删除当前的值
                        this.removeItem(key);
                    }

                } else {
                    return data
                }

            } catch (e) {
                // 当item拿不到键值对的时候，证明数据异常，返回默认值
                return def
            }
        }
        return def
    }

    /**
     * @description 从缓存删除某项
     * @param {string}  key  缓存键
     */
    removeItem(key: string) {
        this.storage.removeItem(getKey(key, this.prefix, this.suffix));
    }

    /**
     * @description 清空所有缓存
     */
    clear() {
        this.storage.clear();
    }


}



export default CreateStorage
