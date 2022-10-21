<template>
    <div class="editor-example">
        <fits-card title="基础用法" desc="富文本编辑器基础用法。给编辑器绑定String类型数据,,在编辑器内输入的内容都将以HTML保存。">
            <base-editor />
        </fits-card>

        <fits-card title="配置上传图片" desc="使用到图片上传时必须配置上传地址">
            <upload-editor />
        </fits-card>

        <fits-card title="切换状态" desc="传入isEditer<boolean>切换编辑器只读、编辑状态">
            <isread-editor />
        </fits-card>

        <fits-card title="不隐藏工具栏" desc="传入isToolbar<boolean>只读状态下不隐藏工具栏">
            <istoolbar-eidtor />
        </fits-card>

        <fits-card title="禁用图片预览" desc="传入isPreview<boolean>值为false禁用图片预览,默认开启图片预览">
            <ispreview-editor />
        </fits-card>

        <fits-card title="配置工具栏" desc="删除默认工具栏某些配置,传入数组excludeKeys<array>,将需要删除的工具栏配置项从工具栏移除。">
            <exclude-editor />
        </fits-card>

        <fits-card title="重写工具栏" desc="重新定义工具栏配置,传入toolbarKeys<array>,自定义工具栏配置。">
            <reset-editor />
        </fits-card>

        <fits-card title="滚动条编辑器" desc="固定编辑器高度，通过配置isScroll和自定义类名以及改写编辑器高度，当超出编辑器高度时则产生滚动条">
            <noscroll-editor />
        </fits-card>

    </div>
</template>
  
<script setup lang="ts">
import baseEditor from '@/views/components-manage/wangEditor/editor-examples/baseEditor.vue'
import excludeEditor from '@/views/components-manage/wangEditor/editor-examples/excludeEditor.vue'
import resetEditor from '@/views/components-manage/wangEditor/editor-examples/resetEditor.vue'
import isreadEditor from '@/views/components-manage/wangEditor/editor-examples/isreadEditor.vue'
import uploadEditor from '@/views/components-manage/wangEditor/editor-examples/uploadEditor.vue'
import noscrollEditor from '@/views/components-manage/wangEditor/editor-examples/noscrollEditor.vue'
import ispreviewEditor from '@/views/components-manage/wangEditor/editor-examples/isPreviewEditor.vue'
import istoolbarEidtor from '@/views/components-manage/wangEditor/editor-examples/istoolbarEditor.vue'
</script>

<style lang="scss" scoped>

</style>
  