<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts" name="">
import { computed, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

import useStore from '@/store';
import { useRouter } from 'vue-router';

// 导入 Element Plus 语言包

const router = useRouter();
const { app } = useStore();


const size: any = computed(() => app.size);

const locale = ref();
window.$wujie?.bus.$on("move", (obj: any) => {
  router.push(obj)
});

</script>
