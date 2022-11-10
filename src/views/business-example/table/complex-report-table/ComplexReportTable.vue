<template>
    <div class="complex-report-table">
        <!-- @cellMouseenter="cellMouseenter" -->
        <fits-table :option="fitsTablePro" ref="xGrid" @cellMouseenter="cellMouseenter">
            <template #myButtons>
                <el-button-group>
                    <el-button v-for="(item, index) in buttons" :key="item.value" @click="tabChange(index)">
                        {{ item.label }}
                    </el-button>
                </el-button-group>
            </template>
            <template #empty>
                <div class="empty-content">
                    1、本表仅统计未签订预算项目费用<br>
                    2、项目总费用为该项目已投入人力的总费用，含当前月份签单费用<br>
                    3、当期合计为该项目统计时间段内已投入人力的费用合计<br>
                    4、预建设，为项目未登记预算时，除售前支持以外的工作产生的成本（例如：预设计预开发）；<br>
                    项目登记预算后，预建设费用归于项目建设预算。如未登记预算，则所有费用由业务员承担
                </div>
            </template>
        </fits-table>
    </div>
</template>

<script lang='ts' setup>
import { FitsTableProps, FitsTable } from '@/fits-components';
import { useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

let currentCol = ref(0)
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

const tableColumns: any = [
    { field: 'job', title: '工作岗位', align: 'center', headerClassName: `headerClass${0}`, className: `columnClass${0}` },
    { field: 'price', title: '单价(元/人天)', headerClassName: `headerClass${1}`, className: `columnClass${1}` },
    { field: 'stuff', title: '人员', align: 'center', headerClassName: `headerClass${2} `, className: `columnClass${2}` },
    {
        title: '合计',
        children: [
            { field: 'totalCost', title: '费用', headerClassName: `headerClass${3}`, className: `columnClass${3}` },
            { field: 'totalHour', title: '工时(h)', headerClassName: `headerClass${4}`, className: `columnClass${4}` },
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
                                    { field: 'softwareCost', title: '费用', headerClassName: `headerClass${5}`, className: `columnClass${5}` },
                                    { field: 'softwareHour', title: '工时(h)', headerClassName: `headerClass${6}`, className: `columnClass${6}` },
                                ],
                                titlePrefix: {
                                    content: '你好，我是售前支持',
                                    icon: 'vxe-icon-warnion-circle-fill'
                                }
                            },
                        ],
                        titlePrefix: {
                            content: '你好，我是总费用',
                            icon: 'vxe-icon-warnion-circle-fill'
                        }
                    },
                ]
            },
            {
                title: '张铭新', children: [
                    {
                        title: '当前合计：120000', children: [
                            {
                                title: '预建设', children: [
                                    { field: 'pmCost', title: '费用', headerClassName: `headerClass${7}`, className: `columnClass${7}` },
                                    { field: 'pmHour', title: '工时(h)', headerClassName: `headerClass${8}`, className: `columnClass${8}` },
                                ],
                                titlePrefix: {
                                    content: '你好，我是预建设',
                                    icon: 'vxe-icon-warnion-circle-fill'
                                }
                            },
                        ],
                        titlePrefix: {
                            content: '你好，我是当前合计',
                            icon: 'vxe-icon-warnion-circle-fill'
                        }
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
                    { field: 'presaleCost', title: '费用', headerClassName: `headerClass${9}`, className: `columnClass${9}` },
                    { field: 'presaleHour', title: '工时(h)', headerClassName: `headerClass${10}`, className: `columnClass${10}` },
                ]
            },
            {
                title: '预建设', children: [
                    { field: 'prebuildCost', title: '费用', headerClassName: `headerClass${11}`, className: `columnClass${11}` },
                    { field: 'prebuildHour', title: '工时(h)', headerClassName: `headerClass${12}`, className: `columnClass${12}` },
                ]
            },
        ]
    },
]

const gridOptions: FitsTableProps = {
    align: 'right',
    headerAlign: 'center',
    border: 'full',
    columns: tableColumns,
    data: [],
    showFooter: true,
    toolbarConfig: {
        slots: {
            buttons: 'myButtons'
        },
        tools: {
            enabled: true,
        }
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
    footerMethod,
    mergeFooterItems: [
        { row: 0, col: 0, rowspan: 0, colspan: 3 },
    ],
    rowConfig: {
        isHover: true,
    },
    tooltipConfig: {
        enterDelay: 0,
        leaveDelay: 0
    },
    slots: {
        empty: 'empty'
    }
}
const xGrid = ref<VxeGridInstance | any>()
let { fitsTablePro }: any = useFitsTablePro(gridOptions, xGrid)
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
            job: 'zjj项目经理' + index,
            price: num.toFixed(2),
            stuff: 'zjj项目经理' + index,
            totalCost: 350.00,
            totalHour: 4.00,
            softwareCost: 340.00,
            softwareHour: 20.00,
            pmCost: 170.00,
            pmHour: 2.00,
            presaleCost: 40.00,
            presaleHour: 12.00,
            prebuildCost: 800.00,
            prebuildHour: 10.00
        })
    }
}

function tabChange(buttonValue: number) {
    if (buttonValue === 3) {
        fitsTablePro.columns = []
        fitsTablePro.border = 'none'
    } else {
        fitsTablePro.columns = tableColumns
        fitsTablePro.border = 'full'
    }
    fitsTablePro.data = buttons[buttonValue].data
}

function footerMethod({ data }: any) {
    let totalCostSum = 0
    let totalHourSum = 0
    let softwareCostSum = 0
    let softwareHourSum = 0
    let pmCostSum = 0
    let pmHourSum = 0
    let presaleCostSum = 0
    let presaleHourSum = 0
    let prebuildCostSum = 0
    let prebuildHourSum = 0
    data.map((item: any) => {
        totalCostSum += item.totalCost
        totalHourSum += item.totalHour
        softwareCostSum += item.softwareCost
        softwareHourSum += item.softwareHour
        pmCostSum += item.pmCost
        pmHourSum += item.pmHour
        presaleCostSum += item.presaleCost
        presaleHourSum += item.presaleHour
        prebuildCostSum += item.prebuildCost
        prebuildHourSum += item.prebuildHour
    })
    return [
        ['合计', 0, 0, totalCostSum, totalHourSum, softwareCostSum, softwareHourSum, pmCostSum, pmHourSum, presaleCostSum, presaleHourSum, prebuildCostSum, prebuildHourSum]
    ]
}

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

onMounted(() => {
    init()
    fitsTablePro.data = buttons[0].data
})

onBeforeUnmount(() => {
    document.removeEventListener('mouseenter', onMouseOver, true)
})
onDeactivated(() => {
    document.removeEventListener('mouseenter', onMouseOver, true)
})
//判断点击是否在弹窗内
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

</script>
<style lang='scss' scoped>
.complex-report-table {
    padding: 0 16px;
    background-color: #fff;

    .empty-content {
        font-size: 16px;
        white-space: pre-line;
        text-align: left;
        line-height: 30px;
    }

    :deep(.vxe-table--empty-content) {
        width: 100%;
    }

    :deep(.iscurrentCol) {
        background: #f5f7fa;
    }
}
</style>

<style lang="scss">

</style>