/* eslint-disable @typescript-eslint/ban-ts-comment */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus';
import { RouteLocationNormalized, Router } from 'vue-router'
import useStore from '@/store';
NProgress.configure({ showSpinner: false })
import ENV from '@/environment/index';
const whiteList = ['/login', '/404']
export const createRouterGuards = (router: Router) => {
    router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
        // 开启进度条
        NProgress.start()
        const { user } = useStore();
        const { permission } = useStore();

        // 确定用户是否已登录
        if (user && user.token) {
            if (to.path === '/login') {
                // 如果已登录，请重定向到主页
                next({ path: '/' })
                NProgress.done()
            } else {
                // 检查用户是否已获得其权限角色
                if (user.roles.length === 0) {
                    try {
                        // 获取用户信息，包括角色
                        await user.getUserInfo()
                        // 生成路由方案
                        const asscessRoutes: any = await permission.generateRoutes(user.roles)
                        // 动态添加路由
                        asscessRoutes.forEach((route: any) => {
                            router.addRoute(route);
                        });

                        // Set the replace: true, 因此导航不会留下历史记录
                        next({ ...to, replace: true })
                    } catch (err: any) {
                        // 删除token并重定向到登录页面
                        user.resetToken()
                        ElMessage.error(err || 'Has Error')
                        next(`/login?redirect=${to.path}`)
                        NProgress.done()
                    }
                } else {
                    next()
                }
            }
        } else {
            // Has no token
            if (whiteList.indexOf(to.path) !== -1) {
                // 如果有设置白名单可以直接进入
                next()
            } else {
                // if (permission.routes.length) {
                //     next()
                // } else {
                //     const accessRoutes: any = await permission.generateRoutes(['admin']);
                //     accessRoutes.forEach((route: any) => {
                //         router.addRoute(route);
                //     });
                //     next({ ...to, replace: true })
                // }

                // 没有访问权限的其他页面将重定向到登录页面
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
    })

    router.afterEach((to: RouteLocationNormalized) => {
        // 关闭 进度条
        NProgress.done()

        // 设置页面标题
        if (to.meta.title) {
            document.title = to.meta.title + ' - ' + ENV.project.title
        }
    })
}
