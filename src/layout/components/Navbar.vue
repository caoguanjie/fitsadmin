<template>
  <div class="navbar" :class="isTagsView ? 'noshadow' : ''">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar" />

    <breadcrumb v-if="hamburgerPotion == 'top' && isshowFooterBreadcrumb" id="breadcrumb-container"
      class="breadcrumb-container" />
    <top-menu v-if="hamburgerPotion == 'bottom' || !isshowFooterBreadcrumb" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!--        <search id="header-search" class="right-menu-item" />
                <error-log class="errLog-container right-menu-item hover-effect" />-->
        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
        <el-tooltip content="主题设置" effect="dark" placement="bottom">
          <theme-select class="right-menu-item hover-effect setting" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" popper-class="navDropdown"
        placement="bottom-end">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
          <span class="nickname">{{ nickname }}</span>
          <svg-icon icon-class="down" />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/User">
              <el-dropdown-item :icon="User">个人信息</el-dropdown-item>
            </router-link>
            <router-link to="/Password">
              <el-dropdown-item :icon="EditPen">修改密码</el-dropdown-item>
            </router-link>
            <el-dropdown-item :icon="Message">
              意见反馈
            </el-dropdown-item>
            <el-dropdown-item :icon="Help">
              使用帮助
            </el-dropdown-item>
            <el-dropdown-item @click="logout" :icon="SwitchButton">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { User, EditPen, Message, Help, SwitchButton } from '@element-plus/icons-vue';
import useStore from '@/store';

// 组件依赖

import TopMenu from '@/layout/components/TopMenu/index.vue'
import Hamburger from '@/components/Hamburger/index.vue';
import Breadcrumb from '@/layout/components/Breadcrumb/index.vue';
// import Screenfull from '@/components/ScreenFull/index.vue'
import ThemeSelect from '@/layout/components/Settings/ThemeSelect.vue';
import { SvgIcon } from '@/fits-components/Basic/SvgIcon';

const { app, user, tagsView, setting } = useStore();
const route = useRoute();
const router = useRouter();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const avatar = computed(() => user.avatar);
const nickname = computed(() => user.nickname);
const isTagsView = computed(() => setting.tagsView);
const isshowFooterBreadcrumb = computed(() => setting.showFooterBreadcrumb);
const hamburgerPotion = computed(() => setting.breadcrumbPosition);

function toggleSideBar() {
  app.toggleSidebar();
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    user.logout()
      .then(() => {
        tagsView.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>
<style  lang="scss">
.navDropdown {
  .el-dropdown-menu__item {
    padding: 0 24px;
    width: 180px;
    line-height: 49px;
    color: #333330;
    // background-color: #f2f6fc;
  }

  .el-dropdown-menu__item:not(.is-disabled):focus {
    // --el-dropdown-menuItem-hover-fill: #f2f6fc;
    // --el-dropdown-menuItem-hover-color: #333330
  }
}

.navbar {

  .breadcrumb-container {
    .el-breadcrumb__item {
      a {
        color: rgb(0, 0, 0)
      }

      .no-redirect {
        color: #666;

      }
    }
  }
}
</style>
<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}


.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 26, 54, 0.1);
  border-bottom: 1px solid #e3e3e3;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    color: var(--fits-font-color-base1);
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

  }

  .breadcrumb-container {
    float: left;
    height: 100%;
    line-height: 46px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    color: var(--fits-color-grey);

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: var(--fits-color-grey);
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .setting {
      font-size: 20px;
    }


    .avatar-container {
      margin-right: 16px;

      .avatar-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-top: 10px;
        font-size: 10px;

        .nickname {
          font-size: 12px;
          color: #666;
          margin: 0 5px;
          user-select: none;
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 100%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.noshadow {
  box-shadow: none;
}
</style>
