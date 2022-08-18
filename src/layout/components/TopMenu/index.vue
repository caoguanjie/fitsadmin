<template>
    <el-menu :default-active="activeMenu" class="topMenu" mode="horizontal" @select="changeMenu">
        <template v-for="item in routes" :key="item.path">

            <el-menu-item :index="item.path">
                <!-- <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" /> -->
                <template #title>
                    {{ item.meta.title }}
                </template>
            </el-menu-item>

        </template>

    </el-menu>
</template>

<script lang='ts' setup>
import { computed, ref, watch } from 'vue';
import useStore from '@/store';
import { useRoute } from 'vue-router';

// import SvgIcon from '@/components/SvgIcon/index.vue';

const route = useRoute();

const routes: any = computed(() => {
    return permission.routes.filter((route) => {
        return !route.meta || !route.meta.hidden
    })
});

const { permission } = useStore();
const activeMenu = computed(() => permission.activeMenu);



watch(route, () => {
    const rootRoute = route.matched[0];
    if (rootRoute.path !== activeMenu.value) {
        changeMenu(rootRoute.path)
    }
}, {
    //初始化立即执行
    immediate: true,
}
);

function changeMenu(index: string) {
    permission.setActiveMenu(index)
}

</script>
<style lang='scss' scoped>
.topMenu {
    float: left;
    border: 0;
    margin-left: 25px;


    .el-menu-item:not(.is-disabled):hover,
    .el-menu-item:not(.is-disabled):focus {
        background-color: transparent;
        color: var(--fits-menu-hover-text-color);
    }

    .el-menu-item.is-active {
        --el-menu-active-color: var(--fits-menu-active-color);
        border-width: 4px;
        font-weight: 500;
        user-select: none;

        &>svg {
            color: var(--fits-menu-active-color)
        }
    }

    .el-menu-item {
        padding: 0;

        margin-right: 50px;
        line-height: calc(#{$headHeight} - 4px);
        color: var(--fits-font-color-base1);

        &>svg {
            margin-right: 5px;
        }
    }
}
</style>