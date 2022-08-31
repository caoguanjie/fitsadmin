<template>
  <div class="logic-flow-view">
    <!-- 辅助工具栏 -->
    <control class="demo-control" v-if="LF" :lf="LF" @getData="getGraphData"/>
    <!-- 节点面板 -->
    <node-panel v-if="LF" :lf="LF" :nodeList="nodeList" />
    <!-- 画布 -->
    <div id="container" class="container" />
    <!-- 节点操作面板 -->
    <add-panel
      v-if="addPanel.showAddPanel"
      class="add-panel"
      :style="addPanel.addPanelStyle"
      :lf="LF"
      :nodeData="addPanel.addClickNode"
      @addNodeFinish="hideAddPanel"
    />
    <!-- 数据查看面板 -->
    <el-dialog title="数据" v-model="LfDialog.dataVisible" width="50%">
        <data-dialog :graphData="LfDialog.graphData" 
            v-if="LfDialog.dataVisible"/>
    </el-dialog>
    <!-- 属性面板 -->
    <el-drawer
      title="设置节点属性"
      v-model="LfDialog.dialogVisible"
      direction="rtl"
      size="500px"
      :before-close="closeDialog">
        <property-dialog
            v-if="LfDialog.dialogVisible"
            :nodeData="clickNode"
            :lf="LF"
            @setPropertiesFinish="closeDialog"/>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';

import LogicFlow from '@logicflow/core';
import { Menu, Snapshot, MiniMap  } from '@logicflow/extension';
import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';

import Control from '@/views/components-manage/workflow/LFComponents/Control.vue';
import NodePanel from '@/views/components-manage/workflow/LFComponents/NodePanel.vue';
import AddPanel from '@/views/components-manage/workflow/LFComponents/AddPanel.vue';
import DataDialog from '@/views/components-manage/workflow/LFComponents/DataDialog.vue';
import PropertyDialog from '@/views/components-manage/workflow/PropertySetting/PropertyDialog.vue';
import { nodeList } from './config';
import { ElMessage } from 'element-plus';
//引入默认节点数据
import demoData from './data.json';
//引入自定义节点
import {
  registerStart,
  registerStart1,
  registerUser,
  registerEnd,
  registerEnd1,
  registerPush,
  registerDownload,
  registerPolyline,
  registerTask,
  registerTask1
} from './registerNode';

onMounted(() => {
  creatLogicflow();
});

//用于传递到组件中的LF对象
let LF = ref();
//增加节点用到的数据
const addPanel = reactive({
  addPanelStyle: {
    top: '0px',
    left: '0px'
  },
  showAddPanel: false,
  addClickNode: null
});
//默认节点数据
let panelData = demoData;
let clickNode = ref();
//控制数据面板和节点属性面板显示隐藏
const LfDialog = reactive({
  dialogVisible :false,
  graphData:null,
  dataVisible : false 
})
//保存移动移动节点的数据
let moveData = ref({});

function creatLogicflow(): void {
  let newContainer = document.getElementById('container');
  if (newContainer) {
    const lf = new LogicFlow({
      //将lf挂载到dom
      container: newContainer,
      plugins: [Menu, MiniMap, Snapshot],
      background: {
        backgroundColor: '#f7f9ff'
      }
    });
    //将LF对象传递到组件中，并能够同步操作lf
    LF.value = lf;
    //重写节点的右键菜单
    lf.extension.menu.setMenuConfig({
      // 覆盖默认的节点右键菜单
      nodeMenu: [
        {
          text: '删除',
          callback: function (node: any) {
            lf.deleteNode(node.id);
          }
        },
        {
          text: '编辑文本',
          callback: function (node: any) {
            lf.graphModel.editText(node.id);
            lf.once('graph:transform,node:click,blank:click', () => {
              let textData = {
                type: '',
                text: ''
              };
              const { properties, text, type } = node;
              if (properties) {
                textData = Object.assign({}, textData, properties);
              }
              if (text && text.value) {
                textData.text = text.value;
              }
              if (type) {
                textData.type = type.value;
              }
              setTimeout(() => {
                let textValue = lf.graphModel.nodes.filter(
                  item => item.id === node.id
                )[0].text.value;
                if (textValue.length <= 25) {
                  textValue = textValue.replace(/\n/g, '');
                }
                if (textValue.length > 25) {
                  textValue = textValue.replace(/\n/g, '');
                  textValue =
                    textValue.substring(0, 25) + '\n' + textValue.substring(25);
                }
                if (textValue.length > 50) {
                  textValue = textValue.slice(0, 50);
                }
                console.log(textValue);
                lf.updateText(node.id, textValue);
                textData.text = textValue;
                lf.setProperties(node.id, {
                  ...textData
                });
              }, 0);
            });
            console.log(lf.graphModel.eventCenter, 333);
          }
        },
        {
          text: '复制',
          callback: function (node: any) {
            lf.cloneNode(node.id);
          }
        }
      ],
      // 删除默认的边右键菜单
      edgeMenu: false,
      // 覆盖默认的边右键菜单，与赋值为false表现一样
      graphMenu: []
    });
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
    registerNode();
  }
}
// 注册自定义节点
function registerNode(): void {
  let lf = LF.value;
  registerStart(lf);
  registerStart1(lf);
  registerUser(lf);
  registerEnd(lf);
  registerEnd1(lf);
  registerPush(lf, clickPlus, mouseDownPlus);
  registerDownload(lf);
  registerPolyline(lf);
  registerTask(lf);
  registerTask1(lf);
  renderData();
}
//画布中添加默认数据
function renderData(): void {
  LF.value.render(panelData);
  LfEvent();
}
//设置用户节点自定义操作面板样式
function clickPlus(e: any, attributes: any): void {
  e.stopPropagation();
  const { clientX, clientY } = e;
  addPanel.addPanelStyle.top = clientY - 40 + 'px';
  addPanel.addPanelStyle.left = clientX + 'px';
  addPanel.showAddPanel = true;
  addPanel.addClickNode = attributes;
}
function mouseDownPlus(e: any): void {
  e.stopPropagation();
}
//LF画布事件
function LfEvent(): void {
  //点击节点
  LF.value.on('node:click', (data: any) => {
    clickNode.value = data;
    // console.log(clickNode)
    LfDialog.dialogVisible = true;
  });
  //点击节点（两个方法按顺序触发）
  LF.value.on('node:click', () => {
    // console.log("node click");
  });
  //点击连线
  LF.value.on('edge:click', (data: any) => {
    clickNode.value = data;
    LfDialog.dialogVisible = true;
  });
  //点击节点或连线
  LF.value.on('element:click', () => {
    hideAddPanel();
  });
  //连接两个节点后触发
  LF.value.on('edge:add', (data: any) => {
    console.log('edge:add', data);
  });
  //移动画板上的节点
  LF.value.on('node:mousemove', (data: any) => {
    moveData = data;
  });
  //点击画板,不包含连线或节点
  LF.value.on('blank:click', () => {
    hideAddPanel();
  });
  //节点连接错误，如连接同一个节点相邻两个点
  LF.value.on('connection:not-allowed', (data: any) => {
    ElMessage({
      message: '节点连接错误',
      type: 'error'
    });
  });
}
//关闭用户自定义增加节点选择框
function hideAddPanel(): void {
  addPanel.showAddPanel = false;
  addPanel.addPanelStyle.top = '0px';
  addPanel.addPanelStyle.left = '0px';
  addPanel.addClickNode = null;
}
//关闭节点属性抽屉，传递给property-dialog组件
function closeDialog() {
  LfDialog.dialogVisible = false;
}
//获取面板上的节点数据
function getGraphData(){
  LfDialog.graphData = LF.value.getGraphData();
  LfDialog.dataVisible = true
}
</script>

<style lang="scss" scoped>
* {
  touch-action: none;
}
.logic-flow-view {
  height: 80vh;
  position: relative;
  .demo-control {
    position: absolute;
    top: 40px;
    left: 60px;
    z-index: 2;
  }
  .container {
    width: calc(100% - 40px);
    height: 80vh;
    outline: none;
    margin-left: 50px;
    margin: 20px 20px 0 20px;
    padding: 15px;
    background: #fff;
  }
  .add-panel {
    position: absolute;
    z-index: 11;
    background-color: white;
    padding: 10px 5px;
  }
}
</style>