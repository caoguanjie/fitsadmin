<template>
    <div class="fits-common-table">
        <vxe-table class="common-table" ref="fitsCommonTable" :data="props.data || []" border="inner" :loading="false"
            show-overflow :row-config="{ isHover: true }" @toggle-row-expand="toggleRowExpand" height="100%"
            empty-text=" ">
            <vxe-column v-for="(item, index) in props.headers" :key="index" v-bind="item">
                <template #content="scoped" v-if="item.type === 'expand'">
                    <slot name="expand" :row="scoped.row" :index="scoped.rowIndex" />
                </template>
                <template #default="scoped" v-if="item.field">
                    <slot :field="item.field" :row="scoped.row" :index="scoped.rowIndex">
                        <span>{{ scoped.row[item.field] }}</span>
                    </slot>
                </template>
            </vxe-column>
            <template #empty>
                <slot name="noData">
                    <fits-empty />
                </slot>
            </template>
        </vxe-table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { VxeTableDefines } from 'vxe-table';
import { ICustomColumnsConfig, IFitsTableHeaders } from '../../type';
import { FitsEmpty } from '@/fits-components/Data/FitsEmpty'
const props = defineProps<{ headers: IFitsTableHeaders, data: any[] }>()
const emit = defineEmits(["expandChange"])
const fitsCommonTable = ref()

/**
 * 当行展开或收起
 */
function toggleRowExpand(data: VxeTableDefines.ToggleRowExpandEventParams) {
    emit("expandChange", data)
}

/**
 * 更新列配置
 */
async function updateColumns(data: ICustomColumnsConfig[]) {
    const originColumns = fitsCommonTable.value?.getTableColumn().fullColumn || []
    originColumns.forEach((col: any) => {
        const _index = data.findIndex(item => (item.field && item.field === col.field) || (item.type && item.type === col.type))
        const _ = data.find(item => (item.field && item.field === col.field) || (item.type && item.type === col.type))
        col.sort = _index
        col.visible = _?.visible
    })
    originColumns.sort((before: any, after: any) => (before.sort - after.sort))
    await fitsCommonTable.value?.reloadColumn(originColumns)
}

defineExpose({
    updateColumns
})
</script>

<style lang="scss" scoped>
.fits-common-table {
    height: 100%;
}
</style>