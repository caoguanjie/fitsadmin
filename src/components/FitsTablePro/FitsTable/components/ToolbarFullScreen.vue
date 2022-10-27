<template>
    <el-tooltip class="box-item" effect="dark" :content="props.msg" :placement="placement" :hide-after="0">
        <vxe-button :icon="icon" ref="buttonRef" v-bind="$attrs" @click="handleClick()" />
    </el-tooltip>
</template>

<script lang='ts' setup>
import { VxeGridConstructor } from 'vxe-table';
import eventBus from '@/utils/base/EventBus';

const props = defineProps<{
    // 自定义提示信息
    msg?: string,
    event: any,
    // 表格公共的api
    grid: VxeGridConstructor
}>()
const icon = ref('vxe-icon-fullscreen')
const isFullscreen = ref(false)
const isShowSearchForm = ref(props.grid.props.formConfig ? true : false)
const placement = ref<any>('top')

onMounted(() => {
    eventBus.on('IsShowSearchForm', (_isShowSearchForm: boolean) => {
        isShowSearchForm.value = _isShowSearchForm
        placement.value = isFullscreen.value && !isShowSearchForm.value ? 'bottom' : 'top'
    })
})


function handleClick() {
    isFullscreen.value = !isFullscreen.value
    console.log(isFullscreen.value)
    isShowSearchForm.value = props.event.get()
    placement.value = isFullscreen.value && !isShowSearchForm.value ? 'bottom' : 'top'
    eventBus.emit('isFullscreen')
    props.grid.zoom()
}
watch(() => isFullscreen.value, (value) => {
    icon.value = value ? 'vxe-icon-minimize' : 'vxe-icon-fullscreen'
})
</script>
<style lang='scss' scoped>

</style>