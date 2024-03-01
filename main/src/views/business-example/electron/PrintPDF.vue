<template>
    <div>
        <span>是否静默打印：</span>
        <el-switch v-model="params.silent" size="large" style="margin: 0 20px" />
        <el-button @click="preview" type="primary">预览</el-button>
        <el-button @click="print" type="primary">桌面端打印</el-button>
        <el-button @click="printWeb" type="primary">浏览器打印</el-button>
        <el-button @click="batchPrint" type="primary">批量打印</el-button>
        <br>
        <el-button @click="getPrinterList" type="primary">获取打印列表</el-button>

        <el-table :data="printList" style="width: 100%;margin-top: 20px;" border>
            <el-table-column prop="displayName" label="打印机名称" width="180" />
            <el-table-column prop="isDefault" label="是否默认打印机" width="180" />
            <el-table-column prop="description" label="任务描述" />
            <el-table-column prop="options" label="更多打印机参数">
                <template #default="scope">
                    {{ JSON.stringify(scope.row.options) }}
                </template>
            </el-table-column>
        </el-table>
        <fits-dialog :visible="visible" :dialogProp="dialogProp" :showFooter="false" @cancel="visible = false"
            @submit="visible = false">
            <iframe ref="iframe" :src="printURL" style="width: 100%; height: 80vh;transform:scale(1);border:none" />
        </fits-dialog>
    </div>
</template>

<script lang='ts' setup>
import { FitsDialog } from "@/fits-components";
const visible = ref(false)
const dialogProp = reactive({
    title: '',
    width: "70%"
})

const params = reactive({
    // 是否通过浏览器打印，只有web才是web打印，不传值默认为electron
    type: 'web',
    // 是否静默打印，默认false
    silent: false,
    // 是否批量打印，默认false
    batchPrint: false,
})


const printURL = ref(`/#/print-test?silent=${params.silent}&type=web&batchPrint=${params.batchPrint}`)
const printList = ref<any>([])
function printWeb() {
    visible.value = true
}
function print() {
    // 通过路径拼接参数，控制是否静默打印
    window.ipcRenderer.invoke('openPrintWindow', `print-test?silent=${params.silent}`, params.silent)
}
// 获取打印机列表
function getPrinterList() {
    window.ipcRenderer.invoke('getPrinters').then((res: any) => {
        console.log(res)
        printList.value = res
    })
}
/**
 * 批量打印
 * 实现原理是打开一个新窗口，然后在新窗口中打印可视区域的HTML效果 
 */
function batchPrint() {
    // 通过路径拼接参数，控制是否静默打印
    window.ipcRenderer.invoke('openPrintWindow', `print-test?silent=${params.silent}`, params.silent)
}
function preview() {
    // 通过路径拼接参数，控制是否静默打印
    window.ipcRenderer.invoke('openPrintWindow', `print-test?preview=true`, params.silent)
}

</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
</style>