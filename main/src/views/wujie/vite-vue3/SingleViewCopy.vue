<template>
    <div>
        <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
        <WujieVue width="100%" height="100%" ref="wujie" :alive="false" name="vite-vue3-single" :url="viteUrl"
            :props="{ type: 'single' }" />
    </div>
</template>
  
<script setup lang="ts">
import useStore from '@/store';
import { fitslog } from '@/utils/base/logger';
import WujieVue from "wujie-vue3";

const { microFrontends: { subURL } } = useStore()
const route = useRoute()
const wujie = ref()
const viteUrl = ref(`${subURL}#${route.meta.path}`)
fitslog.info('子应用的地址：', viteUrl.value)

</script>
<style lang="scss" scoped>

</style>
  