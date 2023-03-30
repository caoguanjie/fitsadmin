<template>
    <div class="comprehensive-table" id="cal-container">
        <fits-table :option="fitsTablePro" ref="xGrid" @cell-click="cellClick" />
        <!-- 隐藏按钮，用于虚拟触发popper提示框 -->
        <el-button ref="buttonRef" style="display:none">Click me</el-button>

        <el-popover :virtual-ref="buttonRef" :visible="isVisible" :show-arrow="false" :popper-options="popperOptions"
            popper-class="popContent" virtual-triggering>
            <el-descriptions :column="2" size="small" id="dialogBox">
                <el-descriptions-item label="项目">三水农庄设施运维</el-descriptions-item>
                <el-descriptions-item label="服务">佛山中小型场地集成服务</el-descriptions-item>
                <el-descriptions-item label="工单历时">390天23小时50分钟</el-descriptions-item>
                <el-descriptions-item label="服务时长">3小时1分钟</el-descriptions-item>
                <el-descriptions-item label="响应SLA">未超时</el-descriptions-item>
            </el-descriptions>
        </el-popover>
    </div>
</template>

<script lang='ts' setup>
import { FitsTable } from '@/fits-components';
import { FitsTableProps, FitsTreeSelectModel, useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';
import { Folder, Document } from '@element-plus/icons-vue'

const xGrid = ref<VxeGridInstance | any>()

const buttonRef = ref()

const state = reactive({
    isVisible: false,
    popperOptions: {},
})
const { isVisible, popperOptions }: any = toRefs(state);


// 自定义节点内容
const renderContent = (
    h: any,
    {
        node,
        data,
        store,
    }: any
) => {
    return h(
        'div',
        {
            style: 'display: flex;align-items: center'
        },
        [
            h(node.isLeaf ? Document : Folder,
                {
                    style: 'height:16px;width: 16px;margin-right: 4px;'
                }
            ),
            h('span', node.label)
        ]
    )
}

// 报障部门数据源
const assureDepartOptions = new FitsTreeSelectModel({
    tree: {
        nodeKey: "id",
        data: [
            {
                id: '1',
                label: '组织机构',
                children: [
                    {
                        id: '2',
                        label: '客户',
                        children: [
                            {
                                id: '2-1',
                                label: '综合组',
                            },
                            {
                                id: '2-2',
                                label: '综合组AA',
                            },
                        ]
                    },
                    {
                        id: '3',
                        label: '供应商',
                        children: [
                            {
                                id: '3-1',
                                label: '综合组',
                            },
                        ]
                    },
                    {
                        id: '4',
                        label: '运维商',
                        children: [
                            {
                                id: '4-1',
                                label: '综合组',
                            },
                            {
                                id: '4-2',
                                label: '综合组AA',
                            },
                            {
                                id: '4-3',
                                label: '综合组AA',
                            },
                        ]
                    },
                    {
                        id: '5',
                        label: '检测机构',
                    },
                ],
            },
        ],
        showCheckbox: true,
        checkOnClickNode: true,
        renderContent
    },
    select: {
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true,
        clearable: true,
        fitInputWidth: false
    }
})
// 故障类别数据源
const assureTypeOptions = new FitsTreeSelectModel({
    tree: {
        nodeKey: "id",
        data: [
            {
                id: '1',
                label: '工单故障类别',
                children: [
                    {
                        id: '2',
                        label: '硬件更换',
                        children: [
                            {
                                id: '2-1',
                                label: '硬盘更换',
                            },
                            {
                                id: '2-2',
                                label: '内存更换',
                            },
                        ]
                    },
                    {
                        id: '3',
                        label: '故障',
                        children: [
                            {
                                id: '3-1',
                                label: '数据下载',
                            },
                        ]
                    },
                    {
                        id: '4',
                        label: '需求',
                        children: [
                            {
                                id: '4-1',
                                label: '提问系统',
                            },
                            {
                                id: '4-2',
                                label: '提问系统AA',
                            },
                            {
                                id: '4-3',
                                label: '提问系统AA',
                            },
                        ]
                    },
                    {
                        id: '5',
                        label: '定型业务',
                    },
                ],
            },
        ],
        showCheckbox: true,
        checkOnClickNode: true,
        renderContent
    },
    select: {
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true,
        clearable: true,
        fitInputWidth: false
    }
})
// 快捷时间配置
const shortcuts = [
    {
        text: '今天',
        value: () => [moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
    },
]
//  90 + 16
const gridOptions: FitsTableProps = {
    keepSource: true,
    // height: 700,
    // maxHeight: '100%',
    rowConfig: {
        height: 40,
        isHover: true,
        useKey: true,
    },
    formConfig: {
        data: {
            status: ['2'],
            number: '1'
        },
        items: [
            {
                field: 'status', span: 3, title: '工单状态', itemRender: {
                    name: 'ElSelect',
                    props: {
                        multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true
                    },
                    options: [
                        {
                            value: '2',
                            label: '新建',
                        },
                        {
                            value: '3',
                            label: '处理中',
                        },
                        {
                            value: '4',
                            label: '挂起',
                        },
                        {
                            value: '5',
                            label: '已关闭',
                        },
                    ]
                }
            },
            { field: 'number', span: 3, title: '编号/标题', itemRender: { name: 'ElInput', props: { clearable: true } } },
            {
                field: 'group', span: 3, title: '工作组', itemRender: {
                    name: 'ElSelect',
                    props: {
                        multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true
                    },
                    options: [
                        {
                            value: '2',
                            label: '工作A组',
                        },
                        {
                            value: '3',
                            label: '工作B组',
                        },
                        {
                            value: '4',
                            label: '工作C组',
                        },
                        {
                            value: '5',
                            label: '工作D组',
                        },
                    ]
                }
            },
            {
                field: 'engineer', span: 3, title: '工程师', itemRender: {
                    name: 'ElSelect',
                    props: {
                        multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true
                    },
                    options: [
                        {
                            value: '2',
                            label: '唐坤宇',
                        },
                        {
                            value: '3',
                            label: '谭坤与',
                        },
                        {
                            value: '4',
                            label: '唐昆禹',
                        },
                        {
                            value: '5',
                            label: '谭坤语',
                        },
                    ]
                }
            },
            { field: 'type', span: 3, title: '工单类型', itemRender: { name: 'ElSelect', props: { clearable: true }, options: [{ value: '0', label: '事件工单' }, { value: '1', label: '服务工单' }, { value: '3', label: '售后工单' }] } },
            { field: 'overtimeStatus', span: 3, title: '超时状态', itemRender: { name: 'ElSelect', props: { clearable: true }, options: [{ value: '0', label: '全部' }, { value: '1', label: '未超时' }, { value: '3', label: '全部解决' }, { value: '4', label: '全部关闭' }, { value: '5', label: '全部超时' }, { value: '6', label: '全部解决' }] } },
            {
                field: 'project', span: 3, title: '所属项目', itemRender: {
                    name: 'ElSelect',
                    props: {
                        multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true
                    },
                    options: [
                        {
                            value: '2',
                            label: '佛山水池集成项目',
                        },
                        {
                            value: '3',
                            label: '北京水池集成项目',
                        },
                        {
                            value: '4',
                            label: '广州水池集成项目',
                        },
                        {
                            value: '5',
                            label: '上海水池集成项目',
                        },
                    ]
                }
            },
            { field: 'assetInfo', span: 3, title: '资产信息', itemRender: { name: 'ElInput', props: { clearable: true } } },
            { field: 'requestMan', span: 3, title: '请求人', itemRender: { name: 'ElInput', props: { clearable: true } } },
            { field: 'assureDepartment', span: 3, title: '报障部门', itemRender: { name: 'FitsTreeSelect', props: { options: assureDepartOptions } } },
            { field: 'requestTime', span: 3, title: '请求时间', itemRender: { name: 'ElDatePicker', props: { type: 'datetimerange', format: 'YYYY-MM-DD HH:mm', shortcuts } } },
            { field: 'resolveTime', span: 3, title: '解决时间', itemRender: { name: 'ElDatePicker', props: { type: 'datetimerange', format: 'YYYY-MM-DD HH:mm', shortcuts } } },
            { field: 'assureType', span: 3, title: '故障类别', itemRender: { name: 'FitsTreeSelect', props: { options: assureTypeOptions } } },
            { field: 'responseMan', span: 3, title: '响应人', itemRender: { name: 'ElInput', props: { clearable: true } } },
            {
                field: 'assureMethod', span: 3, title: '报障方式', itemRender: {
                    name: 'ElSelect',
                    props: {
                        multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true
                    },
                    options: [
                        {
                            value: '2',
                            label: '现场',
                        },
                        {
                            value: '3',
                            label: '电话',
                        },
                        {
                            value: '4',
                            label: '邮件',
                        },
                        {
                            value: '5',
                            label: '其他',
                        },
                    ]
                }
            },
        ]
    },
    importConfig: {},
    exportConfig: {},
    columnConfig: {},
    pagerConfig: {
        layouts: ['Total', 'Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump'],
        pageSizes: [10, 15, 20, 50, 100],
        background: true,
    },
    columns: [
        {
            field: 'orderId', title: '工单编号', sortable: true, slots: {
                'default': (params) => h(
                    'div',
                    {
                        style: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100%;'
                    },
                    [
                        h('span',
                            { style: 'background: red; color: #fff; border-radius: 4px; font-weight: bold;  padding: 0 2px; margin-right: 2px;' },
                            'O'
                        ),
                        h('span', params.row.orderId)
                    ]
                )
            },
        },
        { field: 'requestDepartment', title: '请求部门', },
        { field: 'workGroup', title: '工作组', },
        { field: 'requestTime', title: '请求时间', sortable: true },
        { field: 'assureType', title: '故障类别', sortable: true },
        { field: 'resolveTime', title: '解决时间', sortable: true },
        { field: 'priority', title: '优先级', sortable: true, width: 80 },
        { field: 'orderType', title: '工单类型' },
        { field: 'responseMan', title: '响应人' },
        { field: 'requestMan', title: '请求人' },
        { field: 'engineer', title: '工程师' },
        { field: 'responseTime', title: '响应时间', sortable: true },
        { field: 'updateTime', title: '最后更新时间', sortable: true },
        { field: 'status', title: '状态', sortable: true, width: 80 },
    ],
    data: [
        { orderId: 'SQ123456789', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-08 17:55', assureType: '硬件更换-硬盘更换', resolveTime: '2022-10-08 17:55', priority: '高', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '新建' },
        { orderId: 'SQ123456788', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-07 10:21', assureType: '网络连接失败', resolveTime: '2022-10-08 17:55', priority: '低', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '失败解决' },
        { orderId: 'SQ123456787', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-08 09:56', assureType: '硬件更换-硬盘更换', resolveTime: '2022-10-08 17:55', priority: '高', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '新建' },
        { orderId: 'SQ123456786', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-06 14:12', assureType: '网络连接失败', resolveTime: '2022-10-08 17:55', priority: '低', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '已关闭' },
        { orderId: 'SQ123456789', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-08 17:55', assureType: '硬件更换-硬盘更换', resolveTime: '2022-10-08 17:55', priority: '高', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '新建' },
        { orderId: 'SQ123456788', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-07 10:21', assureType: '网络连接失败', resolveTime: '2022-10-08 17:55', priority: '低', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '失败解决' },
        { orderId: 'SQ123456787', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-08 09:56', assureType: '硬件更换-硬盘更换', resolveTime: '2022-10-08 17:55', priority: '高', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '新建' },
        { orderId: 'SQ123456786', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-06 14:12', assureType: '网络连接失败', resolveTime: '2022-10-08 17:55', priority: '低', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '已关闭' },
        { orderId: 'SQ123456789', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-08 17:55', assureType: '硬件更换-硬盘更换', resolveTime: '2022-10-08 17:55', priority: '高', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '新建' },
        { orderId: 'SQ123456788', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-07 10:21', assureType: '网络连接失败', resolveTime: '2022-10-08 17:55', priority: '低', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '失败解决' },
        { orderId: 'SQ123456787', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-08 09:56', assureType: '硬件更换-硬盘更换', resolveTime: '2022-10-08 17:55', priority: '高', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '新建' },
        { orderId: 'SQ123456786', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-06 14:12', assureType: '网络连接失败', resolveTime: '2022-10-08 17:55', priority: '低', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '已关闭' },
        { orderId: 'SQ123456789', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-08 17:55', assureType: '硬件更换-硬盘更换', resolveTime: '2022-10-08 17:55', priority: '高', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '新建' },
        { orderId: 'SQ123456788', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-07 10:21', assureType: '网络连接失败', resolveTime: '2022-10-08 17:55', priority: '低', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '失败解决' },
        { orderId: 'SQ123456787', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-08 09:56', assureType: '硬件更换-硬盘更换', resolveTime: '2022-10-08 17:55', priority: '高', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '新建' },
        { orderId: 'SQ123456786', requestDepartment: '技术部', workGroup: '工作B组', requestTime: '2022-10-06 14:12', assureType: '网络连接失败', resolveTime: '2022-10-08 17:55', priority: '低', orderType: '售前工单', responseMan: 'tky项目负责人', requestMan: 'tky服务台', engineer: 'tky工程师', responseTime: '2022-10-08 18:55', updateTime: '2022-10-08 18:55', status: '已关闭' },
    ],
    toolbarConfig: {
        buttons: [
            { code: 'search', name: '查找', icon: 'vxe-icon-search', status: 'primary' },
            { code: 'save', icon: 'vxe-icon-save', name: '保存' },
            { code: 'reset', icon: 'vxe-icon-refresh', name: '重置' },
            { code: 'addOrder', icon: 'vxe-icon-add', name: '发起工单' },
            { code: 'exportOrder', name: '导出工单记录' },
            { code: 'exportHour', name: '导出工时数据' },
            { code: 'exportAssess', name: '导出考核报表' },
        ],
    },
    customConfig: {
        storage: true,
    },
    tooltipConfig: {},
    showOverflow: "tooltip",
    align: 'center',
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
const cellClick = ((e: any) => {
    document.addEventListener('click', onClick, true)
    isVisible.value = true
    // 点击单元格的位置
    let eventPosition = e.cell.getBoundingClientRect()
    // 点击事件的横坐标
    let x = e.$event.clientX
    // 点击单元格的底部
    let y = eventPosition.bottom
    // 悬浮框的高度
    nextTick(() => {
        const popHeight = document.querySelector('.popContent')?.getBoundingClientRect().height || 0
        // popHeight为悬浮框的高度
        if (y + popHeight > document.body.clientHeight) {
            y = document.body.clientHeight - popHeight
        }
        popperOptions.value = {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [x, y],
                    }
                }
            ]
        }
    })
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onClick, true)
})
onDeactivated(() => {
    document.removeEventListener('click', onClick, true)
})
//判断点击是否在弹窗内
const onClick = (e: any) => {
    if (!e.target.closest(".popContent")) {
        //点击非当前元素，需要执行的代码
        isVisible.value = false
        document.removeEventListener('click', onClick, true)
    }
}

</script>
<style lang='scss' scoped>
.comprehensive-table {
    padding: 0 $basePadding;
    background-color: #fff;
}
</style>

<style lang="scss">
.popContent {
    width: auto !important;
}
</style>