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
            @submit="visible=false">
            <vue-pdf-embed :source="doloadUrl" class="vue-pdf-embed" :style="scaleFun" :page="pdfPages" />
        </fits-dialog>
        <fits-dialog :visible="visible2" :dialogProp="dialogProp" :showFooter="false" @cancel="visible2=false"
            @submit="visible2=false">
            <iframe :src="props.url" height="100%" />
        </fits-dialog>
    </div>
</template>

<script setup lang="ts">
import VuePdfEmbed from "vue-pdf-embed"
import { useFitsTablePro } from '@/components/FitsTablePro/FitsTable/FitsTableProHook';
import { FitsTableProps } from '@/components/FitsTablePro/FitsTable/type';
import { ElButton } from 'element-plus';
import { VxeGridInstance } from 'vxe-table';
const props = defineProps({
    url: {
        type: String,
        //http://gk.chengdu.gov.cn/uploadfiles/07180246020404/2020061116272871.pdf这个pdf有跨域问题
        default: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"
    }
})
const visible = ref(false)
const visible2 = ref(false)
let pdfPages = ref(0); // pdf显示页数
let scale = ref(1);  // 缩放比例
let doloadUrl = ref("");
const dialogProp = reactive({
    title: '',
    width: "90%"
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
const scaleFun = (index: any) => { // 缩放
    let scale1 = scale.value;
    return `transform:scale(${scale1})`
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
:deep(canvas) {
    width: 100% !important;
    height: 100% !important;
}

:deep(iframe) {
    width: 100% !important;
    // height: 100% !important;
}

:deep(.el-scrollbar__view) {
    height: 80vh;
}
</style>
  