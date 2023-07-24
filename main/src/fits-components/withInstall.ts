
import type { App, Plugin } from "vue"
type SFCWithInstall<T> = T & Plugin
export const withInstall = <T>(comp: T) => {
    (comp as SFCWithInstall<T>).install = (app: App) => {
        //注册组件,弥补组件没有定义name的bug
        app.component((comp as any).name ?? (comp as any).__name, comp as any)
    }
    return comp as SFCWithInstall<T>
}