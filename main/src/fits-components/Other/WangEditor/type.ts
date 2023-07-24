import { ExtractPropTypes} from "vue"
/**
 * 上传组件的配置
 */
export const editorProps = {
    modelValue: {
      type: [String],
      default: ''
    },
    excludeKeys: {
      type: Array
    },
    toolbarKeys: {
      type: Array
    },
    isButton: {
      type: Boolean,
      default: false
    },
    isEditer: {
      type: Boolean,
      default: true
    },
    ToolbarClass: {//工具栏类名
      type: String
    },
    EditorClass: {//编辑器类名
      type: String
    },
    placeholder: {//提示内容默认 请输入内容...
      type: String
    },
    autoFocus: {//是否默认focus,单个编辑器时有效
      type: Boolean,
      default: true
    },
    isScroll: {
      type: Boolean,
      default: true
    },
    isPreview: {
      type: Boolean,
      default: true
    },
    isToolbar: {
      type: Boolean,
      default: false
    },
    isInfinite: {
      type: Boolean,
      default: false
    }
}
export type EditorProps = ExtractPropTypes<typeof editorProps> 
