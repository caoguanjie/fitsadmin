<template>
    <div class="uploadpdf-example">
        <div @click="visible = true">
            <slot name="mybutton">
                <el-button type="primary">开始上传</el-button>
            </slot>
        </div>
        <fits-dialog :visible="visible" :dialogProp="dialogProp" :showFooter="props.showFooter" @cancel="onCancel"
            @submit="onSubmit" :class="props.ClassName">
            <div class="uploadState">
                <div class="statebox-success" v-if="state == 1">
                    <el-image style="width: 20px; height: 20px;margin-right:10px" :src="images.img2" />
                    {{ props.stateText.success }}
                </div>
                <div class="statebox-error" v-else-if="state == 2">
                    <el-image style="width: 20px; height: 20px;margin-right:10px" :src="images.img3" />
                    {{ props.stateText.error }}{{ reason }}
                </div>
            </div>
            <slot name="uploadTemplate" />
            <div class="uploadpdf-contain">
                <div class="limit-text">
                    <slot name="text">
                        <div class="limit-text-box" v-if="propsType.length == 1">
                            只支持上传{{ translate() }}格式文件，单个文件大小不超过{{ props.size }}M
                        </div>
                        <div class="limit-text-box" v-else-if="propsType.length != 1">
                            支持上传{{ translate() }}格式文件，单个文件大小不超过{{ props.size }}M
                        </div>
                    </slot>
                </div>
                <el-upload ref="uploadRef" class="upload-demo" :method="props.method" :action="translateUrl(props.url)"
                    :data="props.data" drag :disabled="props.disabled" :name="props.name" :on-remove="onRemove"
                    :on-change="onChange" :show-file-list="props.showfile" :on-progress="onProgress"
                    :on-success="onSuccess" :on-error="onError" :on-preview="onPreview" :before-upload="beforeUpload"
                    :limit="props.limit" :on-exceed="onExceed" :with-credentials="props.withCredentials"
                    @before-remove="beforeRemove">
                    <div class="centerContainer">
                        <el-icon class="el-icon--upload">
                            <div style="width:100%;height:100%;" v-if="state == 0">
                                <slot name="icon-unUpload">
                                    <el-image style="width: 100%; height: 100%" :src="images.img1" />
                                </slot>
                            </div>
                            <div style="width:100%;height:100%;" v-else-if="state == 1">
                                <slot name="icon-success">
                                    <el-image style="width: 100%; height: 100%" :src="images.img1" />
                                </slot>
                            </div>
                            <div style="width:100%;height:100%;" v-else-if="state == 2">
                                <slot name="icon-error">
                                    <el-image style="width: 100%; height: 100%" :src="images.img1" />
                                </slot>
                            </div>
                        </el-icon>
                    </div>
                    <div class="el-upload__text">
                        <slot name="bottomText">
                            <div v-if="state == 0">
                                将文件拖到此处,或 <em>点击上传</em>
                            </div>
                            <div v-if="state != 0">
                                <div style="padding-bottom:8px;" v-if="state == 1">{{ filename }}</div>
                                <div style="padding-bottom:8px;" v-if="state == 2">上传失败，请检查文件格式后重试</div>
                                <em>重新上传</em>
                            </div>
                        </slot>
                    </div>
                </el-upload>
                <slot name="uploadBottom">
                    <div style="padding-top:8px" />
                </slot>
            </div>
        </fits-dialog>
    </div>
</template>

<script setup lang="ts" name="FitsUpload">
import { onMounted, reactive, ref } from 'vue';
import { FitsDialog } from '@/fits-components/FeedBack/Dialog'
import type { UploadInstance } from 'element-plus'
import { fileMIMEType } from "@/utils/base/getFileType"
import { uploadProps } from "./type"


const uploadRef = ref<UploadInstance>()
const visible = ref(false)
let images = {
    img1: new URL(`../../../assets/document-icons/state/unknow.png`, import.meta.url).href,
    img2: new URL(`../../../assets/document-icons/state/success.png`, import.meta.url).href,
    img3: new URL(`../../../assets/document-icons/state/error.png`, import.meta.url).href,
    excel: new URL(`../../../assets/document-icons/png/excel.png`, import.meta.url).href,
    pdf: new URL(`../../../assets/document-icons/png/pdf.png`, import.meta.url).href,
    ppt: new URL(`../../../assets/document-icons/png/ppt.png`, import.meta.url).href,
    zip: new URL(`../../../assets/document-icons/png/zip.png`, import.meta.url).href,
    exe: new URL(`../../../assets/document-icons/png/exe.png`, import.meta.url).href,
    wps: new URL(`../../../assets/document-icons/png/wps.png`, import.meta.url).href,
    txt: new URL(`../../../assets/document-icons/png/txt.png`, import.meta.url).href,
    images: new URL(`../../../assets/document-icons/png/image.png`, import.meta.url).href,
    video: new URL(`../../../assets/document-icons/png/video.png`, import.meta.url).href,
    audio: new URL(`../../../assets/document-icons/png/audio.png`, import.meta.url).href,
    docx: new URL(`../../../assets/document-icons/png/word.png`, import.meta.url).href,
    apk: new URL(`../../../assets/document-icons/png/apk.png`, import.meta.url).href,
    unknow: new URL(`../../../assets/document-icons/png/unknow.png`, import.meta.url).href,
    success: new URL(`../../../assets/document-icons/state/success.png`, import.meta.url).href,
    error: new URL(`../../../assets/document-icons/state/error.png`, import.meta.url).href,
}
let successImages = {
    excel: new URL(`../../../assets/document-icons/png-success/excel.png`, import.meta.url).href,
    pdf: new URL(`../../../assets/document-icons/png-success/pdf.png`, import.meta.url).href,
    ppt: new URL(`../../../assets/document-icons/png-success/ppt.png`, import.meta.url).href,
    zip: new URL(`../../../assets/document-icons/png-success/zip.png`, import.meta.url).href,
    exe: new URL(`../../../assets/document-icons/png-success/exe.png`, import.meta.url).href,
    wps: new URL(`../../../assets/document-icons/png-success/wps.png`, import.meta.url).href,
    txt: new URL(`../../../assets/document-icons/png-success/txt.png`, import.meta.url).href,
    images: new URL(`../../../assets/document-icons/png-success/image.png`, import.meta.url).href,
    video: new URL(`../../../assets/document-icons/png-success/video.png`, import.meta.url).href,
    audio: new URL(`../../../assets/document-icons/png-success/audio.png`, import.meta.url).href,
    docx: new URL(`../../../assets/document-icons/png-success/word.png`, import.meta.url).href,
    apk: new URL(`../../../assets/document-icons/png-success/apk.png`, import.meta.url).href,
}

const props = defineProps(uploadProps)

const translateUrl = (url: string) => {
    return new URL(url, import.meta.url).href
}

const dialogProp = reactive({
    width: props.width,
    title: props.dailogTitle,
    draggable: props.draggable,
    submitText: props.submitText,
    cancelText: props.cancelText

})
const emit = defineEmits([
    'onSuccess',
    'onError',
    'onProgress',
    'onChange',
    'onRemove',
    'onPreview',
    'onbeforeUpload',
    'onExceed',
    "beforeRemove",
    "onCancel",
    "onSubmit"
])
const state = ref(0)
let filename = ref("")
const reason = ref("")
let propsType: Array<string> = reactive([])//保存转换之后的支持类型
onMounted(() => {
    //根据传入的props.type转换具体支持上传的文件类型后缀
    for (let i = 0; i < props.type.length; i++) {
        if (props.type[i] == 'images') {
            propsType.push('jpeg', 'jpg', 'png', 'gif', 'svg')
        } else if (props.type[i] == 'audio') {
            propsType.push('m3u', 'm4a', 'mp2', 'mp3', 'ogg', 'wav', 'wma', 'mpga', 'm4b', 'rmvb', 'm4p')
        } else if (props.type[i] == 'video') {
            propsType.push('mp4', 'm4v', 'mov', 'mpe', 'mpeg', 'mpg', '3gp', 'asf', 'avi', 'mpg4', 'm4u', 'wmv')
        } else if (props.type[i] == 'excel') {
            propsType.push('xls', 'xlsx')
        } else if (props.type[i] == 'zip') {
            propsType.push('z', 'zip', 'rar', '7z')
        } else if (props.type[i] == 'pdf') {
            propsType.push('pdf')
        } else if (props.type[i] == 'exe') {
            propsType.push('exe')
        } else if (props.type[i] == 'wps') {
            propsType.push('wps')
        } else if (props.type[i] == 'txt') {
            propsType.push('txt')
        } else if (props.type[i] == 'apk') {
            propsType.push('apk')
        } else if (props.type[i] == 'ppt') {
            propsType.push('ppt')
        } else if (props.type[i] == 'docx') {
            propsType.push('docx', 'doc')
        }
    }
    //如果只允许上传一种类型文件的初始图标
    if (props.type.length == 1) {
        let ft = props.type[0]
        if (ft == 'excel ') {
            images.img1 = images.excel
        } else if (ft == 'pdf') {
            images.img1 = images.pdf
        } else if (ft == 'ppt') {
            images.img1 = images.ppt
        } else if (ft == "zip") {
            images.img1 = images.zip
        } else if (ft == "exe") {
            images.img1 = images.exe
        } else if (ft == "wps") {
            images.img1 = images.wps
        } else if (ft == "txt") {
            images.img1 = images.txt
        } else if (ft == "images") {
            images.img1 = images.images
        } else if (ft == "video") {
            images.img1 = images.video
        } else if (ft == "audio") {
            images.img1 = images.audio
        } else if (ft == 'docx') {
            images.img1 = images.docx
        } else if (ft == 'apk') {
            images.img1 = images.apk
        }
        //除以上文件类型外都显示为未知文件
        else {
            images.img1 = images.unknow
        }
    }
    //允许上传多种类型的初始图标
    else {
        images.img1 = images.unknow
    }
})
//上传成功
const onSuccess = (response: any, uploadFile: any, uploadFiles: any) => {
    state.value = 1
    let suffix = uploadFile.name.split('.')
    let ft = suffix[suffix.length - 1]
    //根据上传成功的文件后缀决定上传成功的图标
    if (ft == 'xls' || ft == 'xlsx') {
        images.img1 = successImages.excel
    } else if (ft == 'pdf') {
        images.img1 = successImages.pdf
    } else if (ft == 'ppt') {
        images.img1 = successImages.ppt
    } else if (ft == "zip" || ft == 'z' || ft == '7z' || ft == 'rar') {
        images.img1 = successImages.zip
    } else if (ft == "exe") {
        images.img1 = successImages.exe
    } else if (ft == "wps") {
        images.img1 = successImages.wps
    } else if (ft == "txt") {
        images.img1 = successImages.txt
    } else if (ft == "jpeg" || ft == "jpg" || ft == 'png' || ft == 'gif' || ft == 'svg') {
        images.img1 = successImages.images
    } else if (ft == "mp4" || ft == 'm4v' || ft == 'mov' || ft == 'mpe' || ft == 'mpeg' || ft == 'mpg' || ft == '3gp' || ft == 'asf' || ft == 'avi') {
        images.img1 = successImages.video
    } else if (ft == "m3u" || ft == "m4a" || ft == "m4b" || ft == "m4p" || ft == "mpga" || ft == 'mp2' || ft == 'mp3' || ft == 'ogg' || ft == "rmvb" || ft == 'wav' || ft == 'wma' || ft == 'wmv') {
        images.img1 = successImages.audio
    } else if (ft == 'docx' || ft == 'doc') {
        images.img1 = successImages.docx
    } else if (ft == 'apk') {
        images.img1 = successImages.apk
    }
    else {
        images.img1 = images.unknow
    }
    emit('onSuccess', response, uploadFile, uploadFiles)
}
//上传失败
const onError = (response: any, uploadFile: any, uploadFiles: any) => {
    state.value = 2
    emit('onError', response, uploadFile, uploadFiles)
}
//上传中
const onProgress = (uploadFile: any, uploadFiles: any) => {
    emit('onProgress', uploadFile, uploadFiles)
}
//文件状态改变，添加、上传成功/失败都会调用
const onChange = (uploadFile: any, uploadFiles: any) => {
    emit('onChange', uploadFile, uploadFiles)
    filename.value = uploadFile.name
}
//文件列表中移除文件时触发（需要显示已上传的文件才能触发）
const onRemove = (uploadFile: any, uploadFiles: any) => {
    if (uploadFile.status == 'success') {
        state.value = 0
    }
    emit('onRemove', uploadFile, uploadFiles)
}
//点击已上传的文件（需要显示已上传的文件才能触发）
const onPreview = (uploadFile: any) => {
    emit('onPreview', uploadFile)
}
//上传前调用
const beforeUpload = (rawFile: any,) => {
    emit('onbeforeUpload', rawFile)
    if (rawFile.size / 1024 / 1024 > props.size) {
        state.value = 2
        reason.value = " （文件过大）"
        images.img1 = images.unknow
        return false
    }
    //限制格式,m4u,mpga,mpg4,m4b,m4p,rmvb,7z,rar
    for (let i = 0; i < propsType.length; i++) {
        let type = fileMIMEType(propsType[i])
        let fileType = rawFile.type
        if (rawFile.type == "") {
            //如果element-plus获取不到文件类型
            let suffix = rawFile.name.split('.')[rawFile.name.split('.').length - 1]
            fileType = fileMIMEType(suffix)
        }
        if (fileType === type) {
            //如果格式符合
            return true
        }
        else if (i == propsType.length - 1) {
            //如果遍历完propsType都不符合则返回false停止上传
            state.value = 2
            reason.value = " （文件格式错误）"
            images.img1 = images.unknow
            return false
        }
    }
}
//当超出上传文件个数限制
const onExceed = (files: any, uploadFiles: any) => {
    emit('onExceed', files, uploadFiles)
}
const beforeRemove = (uploadFile: any, uploadFiles: any) => {
    emit('beforeRemove', uploadFile, uploadFiles)
}
const translate = () => {
    let sub = propsType.join('、')
    return sub
}
const onCancel = () => {
    visible.value = false
    emit("onCancel")
}
const onSubmit = () => {
    visible.value = false
    emit("onSubmit")
}
</script>

<style lang="scss" scoped>
.uploadpdf-example {
    .uploadState {
        font-size: 14px;

        .statebox-success {
            background-color: #F5FFF1;
            border: 1px solid #64BF3F;
            display: flex;
            align-items: center;
            padding: 10px;
            margin-bottom: 10px;
        }

        .statebox-error {
            background-color: #fff1f1;
            border: 1px solid #ff8c8c;
            display: flex;
            align-items: center;
            padding: 10px;
            margin-bottom: 10px;
        }
    }

    .uploadpdf-contain {
        background: #F3F5F6;
        padding: 16px 24px;
        border: 1px dashed #CCCCCC;

        .limit-text {
            padding-bottom: 16px;
            font-size: 14px;

            .limit-text-box {
                display: flex;
            }
        }

        .upload-demo {
            :deep(.el-upload-dragger) {
                padding-top: 87px !important;
                padding-bottom: 87px !important;

                .centerContainer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .el-icon--upload {
                    margin-bottom: 24px;
                }

            }

            :deep(.el-upload) {
                .el-upload-dragger {
                    border: 0px !important;
                    border-radius: 0px;

                    .el-upload__text em {
                        text-decoration: underline !important;
                    }
                }
            }
        }
    }
}
</style>
