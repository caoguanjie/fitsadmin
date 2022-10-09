<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :unique-opened="false" :collapse-transition="false"
        mode="vertical">

        <div v-if="hamburgerPotion =='bottom' || !isshowFooterBreadcrumb">
          <div v-for="route in routes" :item="route" :key="route.path">{{route.path}}</div>
          <sidebar-item v-for="route in routes" :item="route" :key="route.path" :base-path="basePath + '/' + route.path"
            :is-collapse="isCollapse" />
        </div>

        <div v-else>
          <div v-for="route in allRoutes" :item="route" :key="route.path">{{route.path}}</div>
          <sidebar-item v-for="route in allRoutes" :item="route" :key="route.path" :base-path="route.path"
            :is-collapse="isCollapse" />
        </div>

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import SidebarItem from './SidebarItem.vue';
import Logo from './Logo.vue';
import variables from '@/styles/variables.module.scss';
import useStore from '@/store';
const hamburgerPotion = computed(() => setting.breadcrumbPosition)
const isshowFooterBreadcrumb = computed(() => setting.showFooterBreadcrumb);

const { permission, setting, app } = useStore();

const route = useRoute();
const routes: any = ref([]);
const allRoutes = permission.routes;
const basePath = ref("")
const showLogo = computed(() => setting.sidebarLogo);
const isCollapse = computed(() => !app.sidebar.opened);
// 初始的路由
routes.value = getRouter(permission.activeMenu)
const subscribe = permission.$subscribe((mutation, state) => {
  /*
  * mutation主要包含三个属性值：
  *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
  *   storeId：是当前store的id
  *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
  *         “direct” ：通过 action 变化的
            ”patch object“ ：通过 $patch 传递对象的方式改变的
            “patch function” ：通过 $patch 传递函数的方式改变的
  *
  * */

  if ((mutation.events as any).key === 'activeMenu') {
    // 我们就可以在此处监听store中值的变化，当变化为某个值的时候，去做一些业务操作之类的
    routes.value = getRouter(state.activeMenu)
  }


}, { detached: false })
//第二个参数options对象，是各种配置参数
//detached:布尔值，默认是 false，正常情况下，当订阅所在的组件被卸载时，订阅将被停止删除，
// 如果设置detached值为 true 时，即使所在组件被卸载，订阅依然在生效
//参数还有immediate，deep，flush等等参数 和vue3 watch的参数是一样的，多的就不介绍了，用到再看文档吧
// 停止订阅
// subscribe()  //调用上方声明的变量值，示例（subscribe），即可以停止订阅
function getRouter(activeMenu: string) {
  const _routes: any = permission.routes.find((_route) => {
    if (_route.path === activeMenu) {
      basePath.value = _route.path
      return true
    }
  });
  return _routes.children ?? [];
}

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});
</script>
