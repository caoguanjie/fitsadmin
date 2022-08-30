<template>
    <div class="footeContainer">
        <div class="left">
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        </div>
        <div class="right">
            {{ title }}V{{ version }}
        </div>
    </div>
</template>

<script lang='ts' setup>
import ENV from '@/environment/index';
import Breadcrumb from '@/layout/components/Breadcrumb/index.vue';
const { project: { title, version } } = ENV
</script>
<style lang='scss' scoped>
.footeContainer {
    position: fixed;
    bottom: 0;
    z-index: 1002;
    height: 24px;
    background-color: #333333;
    width: 100%;
    padding: 0 30px;
    display: flex;
    color: #fff;
    align-items: center;
    font-size: 10px;

    .left {
        flex: 1;

    }

    .right {}
}
</style>