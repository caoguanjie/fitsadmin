<template>
    <fits-table :option="fitsTablePro" ref="xGrid" @cellMouseenter="cellMouseenter" class="complex-highlight-table" />
</template>

<script lang='ts' setup>
import { FitsTableProps, FitsTable } from '@/fits-components';
import { useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

let currentCol = ref(0)

const gridOptions: FitsTableProps = {
    border: 'full',
    columns: [
        { type: 'seq', field: "Index", width: 50, title: '序号', headerClassName: `headerClass${0}`, className: `columnClass${0}` },
        {
            title: '基本信息',
            field: "basic",
            children: [
                { field: 'name', title: '姓名', headerClassName: `headerClass${1}`, className: `columnClass${1}` },
                {
                    title: '其他信息',
                    field: "other",
                    children: [
                        { field: 'phone', title: '电话', headerClassName: `headerClass${2}`, className: `columnClass${2}` },
                        { field: 'birth', title: '生日', headerClassName: `headerClass${3}`, className: `columnClass${3}` }
                    ]
                },
                { field: 'sex', title: '性别', headerClassName: `headerClass${4}`, className: `columnClass${4}` }
            ]
        },
        { field: 'mark', title: '备注', sortable: true, showOverflow: true, headerClassName: `headerClass${5}`, className: `columnClass${5}` },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', sex: '男', mark: '下周五入住201房' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', sex: '男', mark: '无' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', sex: '女', mark: '已离职，归还设备' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', sex: '女', mark: '此人不存在 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', sex: '男', mark: '办理手续、护照、签证 、身份汇总' },
    ],
    headerAlign: 'center',
    rowConfig: {
        isHover: true,
    },
    tooltipConfig: {},
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)

function cellMouseenter({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }: any) {
    document.addEventListener('mouseover', onMouseOver, true)
    if ($columnIndex === currentCol.value) return
    // 找到之前高亮的列头，去掉高亮样式
    const preEl = document.querySelector('.iscurrentCol')
    preEl && preEl.classList.remove("iscurrentCol");
    document.querySelectorAll('.iscurrentCol').forEach((elem) => {
        elem.classList.remove('iscurrentCol')
    })
    // 找到现在应该高亮的列，添加样式
    const currentEl = document.querySelector(`.headerClass${$columnIndex}`)
    document.querySelectorAll(`.columnClass${$columnIndex}`).forEach((elem) => {
        elem.classList.add('iscurrentCol')
    })
    currentEl?.classList.add("iscurrentCol");
    currentCol.value = $columnIndex
}

//判断当前是否在弹窗内
const onMouseOver = (e: any) => {
    if (!e?.target?.closest(".vxe-table--body-wrapper")) {
        // 非当前元素，需要执行的代码
        const preEl = document.querySelector('.iscurrentCol')
        preEl && preEl.classList.remove("iscurrentCol");
        document.querySelectorAll('.iscurrentCol').forEach((elem) => {
            elem.classList.remove('iscurrentCol')
        })
        currentCol.value = -1
        document.removeEventListener('mouseenter', onMouseOver, true)
    }
}

onBeforeUnmount(() => {
    document.removeEventListener('mouseenter', onMouseOver, true)
})
onDeactivated(() => {
    document.removeEventListener('mouseenter', onMouseOver, true)
})
</script>

<style lang="scss" scoped>
.complex-highlight-table {
    :deep(.iscurrentCol) {
        background: #f5f7fa;
    }
}
</style>

<style lang="scss">

</style>