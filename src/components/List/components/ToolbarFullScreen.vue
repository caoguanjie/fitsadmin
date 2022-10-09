<template>
    <el-tooltip class="box-item" effect="dark" :content="props.msg" placement="top">
        <vxe-button :icon="icon" ref="buttonRef" @click="zoom" />
    </el-tooltip>
</template>

<script lang='ts' setup>
import { VxeGridConstructor } from 'vxe-table';

const props = defineProps<{
    // 自定义提示信息
    msg?: string,
    // 表格公共的api
    grid: VxeGridConstructor
}>()
const icon = ref('vxe-icon-fullscreen')
const isFullscreen = ref(false)
function zoom() {
    isFullscreen.value = !isFullscreen.value
    props.grid.zoom();
}
watch(isFullscreen, (value) => {
    icon.value = value ? 'vxe-icon-minimize' : 'vxe-icon-fullscreen'
})
</script>
<style lang='scss' scoped>

</style>