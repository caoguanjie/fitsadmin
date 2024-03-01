<template>
    <div class="previewpdf-example">
        <fits-table :option="fitsTablePro" ref="xGrid">
            <template #operation_default>
                <el-button size="small" type="primary" @click="onClick('canvas')">
                    canvas预览
                </el-button>
                <el-button size="small" type="primary" @click="visible2 = true">
                    iframe预览
                </el-button>
            </template>
        </fits-table>
        <fits-dialog :visible="visible" :dialogProp="dialogProp" :showFooter="false" @cancel="onClose"
            @submit="visible = false">
            <template #header>
                <el-button type="primary" :icon="Printer" @click="printer">打印</el-button>
            </template>
            <vue-pdf-embed ref="vuePdfEmbedRef" :source="doloadUrl" class="vue-pdf-embed" :style="scaleFun"
                :page="pdfPages" />
        </fits-dialog>
        <fits-dialog :visible="visible2" :dialogProp="dialogProp" :showFooter="false" @cancel="visible2 = false"
            @submit="visible2 = false">
            <iframe :src="props.url" height="100%" />
        </fits-dialog>
    </div>
</template>

<script setup lang="ts" name="PreviewPDF">
import VuePdfEmbed from "vue-pdf-embed";
import { ElButton } from 'element-plus';
import { Printer } from '@element-plus/icons-vue'
import { VxeGridInstance } from 'vxe-table';
import { FitsTable, FitsTableProps, useFitsTablePro, FitsDialog } from "@/fits-components";


const props = defineProps({
    url: {
        type: String,
        default: new URL(`./test.pdf`, import.meta.url).href
    },
    pdfjsURL: {
        type: String,
        default: `/static/web/viewer.html?file=${encodeURIComponent(new URL(`./test.pdf`, import.meta.url).href)}`
    }
})
const visible = ref(false)
const visible2 = ref(false)

const vuePdfEmbedRef = ref<any>(null)
let pdfPages = ref(0); // pdf显示页数
let scale = ref(1);  // 缩放比例
let doloadUrl = ref("");
const dialogProp = reactive({
    title: '',
    width: "70%"
})
const onClick = (key: string) => {
    if (key === 'canvas') {
        visible.value = true
        doloadUrl.value = props.url;
        // getPdfCode()
    } else {
        window.open(props.url, "_blank");
    }
}


const onClose = () => {
    visible.value = false
}
const scaleFun = () => { // 缩放
    let scale1 = scale.value;
    return `transform:scale(${scale1})`
}
function printer() {
    vuePdfEmbedRef.value.print()
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
        { name: 'pdf模板', suffix: 'PDF', type: 'application/pdf', address: new URL(`./test.pdf`, import.meta.url).href, size: '558.13KB' },
        { name: '一个pdf', suffix: 'PDF', type: 'application/pdf', address: new URL(`./test.pdf`, import.meta.url).href, size: '58.13KB' },
        { name: '模拟pdf', suffix: 'PDF', type: 'application/pdf', address: new URL(`./test.pdf`, import.meta.url).href, size: '55.13KB' },
        { name: 'pdf文件', suffix: 'PDF', type: 'application/pdf', address: new URL(`./test.pdf`, import.meta.url).href, size: '58.13KB' },
        { name: '政府文件', suffix: 'PDF', type: 'application/pdf', address: new URL(`./test.pdf`, import.meta.url).href, size: '558KB' },
        { name: 'pdf模板', suffix: 'PDF', type: 'application/pdf', address: new URL(`./test.pdf`, import.meta.url).href, size: '558.3KB' },
        { name: 'pdf模板', suffix: 'PDF', type: 'application/pdf', address: new URL(`./test.pdf`, import.meta.url).href, size: '558.1KB' },
        { name: 'pdf模板', suffix: 'PDF', type: 'application/pdf', address: new URL(`./test.pdf`, import.meta.url).href, size: '558.13KB' },
    ],
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
</script>

<style lang="scss" scoped>
:deep(canvas) {
    width: 100% !important;
    height: 100% !important;
}

:deep(iframe) {
    width: 100% !important;
    // height: 100% !important;
}

:deep(.el-scrollbar__view) {
    height: 70vh;
}
</style>
  