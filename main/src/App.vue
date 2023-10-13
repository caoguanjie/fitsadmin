<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

import useStore from '@/store';
import { useRoute } from 'vue-router';
import { useMicroFrontendsStore } from './store/base/micro-frontends-test';

// 导入 Element Plus 语言包


const { app } = useStore();

const { subURL } = useMicroFrontendsStore()
const size: any = computed(() => app.size);

const locale = ref();
setTimeout(() => {
  // subURL.name = 3
  console.log(subURL)
  app.language = 'zh'
}, 3000)

</script>
