import Cookies from 'js-cookie'

// 默认缓存期限为7天，可以结合vuex-store来设置,或者结合fitsconfig对象
const DEFAULT_CACHE_DAY = 7
// 是否开启缓存期限的控制
const IS_OPEN = false; 

export class CreateStorage {
    private storage: any;
    private preFixKey: string; // 开发者能自定义一些键值的前缀，例如：prefixKey=fits，最后保存本地的键值有可能是fitslogin
    constructor(prefixKey = '', storage = localStorage) {
        this.storage = storage;
        this.preFixKey = prefixKey
    }

    /**
     * 
     * @param key 
     * @returns 输出键值，例如指定前缀：Login。那么返回的是：LOGIN_KEY
     */
    private getKey(key: string): string {
        return `${this.preFixKey}-${key}`.toUpperCase();
    }

    /**
     * @description 计算有效期的时间，单位：秒
     * @param day 有限期的天数，单位：天
     * @returns 有效期的毫秒级时间戳
     */
    private getExpiresTime(day: number): number {
        return 60 * 60 * 24 * day * 1000
    }

    /**
     * @description 设置缓存
     * @param key 缓存键
     * @param value 缓存值
     * @param expires 到期时间
     * @param isOpen 是否开启到期时间的计算
     */
    set(key: string, value: any, expires: number | null = DEFAULT_CACHE_DAY, isOpen: boolean | null = IS_OPEN) {
       const stringData = JSON.stringify({
           value,
           expires: expires !== null && isOpen ? new Date().getTime() + this.getExpiresTime(expires) : null
       })
       this.storage.setItem(this.getKey(key), stringData)
    }

    /**
     * @description 读取缓存
     * @param {string} key 缓存键
     * @param {any} def 默认值，不传的话默认值为null
     * @returns 返回缓存值，如果超出有效期，则返回null或者用户自定义的默认值
     */
    get(key: string, def: any = null) {
        const item = this.storage.getItem(this.getKey(key));
        if (item) {
            try {
                const data = JSON.parse(item);
                const { value, expires } = data;
                // 在有效期内返回
                if (expires === null || expires >= Date.now()) return value;
                // 如果超过到期时间了，就删除当前的值
                this.remove(key);
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
    remove(key: string) {
        this.storage.removeItem(this.getKey(key));
    }

    /**
     * @description 清空所有缓存
     */
    clear() {
        this.storage.clear();
    }
    
    /**
     * @description 设置cookie
     * @param {string} name cookie 名称
     * @param  {*} value cookie 值 
     * @param {number=} expire 过期时间 
     * @param isOpen 是否打开过期时间的设置
     */
    setCookie(name: string, value: any, expires: number | null = DEFAULT_CACHE_DAY, isOpen: boolean | null = IS_OPEN) {
        const _expires = expires !== null && isOpen ? expires : undefined;
        Cookies.set(this.getKey(name), value, { expires: _expires })
    }

    /**
     * 根据名字获取cookie值
     * @description Cookies.get()取不到值的时候会返回undefined
     * @param name
     */
    getCookie(name: string): string {
        const data = Cookies.get(this.getKey(name)); 
        return data || ''
    }

    /**
     * 根据名字删除指定的cookie
     * 注意，删除不存在的cookie不会报错也不会有返回
     * @param key 
     */
    removeCookie(key: string) {
      Cookies.remove(this.getKey(key));
    }
}

export const storage = new CreateStorage()

export default storage
