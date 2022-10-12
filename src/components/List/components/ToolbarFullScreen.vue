<template>
    <el-tooltip class="box-item" effect="dark" :content="props.msg" :placement="placement" :hide-after="0">
        <vxe-button :icon="icon" ref="buttonRef" v-bind="$attrs" />
    </el-tooltip>
</template>

<script lang='ts' setup>
import { VxeGridConstructor } from 'vxe-table';
import eventBus from '@/utils/base/EventBus';

const props = defineProps<{
    // 自定义提示信息
    msg?: string,
    isShowSearchForm?: boolean,
    // 表格公共的api
    grid: VxeGridConstructor
}>()
const icon = ref('vxe-icon-fullscreen')
const isFullscreen = ref(false)
const isShowSearchForm = ref(props.isShowSearchForm)
const placement = ref<any>('top')
watch(isFullscreen, (value) => {
    icon.value = value ? 'vxe-icon-minimize' : 'vxe-icon-fullscreen'
})
onMounted(() => {
    eventBus.on('IsShowSearchForm', (_isShowSearchForm: boolean) => {
        isShowSearchForm.value = _isShowSearchForm
        placement.value = isFullscreen.value && !isShowSearchForm.value ? 'bottom' : 'top'
    })
    eventBus.on('isFullscreen', () => {
        isFullscreen.value = !isFullscreen.value
        placement.value = isFullscreen.value && !isShowSearchForm.value ? 'bottom' : 'top'
    })
})
</script>
<style lang='scss' scoped>

</style>