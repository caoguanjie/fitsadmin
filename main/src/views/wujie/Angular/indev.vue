<template>
    <div class="box">
        <div class="app-wapper">
            <!--重建模式，等于iframe的体验效果 -->
            <WujieVue width="100%" height="100%" name="angular" :url="viteUrl" />
        </div>
    </div>

</template>
  
<script setup lang="ts" >

const viteUrl = ref(`http://192.168.32.60:3004/`)
</script>
<style lang="scss" scoped>
.box {
    background-color: #fff;
}

.app-wapper {
    margin: 0 auto;
    min-width: 320px;
    width: 40%;
    max-width: 750px;
    height: 82vh;
    min-height: 900px;
    box-shadow: 0 1px 10px rgba($color: #000000, $alpha: 0.5);
}
</style>
  