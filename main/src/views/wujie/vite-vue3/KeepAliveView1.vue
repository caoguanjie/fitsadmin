<template>
    <div>
        <!-- 这个文件要注意一点内容，如果有注释，一定要使用一个空白div包裹住，不然会显示空白页，因为keepalive内只能存在一个组件的标签 -->
        <!--保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
        <WujieVue v-if="loading" width="100%" height="100%" :alive="true" name="vite-vue3-keepalive" :url="viteUrl"
            :props="{ type: 'keepalive' }" ref="wujie" />
        <!-- 如果当前路由已经设置了keepalive缓存，则alive无论设不设置都会被缓存下来。 -->
    </div>
</template>
  
<script setup lang="ts" name="ViteKeepalive1">
import useStore from '@/store';
import { fitslog } from '@/utils/base/logger';
import WujieVue from 'wujie-vue3';
const { microFrontends: { subURL } } = useStore()
const { bus } = WujieVue;
const wujie = ref()
const loading = ref(true)
const route = useRoute()
const viteUrl = ref(`${subURL}#${route.meta.path}`)
fitslog.info('子应用的地址：', viteUrl.value)
onMounted(() => {

    // console.error('重新打开', wujie.value.startApp)
    // wujie.value.startApp({
    //     name: 'vite-vue3-keepalive',
    //     url: viteUrl
    // }).then(() => {
    //     bus.$emit("move", {
    //         path: route.meta.path
    //     });
    // })


})
onActivated(() => {
    wujie.value.startApp({
        name: 'vite-vue3-keepalive',
        url: viteUrl
    }).then(() => {
        bus.$emit("move", {
            path: route.meta.path
        });
    })
})
// 主应用发送事件

</script>
<style lang="scss" scoped>

</style>
  