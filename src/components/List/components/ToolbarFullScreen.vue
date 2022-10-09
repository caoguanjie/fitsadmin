<template>
    <el-tooltip class="box-item" effect="dark" :content="props.msg" :placement="placement">
        <vxe-button :icon="icon" ref="buttonRef" @click="zoom" />
    </el-tooltip>
</template>

<script lang='ts' setup>
import { VxeGridConstructor } from 'vxe-table';
import eventBus from '@/utils/base/EventBus';

const props = defineProps<{
    // 自定义提示信息
    msg?: string,
    // 表格公共的api
    grid: VxeGridConstructor
}>()
const icon = ref('vxe-icon-fullscreen')
const isFullscreen = ref(false)
const placement = ref<any>('top')
function zoom() {
    isFullscreen.value = !isFullscreen.value
    props.grid.zoom();
}
watch(isFullscreen, (value) => {
    icon.value = value ? 'vxe-icon-minimize' : 'vxe-icon-fullscreen'
})
onMounted(() => {
    eventBus.on('IsShowSearchForm', (isShowSearchForm: boolean) => {
        placement.value = isShowSearchForm ? 'top' : 'bottom'
    })
})
</script>
<style lang='scss' scoped>

</style>