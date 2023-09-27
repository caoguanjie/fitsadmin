<template>
    <div class="uploadpdf-example">
        <el-button @click="visible = true" type="primary">开始上传</el-button>
        <fits-dialog :visible="visible" :dialogProp="dialogProp" :showFooter="false" @cancel="visible = false"
            @submit="visible = false">
            <slot name="uploadState">
                <div class="uploadState">
                    <div class="statebox-success" v-if="state == 1">
                        <div class="success" />上传成功 !
                    </div>
                    <div class="statebox-error" v-else-if="state == 2">
                        <div class="error" />
                        上传失败 !{{ reason }}
                    </div>
                </div>
            </slot>
            <div class="uploadpdf-contain">
                <div class="limit-text">
                    <slot name="text">
                        支持上传文件格式为pdf，大小不超过{{ props.size }}M（测试文件大小限制）
                    </slot>
                </div>
                <el-upload ref="uploadRef" class="upload-demo" :method="props.method" :action="props.url" :data="props.data"
                    drag :disabled="props.disabled" :name="props.name" :on-remove="onRemove" :on-change="onChange"
                    :show-file-list="props.showfile" :on-progress="onProgress" :on-success="onSuccess" :on-error="onError"
                    :on-preview="onPreview" :before-upload="beforeUpload" :limit="props.limit" :on-exceed="onExceed"
                    :with-credentials="props.withCredentials" @before-remove="beforeRemove">
                    <el-icon class="el-icon--upload">
                        <slot name="icon">
                            <div class=successIcon v-if="state == 1" />
                            <div class="icon" v-else-if="state != 1" />
                        </slot>
                    </el-icon>
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

<script setup lang="ts">
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()
const visible = ref(false)


const props = defineProps({
    //请求URL,必填！
    url: {
        type: String,
        default: 'http://192.168.32.60:3005/mock/78/api/uploadPDF'
    },
    //设置上传请求方法
    method: {
        type: String,
        default: 'post'
    },
    //	上传时附带的额外参数,接口也需要支持附带参数
    data: Object,
    //	上传的文件字段名
    withCredentials: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: 'file'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    //	是否显示已上传文件列表
    showfile: {
        type: Boolean,
        default: false
    },
    limit: {
        type: Number,
        default: 5,
    },
    type: {
        type: String,
        default: "application/pdf"
    },
    size: {
        type: Number,
        default: 2
    },
    width: {
        type: String,
        defult: "40%"
    },
    draggable: {
        type: Boolean,
        defult: false
    }
});
const dialogProp = reactive({
    title: '',
    width: props.width,
    draggable: props.draggable
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
    "beforeRemove"
])
const state = ref(0)
let filename = ref("")
const reason = ref("")
//上传成功
const onSuccess = (response: any, uploadFile: any, uploadFiles: any) => {
    state.value = 1
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
        return false
    }
    if (rawFile.type !== props.type) {
        state.value = 2
        reason.value = " （文件格式错误）"
        return false
    }
}
//当超出上传文件个数限制
const onExceed = (files: any, uploadFiles: any) => {
    emit('onExceed', files, uploadFiles)
}
const beforeRemove = (uploadFile: any, uploadFiles: any) => {
    emit('beforeRemove', uploadFile, uploadFiles)
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

            .success {
                background: url(@/assets/document-icons/state/success.png) no-repeat;
                width: 20px;
                height: 20px;
                background-size: 100%;
                margin-right: 10px;
            }
        }

        .statebox-error {
            background-color: #fff1f1;
            border: 1px solid #ff8c8c;
            display: flex;
            align-items: center;
            padding: 10px;
            margin-bottom: 10px;

            .error {
                background: url(@/assets/document-icons/state/error.png) no-repeat;
                width: 20px;
                height: 20px;
                background-size: 100%;
                margin-right: 10px;
            }
        }
    }

    .uploadpdf-contain {
        background: #F3F5F6;
        padding: 16px 24px;
        border: 1px dashed #CCCCCC;

        .limit-text {
            padding-bottom: 16px;
            font-size: 14px;
        }

        .upload-demo {
            :deep(.el-upload-dragger) {
                padding-top: 87px !important;
                padding-bottom: 87px !important;

                .el-icon--upload {
                    margin-bottom: 24px;

                    .icon {
                        background: url(@/assets/document-icons/pdf.png) no-repeat;
                        width: 100%;
                        height: 100%;
                        background-size: 100%;
                    }

                    .successIcon {
                        background: url(@/assets/document-icons/pdfsuccess.png) no-repeat;
                        width: 100%;
                        height: 100%;
                        background-size: 100%;
                    }
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
  