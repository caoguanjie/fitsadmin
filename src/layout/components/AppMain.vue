<!-- :key="route.fullPath" ,key的作用，应该是多个路由指向同一个组件，应该要缓存不同的实例 -->
<!-- v-if="!excludeViews.length" 当不缓存组件的数组发生变化的时候，component要经历创建和销毁才能实现组件刷新 -->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="router-fade" mode="out-in" enter-from-class="router-fade-enter">
        <keep-alive :include="cachedViews" :exclude="excludeViews" :max="ENV.system.keepaliveMax">
          <component :is="Component" v-if="!excludeViews.length" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import useStore from '@/store';
import ENV from '@/environment/index';
import { RouteLocationNormalized, onBeforeRouteUpdate } from 'vue-router';
import { deleteCache } from '@/router/utils';


const { tagsView } = useStore();

const cachedViews = computed(() => tagsView.cachedViews);
const excludeViews = computed(() => tagsView.excludeViews);
const router = useRouter()

/**
 * 路由更新时的路由守卫，是组件内的路由守卫，不是全局路由守卫
 */
onBeforeRouteUpdate((to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
  if (!router.keepAlive) {
    console.error('onBeforeRouteUpdate', router.keepAlive)
    // 如果不需要缓存，就要删除当前组件的缓存
    deleteCache(to)
  } else {
    // 这里主要是为了预防用户直接通过push({cache:true}来设置当前路由是否可以缓存)
    to.meta.cache = true
    tagsView.addCachedView(to)
  }
  next()
})


</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;

  &>* {
    margin: $basePadding $basePadding 0 $basePadding;
    // width: 100%;
    height: inherit;
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 90 = navbar + tags-view = 50 + 40 */
    // min-height: calc(100vh - 90px);
    // min-height: 100vh;
  }

  .fixed-header+.app-main {
    padding-top: 90px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
