import { defineStore } from "pinia";
import { Drivers, Storage as IonicStorage } from '@ionic/storage';
import XEUtils from 'xe-utils';

interface UserHabitsState {
    store: IonicStorage | null
}
interface Obj {
    store: IonicStorage | null
    // 限定getName调用时的this类型
    initDB(this: Obj): void
}
const IndexedDBStorage: Storage & Obj = {
    store: null,
    async setItem(key: string, value: any) {
        try {
            await this.store?.set(key, XEUtils.toJSONString(value));
        } catch (error) {
            throw new Error(`保存数据失败, 失败原因：${error}`)
        }
    },
    getItem(key: string) {
        try {
            const item = this.store?.get(key);
            if (item) {
                const data = XEUtils.toStringJSON(item);
                return data;
            }
            return null
        } catch (error) {
            throw new Error(`获取数据失败, 失败原因：${error}`)
        }
    },
    async removeItem(key: string) {
        try {
            await this.store?.remove(key);
        } catch (error) {
            throw new Error(`删除数据失败, 失败原因：${error}`)
        }
    },
    async clear() {
        try {
            await this.store?.clear();
        } catch (error) {
            throw new Error(`清空数据失败, 失败原因：${error}`)
        }
    },
    key(index: number) {
        return index.toString()
    },
    length: 0,
    initDB() {
        this.store = new IonicStorage({
            name: 'FitsAdmin',
            storeName: 'dataSheetName',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        });
        try {
            this.store.create()
        } catch (error) {
            throw new Error(`创建indexDB数据库失败, 失败原因：${XEUtils.toJSONString(error)}`)
        }
    }
}

// 用户操作习惯记录表
const useUserHabitsStorage = defineStore({
    id: import.meta.env.BASE_URL + 'UserHabits',
    state: (): UserHabitsState => ({
        store: null
    }),
    actions: {
        /**
         * 设置用户信息
         * @param dataBaseName 数据库名字
         * @param dataSheetName 数据库里面的每张表的名字
         */
        initDB(dataSheetName: string) {
            IndexedDBStorage.initDB()
            // this.store = new IonicStorage({
            //     name: 'FitsAdmin',
            //     storeName: dataSheetName,
            //     driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
            // });
            // try {
            //     this.store.create()
            // } catch (error) {
            //     throw new Error(`创建indexDB数据库失败, 失败原因：${XEUtils.toJSONString(error)}`)
            // }

        },

        /**
         * @description 设置缓存数据
         * @param key 缓存键
         * @param value 缓存值
         */
        async set(key: string, value: any) {
            try {
                await this.store?.set(key, XEUtils.toJSONString(value));
            } catch (error) {
                throw new Error(`保存数据失败, 失败原因：${error}`)
            }
        },
        /**
         * @description 读取数据库数据
         * @param key 缓存键值
         * @param def 默认值，不传的话默认值为null
         * @returns 本地有数据就那本地数据，没数据就返回默认值
         */
        async get(key: string, def: any = null) {
            try {
                const item = await this.store?.get(key);
                if (item) {
                    const data = XEUtils.toStringJSON(item);
                    return data;
                }
                return def
            } catch (error) {
                return def
            }
        },
        /**
    * @description 从缓存删除某项
    * @param {string}  key  缓存键
    */
        async remove(key: string) {
            try {
                await this.store?.remove(key);
            } catch (error) {
                throw new Error(`删除数据失败, 失败原因：${error}`)
            }
        },

        /**
         * @description 清空所有缓存
         */
        async clear() {
            try {
                await this.store?.clear();
            } catch (error) {
                throw new Error(`清空数据失败, 失败原因：${error}`)
            }
        },

    },
});

export default useUserHabitsStorage;