<template>
    <div>
        <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" />
    </div>
</template>
  
<script setup lang="ts">
import { SvgIcon } from '@/fits-components/Basic/SvgIcon';
import { useFullscreen } from '@vueuse/core';


const { isFullscreen, toggle } = useFullscreen();
</script>
  