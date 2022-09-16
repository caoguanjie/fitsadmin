<template>
    <div class="menu-manage">
        <fits-list-seach :formItem='formItem' />
    </div>
</template>

<script lang='ts' setup>
import { FitsFormItemProps } from '@/components/Form/type';


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

</script>
<style lang='scss' scoped>
.menu-manage {
    background-color: #fff;
}
</style>