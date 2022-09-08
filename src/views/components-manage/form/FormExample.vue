<template>
    <div class="form-example">

        <div class="exampleBox">
            <h1>
                普通表单
            </h1>
            <fits-form-create :form="simpleForm" />
        </div>

        <div class="exampleBox inlineBox">
            <h1>
                行内表单
            </h1>
            <fits-form-create :form="inlineForm" />
        </div>

        <div class="exampleBox dynamicBox">
            <h1>
                动态增删表单项
            </h1>
            <el-button-group style="margin:20px 30px">
                <el-button @click="prependRule">
                    在头部追加规则
                </el-button>
                <el-button @click="appendRule">
                    在尾部追加规则
                </el-button>
                <el-button @click="spliceRule">
                    删除第一条规则
                </el-button>
                <el-button @click="spliceSpecifyRule">
                    删除指定规则
                </el-button>
            </el-button-group>
            <fits-form-create :form="dynamicForm" ref="dynamicRef" />
        </div>

        <div class="exampleBox">
            <h1>
                自定义组件
            </h1>
            <fits-form-create :form="customForm" />
        </div>

        <div class="exampleBox">
            <h1>
                组件插槽
            </h1>
            <fits-form-create :form="slotForm" />
        </div>

        <div class="exampleBox dialogBox">
            <h1>
                弹窗表单
            </h1>
            <el-button @click="dialogOpt.visible = true">
                打开表单弹窗
            </el-button>
            <form-type :option="dialogOpt" @submit="submitDialogForm" @cancle="closeForm" ref="formtypeRef" />
        </div>

        <form-type :option="spliceOpt" @submit="submitSpliceForm" @cancle="closeForm" />
    </div>
</template>

<script setup lang="ts">
import { reactive, markRaw, ref, watch } from 'vue';
import FitsTreeSelect from '@/components/Form/FitsTreeSelect.vue'
import FitsIconSelect from '@/components/Form/FitsIconSelect.vue'
import FormType from '@/components/Common/FormType.vue'
import { isEmail, isHomeNumber, isPhoneNumber, isShortNumber } from '@/utils/is';
import { Search } from '@element-plus/icons-vue'
import FitsModuleName from '@/components/Form/FitsModuleName.vue'
import FitsCheckboxAll from '@/components/Form/FitsCheckboxAll.vue'
import { ElMessage } from 'element-plus';
import { FitsCheckboxAllModel, FitsIconSelectModel, FitsTreeSelectModel } from '@/components/Form/model';
import FitsFormCreate from '@/components/Common/FitsFormCreate.vue'
import { FitsFormCreateModel } from '@/components/Common/model'
import useStore from '@/store';

const { setting } = useStore();

let num = 0
const dynamicRef = ref()
const formtypeRef = ref()

const colNum = setting.formType === 'dialog' ? ref(2) : ref()

const dialogOpt = reactive({
    visible: false,
    forms: [
        {
            title: '用户信息',
            iconClass: 'user',
            form: new FitsFormCreateModel({
                rule: [
                    {
                        field: "iconSelect",
                        title: "图标选择",
                        component: markRaw(FitsIconSelect),
                        // value: ['edit', 'client'],
                        props: {
                            options: new FitsIconSelectModel({
                                select: {
                                    class: "mySelect",
                                    placeholder: "请选择图标",
                                    multiple: true
                                },
                                input: {
                                    element: {
                                        placeholder: "图标搜索",
                                    },
                                },
                            })
                        },
                        validate: [
                            { required: true, message: "请选择图标", trigger: 'change' }
                        ],
                    },
                    {
                        type: "input",
                        field: "UserName",
                        title: "用户名称",
                        props: {
                            placeholder: "请输入用户名称",
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入用户名称" }
                        ],
                    },
                    {
                        type: "input",
                        field: "UserAccount",
                        title: "用户账号",
                        props: {
                            placeholder: "请输入用户账号",
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入用户账号" }
                        ],
                    },
                    {
                        type: "input",
                        field: "phone",
                        title: "手机号码",
                        props: {
                            placeholder: "请输入手机号码"
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入手机号码" },
                            {
                                validator: (rule: any, val: any) => {
                                    return isPhoneNumber(val)
                                },
                                message: "请输入正确的手机号"
                            }
                        ],
                    },
                    {
                        type: "input",
                        field: "oldPwd",
                        title: "初始密码",
                        props: {
                            type: 'password',
                            placeholder: "请输入原始密码"
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入原始密码" }
                        ],
                    },
                    {
                        type: "input",
                        field: "telephone",
                        title: "电话",
                        props: {
                            placeholder: "请输入电话"
                        },
                        validate: [
                            {
                                validator: (rule: any, val: any) => {
                                    return val ? isPhoneNumber(val) : true
                                },
                                message: "请输入正确的电话"
                            }
                        ]
                    },
                    {
                        type: "datePicker",
                        field: "birthday",
                        title: "生日",
                        props: {
                            placeholder: "请选择日期"
                        },
                    },
                    {
                        type: "input",
                        field: "email",
                        title: "电子邮件",
                        props: {
                            placeholder: "请输入电子邮箱"
                        },
                        validate: [
                            {
                                validator: (rule: any, val: any) => {
                                    return val ? isEmail(val) : true
                                },
                                message: "请输入正确的电子邮件"
                            }
                        ],
                    },
                    {
                        type: "radio",
                        field: "sex",
                        title: "性别",
                        options: [
                            {
                                value: "1",
                                label: "男"
                            },
                            {
                                value: "2",
                                label: "女"
                            },
                            {
                                label: "未知",
                                value: "0"
                            }
                        ]
                    },
                    {
                        type: "input",
                        field: "shortNum",
                        title: "短号",
                        props: {
                            placeholder: "请输入短号"
                        },
                        validate: [
                            {
                                validator: (rule: any, val: any) => {
                                    return val ? isShortNumber(val) : true
                                },
                                message: "请输入正确的短号"
                            }
                        ],
                    },
                    {
                        type: "radio",
                        field: "status",
                        title: "状态",
                        options: [
                            {
                                value: "1",
                                label: "启用"
                            },
                            {
                                value: "2",
                                label: "禁用"
                            }
                        ]
                    },
                ],
                option: {
                    form: {
                        labelPosition: 'right',
                        // inline: true,
                    },
                    submitBtn: {
                        show: false,
                    },
                    resetBtn: {
                        show: false,
                    },
                },
                col: colNum.value
            }),
        },
        {
            title: '组织关系',
            iconClass: 'fits-system',
            form: new FitsFormCreateModel({
                rule: [
                    {
                        field: "Department11",
                        title: "所属部门",
                        component: markRaw(FitsTreeSelect),
                        // value: '9',
                        props: {
                            options: new FitsTreeSelectModel({
                                select: {
                                    placeholder: "请选择组织机构",
                                    clearable: true
                                },
                                input: {
                                    element: {
                                        placeholder: "部门搜索",
                                    },
                                },
                                tree: {
                                    class: "myTree",
                                    nodeKey: "id",
                                    defaultExpandAll: false,
                                    data: [
                                        {
                                            id: '1',
                                            label: 'Level 1',
                                            children: [
                                                {
                                                    id: '4',
                                                    label: 'Level 1-1',
                                                    children: [
                                                        {
                                                            id: '9',
                                                            label: 'Level 1-1-1'
                                                        },
                                                        {
                                                            id: '11',
                                                            label: '我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            id: '21',
                                            label: 'Level 2',
                                            children: [
                                                {
                                                    id: '5',
                                                    label: 'Level 2-1',
                                                    children: [
                                                        {
                                                            id: '91',
                                                            label: 'Level 2-1-1',
                                                        },
                                                        {
                                                            id: '111',
                                                            label: 'Level 2-2-2',
                                                        },
                                                    ],
                                                },
                                                {
                                                    id: '6',
                                                    label: 'Level 2-2',
                                                },
                                            ],
                                        },
                                        {
                                            id: '3',
                                            label: 'Level 3',
                                            children: [
                                                {
                                                    id: '7',
                                                    label: 'Level 3-1',
                                                },
                                                {
                                                    id: '8',
                                                    label: 'Level 3-2',
                                                    children: [
                                                        {
                                                            id: '92',
                                                            label: 'Level 3-2-1',
                                                        },
                                                        {
                                                            id: '120',
                                                            label: 'Level 3-2-2',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                }
                            })
                        },
                        validate: [
                            { required: true, message: "请选择", trigger: 'change' }
                        ],
                    },
                    {
                        type: "datePicker",
                        field: "onJobDate",
                        title: "入职日期",
                        props: {
                            placeholder: "请选择入职日期"
                        },
                        validate: [
                            { required: true, type: 'string', message: "请选择入职日期" }
                        ]
                    },
                    {
                        type: "input",
                        field: "office",
                        title: "办公室",
                        props: {
                            placeholder: "请输入办公室"
                        },
                    },
                    {
                        type: "input",
                        field: "officenumber",
                        title: "办公号码",
                        props: {
                            placeholder: "请输入办公号码"
                        },
                        validate: [
                            {
                                validator: (rule: any, val: any) => {
                                    return val ? isHomeNumber(val) || isPhoneNumber(val) : true
                                },
                                message: "请输入正确的手机号或固话"
                            }
                        ]
                    },
                    {
                        type: "datePicker",
                        field: "offJobDate",
                        title: "离职日期",
                        props: {
                            placeholder: "请选择离职日期"
                        }
                    },
                    {
                        type: "select",
                        field: "UserTag",
                        title: "用户标签",
                        props: {
                            filterable: true,
                            placeholder: "请选择用户标签",
                        },
                        options: [
                            {
                                value: "1",
                                label: "选项1"
                            },
                            {
                                value: "2",
                                label: "选项2"
                            }
                        ],
                    },
                ],
                option: {
                    form: {
                        labelPosition: 'right'
                    },
                    submitBtn: {
                        show: false,
                    },
                    resetBtn: {
                        show: false,
                    },
                },
                col: colNum.value
            }),
        }
    ],
    myProp: {
        title: '新增用户',
        width: '60%'
    }
})

const spliceOpt = reactive({
    visible: false,
    forms: [
        {
            title: '编辑指定规则',
            iconClass: 'edit',
            form: new FitsFormCreateModel({
                rule: [
                    {
                        type: "input",
                        field: "fieldName",
                        title: "规则字段",
                        props: {
                            placeholder: "请输入规则字段",
                        },
                        validate: [
                            { required: true, type: 'string', message: "请输入规则字段" }
                        ],
                    }
                ],
                option: {
                    submitBtn: {
                        show: false
                    },
                    resetBtn: {
                        show: false
                    }
                },
            })
        },
    ],
    myProp: {
        title: '删除字段',
        width: '30%'
    }
})

const simpleForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                component: markRaw(FitsModuleName),
                field: "divider",
                value: '输入控件'
            },
            {
                type: "input",
                title: "输入框",
                field: "input11",
                value: "iphone 7",
                props: {
                    prefixIcon: markRaw(Search)
                },
                validate: [
                    { required: true, message: '请输入goods_name', trigger: 'change' },
                ]
            },
            {
                type: "input",
                title: "多行文本",
                field: "textarea",
                value: "我是iphone 7",
                props: {
                    type: "textarea",
                    placeholder: "请输入商品名称",
                    rows: 5,
                    autosize: { minRows: 2, maxRows: 5 }
                }
            },
            {
                component: markRaw(FitsModuleName),
                field: "divider",
                value: '选择控件'
            },
            {
                type: "select",
                title: "下拉选择控件",
                field: "select",
                props: {
                    clearable: true
                },
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: true
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ],
                validate: [
                    { required: true, message: '请选择', trigger: 'change' },
                ]
            },
            // {
            //     type: "select",
            //     title: "下拉选择控件（自定义、分组）",
            //     field: "select",
            //     props: {
            //         clearable: true,
            //     },
            //     options: [
            //         {
            //             value: "104",
            //             label: "生态蔬菜",
            //             disabled: false
            //         },
            //         {
            //             value: "105",
            //             label: "新鲜水果",
            //             disabled: true
            //         },
            //         {
            //             value: "106",
            //             label: "蛋糕甜点",
            //             disabled: false
            //         },
            //     ]
            // },
            {
                type: "select",
                title: "下拉选择控件（筛选、可创建条目）",
                field: "select3",
                props: {
                    filterable: true,
                    allowCreate: true,
                    multiple: true
                },
                value: ['104', '105'],
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: false
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    }
                ]
            },
            {
                type: "radio",
                title: "单选",
                field: "radio1",
                value: '106',
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: true
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                    {
                        value: "107",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "108",
                        label: "农产鸡蛋",
                        disabled: false
                    }
                ]
            },
            {
                type: "radio",
                title: "单选（按钮组）",
                field: "radio2",
                props: {
                    type: 'button'
                },
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: false
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ]
            },
            {
                component: markRaw(FitsModuleName),
                field: "divider",
                value: '开关控件'
            },
            {
                type: "switch",
                title: "开关",
                field: "switch",
            },
            {
                type: "switch",
                title: "开关",
                field: "switch",
                props: {
                    inactiveColor: '#000',
                    activeColor: 'pink',
                    size: "large",
                    inlinePrompt: true,
                    activeText: '开',
                    inactiveText: '关'
                },
                on: {
                    change: (val: any) => {
                        alert(val)
                    }
                }
            },
            {
                component: markRaw(FitsModuleName),
                field: "divider",
                value: '日期、时间控件'
            },
            {
                type: "DatePicker",
                title: "日期选择",
                field: "DatePicker1",
                validate: [
                    { required: true, message: '请选择', trigger: 'change' },
                ]
            },
            {
                type: "DatePicker",
                title: "日期选择（带快捷选项）",
                field: "DatePicker2",
                props: {
                    shortcuts: [
                        {
                            text: 'Today',
                            value: new Date(),
                        },
                        {
                            text: 'Yesterday',
                            value: () => {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24)
                                return date
                            },
                        },
                        {
                            text: 'A week ago',
                            value: () => {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                                return date
                            },
                        },
                    ]
                },
            },
            {
                type: "DatePicker",
                title: "日期选择（日期范围）",
                field: "DatePicker3",
                value: ['2022-12-15', '2023-02-02'],
                props: {
                    type: "daterange",
                    rangeSeparator: "至",
                    startPlaceholder: "开始日期",
                    endPlaceholder: "结束日期",
                    unlinkPanels: true
                },
            },
            {
                type: "DatePicker",
                title: "日期选择（月范围）",
                field: "DatePicker4",
                props: {
                    type: "monthrange",
                    rangeSeparator: "至",
                    startPlaceholder: "开始月份",
                    endPlaceholder: "结束月份",
                    unlinkPanels: true
                },
            },
            {
                type: "DatePicker",
                title: "日期时间选择",
                field: "DatePicker4",
                value: ['2022-12-15 23:21:54', '2023-02-17 23:21:54'],
                props: {
                    type: "datetimerange",
                },
            },
            {
                component: markRaw(FitsModuleName),
                field: "divider",
                value: '复选框控件'
            },
            {
                type: "checkbox",
                title: "多选",
                field: "checkbox1",
                value: ['104'],
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: true
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ]
            },
            {
                type: "checkboxAll",
                component: markRaw(FitsCheckboxAll),
                title: "多选(全选)",
                field: "checkbox2",
                value: ['生态蔬菜1'],
                props: {
                    options: new FitsCheckboxAllModel({
                        option: [
                            {
                                label: "生态蔬菜1",
                            },
                            {
                                label: "新鲜水果1",
                            },
                            {
                                label: "蛋糕甜点1",
                            }
                        ],
                    })
                },
            },
        ],
        option: {
            onSubmit: (formData: any) => {
                alert(JSON.stringify(formData))
            },
        },
    })
)

const inlineForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "input",
                title: "输入框",
                field: "input",
                value: "iphone 7",
                props: {
                    prefixIcon: markRaw(Search)
                },
                validate: [
                    { required: true, message: '请输入', trigger: 'change' },
                ]
            },
            {
                type: "input",
                title: "多行文本",
                field: "textarea",
                value: "iphone 7",
                props: {
                    type: "textarea",
                    placeholder: "请输入商品名称",
                    rows: 5,
                    autosize: { minRows: 2, maxRows: 5 }
                }
            },
            {
                type: "select",
                title: "下拉选择",
                field: "select",
                props: {
                    clearable: true
                },
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: true
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ]
            },
            {
                type: "radio",
                title: "单选",
                field: "radio2",
                props: {
                    type: 'button'
                },
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: false
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ]
            },
            {
                type: "checkbox",
                title: "多选",
                field: "checkbox2",
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                        disabled: false
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                        disabled: false
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                        disabled: false
                    },
                ]
            },
        ],
        option: {
            form: {
                labelPosition: "right",
                inline: true
            },
            onSubmit: (formData: any) => {
                alert(JSON.stringify(formData))
            },
        },
    })
)

const dynamicForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "input",
                title: "输入框",
                field: "input",
                value: "iphone 7",
                props: {
                    prefixIcon: markRaw(Search)
                },
                validate: [
                    { required: true, message: '请输入goods_name', trigger: 'blur' },
                ],
            },
            {
                type: "input",
                title: "文本",
                field: "textarea",
                props: {
                    placeholder: "请输入商品名称",
                }
            },
        ],
        option: {
            form: {
                labelPosition: 'right'
            },
            global: {
                //设置所有组件
                '*': {
                    col: {
                        span: 12,
                    }
                }
            }
        },
    })
)

const customForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                field: "treeSearch",
                title: "下拉选择树(单选)",
                component: markRaw(FitsTreeSelect),
                value: '9',
                props: {
                    options: new FitsTreeSelectModel({
                        select: {
                            placeholder: "请选择组织机构",
                            clearable: true
                        },
                        input: {
                            element: {
                                placeholder: "部门搜索",
                            },
                        },
                        tree: {
                            class: "myTree",
                            nodeKey: "id",
                            defaultExpandAll: false,
                            data: [
                                {
                                    id: '1',
                                    label: 'Level 1',
                                    children: [
                                        {
                                            id: '4',
                                            label: 'Level 1-1',
                                            children: [
                                                {
                                                    id: '9',
                                                    label: 'Level 1-1-1'
                                                },
                                                {
                                                    id: '11',
                                                    label: '我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    id: '21',
                                    label: 'Level 2',
                                    children: [
                                        {
                                            id: '5',
                                            label: 'Level 2-1',
                                            children: [
                                                {
                                                    id: '91',
                                                    label: 'Level 2-1-1',
                                                },
                                                {
                                                    id: '111',
                                                    label: 'Level 2-2-2',
                                                },
                                            ],
                                        },
                                        {
                                            id: '6',
                                            label: 'Level 2-2',
                                        },
                                    ],
                                },
                                {
                                    id: '3',
                                    label: 'Level 3',
                                    children: [
                                        {
                                            id: '7',
                                            label: 'Level 3-1',
                                        },
                                        {
                                            id: '8',
                                            label: 'Level 3-2',
                                            children: [
                                                {
                                                    id: '92',
                                                    label: 'Level 3-2-1',
                                                },
                                                {
                                                    id: '120',
                                                    label: 'Level 3-2-2',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        }
                    })
                },
                validate: [
                    { required: true, message: "请选择", trigger: 'change' }
                ],
            },
            {
                field: "treeSearchMultiple",
                title: "下拉选择树(多选)",
                component: markRaw(FitsTreeSelect),
                value: ['9', '11'],
                props: {
                    options: new FitsTreeSelectModel({
                        select: {
                            placeholder: "请选择组织机构",
                            multiple: true,
                            clearable: true
                        },
                        input: {
                            element: {
                                placeholder: "部门搜索",
                            },
                        },
                        tree: {
                            showCheckbox: true,
                            class: "myTree",
                            nodeKey: "id",
                            defaultExpandAll: false,
                            data: [
                                {
                                    id: '1',
                                    label: 'Level 1',
                                    children: [
                                        {
                                            id: '4',
                                            label: 'Level 1-1',
                                            children: [
                                                {
                                                    id: '9',
                                                    label: 'Level 1-1-1'
                                                },
                                                {
                                                    id: '11',
                                                    label: '我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据我是超长的数据',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    id: '21',
                                    label: 'Level 2',
                                    children: [
                                        {
                                            id: '5',
                                            label: 'Level 2-1',
                                            children: [
                                                {
                                                    id: '91',
                                                    label: 'Level 2-1-1',
                                                },
                                                {
                                                    id: '111',
                                                    label: 'Level 2-2-2',
                                                },
                                            ],
                                        },
                                        {
                                            id: '6',
                                            label: 'Level 2-2',
                                        },
                                    ],
                                },
                                {
                                    id: '3',
                                    label: 'Level 3',
                                    children: [
                                        {
                                            id: '7',
                                            label: 'Level 3-1',
                                        },
                                        {
                                            id: '8',
                                            label: 'Level 3-2',
                                            children: [
                                                {
                                                    id: '92',
                                                    label: 'Level 3-2-1',
                                                },
                                                {
                                                    id: '120',
                                                    label: 'Level 3-2-2',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        }
                    })
                },
                validate: [
                    // 多选的时候需要指定类型，否则可能校验会有问题
                    { required: true, message: "请选择", trigger: 'change' }
                ],
            },
            {
                field: "iconSelect",
                title: "图标选择(单选)",
                component: markRaw(FitsIconSelect),
                // value: 'edit',
                props: {
                    options: new FitsIconSelectModel({
                        select: {
                            class: "mySelect",
                            placeholder: "请选择图标",
                            clearable: true
                        },
                        input: {
                            element: {
                                placeholder: "图标搜索",
                            },
                        },
                    })
                },
                validate: [
                    { required: true, message: "请选择图标", trigger: 'change' }
                ],
            },
            {
                field: "iconSelectMultiple",
                title: "图标选择(多选)",
                component: markRaw(FitsIconSelect),
                value: ['edit', 'client'],
                props: {
                    options: new FitsIconSelectModel({
                        select: {
                            class: "mySelect",
                            placeholder: "请选择图标",
                            multiple: true,
                            clearable: true
                        },
                        input: {
                            element: {
                                placeholder: "图标搜索",
                            },
                        },
                    })
                },
                validate: [
                    { type: 'array', required: true, message: "请选择图标", trigger: 'change' }
                ],
            },
            {
                component: markRaw(FitsCheckboxAll),
                title: "多选(全选)",
                field: "checkbox2",
                value: ['生态蔬菜'],
                props: {
                    options: new FitsCheckboxAllModel({
                        option: [
                            {
                                label: "生态蔬菜",
                            },
                            {
                                label: "新鲜水果",
                            },
                            {
                                label: "蛋糕甜点",
                            }
                        ],
                    })
                },
            },
        ],
        option: {
            onSubmit: (formData: any) => {
                alert(JSON.stringify(formData))
            }
        }
    })
)

const slotForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: 'button',
                field: 'slotButton',
                title: '按钮插槽',
                props: {
                    type: 'primary'
                },
                children: [
                    {
                        // form-create使用组件的默认插槽
                        type: 'div',
                        component: markRaw(Search),
                        class: 'el-icon el-icon--left',
                    },
                    '按钮名称'
                ]
            },
            {
                type: 'input',
                field: 'slotInput',
                title: '输入框插槽',
                children: [
                    {
                        type: 'div',
                        component: markRaw(Search),
                        class: 'el-icon',
                        slot: 'prefix',
                    },
                    {
                        type: 'span',
                        slot: 'suffix',
                        children: ['suffix']
                    },
                ]
            },
            {
                type: 'select',
                field: 'slotSelect',
                title: '下拉框插槽',
                options: [
                    {
                        value: "104",
                        label: "生态蔬菜",
                    },
                    {
                        value: "105",
                        label: "新鲜水果",
                    },
                    {
                        value: "106",
                        label: "蛋糕甜点",
                    },
                ],
                // select的插槽
                children: [
                    {
                        type: 'span',
                        children: ['我是select的默认插槽']
                    },
                    // 无效，未解决
                    {
                        type: 'svg',
                        slot: 'empty',
                        component: markRaw(Search),
                    },
                    // 无效，未解决
                    {
                        type: 'svg',
                        slot: 'prefix',
                        component: markRaw(Search),
                    }
                ]
            },
        ],
        option: {
            submitBtn: {
                show: false
            },
            resetBtn: {
                show: false
            },
        },
    })
)

watch(() => setting.formType, (val: any) => {
    colNum.value = val === 'dialog' ? 2 : undefined
    dialogOpt.forms.map(item => item.form.col = colNum.value)
})

/**
规则生成的规则
 */
function getRule() {
    num++
    return {
        type: "input",
        title: "追加规则" + num,
        field: "appendInput" + num,
        value: "追加规则" + num,
        col: {
            span: 12
        }
    }
}

function prependRule() {
    dynamicRef.value.fApi.prepend(getRule())
}

function appendRule() {
    dynamicRef.value.fApi.append(getRule())
}

function spliceRule() {
    dynamicRef.value.fApi.rule.splice(0, 1)
}

function spliceSpecifyRule() {
    spliceOpt.visible = true
}

function closeForm() {
    spliceOpt.visible = false
    dialogOpt.visible = false
}

function submitSpliceForm(formValue: any) {
    if (formValue.fieldName) {
        if (dynamicRef.value.fApi.removeField(formValue.fieldName) === undefined) {
            ElMessage.error('找不到该规则')
        } else {
            dynamicRef.value.fApi.removeField(formValue.fieldName)
            ElMessage.success('删除成功')
            closeForm()
        }
    }
}

function submitDialogForm(formValue: any) {
    alert(JSON.stringify(formValue));
}

</script>

<style lang="scss">
.form-example {
    .el-form-item {
        margin-bottom: 28px;
    }

    .inlineBox {
        .el-form-item {

            .el-input,
            .el-textarea {
                min-width: 180px;
            }
        }

        .el-form-item:last-child {
            width: 100%;
        }
    }

    .exampleForm {

        .el-row {
            width: 100%;
        }

        .el-form-item {

            .el-select {
                width: 100%;
            }
        }
    }

    .simpleForm {
        .el-row {
            justify-content: center;
        }

        .el-form-item {
            width: 90%;
        }

        .el-form-item:last-child {
            margin-top: 20px;
            margin-bottom: 0;
        }
    }

    .inlineForm,
    .dynamicForm {
        .el-form-item {
            margin-bottom: 28px;
        }
    }
}
</style>

<style lang="scss" scoped>
.form-example {
    background: #fff;
    padding: 20px;
    width: 100%;

    .el-form-item {
        width: 100%;
    }

    .exampleForm {
        padding: 30px;
    }

    .exampleBox {
        width: 50%;
        border: 1px dashed #dcdfe6;
        border-radius: 10px;
        margin-top: 20px;
        padding: 20px;
    }

    .exampleBox:first-child {
        margin-top: 0;
    }

    .inlineBox,
    .dynamicBox {
        width: 70%;
    }

    .dialogBox {
        margin-bottom: 20px;
    }
}
</style>