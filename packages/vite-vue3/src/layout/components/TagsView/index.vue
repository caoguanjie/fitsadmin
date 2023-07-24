<template>
  <div class="tags-view__container">
    <scroll-pane ref="scrollPaneRef" class="tags-view__wrapper" @scroll="handleScroll">
      <router-link v-for="tag in visitedViews" :key="tag.path" :data-path="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath, cache: true } as any" class="tags-view__item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''" @contextmenu.prevent="openMenu(tag, $event)"
        @click="setCurrentTags(tag)">
        <svg-icon v-if="tag.meta.icon" :icon-class="tag.meta.icon" />
        {{ tag.meta.title }}
        <span v-if="!isAffix(tag)" class="icon-close" @click.prevent.stop="closeSelectedTag(tag)">
          <svg-icon icon-class="fits-close" />
        </span>
      </router-link>
    </scroll-pane>
    <el-dropdown @visible-change="handleTabMore" @command="handleCommand">
      <span class="fits-tabs-more" :class="{ 'fits-tab-more-active': tabMoreActive }">
        <span class="fits-tabs-more-icon">
          <i class="box box-t" />
          <i class="box box-b" />
        </span>

      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="RefreshIcon" command="refresh">刷新</el-dropdown-item>
          <el-dropdown-item :icon="CloseIcon" command="current">关闭当前</el-dropdown-item>
          <el-dropdown-item :icon="CloseOtherIcon" command='other'>关闭其它</el-dropdown-item>
          <el-dropdown-item :icon="CloseleftIcon" command="left">关闭左侧</el-dropdown-item>
          <el-dropdown-item :icon="CloseRightIcon" command="right">关闭右侧</el-dropdown-item>
          <el-dropdown-item :icon="CloseAllIcon" command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="tags-view__menu">
      <li @click="refreshSelectedTag(selectedTag)">
        <svg-icon icon-class="fits-refresh" />
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <svg-icon icon-class="fits-close" />
        关闭当前
      </li>
      <li @click="closeOtherTags">
        <svg-icon icon-class="fits-close-other" />
        关闭其它
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <svg-icon icon-class="fits-close-left" />
        关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <svg-icon icon-class="fits-close-right" />
        关闭右侧
      </li>
      <li @click="closeAllTags(selectedTag)">
        <svg-icon icon-class="fits-close-all" />
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  ref,
  watch,
  onMounted,
  ComponentInternalInstance,
} from 'vue';

import path from 'path-browserify';

import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';


import ScrollPane from './ScrollPane.vue';
import { SvgIcon } from '@/fits-components/Basic/SvgIcon';
import useStore from '@/store';
import RefreshIcon from '@/assets/icons/fits-refresh.svg';
import CloseIcon from '@/assets/icons/fits-close.svg';
import CloseOtherIcon from '@/assets/icons/fits-close-other.svg';
import CloseleftIcon from '@/assets/icons/fits-close-left.svg';
import CloseRightIcon from '@/assets/icons/fits-close-right.svg';
import CloseAllIcon from '@/assets/icons/fits-close-all.svg';
import { TagView } from '@/model/base/store';


const { tagsView, permission } = useStore();

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
const route = useRoute();

const visitedViews = computed<any>(() => tagsView.visitedViews);
const routes = computed<any>(() => permission.routes);

const affixTags = ref([]);
const visible = ref(false);
const selectedTag = ref({});
const scrollPaneRef = ref();
const left = ref(0);
const top = ref(0);
const tabMoreActive = ref(false);

watch(
  route,
  () => {
    addTags();
    moveToCurrentTag();
    setCurrentTags(route)
  },
  {
    //初始化立即执行
    immediate: true,
  }
);

watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
});

function filterAffixTags(routes: RouteRecordRaw[], basePath = '/') {
  let tags: TagView[] = [];

  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path);
      if (childTags.length >= 1) {
        tags = tags.concat(childTags);
      }
    }
  });
  return tags;
}

function initTags() {
  const res = filterAffixTags(routes.value) as [];
  affixTags.value = res;
  for (const tag of res) {
    // Must have tag name
    if ((tag as TagView).name) {
      tagsView.addVisitedView(tag);
    }
  }
}

function addTags() {
  if (route.name) {
    tagsView.addView(route);
  }
}

function moveToCurrentTag() {
  nextTick(() => {
    for (const r of visitedViews.value) {
      if (r.path === route.path) {
        scrollPaneRef.value.moveToTarget(r);
        // when query is different then update
        if (r.fullPath !== route.fullPath) {
          tagsView.updateVisitedView(route);
        }
      }
    }
  });
}

function isActive(tag: TagView) {
  return tag.path === route.path;
}

function isAffix(tag: TagView) {
  return tag.meta && tag.meta.affix;
}

function isFirstView() {
  try {
    return (
      (selectedTag.value as TagView).fullPath ===
      visitedViews.value[1].fullPath ||
      (selectedTag.value as TagView).fullPath === '/index'
    );
  } catch (err) {
    return false;
  }
}

function isLastView() {
  try {
    return (
      (selectedTag.value as TagView).fullPath ===
      visitedViews.value[visitedViews.value.length - 1].fullPath
    );
  } catch (err) {
    return false;
  }
}

function refreshSelectedTag(view?: TagView) {
  router.push(router.currentRoute.value.fullPath)
}

function toLastView(visitedViews: TagView[], view?: any) {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView && latestView.fullPath) {
    router.push(latestView.fullPath);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath });
    } else {
      router.push('/');
    }
  }
}

function closeSelectedTag(view: TagView) {
  tagsView.delView(view).then((res: any) => {
    if (isActive(view)) {
      toLastView(res.visitedViews, view);
    }
  });
}

function closeLeftTags() {
  tagsView.delLeftViews(selectedTag.value).then((res: any) => {
    if (
      !res.visitedViews.find((item: any) => item.fullPath === route.fullPath)
    ) {
      toLastView(res.visitedViews);
    }
  });
}
function closeRightTags() {
  tagsView.delRightViews(selectedTag.value).then((res: any) => {
    if (
      !res.visitedViews.find((item: any) => item.fullPath === route.fullPath)
    ) {
      toLastView(res.visitedViews);
    }
  });
}

function closeOtherTags() {
  router.push(selectedTag.value as any);
  tagsView.delOtherViews(selectedTag.value).then(() => {
    moveToCurrentTag();
  });
}

function closeAllTags(view: TagView) {
  tagsView.delAllViews().then((res: any) => {
    toLastView(res.visitedViews, view);
  });
}

function openMenu(tag: TagView, e: MouseEvent) {
  const menuMinWidth = 105;
  const offsetLeft = proxy?.$el.getBoundingClientRect().left; // container margin left
  const offsetWidth = proxy?.$el.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const l = e.clientX - offsetLeft + 15; // 15: margin right

  if (l > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = l;
  }

  top.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
}

function closeMenu() {
  visible.value = false;
}

function handleScroll() {
  closeMenu();
}

onMounted(() => {
  initTags();
});

// 设置当前的tag
function setCurrentTags(currentTag: TagView | any) {
  selectedTag.value = currentTag;
  // router.push({
  //   path: currentTag.path, 
  //   query: currentTag.query, 
  //    cache: true
  // })
}
// 处理多页签的操作
function handleCommand(command: string) {
  switch (command) {
    case 'refresh':
      refreshSelectedTag(selectedTag.value);
      break;
    case 'current':
      closeSelectedTag(selectedTag.value)
      break;
    case 'other':
      closeOtherTags();
      break;
    case 'left':
      closeLeftTags();
      break;
    case 'right':
      closeRightTags();
      break;
    case 'all':
      closeAllTags(selectedTag.value)
      break;
  }
}

function handleTabMore(value: boolean) {
  tabMoreActive.value = value
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
$padding: 0 25px;
$closeWidth: 12px;

.tags-view__container {
  height: $tagsViewHeight;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0px 1px 4px 0px rgba(0, 26, 54, 0.1);

  .tags-view__wrapper {
    width: calc(100% - 50px);
    font-size: 12px;
    padding-top: 8px;
    padding-left: 20px;

    .tags-view__item {
      display: inline-block;
      position: relative;
      height: 32px;
      margin-right: -18px;

      line-height: 32px;
      text-align: center;
      color: var(--fits-tagview-text-color);
      font-weight: 500;
      padding: $padding;
      font-size: 12px;
      border: 0;
      outline: none;
      cursor: pointer;
      user-select: none;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

      &:hover {
        color: #515a6e;
        background: #dee1e6;
        padding: 0 30px 0 30px;
      }

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &:hover,
      &.active {
        padding: $padding;
        -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
        mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;

        .icon-close {
          width: $closeWidth;


        }
      }

      &.active {
        background-color: var(--fits-tagview-background-color);
        color: var(--fits-tagview-active-text-color);

        .icon-close {
          width: $closeWidth;

          &:hover {
            background-color: #55a6fa;
            color: #fff;
          }

        }


      }

      &:last-child {
        margin-right: 30px;
      }

      .icon-close {
        text-align: center;

        &:hover {
          background-color: #ccc;
          color: #fff;
        }
      }
    }
  }

  .tags-view__menu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}

.fits-tabs-more {
  position: relative;
  box-sizing: border-box;
  display: block;
  text-align: left;
  margin-left: 10px;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    content: "";
  }


  &.fits-tab-more-active {
    .fits-tabs-more-icon {
      transform: rotate(90deg);
    }

    .box::before,
    .box::after {
      background: var(--el-color-primary) !important;
    }

    .box-t::before {
      transform: rotate(45deg);
    }
  }

  .fits-tabs-more-icon {
    display: inline-block;
    color: #9a9a9a;
    cursor: pointer;
    transition: transform .3s ease-out;

    .box {
      position: relative;
      display: block;
      width: 14px;
      height: 8px;

      &::before {
        position: absolute;
        top: 2px;
        left: 0;
        width: 6px;
        height: 6px;
        content: "";
        background: #9a9a9a;
      }

      &::after {
        position: absolute;
        top: 2px;
        left: 8px;
        width: 6px;
        height: 6px;
        content: "";
        background: #9a9a9a;
      }
    }
  }

  .box-t::before {
    transition: transform .3s ease-out .3s;
  }

}
</style>
<style lang="scss">
$closeWidth: 12px;

//重置 elementUI的样式 css of el-icon-close
.tags-view__wrapper {

  .tags-view__item {
    .icon-close {
      display: inline-block;
      width: 0;
      height: $closeWidth;
      line-height: $closeWidth;
      border-radius: 100%;
      text-align: center;
      overflow: hidden;
      margin-bottom: -3px;
      transform-origin: 100% 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      // &>* {

      //   width: 0;
      // }

      &:before {
        display: inline-block;
        // vertical-align: -1px;
        transform: scale(0.9);
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }

  .el-scrollbar__bar {
    top: 0px
  }
}

.tags-menu .el-dropdown-menu__item {
  line-height: 27px;
  font-size: 12px;
  color: #606266;
  padding: 0 15px;
}
</style>