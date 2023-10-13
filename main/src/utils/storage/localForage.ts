
/*
 * @Author: caoguanjie 
 * @Date: 2023-10-11 16:35:34 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2023-10-12 16:39:13
 */

import * as localforage from 'localforage';
import { IStorageOption } from './types';
import {
    isPlainObject,
    getKey,
    getExpiresTime,
    setEncryptionKey,
    handleDecryptData,
    handleEncryptData,
    removeEmpty,
} from './utils';
import { fitslog } from './logger';

export class CreateLocalForage {
    private storage: LocalForage;
    private config: IStorageOption & LocalForageOptions;
    private lcalForageConfig: LocalForageOptions;
    // 声明是函数表达式
    private waitQueues: Array<() => void> = [];
    private debug: boolean;
    private encryption: boolean;
    private encryptionKey: string;
    constructor(option: IStorageOption & LocalForageOptions = {}) {
        // 如果多余的属性是undefiend,会导致初始化indexeddb报错
        this.lcalForageConfig = removeEmpty({
            driver: option.driver ?? [
                localforage.INDEXEDDB,
                localforage.WEBSQL,
                localforage.LOCALSTORAGE,
            ],
            size: option.size,
            version: option.version,
            description: option.description,
            name: option.name ?? 'Vue3PersistStorage',
            storeName: option.storeName ?? 'DataSheet',
        });

        this.config = {
            prefix: option.prefix ?? '',
            suffix: option.suffix ?? '',
            isOpenExpires: option.isOpenExpires ?? false,
            day: option.day ?? 7,
        };
        this.debug = option.debug ?? false;
        this.encryption = option.encryption ?? false;
        this.encryptionKey = setEncryptionKey(this.encryption);
        this.storage = localforage.createInstance(this.lcalForageConfig);
        this.init();
    }
    /**
     * 初始化存储对象
     */
    init() {

        if (this.waitQueues.length) {
            this.waitQueues.forEach(callback => callback());
            this.waitQueues = [];
        }
    }

    /**
     * @description 读取数据库数据
     * @param key 缓存键值
     * @param def 默认值，不传的话默认值为null
     * @returns 本地有数据就那本地数据，没数据就返回默认值
     */
    async getItem(key: string, def: any = null) {
        if (this.storage) {
            try {
                let item: any = await this.storage.getItem(
                    getKey(key, this.config.prefix, this.config.suffix),
                );
                if (item) {
                    if (this.encryption) {
                        // 如果是加密过的字符串，先解密
                        item = handleDecryptData(this.encryptionKey, item);
                    }
                    const { value, expires } = item;
                    if (this.config.isOpenExpires && expires && expires >= Date.now()) {
                        // 在有效期内返回
                        return Promise.resolve(value);
                    }
                    return Promise.resolve(item);
                }
                return Promise.resolve(def);
            } catch (error) {
                if (this.debug) {
                    fitslog.danger(error);
                }
                return Promise.resolve(def);
            }
        } else {
            return new Promise(resolve => {
                this.waitQueues.push(() => {
                    resolve(this.getItem(key, def));
                });
            });
        }
    }

    /**
      * @description 设置缓存数据
      * @param key 缓存键
      * @param value 缓存值,
      * @member value的类型 支持以下类型
      *  Array
      ArrayBuffer
      Blob
      Float32Array
      Float64Array
      Int8Array
      Int16Array
      Int32Array
      Number
      Object
      Uint8Array
      Uint8ClampedArray
      Uint16Array
      Uint32Array
      String
      */
    async setItem(
        key: string,
        value: any,
        _isOpenExpires = this.config.isOpenExpires,
        expires = this.config.day,
    ) {
        if (this.storage) {
            try {
                // 解决vue3的proxy带来的影响，把proxy转成普通对象。请注意，这种方法并不能完全转换所有的 Proxy 对象，如果对象里面有函数，那么这种方法就会失效。
                // let _value: any = isPlainObject(value) && isProxy(value) ? JSON.parse(JSON.stringify(value)) : value
                // 上面的解决办法，只能检测到对象的第一层属性是不是代理对象，但是实际开发过程中，根本预料不到多层对象底下可能有部分属性也有代理对象的值
                let _value: any = isPlainObject(value) ? JSON.parse(JSON.stringify(value)) : value;

                if (_isOpenExpires) {
                    _value = {
                        _value,
                        expires:
                            expires !== null ? new Date().getTime() + getExpiresTime(expires as number) : null,
                    };
                }

                const result = await this.storage.setItem(
                    getKey(key, this.config.prefix, this.config.suffix),
                    this.encryption ? handleEncryptData(this.encryptionKey, _value) : _value,
                );
                return Promise.resolve(result);
            } catch (error) {
                if (this.debug) {
                    fitslog.danger(error);
                }
                return Promise.reject(error);
            }
        } else {
            return new Promise(resolve => {
                this.waitQueues.push(() => {
                    resolve(this.setItem(key, value));
                });
            });
        }
    }

    /**
     * @description 从缓存删除某项
     * @param {string}  key  缓存键
     */
    async removeItem(key: string) {
        if (this.storage) {
            try {
                await this.storage.removeItem(getKey(key, this.config.prefix, this.config.suffix));
                return Promise.resolve();
            } catch (error) {
                if (this.debug) {
                    fitslog.danger(error);
                }
                return Promise.reject(error);
            }
        } else {
            return new Promise(resolve => {
                this.waitQueues.push(() => {
                    resolve(this.removeItem(key));
                });
            });
        }
    }

    /**
     * @description 清空所有缓存
     */
    async clear() {
        if (this.storage) {
            try {
                await this.storage.clear();
            } catch (error) {
                if (this.debug) {
                    fitslog.danger(error);
                }
            }
        } else {
            return new Promise(resolve => {
                this.waitQueues.push(() => {
                    resolve(this.clear());
                });
            });
        }
    }

    /**
       * 获取本地数据库的大小，主要是获取indexDB的大小
       * {
          quota: 440922000000, // 最大可用字节数, 浏览器存储空间配额
          usage: 27300000,     // 已用字节数, 浏览器已经使用的存储空间大小，
          usageDetails: {        // 这个返回结果不固定
              indexedDB: 676000, // indexedDB的使用占用空间的大小情况，单位字节，
              cacheapi: 26500000,  // 缓存空间
              serviceworker: 52800  // serviceworker服务
          }
      } */
    async getSize() {
        if (navigator.storage && navigator.storage.estimate) {
            const { usageDetails }: any = await navigator.storage.estimate();
            if (usageDetails.indexedDB) {
                return Promise.resolve(`${(usageDetails.indexedDB / 1024 / 1024).toFixed(2)} MB`);
            } else {
                return Promise.resolve(null);
            }
        } else {
            return Promise.reject(null);
        }
    }
}


export default CreateLocalForage;
