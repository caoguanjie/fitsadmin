<template>
  <el-drawer v-model="isShowSetting" :size="300" :with-header="false" direction="rtl" :before-close="handleClose">
    <slot />
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';


import useStore from '@/store';


const { setting } = useStore();

const theme = computed(() => setting.theme);
const isShowSetting = computed(() => setting.isShowSetting);


const handleClose = () => {
  setting.toggleSetting();
}

</script>



<style lang="scss" scoped>
</style>
