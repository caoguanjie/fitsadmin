<template>
    <div>
        <!--重建模式，等于iframe的体验效果 -->
        <WujieVue v-if="route.meta.path" width="100%" height="100%" name="webpack-vue2" :url="viteUrl" />
    </div>
</template>
  
<script setup lang="ts" >
import useStore from '@/store';

const { microFrontends: { subURL } } = useStore()

const route = useRoute()
console.log(route)
const viteUrl = ref(`http://192.168.32.60:3002/#${route.meta.path}`)



console.log(viteUrl.value)
</script>
<style lang="scss" scoped>

</style>
  