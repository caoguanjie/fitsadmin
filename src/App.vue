<template>
  <el-config-provider :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';

import useStore from '@/store';
import { useRoute } from 'vue-router';

// 导入 Element Plus 语言包


const { app } = useStore();


const size: any = computed(() => app.size);

const locale = ref();


</script>
