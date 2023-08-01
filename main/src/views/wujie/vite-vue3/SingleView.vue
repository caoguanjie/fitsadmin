<template>
    <div>
        <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
        <WujieVue width="100%" height="100%" ref="wujie" :alive="false" name="vite-vue3-single" :url="viteUrl"
            :props="{ type: 'single' }" />
    </div>
</template>
  
<script setup lang="ts">
import useStore from '@/store';
import WujieVue from "wujie-vue3";
const { bus } = WujieVue
const { microFrontends: { subURL } } = useStore()
const route = useRoute()
const wujie = ref()
const viteUrl = ref(`${subURL}#${route.meta.path}`)
console.log(viteUrl.value)
onMounted(() => {
    console.error('重新打开')
    // wujie.value.startApp({
    //     name: 'vite-vue3-single',
    //     url: viteUrl,
    // })

})
</script>
<style lang="scss" scoped>

</style>
  