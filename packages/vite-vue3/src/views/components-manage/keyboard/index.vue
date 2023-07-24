<template>
  <div class="diagnose-page-wrapper">
      <vxe-grid ref='xGrid' v-bind="gridOptions" class="mytable-scrollbar" :row-style="rowStyle" @edit-closed="editClosed">
      <!--工具栏插槽-->
      <template #toolbar>
        <vxe-button @click="setCommon">设为常用</vxe-button>
        <vxe-button @click="deleteChecked">删除</vxe-button>
      </template>
      <!-- 诊断插槽 -->
      <template #diagnosis_edit="scope">
        <vxe-pulldown ref="xDown" transfer class="pulldown-wrapper">
        <template #default>
          <vxe-input v-model="scope.row.diagnosis" @keydown="keydownEvent(scope,$event)" @click="clickEvent(scope,$event)" @change="changeEvent(scope)"/>
        </template>
        <template #dropdown>
          <div class="my-dropdown">
            <vxe-grid
              ref='xGrid2'
              v-bind="gridOptions2"
              :data="pulldownTableData"
              @cell-click="cellClickEvent(scope,$event)"
              @keydown="handleChoise(scope,$event)"
              class="mytable-scrollbar"/>
          </div>
        </template>
      </vxe-pulldown>
      </template>
      <template #diagnosis_default="scope">
        <vxe-input v-model="scope.row.diagnosis" v-if="scope.seq == xGrid?.getTableData().fullData.length"/>
        <div v-else>{{ scope.row.diagnosis }}</div>
      </template>
      <!-- 医学类型插槽 -->
      <template #medicalType_edit="scope">
        <vxe-input v-model="scope.row.medicalType" :readonly="true"/>
      </template>
      <template #medicalType_default="scope">
        <vxe-input v-model="scope.row.medicalType" v-if="scope.seq == xGrid?.getTableData().fullData.length"/>
        <div v-else>{{ scope.row.medicalType }}</div>
      </template>
      <!-- 诊断类型插槽 -->
      <template #diagnosticType_default="scope">
        <vxe-select v-model="scope.row.diagnosticType" v-if="scope.seq == xGrid?.getTableData().fullData.length">
          <vxe-option :value="1" label="主要诊断"/>
          <vxe-option :value="2" label="其他诊断"/>
        </vxe-select>
        <div v-else>{{ fmtDiagnosisType(scope.row.diagnosticType) }}</div>
      </template>
      <!-- 待选插槽 -->
      <template #checkbox_edit="scope">
        <vxe-checkbox v-model="scope.row.isChecked" @change="xGrid?.updateStatus(scope)" @keydown="toggleCheckbox(scope,$event)"/>
      </template>
      <template #checkbox_default="scope">
        <vxe-checkbox v-model="scope.row.isChecked" v-if="scope.seq == xGrid?.getTableData().fullData.length"/>
        <vxe-checkbox v-model="scope.row.isChecked" v-else/>
      </template>
      <!-- 前备注插槽 -->
      <template #preRemark_edit="scope">
        <vxe-input v-model="scope.row.preRemark" @keydown="enterEvent(scope,$event)" @change="xGrid?.updateStatus(scope)"/>
      </template>
      <template #preRemark_default="scope">
        <vxe-input v-model="scope.row.preRemark" v-if="scope.seq == xGrid?.getTableData().fullData.length"/>
        <div v-else>{{ scope.row.preRemark }}</div>
      </template>
      <!-- 后备注插槽 -->
      <template #postRemark_edit="scope">
        <vxe-input v-model="scope.row.postRemark" @keydown="enterEvent(scope,$event)" @change="xGrid?.updateStatus(scope)"/>
      </template>
      <template #postRemark_default="scope">
        <vxe-input v-model="scope.row.postRemark" v-if="scope.seq == xGrid?.getTableData().fullData.length"/>
        <div v-else>{{ scope.row.postRemark }}</div>
      </template>
      <!-- 操作按钮插槽 -->
      <template #operate_default="scope">
        <vxe-button type="text" @click="scope.row.isCommon = !scope.row.isCommon">{{ fmtIsCommon(scope.row.isCommon) }}</vxe-button> 
        <vxe-button type="text" @click="deleteCurrentRow(scope)">删除</vxe-button>
      </template>
    </vxe-grid>
      
    <div v-html="desc" class="desc"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { VXETable, VxeGridInstance, VxeTablePropTypes, VxeGridProps, VxePulldownInstance } from 'vxe-table'
import { AxiosResponse } from 'axios'
import { getDiagnosisWordList, getDiagnosisData } from '@/api/components/index'
import { DiagnosisWordListItem } from '@/api/components/type'
import PinyinMatch from 'pinyin-match'
import { onClickOutside } from '@vueuse/core'

// 诊断表格
const diagnosisData = reactive([] as any)
const xGrid = ref<VxeGridInstance>()

// 当点击到表格外时，清空选中行
onClickOutside(
  xGrid,
  ()=>{
    xGrid.value?.clearCheckboxRow()
  }
)

// 回车切换复选框选中状态
const toggleCheckbox = (scope:any, e:any) =>{
  if(e.keyCode === 13) {
    scope.row.isChecked = !scope.row.isChecked
    xGrid.value?.updateStatus(scope)
  }
}
// 模拟提交数据
const handleSave = ()=>{
  getDiagnosisData().then(async(result:AxiosResponse)=>{
    diagnosisData.push(result.ReturnData.DiagnosisData)
    VXETable.modal.message({ status: 'success', message: '保存成功' })
    await xGrid.value?.reloadData(diagnosisData)
    // 判断是否每行每行都有id,即是否存在新增行
    if(xGrid.value?.getTableData().fullData.every(item => item.id)){
      insertEvent()
    }
    // insertEvent()
  })
}

// 回车保存新增事件
const enterEvent = async (scope:any,e:any)=>{
  if(scope.columnIndex === 6){
    if(e.$event.keyCode === 13 || e.$event.keyCode === 9){
      if(!scope.row.id) {
        const errMap = await xGrid.value?.validate(scope.row)
        if(!errMap){
          xGrid.value?.clearEdit()
        }
      }else {
        xGrid.value?.clearEdit()
      }
      return
    }
  }
  if(e.$event.keyCode === 13){
    if(!scope.row.id) {
      const errMap = await xGrid.value?.validate(scope.row)
      if(!errMap){
        xGrid.value?.clearEdit()
      }
    }else {
      xGrid.value?.clearEdit()
    }
  }
}

// 编辑状态关闭
const editClosed = async (e:any)=>{
  if(!e.row.id) {
    if(e.row.diagnosis) {
    const errMap = await xGrid.value?.validate(e.row)
    if(!errMap){
      handleSave()
    }
  } 
  }else {
    if(xGrid.value?.isUpdateByRow(e.row)){
        const errMap = await xGrid.value?.validate(e.row)
        if(!errMap){
          VXETable.modal.message({ status: 'success', message: '编辑成功' })
        }
    }
   
  }
}

// 诊断表格--新增
const insertEvent = async (diagnosisType:any = 2) => {
    const $table = xGrid.value
    const seq = xGrid.value!.getTableData().fullData.length + 1
    const record = { isCommon:false, diagnosticType: diagnosisType, seq: seq }
    const { row: newRow } = await $table!.insertAt(record, -1)
    // 激活新增行编辑
    $table?.setEditRow(newRow)
}

// 诊断表格--判断是否可被选中
const checkMethod = (e:any) => {
  if(!e.row.id){
    return false
  }else {
    return true
  }
}

// 诊断表格--配置
const gridOptions = reactive<VxeGridProps>({
  border: true,
  showOverflow: true,
  headerAlign: 'center',
  height: '50%',
  id: 'full_edit_1',
  keepSource: true,
  columns: [
    // { type: 'seq', title: '序号', width: 60, align: 'center' },
    { type: 'checkbox', title: '序号', width: 60, align: 'center' },
    { field: 'diagnosis', title: '诊断', editRender: { name: '$input' }, slots: { edit: 'diagnosis_edit', default: 'diagnosis_default' }, width: '30%' },
    { field: 'medicalType', title: '医学类型', width: 120 },
    { field: 'diagnosticType', title: '诊断类型', editRender: { name: '$select', options : [{label: '主要诊断', value: 1}, {label: '其他诊断', value: 2}] }, slots: { default: 'diagnosticType_default' }, align: 'center', width: 180 },
    { field: 'isChecked', title: '待查', width: 60, editRender: { name: '$input' }, slots: { edit: 'checkbox_edit', default: 'checkbox_default' }, align: 'center' },
    { field: 'preRemark', title: '前备注', editRender: { name: '$input' }, slots: { default: 'preRemark_default', edit: 'preRemark_edit' } },
    { field: 'postRemark', title: '后备注',  editRender: { name: '$input' }, slots: { default: 'postRemark_default', edit: 'postRemark_edit' } },
    { field: 'ICDCode', title: 'ICD编码', visible: false },
    { field: 'isCommon', title: '操作', fixed: 'right', width: 150, slots: { default: 'operate_default' }, align: 'center' }
  ],
  data : diagnosisData,
  rowConfig: {
    isHover: true,
    height: 30
  },
  customConfig: {
    storage: true,
  },
  editRules: {
    diagnosis: [
      { required: true, message: '诊断必须填写', trigger: 'change' }
    ]
  },
  editConfig: {
    trigger: 'click',
    mode: 'row',
    showIcon: false,
    showAsterisk: false
  },
  validConfig: {
    showMessage: true
  },
  checkboxConfig: {
    highlight: true,
    range: true,
    labelField:'seq',
    // visibleMethod: () => false,
    checkMethod: checkMethod,
    showHeader: false,
    trigger: 'cell'
  },
  mouseConfig: {
    selected:true
  }
})

// 诊断表格--格式化常用按钮内容
const fmtIsCommon = (cellValue:boolean)=>{
  return cellValue ? '取消常用':'设为常用'
}
// 诊断表格--格式化诊断类型
const fmtDiagnosisType = (cellValue:number)=>{
  if(cellValue === 1) {
    return '主要诊断'
  }else if(cellValue === 2) {
    return '其他诊断'
  }
}

// 诊断表格--最后一行蓝底背景样式
const rowStyle: VxeTablePropTypes.RowStyle = ({ rowIndex }) => {
  const $table = xGrid.value
  const lastRowIndex = $table!.getTableData().fullData.length - 1
  
  if (lastRowIndex === rowIndex) {
    return {
      backgroundColor: '#DDE7F7',
      color: '#ffffff'
    }
  }
}
// 诊断表格--行内删除按钮
const deleteCurrentRow=(scope:any)=>{
  if(!scope.row.id) {
    VXETable.modal.message({ status: 'warning', message: '新增行不能删除' })
  } else {
    xGrid.value?.remove(scope.row)
    diagnosisData.splice(scope.rowIndex,1)
  }
}

// 下拉诊断列表
const diagnosis = ref<DiagnosisWordListItem[]>([])
const xDown = ref<VxePulldownInstance>()
const xGrid2 = ref<VxeGridInstance>()

const pulldownState = reactive({
  loading: false,
  pulldownTableData: [] as any[]
})
const { pulldownTableData } = toRefs(pulldownState)

// 下拉诊断列表--获取诊断名词列表
const loadDiagnosisWordList = ()=>{
  getDiagnosisWordList().then((result:AxiosResponse)=>{
      diagnosis.value = result.ReturnData.DiagnosisWordList
  })
}

// 下拉诊断列表--配置
const gridOptions2 = reactive<VxeGridProps>({
  border: true,
  height: "auto",
  rowConfig: {
    isHover: true,
    height: 30,
    isCurrent: true
  },
  loading: pulldownState.loading,
  columns: [
      { field: 'diagnosisWord', title: '诊断', width: 450 },
      { field: 'ICDCode', title: 'ICD编码', width:174 },
      { field: 'medicalType', title: '类型', width: 86 }
  ],
  keyboardConfig: {
    isArrow: true
  }
})

// 下拉诊断列表--模糊查询方法
const fuzzySearch = (scope:any) => {
  pulldownState.loading = true
      setTimeout(() => {
        pulldownState.loading = false
        if (scope.row.diagnosis) {
          pulldownState.pulldownTableData = diagnosis.value.filter(
            (row) => PinyinMatch.match(row.diagnosisWord,scope.row.diagnosis) || PinyinMatch.match(row.ICDCode,scope.row.diagnosis)
          )
        } else {
          pulldownState.pulldownTableData = diagnosis.value.slice(0)
        }
      }, 100)
}

// 下拉诊断列表--输入框点击事件
const clickEvent = async (scope:any,e:any) => {
  const $pulldown = xDown.value
  // 下拉容器未展开
  if(!$pulldown?.isPanelVisible()) {
    await $pulldown?.showPanel()
    xGrid2.value?.focus()
    // 模糊查询功能
    fuzzySearch(scope)
  }
}
// 下拉诊断列表--键盘事件
const keydownEvent = async (scope:any,e:any) => {
const $pulldown = xDown.value
  if (e.$event.keyCode === 9 && e.$event.shiftKey) {
    e.$event.preventDefault()
  }
  // 下拉容器未展开
  if(!$pulldown?.isPanelVisible()) {
    // 回车/下箭头展开下拉容器
    if(e.$event.keyCode === 13 || e.$event.keyCode === 40) {
      await $pulldown?.showPanel()
      // 聚焦下拉容器
      xGrid2.value?.focus()
      // 模糊查询
      fuzzySearch(scope)
    }
  }
}
// 下拉诊断列表--change事件
const changeEvent = async (scope:any) => {
  xGrid.value?.updateStatus(scope)
  const $pulldown = xDown.value
  if(!$pulldown?.isPanelVisible()) {
    await $pulldown?.showPanel()
    xGrid2.value?.focus()
    xGrid2.value?.clearCurrentRow()
  }
  // 模糊查询功能
  fuzzySearch(scope)
}

// 下拉诊断列表--下拉容器点击事件
const cellClickEvent = async (scope:any,{ row }: any) => {
  const $pulldown = xDown.value
  scope.row.diagnosis = row.diagnosisWord
  scope.row.medicalType = row.medicalType
  scope.row.ICDCode = row.ICDCode
  xGrid.value?.updateStatus(scope)
  $pulldown?.hidePanel()
  // xGrid2.value?.blur()
  xGrid2.value?.clearCurrentRow()
  xGrid.value?.setEditCell(xGrid.value?.getEditRecord().row, 'diagnosis')      
}
// 下拉诊断列表--下拉容器回车事件
const handleChoise = async (scope:any,e:any) => {
  const $pulldown = xDown.value
  if(xGrid2.value?.getCurrentRecord()) {
    if(e.$event.keyCode === 13) {
      const currentRow = xGrid2.value?.getCurrentRecord()
      scope.row.diagnosis = currentRow.diagnosisWord
      scope.row.medicalType = currentRow.medicalType
      scope.row.ICDCode = currentRow.ICDCode
      console.log(scope)
      xGrid.value?.updateStatus(scope)
      $pulldown?.hidePanel()
      // xGrid2.value?.blur()
      xGrid2.value?.clearCurrentRow()
    }
  }
}

// 设为常用诊断
const setCommon = ()=>{
  const $table = xGrid.value
  const checkboxRecords = $table!.getCheckboxRecords()
  if(checkboxRecords.length < 1) {
    VXETable.modal.message({ status: 'warning', message: '请先选择数据' })
  }else {
    checkboxRecords?.map(item=>item.isCommon = true)
    $table?.clearCheckboxRow()
    VXETable.modal.message({ status: 'success', message: '设置成功' })
  }
}

// 删除选中行
const deleteChecked = ()=>{
  const $table = xGrid.value
  const checkboxRecords = $table!.getCheckboxRecords()
  if(checkboxRecords.length < 1) {
    VXETable.modal.message({ status: 'warning', message: '请先选择数据' })
  }else {
    const index = $table?.getRowIndex(checkboxRecords[0])
    diagnosisData.splice(index,checkboxRecords.length)
    $table?.removeCheckboxRow()
    VXETable.modal.message({ status: 'success', message: '删除成功' })
  }
}
const desc = `<h3>键盘事件说明：</h3>
| Tab | <br>
移动聚焦到右边编辑框；
如果聚焦于后备注编辑框，则触发保存操作；<br><br>
| Shift+Tab | <br>
移动聚焦到左边编辑框；<br><br>
| Enter | <br>
如果聚焦于诊断编辑框，则打开下拉容器；
如果聚焦于下拉容器，则选中当前行并关闭下拉容器；
如果聚焦于诊断类型编辑框，则打开下拉框；<br>
如果聚焦于下拉框，则选中当前行并关闭下拉框；
如果聚焦于待查编辑框，则切换勾选状态；
如果聚焦于前备注编辑框，则触发保存操作；<br>
如果聚焦于后备注编辑框，则触发保存操作；<br><br>
| ArrowUp |<br>
如果聚焦于下拉容器，则向上切换当前行；
如果聚焦于下拉框，则向上切换当前行；<br><br>
| ArrowDown |<br>
如果聚焦于下拉容器，则向下切换当前行；
如果聚焦于下拉框，则向下切换当前行；<br><br>
| Spacebar | <br>
如果聚焦于待查编辑框，则切换勾选状态；`

onMounted(() => {
  loadDiagnosisWordList()
  nextTick(()=>{
    insertEvent(1)
  })
})
</script>
<style lang="scss" scoped>

.my-dropdown {
  height: 380px;
  // 解决滚动条无法拖动
  :deep(.vxe-table--render-default .vxe-table--body-wrapper) {
    position: static;
  }
}
// 隐藏复选框
:deep(.col--checkbox .vxe-checkbox--icon) {
  display: none;
}
// 禁止选中的复选框颜色鼠标样式设置常规
:deep(.vxe-table--render-default .is--disabled.vxe-cell--checkbox) {
  color:#333;
  cursor: default;
}
:deep(.vxe-table--render-default .vxe-cell--checkbox:not(.is--disabled)) {
  cursor: default;
}
// 下拉框内容居中
:deep(.vxe-select>.vxe-input .vxe-input--inner) {
  text-align: center;
}
.desc {
  font-size: 14px;
  color: #abb2bf;
  background: #282c34;
  padding: 0 8px 8px 8px;
}
// 调整字体大小
:deep(.vxe-body--row .vxe-cell){
  font-size: 14px!important;
}
// 调整编辑框样式
:deep(.vxe-input--inner) {
  border-radius: 0;
  height: 23px;
}
:deep(.vxe-cell .vxe-default-input) {
  border-radius: 0;
  height: 23px;
}
:deep(.vxe-input) {
  height: 30px;
  line-height: 30px;
}
:deep(.vxe-table--render-default .vxe-cell) {
  padding: 0 0px 0 3px;
}
:deep(.vxe-grid .vxe-pulldown) {
  width: 100%;
}
// 调整表格表头样式
:deep(.vxe-header--row) {
    background-color: #E9E9E9;
    .vxe-cell--title {
        font-size: 14px;
        font-weight: 550;
        color: #333333;
    }
}
// 调整表格内容样式
:deep(.vxe-body--row) {
    .vxe-cell {
        font-size: 12px;
        font-weight: 400;
        color: #333333;
    }
}
// 解决vxe-table右边边框两条线问题
:deep(.vxe-table--render-default.border--full .vxe-body--column, .vxe-table--render-default.border--full .vxe-footer--column, .vxe-table--render-default.border--full .vxe-header--column) {
  background-position: 0 0,100% 100%!important;
}
// 调整vxe-table表头行高
:deep(.vxe-header--column) {
  padding: 4px 0!important;
}
:deep(.vxe-body--column) {
  padding: 0!important;
  height: 30px!important;
}
// 调整复选框位置
:deep(.vxe-checkbox--label) {
  padding: 0;
}
// 工具栏与表格间距
:deep(.vxe-grid--toolbar-wrapper) {
  margin-bottom: 8px;
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}

</style>