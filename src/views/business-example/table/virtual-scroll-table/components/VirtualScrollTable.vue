<template>
    <fits-table :option="fitsTablePro" ref="xGrid" />
</template>

<script lang='ts' setup>
import { useFitsTablePro } from '@/components/FitsTablePro/FitsTable/FitsTableProHook';
import { FitsTableProps } from '@/components/FitsTablePro/FitsTable/type';
import { VxeGridInstance } from 'vxe-table';

const data: any = reactive([])

const gridOptions: FitsTableProps = {
    height: 500,
    columns: [
        { field: 'name', title: '姓名', },
        { field: 'phone', title: '电话', },
        { field: 'birth', title: '出生日期' },
        { field: 'address', title: '地址', width: 320 },
    ],
    data,
    scrollY: {
        gt: 20
    }
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
onMounted(() => {
    getData()
})

function getData() {
    for (let i = 0; i < 10000; i++) {
        data.push({
            name: '李晓明' + i,
            phone: '18924584265',
            birth: '1954-03-25',
            address: `广东省广州市海珠区五山路幸福小区7号楼${i}房`
        })
    }
}

</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>