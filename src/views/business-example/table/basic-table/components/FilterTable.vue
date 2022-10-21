<template>
    <fits-table :option="gridOptions" ref="xGrid" />
</template>

<script lang='ts' setup>
import { FitsTableProps } from '@/components/List/type';

const filters = ref([{ data: '' }])

const xGrid = ref()

const gridOptions = reactive<FitsTableProps>({
    columns: [
        { field: 'name', title: '姓名', filters: [{ label: '名字长度=2', value: '1' }, { label: '名字长度>=3', value: '2' }], filterMethod: filterNameMethod },
        { field: 'phone', title: '电话', filters: [{ label: '开头为137', value: '1' }, { label: '开头为132', value: '2' }, { label: '其他', value: '3' }], filterMethod: filterPhoneMethod },
        { field: 'birth', title: '出生日期' },
        {
            field: 'address', title: '地址', width: 320, filters: filters.value,
            filterRender: {
                name: 'ElInput',

                attrs: {
                    ref: 'inputRef',
                },
                props: {
                    clearable: true,
                    placeholder: '输入关键字',
                },
            },
            filterMethod: filterAddressMethod
        },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', address: '广东省广州市天河区五山路东城小区5号楼401' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', address: '广东省广州市天河区五山路东城小区5号楼403' },
        { name: '王大陆', phone: '13224459856', birth: '2000-01-05', address: '广东省广州市天河区五山路东城小区5号楼404 ' },
        { name: '李萌萌', phone: '13712458736', birth: '1879-12-13', address: '广东省广州市海珠区五山路幸福小区6号楼101 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', address: '广东省广州市海珠区五山路幸福小区7号楼102 ' },
    ],
})



// 定义筛选名字列的返回方法
function filterNameMethod({ value, option, cellValue, row, column }: any) {
    if (value === '1') {
        return cellValue.length === 2
    } else {
        return cellValue.length >= 3
    }
}

// 定义筛选电话列的返回方法
function filterPhoneMethod({ value, cellValue }: any) {
    switch (value) {
        case '1':
            return cellValue.substr(0, 3) === '137'
        case '2':
            return cellValue.substr(0, 3) === '132'
        case '3':
            return cellValue.substr(0, 3) !== '132' && cellValue.substr(0, 3) !== '137'
    }
    return false
}

function filterAddressMethod({ value, option, cellValue, row, column }: any) {
    // console.log(option, 'option');
    // console.log(cellValue, 'cellValue');
    return cellValue.indexOf(option.data) !== -1
}
</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>