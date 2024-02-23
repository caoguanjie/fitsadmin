<template>
    <vue-pdf-embed v-for="(item, index) in pdfList" :key="index" :scale="10" ref="VuePdfEmbedRef" :source="PDFURL"
        @rendered="handleDocumentRender(index)" style="transform:scale(1)" class="vue-pdf-embed" />
    <!-- <div>打印测试</div> -->
</template>

<script lang='ts' setup>
import VuePdfEmbed from "vue-pdf-embed";
import { ElMessage } from 'element-plus';
import { BASE64 } from "./printBase64";
const route = useRoute();
const VuePdfEmbedRef = ref(null)
const pdfList = computed(() => {
    return route.query.batchPrint === 'true' ? [1, 2, 3] : [1]
})
// Pdf地址
// const PDFURL = ref(new URL(`./app.pdf`, import.meta.url).href)
const PDFURL = ref(`data:application/pdf;base64,${BASE64}`)


// PDF加载完成后的事件
async function handleDocumentRender(index: number) {
    // 如果最后一个PDF加载完成，就打印
    if (index === pdfList.value.length - 1) {
        if (route.query.preview !== 'true' && route.query.type !== 'web') {
            try {
                // 一定要用异步，不然来不及弹出界面，就关闭窗口了
                await window.ipcRenderer.invoke('RequestPrint', {
                    silent: route.query.silent == 'true' ? true : false,  // 开启静默打印
                    printBackground: true, // 打印背景色
                    margins: {
                        marginType: "none", // 关闭边距，单独设置边距也可以
                    },
                    // pageSize: 'A4'

                }).then(({ success, failureReason }: any) => {
                    // 如果打印失败，弹出提示

                    if (!success) {
                        ElMessage.error(failureReason)
                    }
                })
            } catch (error: any) {
                // 莫名的错误，也弹出提示
                ElMessage.error(error)
            } finally {
                // 无论打印是否成功，都关闭当前窗口
                window.ipcRenderer.invoke('destroyPrintWindow')
            }
            // }
        } else {
            window.print()
        }
        console.log(VuePdfEmbedRef.value);
        // window.print()
        // (VuePdfEmbedRef.value as any).print()

    }
}
</script>
<style lang='scss' scoped></style>