<template>
    <div class="previewpdf-example">
        <fits-table :option="fitsTablePro" ref="xGrid">
            <template #operation_default>
                <el-button size="small" type="primary" @click="onePDF">
                    单个PDF打印
                </el-button>
                <el-button size="small" type="primary" @click="mergePDF">
                    合并多个PDF打印
                </el-button>
                <el-button size="small" type="primary" @click="mergePDFNoPreview">
                    直接打印
                </el-button>
            </template>
        </fits-table>

        <fits-dialog :visible="visible2" :dialogProp="dialogProp" :showFooter="false" @cancel="visible2 = false"
            @submit="visible2 = false">
            <template #header>
                <el-button type="primary" :icon="Printer" @click="printerIframe(1)">打印</el-button>
            </template>
            <iframe :src="PDFURL1" height="100%" id="pdfPreview1" />
        </fits-dialog>
        <fits-dialog :visible="visible3" :dialogProp="dialogProp" :showFooter="false" @cancel="visible3 = false"
            @submit="visible3 = false">
            <template #header>
                <el-button type="primary" :icon="Printer" @click="printerIframe(2)">打印</el-button>
            </template>
            <iframe :src="PDFURL2" height="100%" id="pdfPreview2" />
        </fits-dialog>
    </div>
</template>

<script setup lang="ts" name="PreviewPDF">

import { ElButton } from 'element-plus';
import { Printer } from '@element-plus/icons-vue'
import { VxeGridInstance } from 'vxe-table';
import { FitsTable, FitsTableProps, useFitsTablePro, FitsDialog } from "@/fits-components";
import PDFMerger from 'pdf-merger-js/browser';
import { isElectron } from '@/utils/base/platform';

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
const visible2 = ref(false)
const visible3 = ref(false)
const mutipdfFiles = ref<any>([
    new URL(`../../business-example/electron/components/app.pdf`, import.meta.url).href,
    new URL(`../../business-example/electron/components/app.pdf`, import.meta.url).href,
    // new URL(`./test.pdf`, import.meta.url).href,
    // new URL(`./test.pdf`, import.meta.url).href
]);
const PDFURL1 = ref("");
const PDFURL2 = ref("");

const dialogProp = reactive({
    title: '',
    width: "70%"
})

function printerIframe(index: number) {
    const iframe = document.getElementById(`pdfPreview${index}`) as HTMLIFrameElement;
    iframe.contentWindow?.postMessage({ type: 'PRINT', value: 0 }, '*');
}
async function mergePDF() {

    const merger = new PDFMerger();
    for (const file of mutipdfFiles.value) {
        await merger.add(file);
    }
    const mergedPdf = await merger.saveAsBlob();
    const url = URL.createObjectURL(mergedPdf);
    PDFURL2.value = `/static/web/viewer.html?file=${url}`
    visible3.value = true

}
// 直接打印，没有预览
async function mergePDFNoPreview() {


    const merger = new PDFMerger();
    for (const file of mutipdfFiles.value) {
        await merger.add(file);
    }
    const mergedPdf = await merger.saveAsBlob();
    const url = URL.createObjectURL(mergedPdf);
    const previewerURL = `/static/web/viewer.html?file=${url}`
    // 桌面端直接静默打印，无需预览，是新建打印窗口，不需要iframe
    if (isElectron()) {
        // 是桌面端就走静默打印
        window.ipcRenderer.invoke('openPrintWindow', url, true)
        return;
    }
    // 创建 iframe 元素
    const iframe = document.createElement('iframe');
    // 设置 iframe 的样式
    iframe.style.width = '100%'; // 宽度
    iframe.style.height = '100%'; // 高度
    iframe.style.border = 'none'; // 移除边框
    iframe.style.position = 'absolute'; // 移除边框
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.zIndex = "999999999";
    iframe.style.opacity = "0"; // 移除边框
    iframe.style.userSelect = 'auto';
    iframe.style.pointerEvents = "none";// 不要影响用户点击事件
    iframe.id = 'iframeBox'
    iframe.src = previewerURL
    document.body.appendChild(iframe)
    function addEventListenerMessage(event: any) {
        // console.log("主应用", event)
        if (event.data === 'pagerender') {

            iframe.contentWindow?.postMessage({
                type: 'PRINT', value: {
                    silent: true
                }
            }, '*');
            // iframe的PDF的内容加载完毕
            iframe.style.opacity = "1";
        }
        // 打印之后，要几时清理干净监听事件
        if (event.data === 'afterprint') {
            document.getElementById('iframeBox') && document.getElementById('iframeBox')?.remove()
            window.removeEventListener('message', addEventListenerMessage);
        }
    }
    // 监听消息，先绑定
    window.addEventListener('message', addEventListenerMessage);
    iframe.onload = () => {
        // 访问 iframe 的文档对象
        const iframeDocument: any = iframe.contentDocument || iframe.contentWindow?.document;
        // 修改 iframe 的 body 样式
        iframeDocument.body.style.backgroundColor = 'transparent';
    }

}

async function onePDF() {
    PDFURL1.value = `/static/web/viewer.html?file=${encodeURIComponent(new URL(`./test.pdf`, import.meta.url).href)}`
    visible2.value = true
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
  