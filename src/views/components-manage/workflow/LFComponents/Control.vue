<template>
  <!-- 辅助工具栏 -->
  <div>
    <el-button-group>
      <el-button plain @click="zoomIn">放大</el-button>
      <el-button plain @click="zoomOut">缩小</el-button>
      <el-button plain @click="zoomReset">大小适应</el-button>
      <el-button plain @click="translateRest">定位还原</el-button>
      <el-button plain @click="reset">还原(大小&定位)</el-button>
      <el-button plain @click="undo" :disabled="controlData.undoDisable"
        >上一步(ctrl+z)</el-button
      >
      <el-button plain @click="redo" :disabled="controlData.redoDisable"
        >下一步(ctrl+y)</el-button
      >
      <el-button plain @click="download">下载图片</el-button>
      <el-button plain @click="catData">查看数据</el-button>
      <el-button plain @click="clearData">一键美化</el-button>
    </el-button-group>
  </div>
</template>
<script lang="ts" setup>
import { onMounted,reactive } from 'vue';
// 传配置项直接替换 + 数据
const props = defineProps<{
  lf: any;
}>();
const emit = defineEmits([
  "getData"
])

const controlData = reactive({
  undoDisable:true,
  redoDisable:true,
})

const createControl = (): void => {
  props.lf.on("history:change", ({ data: { undos, redos, undoAble, redoAble } }) => {
    controlData.undoDisable = !undoAble;
    controlData.redoDisable = !redoAble;
  });
};
createControl();


const zoomIn = (): void => {
  props.lf.zoom(true);
};
const zoomOut = () => {
  props.lf.zoom(false);
};
const zoomReset = () => {
  props.lf.resetZoom();
};
const translateRest = () => {
  props.lf.resetTranslate();
};
const reset = () => {
  props.lf.resetZoom();
  props.lf.resetTranslate();
};
const undo = () => {
  props.lf.undo();
};
const redo = () => {
  props.lf.redo();
};
const download = () => {
  props.lf.getSnapshot();
};
const catData = () => {
  emit("getData")
};
const clearData = () => {
  console.log(`该功能仍在开发中`);
};
</script>
<style scoped>
</style>
