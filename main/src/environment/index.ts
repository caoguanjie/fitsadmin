import { FitsDefaultSetting } from "./model";



const importModules = import.meta.glob('./modules/*.ts', { eager: true, import: 'default' });

// 环境变量默认是以开发环境为主
interface PreviousValue {
    [envKey: string]: any;
}
const _modules: PreviousValue = Object.keys(importModules).reduce((modules: PreviousValue, modulesPath: string) => {
    const modulesName = modulesPath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1")
    modules[modulesName] = importModules[modulesPath];
    return modules
}, {})
const NODE_ENV = import.meta.env.MODE || 'dev'

const ENV: FitsDefaultSetting = new FitsDefaultSetting(_modules[NODE_ENV])
console.log(ENV)
export default ENV