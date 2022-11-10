<template>
    <fits-table :option="fitsTablePro" class="SummaryTable" ref="xGrid" />
</template>

<script lang='ts' setup>
import { FitsTableProps, FitsTable } from '@/fits-components';
import { useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

const xGrid = ref<VxeGridInstance | any>()

const gridOptions: FitsTableProps = {
    showFooter: true,
    footerMethod,
    footerRowClassName: 'footerRowClass',
    columns: [
        { field: 'name', title: '商品', },
        { field: 'price', title: '价格', },
        { field: 'number', title: '数量' },
    ],
    data: [
        { name: '雪糕', price: 5, number: 2 },
        { name: '牛奶', price: 3.5, number: 3 },
        { name: '饼干', price: 34, number: 4 },
        { name: '饮料', price: 12, number: 5 },
        { name: '蛋糕', price: 50, number: 6 },
    ],
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
function footerMethod({ data }: any) {
    let priceSum = 0
    let numberSum = 0
    data.map((item: any) => {
        priceSum += item.price
        numberSum += item.number
    })
    return [
        ['平均值', priceSum / data.length, numberSum / data.length],
        ['合计', priceSum, numberSum]
    ]
}

</script>
<style lang='scss' scoped>
.SummaryTable {
    :deep(.footerRowClass) {
        background-color: #f0f9eb !important;
    }
}
</style>

<style lang="scss">

</style>