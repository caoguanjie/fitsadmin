import { PiniaPluginContext } from "pinia";


export interface Vue3PersistStorages {
    storage?: Storage | LocalForage;
    isOpenExpires?: boolean;
    day?: number
    prefix?: string; // 开发者能自定义一些键值的前缀，例如：prefix=fits，最后保存本地的键值有可能是fitslogin
    suffix?: string;
    debug?: boolean;
    encryption?: boolean;
    encryptionKey?: string
    getItem<T>(key: string): Promise<T | null> | T;
    setItem<T>(key: string, value: T, expires?: number, isOpenExpires?: boolean): Promise<T | null> | T;
    removeItem<T>(key: string): Promise<T | null> | T;
    clear<T>(): Promise<T | null> | T;
    init(): void;
    // indexed模式下，可以获取本地数据库的大小
    getSize<T>(): Promise<T | null>;
}
export interface IExtendPersist extends PersistOptions {
    storages: Vue3PersistStorages;
}

export interface IPluginOption {
    // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // 数据库名称, 默认值：Vue3PersistStorage
    name?: string;
    // 数据库中表名，默认值：DataShee
    storeName?: string;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
}

/**
 * storage入参
 */
export interface IStorageOption extends IPluginOption {
    // storage类型，有localStorage、sessionStroage（可选）
    storage?: Storage | CustomStorage;
    // 是否开启有效期, 默认值：false
    isOpenExpires?: boolean;
    // 有效期默认几天, 默认值: 7天
    day?: number;
}

export interface PersistOptions extends IStorageOption {
    // 使用 indexedDB 或 storage（可选）、或者自定义属性
    type?: 'storage' | 'indexedDB' | 'cookies' | 'custom';
    // 持久化存储的key（可选）
    key?: string;
    // 需要持久化的数据的路径（可选）
    paths?: string[];
    // 还原前执行函数（可选）
    beforeRestore?: (context: PiniaPluginContext) => void;
    // 还原后执行函数（可选）
    afterRestore?: (context: PiniaPluginContext) => void;

}

export interface CustomStorage {
    getItem<T>(key: string): Promise<T | null> | T;
    setItem<T>(key: string, value: T): Promise<T | null> | T;
}



export type TPersist = boolean | PersistOptions | PersistOptions[];


export type Store = PiniaPluginContext['store'];
export type PartialState = Partial<Store['$state']>;

declare module 'pinia' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface DefineStoreOptionsBase<S extends StateTree, Store> {
        persist?: TPersist;
    }
    // export interface PiniaCustomProperties {
    //     $hydrate: (opts?: { runHooks?: boolean }) => void;
    //     $persist: () => void;
    // }
}




export interface Target {
    __v_skip?: boolean
    __v_isReactive?: boolean
    __v_isReadonly?: boolean
    __v_raw?: any
    __v_reactive?: any
    __v_readonly?: any
}

export const enum ReactiveFlags {
    skip = '__v_skip',
    isReactive = '__v_isReactive',
    isReadonly = '__v_isReadonly',
    raw = '__v_raw',
    reactive = '__v_reactive',
    readonly = '__v_readonly'
}