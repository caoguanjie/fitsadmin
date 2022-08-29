<template>
  <div class="logic-flow-view">
    <!-- 画布 -->
    <div id="container" class="container" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import LogicFlow from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';

onMounted(() => {
  creatLogicflow();
});

// 工作流默认数据
const data = reactive({
  // 节点
  nodes: [
    {
      id: 21,
      type: 'rect',
      x: 100,
      y: 200,
      text: { value: '矩形节点', x: 100, y: 200 }
    },
    {
      id: 50,
      type: 'circle',
      x: 300,
      y: 400,
      text: { value: '圆形节点', x: 300, y: 400 }
    }
  ],
  // 边
  edges: [{ type: 'polyline', sourceNodeId: 50, targetNodeId: 21 }]
});

function creatLogicflow(): void {
  let newContainer = document.getElementById('container');
  if (newContainer) {
    let lf = new LogicFlow({
      container: newContainer
    });
    lf.render(data);
    // 设置主题
    lf.setTheme({
      circle: {
        stroke: '#000',
        outlineColor: '#88f',
        strokeWidth: 1
      },
      rect: {
        // fill: "#54AAC9",
        stroke: '#777',
        outlineColor: '#88f',
        strokeWidth: 0
      },
      polygon: {
        strokeWidth: 1
      },
      polyline: {
        stroke: '#3F7AE5',
        hoverStroke: '#000000',
        selectedStroke: '#000000',
        outlineColor: '#88f',
        strokeWidth: 2
      },
      nodeText: {
        color: '#000'
      },
      edgeText: {
        color: '#000000',
        background: {
          fill: '#f7f9ff'
        }
      }
    });
  }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: none;
}
.logic-flow-view {
  .container {
    width: calc(100% - 40px);
    height: 85vh;
    outline: none;
    margin-left: 50px;
    margin: 20px 20px 0 20px;
    padding: 20px;
    background: #fff;
  }
}
</style>