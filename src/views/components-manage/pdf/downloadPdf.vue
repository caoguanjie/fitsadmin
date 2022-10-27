<template>
    <div class="previewpdf-example">
        <fits-table :option="fitsTablePro" ref="xGrid">
            <template #operation_default>
                <el-button size="small" type="primary" @click="onClick">
                    下载pdf
                </el-button>
            </template>
        </fits-table>
    </div>
</template>
  
<script setup lang="ts">
import useDownloadPdf from "@/utils/base/downloadPdf"
import { ElButton } from 'element-plus';
import { VxeGridInstance } from 'vxe-table';
import Axios from "axios";
import { FitsTable, FitsTableProps, useFitsTablePro } from "@/fits-components";

const data = {
    //pdf下载地址
    data: {},
    type: "pdf", // 文件类型
    fileName: "PDF模板" // 文件名
}
let timer: any
const onClick = () => {
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        //因为模拟接口没办法返回blob数据，所以只能直接另外写方法
        Axios({
            method: "get",
            url: "http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf", // 下载地址
            responseType: "blob",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            data.data = res.data
            useDownloadPdf(data)//调用方法下载
        }).catch(error => {
            console.log("下载请求失败:", error);
        });
    }, 500)
}
const gridOptions: FitsTableProps = {
    columns: [
        { field: 'name', title: '文件名' },
        { field: 'suffix', title: '文件后缀', },
        { field: 'type', title: '文件MIME类型', },
        { field: 'address', title: '文件路径', },
        { field: 'size', title: '文件大小' },
        { field: 'operation', title: '操作', slots: { default: 'operation_default' }, width: 300 },
    ],
    data: [
        { name: 'pdf模板', suffix: 'PDF', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
    ],
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>

<style lang="scss" scoped>

</style>
  