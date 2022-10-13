<template>
    <el-tooltip class="box-item" effect="dark" :content="props.msg" :hide-after="0" :placement="placement">
        <vxe-button icon="vxe-icon-download" v-bind="$attrs" />
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
const placement = ref<any>('top')
const isFullscreen = ref(false)
const isShowSearchForm = ref(true)
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
