<template>
  <!-- 辅助工具栏 -->
  <div>
    <el-button-group>
      <el-button @click="zoomIn">放大</el-button>
      <el-button @click="zoomOut">缩小</el-button>
      <el-button @click="returndefault">重置</el-button>
      <el-button @click="commit">提交</el-button>
      <!-- <el-button  type="primary"  @click="zoomReset">大小适应</el-button> -->
      <el-button @click="translateRest">定位还原</el-button>
      <el-button @click="reset">还原(大小&定位)</el-button>
      <el-button @click="undo" :disabled="controlData.undoDisable">上一步(ctrl+z)</el-button>
      <el-button @click="redo" :disabled="controlData.redoDisable">下一步(ctrl+y)</el-button>
      <el-button @click="download">下载图片</el-button>
      <el-button @click="catData">查看数据</el-button>
      <el-button @click="clearData">一键清空</el-button>
    </el-button-group>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
//引入默认节点数据
import demoData from '../data.json';
import { ElMessage } from 'element-plus';

const panelData = demoData;
// 传配置项直接替换 + 数据
const props = defineProps<{
  lf: any;
}>();
const emit = defineEmits([
  "getData"
])
//控制上一步、下一步按钮禁用
const controlData = reactive({
  undoDisable: true,
  redoDisable: true,
  undos: {}
})
onMounted(() => {
  createControl()
})
//初始化控制栏
const createControl = (): void => {
  props.lf.on("history:change", (val: any) => {
    //val是一个对象，里面只有一个data,data里面才是数据
    const { data } = val
    const { undoAble, redoAble, undos } = data
    controlData.undos = undos
    controlData.undoDisable = !undoAble;
    controlData.redoDisable = !redoAble;
  });
};

const zoomIn = (): void => {
  props.lf.zoom(true);
};
const zoomOut = (): void => {
  props.lf.zoom(false);
};
const commit = (): void => {
  ElMessage({
    message: '提交',
    type: 'success'
  });
}
const returndefault = (): void => {
  props.lf.clearData()
  props.lf.render(panelData);
  props.lf.resetZoom();
  props.lf.resetTranslate();
};
const zoomReset = (): void => {
  props.lf.resetZoom();
};
const translateRest = (): void => {
  props.lf.resetTranslate();
};
const reset = (): void => {
  props.lf.resetZoom();
  props.lf.resetTranslate();
};
const undo = (): void => {
  props.lf.undo();
};
const redo = (): void => {
  props.lf.redo();
};
const download = (): void => {
  props.lf.getSnapshot();
};
const catData = (): void => {
  emit("getData")
};
const clearData = (): void => {
  props.lf.clearData()
};
</script>
<style scoped>
</style>
