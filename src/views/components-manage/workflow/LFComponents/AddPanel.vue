<template>
  <!-- 点击推送节点的添加按钮 -->
  <el-tabs tab-position="left">
    <el-tab-pane label="添加动作">
      <div v-for="item in nodeList" :key="item.type">
        <el-button class="add-node-btn" type="primary" @click="addNode(item)">{{
          item.label
        }}</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
// 传配置项直接替换 + 数据
const props = defineProps<{
  lf: any;
  nodeData: any;
}>();
const emit = defineEmits([
  "addNodeFinish"
])

const nodeList = [
  {
    type: 'user',
    label: '用户'
  },
  {
    type: 'push',
    label: '推送'
  }
];
// 新增节点
function addNode(item: any): void {
  const { lf, nodeData } = props;
  const { id, x, y } = nodeData;
  const nextNode = lf.addNode({
    type: item.type,
    x: x + 150,
    y: y + 150
  });
  const nextId = nextNode.id;
  lf.addEdge({ sourceNodeId: id, targetNodeId: nextId });
    emit('addNodeFinish');
}
</script>
<style scoped>
.add-node-btn {
  margin-bottom: 10px;
  margin-right: 20px;
}
</style>
