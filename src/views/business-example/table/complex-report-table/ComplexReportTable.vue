<template>
    <div class="complex-report-table">
        <fits-table :option="fitsTablePro" ref="xGrid">
            <template #myButtons>
                <el-button-group>
                    <el-button v-for="(item, index) in buttons" :key="item.value" @click="tabChange(index)">
                        {{item.label}}
                    </el-button>
                </el-button-group>
            </template>
        </fits-table>
    </div>

</template>

<script lang='ts' setup>
import { useFitsTablePro } from '@/components/FitsTablePro/FitsTable/FitsTableProHook';
import { FitsTableProps } from '@/components/FitsTablePro/FitsTable/type';
import { VxeGridInstance } from 'vxe-table';

// button切换
const buttons: any = [
    {
        value: '0',
        label: '张铭新',
        data: []
    },
    {
        value: '1',
        label: '张家建业务员',
        data: []
    },
    {
        value: '2',
        label: '李志强业务员',
        data: []
    },
    {
        value: '3',
        label: '说明',
        data: []
    }
]

const gridOptions: FitsTableProps = {
    align: 'center',
    border: 'full',
    columns: [
        { field: 'job', title: '工作岗位', },
        { field: 'price', title: '单价(元/人天)', },
        { field: 'stuff', title: '人员' },
        {
            title: '合计',
            children: [
                { field: 'totalCost', title: '费用' },
                { field: 'totalHour', title: '工时(h)' },
            ]
        },
        {
            title: '软件部工时项目-2022年批次',
            children: [
                {
                    title: 'FITS_PP_20220812_N_001',
                    children: [
                        {
                            title: '总费用：120000', children: [
                                {
                                    title: '售前支持', children: [
                                        { field: 'softwareCost', title: '费用' },
                                        { field: 'softwareHour', title: '工时(h)' },
                                    ]
                                },
                            ]
                        },
                    ]
                },
                {
                    title: '张铭新', children: [
                        {
                            title: '当前合计：120000', children: [
                                {
                                    title: '预建设', children: [
                                        { field: 'pmCost', title: '费用' },
                                        { field: 'pmHour', title: '工时(h)' },
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        },
        {
            title: '小计',
            children: [
                {
                    title: '售前支持',
                    children: [
                        { field: 'presaleCost', title: '费用' },
                        { field: 'presaleHour', title: '工时(h)' },
                    ]
                },
                {
                    title: '预建设', children: [
                        { field: 'prebuildCost', title: '费用' },
                        { field: 'prebuildHour', title: '工时(h)' },
                    ]
                },
            ]
        },
    ],
    data: [],
    toolbarConfig: {
        slots: {
            buttons: 'myButtons'
        },
    },
    formConfig: {
        data: {
        },
        items: [
            {
                field: 'timerange', title: '统计时间', itemRender: {
                    name: 'ElDatePicker',
                    props: {
                        type: "daterange",
                        rangeSeparator: "至"
                    },
                }
            },
            { field: 'projectName', title: '项目名称', itemRender: { name: 'ElInput', props: { clearable: true } } },
            {
                field: 'amiba', span: 3, title: '阿米巴', itemRender: {
                    name: 'ElSelect',
                    props: {
                        clearable: true
                    },
                    options: [
                        {
                            value: '0',
                            label: '民生组',
                        },
                        {
                            value: '1',
                            label: '运维组',
                        },
                        {
                            value: '2',
                            label: '丰德科技',
                        },
                        {
                            value: '3',
                            label: '软件部',
                        },
                        {
                            value: '4',
                            label: '产品组',
                        },
                        {
                            value: '5',
                            label: '工时',
                        },
                    ]
                }
            },
            // { field: 'projectName', slots: { default: 'formDefault' } },

        ]
    },
    emptyText: '456',
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
// 加载表格数据
function init() {
    buttons.forEach((ele: any, index: number) => {
        switch (index) {
            case 0:
                loadData(index, 20)
                break;
            case 1:
                loadData(index, 10)
                break;
            case 2:
                loadData(index, 5)
                break;
        }
    });
}

function loadData(index: number, num: number) {
    for (let i = 0; i < num; i++) {
        buttons[index].data?.push({
            job: 'zjj项目经理',
            price: '700.00',
            stuff: 'zjj项目经理',
            totalCost: '350.00',
            totalHour: '4.00',
            softwareCost: '340000.00',
            softwareHour: '20.00',
            pmCost: '170.00',
            pmHour: '2.00',
            presaleCost: '4000.00',
            presaleHour: '12.00',
            prebuildCost: '8000.00',
            prebuildHour: '10.00'
        })
    }
}

function tabChange(buttonValue: number) {
    fitsTablePro.data = buttons[buttonValue].data
}

onMounted(() => {
    init()
    fitsTablePro.data = buttons[0].data
})

</script>
<style lang='scss' scoped>

</style>

<style lang="scss">

</style>