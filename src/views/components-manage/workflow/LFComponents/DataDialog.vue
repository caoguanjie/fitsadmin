<template>
    <!-- 查看数据的弹出框 -->
    <div>
        <vue-json-pretty :path="'res'" :data="props.graphData"></vue-json-pretty>
    </div>
</template>
<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import { onMounted } from 'vue';

const props = defineProps<{
    graphData:any
}>();
onMounted(()=>{
    // console.log(props.graphData)
})
</script>
<style scoped>
</style>
