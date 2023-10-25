<template>
  <div :class="classObj" class="app-wrapper"
    :style="{ 'padding-bottom': showFooterBreadcrumb ? variables.footerHeight : '0' }">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <!-- <div :class="{ 'fixed-header': fixedHeader }"> -->
      <div class="fits-head">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <el-scrollbar :height="mainContent" class="fits-main-layout">
        <app-main class="mainContentScrollbar" />
      </el-scrollbar>
      <RightPanel v-if="showSettings">
        <settings />
      </RightPanel>
    </div>
  </div>
  <FitsFooter />
</template>

<script setup lang="ts">
import { computed, toRefs, watchEffect } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { AppMain, Navbar, Settings, TagsView } from './components/index';
import Sidebar from './components/Sidebar/index.vue';
import RightPanel from '@/components/RightPanel/index.vue';
import FitsFooter from "@/layout/components/Footer/index.vue"
import useStore from '@/store';
import variables from '@/styles/variables.module.scss';
const { width } = useWindowSize();

const WIDTH = 992;

const { app, setting } = useStore();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const needTagsView = computed(() => setting.tagsView);
// const fixedHeader = computed(() => setting.fixedHeader);
const showSettings = computed(() => setting.showSettings);
const theme = computed(() => setting.theme);
const showFooterBreadcrumb = computed(() => setting.showFooterBreadcrumb);
const bodyHeight = ref(document.body.clientHeight)
// 主要内容的高度
const mainContent = computed(() => {
  const tagsViewHeight = needTagsView.value ? parseInt(variables.tagsViewHeight) : 0;
  const footerHeight = showFooterBreadcrumb.value ? parseInt(variables.footerHeight) : 0;
  return bodyHeight.value - parseInt(variables.headHeight) - tagsViewHeight - footerHeight + 'px'
})


const classObj = computed(() => {
  const arr = []
  !sidebar.value.opened && arr.push('hideSidebar');
  sidebar.value.opened && arr.push('openSidebar');
  sidebar.value.withoutAnimation && arr.push('withoutAnimation');
  device.value === 'mobile' && arr.push('mobile');
  // 添加主题的class类明
  arr.push(theme.value)
  return arr
});


// 监听浏览器的变化，及时更新scorll组件的高度
const stop = useResizeObserver(document.body, (entries) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  bodyHeight.value = height
  const { width } = useWindowSize();
  if (width.value < WIDTH) {
    app.toggleDevice('mobile');
    app.closeSideBar(true);
  } else if (width.value > 1400) {
    app.toggleDevice('desktop');
    app.openSideBar(true);
  } else {
    app.toggleDevice('desktop');
  }
})

function handleClickOutside() {
  app.closeSideBar(false);
}
onUnmounted(() => {
  stop.stop()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';


.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - $sideBarHideWidth);
}

.mobile .fixed-header {
  width: 100%;
}

.fits-head {

  position: relative;
  z-index: 1;
}

.mainContentScrollbar {
  min-width: 768px;
}
</style>
