
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { asyncRoutes, constantRoutes } from '@/router';
import { listRoutes } from '@/api/system/menu';
import { RouteMeta, PermissionState } from '@/model/base/store';


const modules = import.meta.glob('../../views/**/**.vue');
export const Layout = () => import('@/layout/index.vue');

const hasPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role: any) => route.meta.roles.includes(role))
  } else {
    return true
  }

}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: string[]
) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    // 这步是为了解决useRoute()方法里面，出现了meta信息被obj.assign合并bug,通过源码知道constantRoutes方法会把每级别目录的meta属性合并在一起
    // route.meta && (route.meta = Object.assign(new RouteMeta(), route.meta));
    const tmp = { ...route, } as any;
    if (hasPermission(roles, tmp)) {
      tmp.meta && (tmp.meta = new RouteMeta(tmp.meta))
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  });
  return res;
};

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
    addRoutes: [],
    activeMenu: '',
  }),
  actions: {
    setActiveMenu(activeMenu?: string) {
      if (activeMenu && activeMenu !== '/') {
        // 有参数，证明是点击了一级目录
        this.activeMenu = activeMenu;
        return
      }
      const _activeMenu: any = this.routes.find((route: any) => {
        return route.meta && route.meta.activeMenu
      })
      this.activeMenu = _activeMenu.meta.activeMenu ?? '';
    },
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
      this.setActiveMenu();
    },
    generateRoutes(roles: string[]) {
      return new Promise((resolve, reject) => {
        let accessedRoutes
        if (roles.includes('admin')) {
          // accessedRoutes = asyncRoutes || []
          // 临时用一下
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        this.setRoutes(accessedRoutes);
        resolve(accessedRoutes);
        // listRoutes()
        //   .then((response) => {
        //     const asyncRoutes = response.data;
        //     const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        //     this.setRoutes(accessedRoutes);
        //     resolve(accessedRoutes);
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });
      });
    },
  },
});

export default usePermissionStore;
