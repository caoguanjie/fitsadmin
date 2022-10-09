<template>
    <div class="menu-manage">
        <!-- <fits-list-seach :formItem='formItem' /> -->
        <fits-table :option="gridOptions" ref="xGrid">

            <template #operate="{ row }">
                <el-button type="primary">{{row}}</el-button>
                <el-button type="success">Success</el-button>
                <el-button type="info">Info</el-button>
                <el-button type="warning">Warning</el-button>
                <el-button type="danger">Danger</el-button>
            </template>

        </fits-table>
    </div>
</template>

<script lang='ts' setup>
import { FitsFormItemProps } from '@/components/Form/type';
import { FitsTableProps } from '@/components/List/type';
import { VxeGridInstance, VxeGridProps } from 'vxe-table';
// import FitsTable from '@/components/List/FitsTable'
const xGrid = ref<VxeGridInstance>()
const formItem: FitsFormItemProps[] = [

    {
        type: "Input",
        title: '菜单名称',
        field: 'name',
        value: '',
    },
    {
        type: "Input",
        title: '菜单状态',
        field: 'status',
        value: '',
    },
    {
        type: "select",
        title: "产品分类",
        field: 'status',
        value: ["104", "105"],
        options: [
            { "value": "104", "label": "生态蔬菜", "disabled": false },
            { "value": "105", "label": "新鲜水果", "disabled": false },
        ],
        props: {
            multiple: true,
            collapseTags: true,
            collapseTagsTooltip: true,

        },
    },
    {
        type: "select",
        title: "产品分类1",
        field: 'status',
        value: [],
        options: [
            { "value": "104", "label": "生态蔬菜", "disabled": false },
            { "value": "105", "label": "新鲜水果", "disabled": false },
        ],

    },
    {
        type: "DatePicker",
        field: "section_day",
        title: "活动日期",
        value: ['2018-02-20', '2021-02-15'],
        props: {
            type: "datetimerange",
            format: "yyyy-MM-dd HH:mm:ss",
            placeholder: "请选择活动日期",
        }
    },
    {
        type: "TimePicker",
        field: "section_time",
        title: "活动时间",
        value: [],
        props: {
            isRange: true
        },
    },
    {
        type: "cascader",
        title: "所在区域",
        field: "address",
        value: ['陕西省', '西安市', '新城区'],
        props: {
            options: [{
                value: 'beijing',
                label: '北京',
                children: [
                    {
                        value: 'gugong',
                        label: '故宫'
                    },
                    {
                        value: 'tiantan',
                        label: '天坛'
                    },
                    {
                        value: 'wangfujing',
                        label: '王府井'
                    }
                ]
            }, {
                value: 'jiangsu',
                label: '江苏',
                children: [
                    {
                        value: 'nanjing',
                        label: '南京',
                        children: [
                            {
                                value: 'fuzimiao',
                                label: '夫子庙',
                            }
                        ]
                    },
                    {
                        value: 'suzhou',
                        label: '苏州',
                        children: [
                            {
                                value: 'zhuozhengyuan',
                                label: '拙政园',
                            },
                            {
                                value: 'shizilin',
                                label: '狮子林',
                            }
                        ]
                    }
                ]
            }]
        }
    }
]

// console.warn(FitsTable.props)
const gridOptions = reactive<FitsTableProps>({
    // border: true,
    keepSource: true,
    id: 'toolbar_demo_1',
    height: 530,
    autoHeight: true,
    rowConfig: {
        height: 40
    },
    formConfig: {
        data: {
            name: '1',
            nickname: '2',
            sex: '0',
            role: '',
            age: 22,
            val1: [],
            val2: false,
            val3: '',
            flag: false
        },
        items: [
            { field: 'name', span: 3, title: '名称', titlePrefix: { content: '名称', icon: '' }, itemRender: { name: 'input', props: { placeholder: '请输入名称', type: 'password', onFocus: () => console.log(1111) } } },
            { field: 'sex', span: 3, title: '性别', itemRender: { name: '$select', options: [{ value: '0', label: '女' }, { value: '1', label: '男' }], props: { placeholder: '请选择性别' } } },
            { field: 'role', span: 3, title: '角色', itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
            { field: 'age1', span: 3, title: '年龄1', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            { field: 'age2', span: 3, title: '年龄2', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            { field: 'age3', span: 3, title: '年龄3', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            { field: 'age4', span: 3, title: '年龄5', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            { field: 'age5', span: 3, title: '年龄5', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            { field: 'age6', span: 3, title: '年龄6', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            { field: 'flag', span: 3, title: '开关', itemRender: { name: '$switch', props: { openLabel: '是', closeLabel: '否' } } },
        ]
    },
    importConfig: {},
    exportConfig: {},
    columnConfig: {
        // resizable: true [PrevJump, PrevPage, Jump, PageCount, NextPage, NextJump, Sizes, Total]
    },
    pagerConfig: {
        layouts: ['Total', 'Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump'],
        pageSizes: [10, 15, 20, 50, 100],
        background: true,
    },
    columns: [
        { field: 'Checkbox', type: 'checkbox', title: '多选', width: 50 },
        { field: 'Indexes', title: '序号', type: 'seq', width: 160 },
        { field: 'name', title: '姓名', width: 160 },
        { field: 'nickname', title: '昵称', width: 160 },
        { field: 'role', title: '角色', width: 160 },
        { field: 'address', title: '地址', width: 100 },
        { field: 'Operation', title: '操作列', width: 200, slots: { default: 'operate' }, fixed: 'right' }
        // { field: 'Operation', title: '操作列', width: 200, fixed: 'right', contentRender: { name: 'TableOpeate' } }
    ],

    data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
    ],
    toolbarConfig: {
        buttons: [
            { code: 'myadd', name: '新增', status: 'primary', onClick: () => { alert(1) } },
            { code: 'mySave', name: '启用' },
            { code: 'mydisable', name: '禁用' },
            { code: 'myExport', name: '导出' },
            { code: 'remove', name: '批量删除' }
        ],

        // refresh: {
        //     // 刷新
        //     icon: 'vxe-icon-refresh'
        // },
        // zoom: true,
        // export: false,
        // custom: false,
        // tools: [
        //     {
        //         toolRender: {
        //             name: 'ToolbarSearch', events: {
        //                 click: () => {
        //                     console.log('关闭搜索')
        //                 }
        //             }
        //         }
        //     },
        //     { toolRender: { name: 'ToolbarSetting' } },
        //     { toolRender: { name: 'ToolbarRefresh' } },

        //     {
        //         toolRender: {
        //             name: 'ToolbarExport', events: {
        //                 click: () => {

        //                     // xGrid.value?.openExport()
        //                 }
        //             },
        //         }
        //     },
        //     {
        //         toolRender: { name: 'ToolbarFullscreen' }
        //     },
        //     {
        //         toolRender: {
        //             name: 'ToolbarCustomColumn', events: {
        //                 click: () => {
        //                     console.log(111);

        //                 }
        //             },

        //         }
        //     },
        // ],
    },
    customConfig: {
        storage: true,
    },
})


onMounted(() => {
    console.warn(xGrid)

    setTimeout(() => {

        // gridOptions.id = 'test'
        // gridOptions.formConfig = {}
    }, 2000)
})
</script>
<style lang='scss' scoped>
.menu-manage {
    padding: 0 $basePadding;
    background-color: #fff;

}
</style>