<template>
    <div class="upload-example">
        <Fits-upload :action="data.url" @onbeforeUpload="readExportExcelFile" :type="data.type" />
        <el-table :data="results" highlight-current-row style="width: 100%; margin-top: 20px">
            <el-table-column v-for="item of header" :key="item" :prop="item" :label="item" />
        </el-table>

        <!-- <fits-table :option="fitsTablePro" ref="xGrid" /> -->
    </div>
</template>

<script setup lang="ts">
import { FitsUpload } from '@/fits-components';
import * as XLSX from 'xlsx';

import { FitsTable, FitsTableProps } from "@/fits-components";
import { useFitsTablePro } from "@/fits-components/type";
import { VxeGridInstance } from 'vxe-table';
const data = {
    url: "http://192.168.32.108:3000/mock/78/api/uploadPDF",
    type: ["excel"]
}
let loading = ref()
let header = ref()
let results = ref()
//获取表格表头
const getHeaderRow = (sheet: { [key: string]: any }) => {
    const headers: string[] = [];
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    const R = range.s.r;
    // 从第一行开始
    for (let C = range.s.c; C <= range.e.c; ++C) {
        // 走遍范围内的每一列
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        // 找到第一行的单元格
        let hdr = "";
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        if (hdr === "") {
            hdr = "UNKNOWN " + C; // 用所需的默认值替换
        }
        headers.push(hdr);
    }
    return headers;
}
// 获取excel的表（sheet ）
const readExportExcelFile = (file: any) => {
    /* 读取Excel */
    const reader = new FileReader();
    reader.onloadstart = (e: any) => {
        loading.value = e.target.readyState
    }
    reader.onprogress = (e: any) => {
        loading.value = e.target.readyState
    }
    reader.onload = (e: any) => {
        /* 解析数据 */
        const bstr = e.target.result;
        let workbook = XLSX.read(bstr, { type: 'binary' }); // 缓存 excel 解析内容
        const firstSheetName = workbook.SheetNames[0]; //表格名称
        const worksheet = workbook.Sheets[firstSheetName];
        results.value = XLSX.utils.sheet_to_json(worksheet);//json格式表格数据
        header.value = getHeaderRow(worksheet);//表格标题
        console.log("导入成功！", header.value, results.value)
    }
    reader.onloadend = (e: any) => {
        loading.value = e.target.readyState
    }
    reader.onerror = (e: any) => {
        console.log("文件读取时发生错误！")
    }
    reader.readAsBinaryString(file);
    return false;
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
        { name: 'excel模板1', suffix: 'csv', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
        { name: 'excel模板2', suffix: 'csv', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
        { name: 'excel模板3', suffix: 'csv', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
        { name: 'excel模板4', suffix: 'csv', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
        { name: 'excel模板5', suffix: 'csv', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
        { name: 'excel模板6', suffix: 'csv', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
        { name: 'excel模板7', suffix: 'csv', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
        { name: 'excel模板8', suffix: 'csv', type: 'application/pdf', address: 'http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf', size: '558.13KB' },
    ],
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>

<style lang="scss" scoped>

</style>
  