import { ExtractPropTypes } from "vue"
/**
 * 上传组件的配置
 */
export const uploadProps = {
    //请求URL,必填！
    url: {
        type: String,
        default: 'http://192.168.32.60:3005/mock/78/api/uploadPDF',
        require: true
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
        type: Array<string>,
        default: ["pdf"]
    },
    size: {
        type: Number,
        default: 10
    },
    width: {
        type: String,
        default: "50%"
    },
    draggable: {
        type: Boolean,
        default: false
    },
    showFooter: {
        type: Boolean,
        default: true,
    },
    dailogTitle: {
        type: String,
        default: '文件上传'
    },
    stateText: {
        type: Object,
        default: function default1() {
            return {
                success: "上传成功 !",
                error: "上传失败 !"
            }
        }
    },
    submitText: {
        type: String,
        default: "确定"
    },
    cancelText: {
        type: String,
        default: "取消"
    },
    ClassName: {
        type: String,
        default: ""
    }
}
export type UploadProps = ExtractPropTypes<typeof uploadProps> 
