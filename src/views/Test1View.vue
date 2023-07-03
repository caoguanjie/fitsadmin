<template>
    <div> <fits-table :option="fitsTablePro" ref="xGrid" /></div>
</template>
<script lang="ts">
export default {
    name: 'Test1View'
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { FitsTable } from '@/fits-components';
import { FitsTableProps, useFitsTablePro } from '@/fits-components'
import { VxeGridInstance, VxeGridPropTypes, VxeTableDefines } from 'vxe-table';
import useStore from '@/store';
//大概80mb
// const a = new Array(20000000).fill(1)
let myname = ref<any>('')
const route = useRoute()
onMounted(() => {
    myname.value = route.query.name
    setTimeout(() => {
        init()
    }, 0)
})
const xGrid = ref<VxeGridInstance | any>()
const { user } = useStore();
const gridOptions: FitsTableProps = {
    // border: true,
    keepSource: false,
    showOverflow: false,
    id: 'dictionarytable',
    rowConfig: {
        height: 52
    },
    importConfig: {},
    formConfig: {
        items: [
            { field: 'name', span: 3, title: '部门名称', itemRender: { name: '$input', props: { placeholder: '请输入部门名称' } } },
            { field: 'code', span: 3, title: '部门编码', itemRender: { name: '$input', props: { placeholder: '请输入部门编码' } } },
            { field: 'code', span: 3, title: '部门编码', itemRender: { name: 'ElDatePicker', props: { placeholder: '请输入部门编码' } } },
            // { field: 'status', span: 3, title: '部门状态', itemRender: { name: 'ElSelect', options: [{ value: '0', label: '启用' }, { value: '1', label: '停用' }], props: { placeholder: '请选择状态', teleported: false } } },
            // { field: 'status', span: 3, title: '部门状态', itemRender: { name: 'ElSelect', options: [{ value: '0', label: '启用' }, { value: '1', label: '停用' }], props: { placeholder: '请选择状态', teleported: false } } },
        ]
    },
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    // //数据缓存，如果其他表格也使用了同一个key会导致表格数据串用
    storage: {
        enabled: true,
        key: 'SystemManageDictionaryList',
        dataBase: (user.userInfo as any).id,
    },
    toolbarConfig: {
        buttons: [
            { code: 'addDict', name: '添加字典', status: 'primary' },
            { code: 'Dictable', name: '启用' },
            { code: 'Dictunable', name: '禁用' },
            { code: 'DictExport', name: '导出' },
            { code: 'DictDelete', name: '批量删除' }
        ],
        tools: {
            enabled: true
        },

    },


}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
const findColumnList = (size: number) => {
    return new Promise<VxeGridPropTypes.Columns>(resolve => {
        setTimeout(() => {
            const columns: VxeGridPropTypes.Columns = []
            for (let index = 0; index < size; index++) {
                const key = colIndex++
                const config: VxeTableDefines.ColumnOptions = {
                    field: key ? `col_${key}` : 'id',
                    title: key ? `标题_${key}` : 'ID',
                    width: 140,
                    type: null,
                    fixed: null
                }
                if (!key) {
                    config.type = 'checkbox'
                }
                if (key < 2) {
                    config.fixed = 'left'
                }
                columns.push(config)
            }
            resolve(columns)
        }, 250)
    })
}
let colIndex = 0
let rowIndex = 1
const findDataList = (size: number) => {
    return new Promise<any[]>(resolve => {
        setTimeout(() => {
            const list: any[] = []
            for (let index = 0; index < size; index++) {
                const key = rowIndex++
                const item: any = { id: key, checked: false }
                // 由于生成数据比较耗时，所以固定生成1000字段
                Array.from(new Array(1000)).forEach((num, cIndex) => {
                    item[`col_${cIndex}`] = `内容_${cIndex}_${index}`
                })
                list.push(item)
            }
            resolve(list)
        }, 250)
    })
}

const init = async () => {
    let tableColumn: VxeGridPropTypes.Columns = []
    gridOptions.loading = true
    await Promise.all([
        findColumnList(200).then(columns => {
            let $grid = xGrid.value.fitsTablePro
            if ($grid) {
                tableColumn = columns
                $grid.loadColumn(columns)
                $grid = null
            }
        }),
        findDataList(600).then(data => {
            let $grid = xGrid.value.fitsTablePro
            if ($grid) {
                $grid.loadData(data)
                $grid = null
            }
        })
    ])

    let $grid = xGrid.value.fitsTablePro
    gridOptions.loading = false
}

</script>

