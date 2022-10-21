<template>
    <fits-table :option="gridOptions" ref="xTable1">
        <template #dragDefault>
            <span class="drag-btn">
                <i class="vxe-icon-num-list"></i>
            </span>
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTableProps } from '@/components/List/type';
import Sortable from 'sortablejs';

const sortable = ref()

const xTable1 = ref()

const gridOptions = reactive<FitsTableProps>({
    columns: [
        { field: 'name', title: '姓名' },
        { field: 'phone', title: '电话', },
        { field: 'birth', title: '出生日期', },
        { field: 'address', title: '地址', width: 320 },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ],
    columnConfig: {
        useKey: true
    }
})

onMounted(() => {
    setDrag()
})

function setDrag() {
    const el = xTable1.value.fitsTablePro.$el.querySelector(".body--wrapper>.vxe-table--header .vxe-header--row")
    sortable.value = Sortable.create(el, {
        onEnd: (sortableEvent: any) => {
            if (sortableEvent.oldIndex === sortableEvent.newIndex) return
            const targetThElem = sortableEvent.item
            const newIndex = sortableEvent.newIndex as number
            const oldIndex = sortableEvent.oldIndex as number
            const { fullColumn, tableColumn } = xTable1.value.fitsTablePro.getTableColumn()
            const wrapperElem = targetThElem.parentNode as HTMLElement
            const newColumn = fullColumn[newIndex]
            if (newColumn.fixed) {
                // 错误的移动
                const oldThElem = wrapperElem.children[oldIndex] as HTMLElement
                if (newIndex > oldIndex) {
                    wrapperElem.insertBefore(targetThElem, oldThElem)
                } else {
                    wrapperElem.insertBefore(targetThElem, oldThElem ? oldThElem.nextElementSibling : oldThElem)
                }
                ElMessage({
                    message: '固定列不允许拖动！',
                    type: 'error'
                })
                // VXETable.modal.message({ content: '固定列不允许拖动！', status: 'error' })
                return
            }
            // 获取列索引 columnIndex > fullColumn
            const oldColumnIndex = xTable1.value.fitsTablePro.getColumnIndex(tableColumn[oldIndex])
            const newColumnIndex = xTable1.value.fitsTablePro.getColumnIndex(tableColumn[newIndex])
            // 移动到目标列
            const currRow = fullColumn.splice(oldColumnIndex, 1)[0]
            fullColumn.splice(newColumnIndex, 0, currRow)
            xTable1.value.fitsTablePro.loadColumn(fullColumn)
        }
    });
}

</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>