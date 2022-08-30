<template>
    <div>
        <svg-icon icon-class="zhuti" @click="toggle" />
    </div>
</template>

<script lang='ts' setup>
import SvgIcon from '@/components/SvgIcon/index.vue';
import useStore from '@/store';

const { setting } = useStore();
const toggle = () => {
    setting.toggleSetting()
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
</style>