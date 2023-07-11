import { FitsDefaultSetting } from "./model";



const importModules = import.meta.globEager('./modules/*.ts');
// 环境变量默认是以开发环境为主
interface PreviousValue {
    [envKey: string]: any;
}
const _modules: PreviousValue = Object.keys(importModules).reduce((modules: PreviousValue, modulesPath: string) => {
    const modulesName = modulesPath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1")
    const value: any = importModules[modulesPath]
    modules[modulesName] = value.default;
    return modules
}, {})
const NODE_ENV = import.meta.env.MODE || 'dev'
const ENV: FitsDefaultSetting = new FitsDefaultSetting(_modules[NODE_ENV])
console.log(ENV)
export default ENV