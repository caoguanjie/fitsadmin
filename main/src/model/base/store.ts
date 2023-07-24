import ENV from '@/environment';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

/**
 * 注意: sub-menu 仅在route children.length>=1 时出现
 * 详情请看: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item 不会显示在侧边栏中 sidebar(默认值为false)
 * alwaysShow: true               if set true, 将始终显示根菜单
 *                                 如果未设置alwaysShow，则当项目有多个子路线时,
 *                                 它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           重定向：如果设置为noRedirect，noRedirect将不会在面包屑中重定向
 * name:'router-name'             'router-name'该名称由<keep-alive>使用 (必须设置!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色 (你可以设置多个角色)
    title: 'title'               侧边栏和面包屑中显示的名称（推荐设置）、多页签的标签名字
    icon: 'svg-name'/'el-icon-x' 侧边栏要显示的图标
    breadcrumb: false            如果设置为false，则项目将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
    affix: true                  如果设置为true,可以固定在标签页，tag-view
  }
 */

/**
 * 路由元信息
 */
export class RouteMeta {
    roles: string[];
    title: string;
    icon: string;
    breadcrumb: boolean;
    activeMenu: string;
    affix: boolean
    hidden: boolean
    alwaysShow: boolean
    cache: boolean
    // 除了框架默认配置的meta属性，根据实际项目情况，还可以拓展更多属性
    [customMeta: string]: any
    constructor({ roles, title, icon, breadcrumb, activeMenu, affix, hidden, alwaysShow, cache, ...moreMethod }: any = {}) {
        this.roles = roles ?? []
        this.title = title ?? ''
        this.icon = icon ?? ''
        this.breadcrumb = breadcrumb ?? true
        this.activeMenu = activeMenu ?? ''
        this.affix = affix ?? false
        this.hidden = hidden ?? false
        this.alwaysShow = alwaysShow ?? false
        this.cache = cache ?? ENV.system.keepalive
        this.initMoreMethodValue(moreMethod)
    }
    /**
     * 拓展开发可以定义更多除了框架以外的属性
     * @param method 
     */
    initMoreMethodValue(method: any | null | undefined) {
        if (method && method.constructor === Object && Object.keys(method).length !== 0) {
            for (const val in method) {
                this[val] = method[val]
            }
        }

    }
}



/**
* 权限类型声明
*/
export interface PermissionState {
    routes: RouteRecordRaw[];
    addRoutes: RouteRecordRaw[];
    activeMenu: string; // 当前要显示的默认一级菜单
}


/**
 * 标签状态类型声明
 */
export interface TagView extends Partial<RouteLocationNormalized> {
    title?: string;
}

export interface TagsViewState {
    visitedViews: TagView[];
    cachedViews: string[];
    excludeViews: string[];
}
