<template>
    <fits-table :option="fitsTablePro" ref="xGrid">
        <template #dragDefault>
            <span class="drag-btn">
                <i class="vxe-icon-num-list"></i>
            </span>
        </template>
    </fits-table>
</template>

<script lang='ts' setup>
import { FitsTableProps, useFitsTablePro, FitsTable } from '@/fits-components';
import Sortable from 'sortablejs';
import { VxeGridInstance } from 'vxe-table';

const sortable = ref()

const xGrid = ref<VxeGridInstance | any>()

const gridOptions: FitsTableProps = {
    columns: [
        { field: 'name', title: '姓名' },
        { field: 'phone', title: '电话', },
        { field: 'birth', title: '出生日期' },
        { field: 'address', title: '地址', width: 320 },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ],
    rowConfig: {
        useKey: true
    }
}

const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)

onMounted(() => {
    setDrag()
})

function setDrag() {
    const el = document.querySelector(".body--wrapper>.vxe-table--body tbody")
    sortable.value = Sortable.create(el, {
        onEnd: (evt: any) => {
            if (evt.oldIndex === evt.newIndex) return
            const currRow = gridOptions.data?.splice(evt.oldIndex, 1)[0]
            gridOptions.data?.splice(evt.newIndex, 0, currRow)
        }
    });
}

</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>