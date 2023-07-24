<template>
  <div class="editor-contain">
    <el-image-viewer v-if="dialogVisible" :initial-index="whichImg" :url-list="dialogImageUrl"
      @close="dialogVisible = false" :infinite="props.isInfinite" />
    <div class="wangeditorClass" @click="isFocus">
      <!-- 工具栏 -->
      <Toolbar class="toolbarClass" :class=$props.ToolbarClass :editor="editorRef" v-show="editer || isToolbar"
        :defaultConfig="toolbarConfig" :mode="mode" />
      <!-- 编辑器 -->
      <Editor class="editorClass" :class=$props.EditorClass :defaultConfig="editorConfig" v-model="defaultHtml"
        @onChange="handleChange" :mode="mode" @onCreated="handleCreated" />
    </div>
  </div>
</template>

<script setup lang="ts" name="FitsEditor">
import { onBeforeUnmount, defineEmits, shallowRef, reactive, toRefs, ref, watch, onMounted } from 'vue';
import { WangEditor as Editor, WangToolbar as Toolbar } from './wangEditor';
import { ElImageViewer } from 'element-plus';
import { editorProps } from './type'

const props = defineProps(editorProps);

const emit = defineEmits([
  'update:modelValue',
  "uploadImg",
  "uploadVideo",
  "onCreated",//编辑器创建时触发
  "onChanged",//内容改动触发，返回编辑器内容
  "getText",//内容改动时返回编辑器中的纯文本内容
  "beforeUploadImg",//在调用上传图片方法之前触发
  "afterUploadImg",//上传图片后触发
  "beforeEditordestory",//编辑器销毁前触发
  "afterEditordestory",//编辑器销毁后触发
]);

// 编辑器实例，必须用 shallowRef(调用编辑器api使用)
const editorRef = shallowRef();

let editer = ref(true)
let dialogVisible = ref(false)
let dialogImageUrl = <any>ref([])
let whichImg = ref(0)

const state = reactive({
  toolbarConfig: {},
  editorConfig: {
    placeholder: props.placeholder ? props.placeholder : '请输入内容...',
    scroll: props.isScroll,//是否滚动
    autoFocus: props.autoFocus,
    MENU_CONF: {
      uploadImage: {
        // 自定义图片上传
        async customUpload(file: any, insertFn: any) {

          emit("beforeUploadImg", file)
          emit('uploadImg', file, (data: any) => {
            insertFn(data.url, data.alt, data.href)
          })
          emit("afterUploadImg", file)
          // 返回数据必须有url用来显示图片
          // uploadImg(file).then(response => {
          //   const url = response.data.url;
          //   insertFn(url);//将url插入到编辑器中
          //   return url
          // }).catch((err: any) => {
          //   console.log("img upload fail:", err)
          // });
        }
      },
      uploadVideo: {
        // 自定义视频上传
        async customUpload(file: any, insertFn: any) {
          emit('uploadVideo', file, (data: any) => {
            insertFn(data.url, data.poster)
          })
          //返回数据必须有url用来显示视频
          // uploadVideo(file).then(response => {
          //   const url = response.data.poster;
          //   insertFn(url);
          // }).catch((err: any) => {
          //   console.log("video upload fail:", err)
          // });
        }
      },
    },
    hoverbarKeys: {
      // 清空hoverbar
      'image': {
        menuKeys: [],
      },
      'link': {
        menuKeys: [],
      },
      'pre': {
        menuKeys: [],
      },
      'table': {
        menuKeys: [],
      },
      'divider': {
        menuKeys: [],
      },
      'video': {
        menuKeys: [],
      },
      'text': {
        menuKeys: []
      }
    }
  },
  defaultHtml: props.modelValue,
  mode: 'default',
  editer: true,
});

const { toolbarConfig, editorConfig, defaultHtml, mode } = toRefs(state);

onMounted(() => {
  if (props.toolbarKeys) {
    Object.assign(toolbarConfig.value, { "toolbarKeys": props.toolbarKeys })
  }
  if (props.excludeKeys) {
    Object.assign(toolbarConfig.value, { "excludeKeys": props.excludeKeys })
  } else {
    Object.assign(toolbarConfig.value, { "excludeKeys": ["group-video"] })
  }
})

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  emit('onCreated')
};

function handleChange(editor: any) {
  emit('update:modelValue', editor.getHtml());
  emit('onChanged', editor.getHtml())
  emit("getText", editor.getText())
}

watch(() => props.isEditer, (newVal: boolean) => {
  if (props.isEditer) {
    editorRef.value.enable()
    editer.value = true
  } else {
    editorRef.value.disable()
    editer.value = false //隐藏工具栏
    if (props.isPreview) {
      //获取编辑器中的dom元素
      let doms = editorRef.value.getEditableContainer()
      //获取dom元素中的img
      let imgs = doms.getElementsByTagName('img')
      if (imgs.length != 0) {
        dialogImageUrl.value = []
        for (let i = 0; i < imgs.length; i++) {
          dialogImageUrl.value.push(imgs[i].currentSrc)//保存用于预览的url
          //给图片增加点击事件
          imgs[i].onclick = () => {
            if (editer.value == false) {
              whichImg.value = i //预览哪张图片
              dialogVisible.value = true
            }
          };
        }
      }
    }
  }
})

//切换编辑器是否编辑状态
// const isEdit = () => {
//   //编辑器api是否只读判断，是只读切换为编辑，否则切换为只读
//   if (editorRef.value.isDisabled()) {
//     editorRef.value.enable()
//     editer.value = true
//   } else {
//     editorRef.value.disable()
//     editer.value = false //隐藏工具栏
//     //获取编辑器中的dom元素
//     let doms = editorRef.value.getEditableContainer()
//     //获取dom元素中的img
//     let imgs = doms.getElementsByTagName('img')
//     if (imgs.length != 0) {
//       dialogImageUrl.value = []
//       for (let i = 0; i < imgs.length; i++) {
//         dialogImageUrl.value.push(imgs[i].currentSrc)//保存用于预览的url
//         //给图片增加点击事件
//         imgs[i].onclick = () => {
//           if (editer.value == false) {
//             whichImg.value = i //预览哪张图片
//             dialogVisible.value = true
//           }
//         };
//       }
//     }
//   }
// }

//编辑器聚焦
const isFocus = () => {
  editorRef.value.focus()
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  emit("beforeEditordestory", editor.getHtml())
  editor.destroy();
  emit("afterEditordestory", editor.getHtml())
});
</script>

<style lang="scss" scoped>
.editor-contain {
  .buttonClass {
    padding-bottom: 10px;
  }

  .w-e-full-screen-container {
    z-index: 9999 !important;
  }

  .wangeditorClass {
    border: 1px solid #ccc;


    .toolbarClass {
      border-bottom: 1px solid #ccc;
    }

    .editorClass {
      min-height: 350px;
      background-color: white;
    }
  }
}
</style>

<style src="@wangeditor/editor/dist/css/style.css">

</style>
