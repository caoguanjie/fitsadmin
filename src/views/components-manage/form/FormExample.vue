<template>
    <div class="form-example">

        <div class="exampleBox">
            <h1>
                普通表单
            </h1>
            <form-create v-model:api="simpleForm.fApi" v-model="simpleForm.formValue" :rule="simpleForm.rule"
                :option="simpleForm.option" ref="Form" class="exampleForm simpleForm">
            </form-create>
        </div>

        <div class="exampleBox inlineBox">
            <h1>
                行内表单（栅格布局）
            </h1>
            <form-create v-model:api="inlineForm.fApi" v-model="inlineForm.formValue" :rule="inlineForm.rule"
                :option="inlineForm.option" ref="Form" class="exampleForm inlineForm">
            </form-create>
        </div>

        <div class="exampleBox dynamicBox">
            <h1>
                动态增删表单项
            </h1>
            <el-button-group style="margin-left:30px">
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
            <form-create v-model:api="dynamicForm.fApi" v-model="dynamicForm.formValue" :rule="dynamicForm.rule"
                :option="dynamicForm.option" ref="Form" class="exampleForm dynamicForm">
            </form-create>
        </div>

        <div class="exampleBox">
            <h1>
                自定义组件
            </h1>
            <form-create v-model:api="customForm.fApi" v-model="customForm.formValue" :rule="customForm.rule"
                :option="customForm.option" class="exampleForm customForm">
            </form-create>
        </div>

        <div class="exampleBox">
            <h1>
                组件插槽
            </h1>
            <form-create v-model:api="slotForm.fApi" v-model="slotForm.formValue" :rule="slotForm.rule"
                :option="slotForm.option" class="exampleForm slotForm">
            </form-create>
        </div>

        <div class="exampleBox dialogBox">
            <h1>
                弹窗表单
            </h1>
            <el-button @click="dialogVisible = true" style="margin-left: 20px;margin-bottom: 20px">
                打开表单弹窗
            </el-button>
            <form-type :visible="dialogVisible" :props="myProps" :form="dialogForm" @submit="submitDialogForm"
                @cancle="closeForm">
            </form-type>
        </div>

        <!-- props是dialog或drawer的属性，form是表单数组，除了form-create的配置还有一些属性要传递 -->
        <form-type :visible="spliceVisible" :props="spliceProps" :form="spliceForm" @submit="submitSpliceForm"
            @cancle="closeForm">
        </form-type>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, markRaw, ref, onMounted, render } from 'vue';
import TreeSelect from '@/components/Form/TreeSelect.vue'
import IconSelect from '@/components/Form/IconSelect.vue'
import { FormTypeArray } from '@/components/Common/FormType.vue'
import { isEmail, isHomeNumber, isPhoneNumber, isShortNumber } from '@/utils/is';
import { Search } from '@element-plus/icons-vue'
import Divider from '@/components/Form/Divider.vue'
import CheckboxAll from '@/components/Form/CheckboxAll.vue'
import { ElMessage } from 'element-plus';

let num = 0

const simpleForm = reactive({
    formValue: {
        checkbox2: ["生态蔬菜", '新鲜水果']
    },
    fApi: {},
    rule: [
        {
            type: 'divider',
            component: markRaw(Divider),
            field: "divider",
            value: '输入控件'
        },
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
            type: 'divider',
            component: markRaw(Divider),
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
            ]
        },
        {
            type: "select",
            title: "下拉选择控件（自定义、分组）",
            field: "select",
            props: {
                clearable: true,
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
            // options: () => {
            //     return `<template>
            //     <div>123</div>
            //     </template>`
            // },
            // children: [
            //     {
            //         // form-create使用组件的默认插槽
            //         type: 'svg',
            //         component: markRaw(Search),
            //         class: 'el-icon el-icon--left',
            //     }
            // ]
        },
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
                    disabled: true
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
            props: {
            },
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
                },
                {
                    value: "109",
                    label: "奶制品",
                    disabled: false
                },
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
            type: 'divider',
            component: markRaw(Divider),
            field: "divider",
            value: '开关控件'
        },
        {
            type: "switch",
            title: "开关",
            field: "switch",
            props: {
            },
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
            type: 'divider',
            component: markRaw(Divider),
            field: "divider",
            value: '日期、时间控件'
        },
        {
            type: "DatePicker",
            title: "日期选择",
            field: "DatePicker1",
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
            type: 'divider',
            component: markRaw(Divider),
            field: "divider",
            value: '复选框控件'
        },
        {
            type: "checkbox",
            title: "多选",
            field: "checkbox1",
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
            type: "checkboxAll",
            component: markRaw(CheckboxAll),
            title: "多选(全选)",
            field: "checkbox2",
            props: {
                options: [
                    {
                        label: "生态蔬菜",
                    },
                    {
                        label: "新鲜水果",
                    },
                    {
                        label: "蛋糕甜点",
                    },
                ]
            },

        },
    ],
    option: {
        form: {
            labelPosition: "top",
            size: "default",
            labelWidth: "80px",
            hideRequiredAsterisk: false,
            showMessage: true,
            inlineMessage: false,
            inline: true
        },
        submitBtn: {
            show: true,
        },
        onSubmit: (formData: any) => {
            alert(JSON.stringify(formData))
        }
    },
})

const inlineForm = reactive({
    formValue: {
    },
    fApi: {},
    rule: [
        {
            type: 'col',
            props: {
                span: 12
            },
            children: [
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
                    ]
                },
            ]
        },
        {
            type: 'col',
            props: {
                span: 12
            },
            children: [
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
            ]
        },
        {
            type: 'col',
            props: {
                span: 12
            },
            children: [
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
            ]
        },
        {
            type: 'col',
            props: {
                span: 12
            },
            children: [
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
            ]
        },
        {
            type: 'col',
            props: {
                span: 12
            },
            children: [
                {
                    type: "checkbox",
                    title: "多选",
                    field: "checkbox1",
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
            ]
        },
    ],
    option: {
        form: {
            labelPosition: "right",
            size: "default",
            labelWidth: "80px",
            hideRequiredAsterisk: false,
            showMessage: true,
            inlineMessage: false,
        },
        submitBtn: {
            show: true,
            col: {
                span: 24
            }
        },
        onSubmit: (formData: any) => {
            alert(JSON.stringify(formData))
        }
    },
})

const dynamicForm: any = reactive({
    formValue: {
    },
    fApi: {},
    rule: [
        {
            type: 'col',
            props: {
                span: 12
            },
            children: [
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
            ]
        },
        {
            type: 'col',
            props: {
                span: 12
            },
            children: [
                {
                    type: "input",
                    title: "文本",
                    field: "textarea",
                    props: {
                        placeholder: "请输入商品名称",
                    }
                },
            ]
        },



    ],
    option: {
        form: {
            labelPosition: "right",
            size: "default",
            labelWidth: "80px",
            hideRequiredAsterisk: false,
            showMessage: true,
            inlineMessage: false,
            inline: false
        },
        submitBtn: {
            show: true,
        },
        onSubmit: (formData: any) => {
            alert(JSON.stringify(formData))
        }
    },
})

const customForm = reactive({
    formValue: {
    },
    fApi: {},
    rule: [
        {
            type: 'col',
            props: {
                span: 24
            },
            children: [
                {
                    type: "tree-search",
                    field: "treeSearch",
                    title: "下拉选择树",
                    component: markRaw(TreeSelect),
                    value: '2',
                    props: {
                        selectInput: {
                            class: "mySelect",
                            placeholder: "请选择组织机构",
                        },
                        filterInput: {
                            class: "myInput",
                            placeholder: "部门搜索",
                            show: true
                        },
                        tree: {
                            class: "myTree",
                            nodeKey: "id",
                            defaultExpandAll: false,
                            data: [
                                {
                                    id: "1",
                                    label: '研发部',
                                    children: [
                                        {
                                            id: 4,
                                            label: '研发部',
                                            children: [
                                                {
                                                    id: 9,
                                                    label: '研发部',
                                                    children: [
                                                        {
                                                            id: "2",
                                                            "disabled": true,
                                                            label: '研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发研发部研发部研发部研发部研发部研发部研发部研发部发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部',
                                                        },
                                                        {
                                                            id: 10,
                                                            label: '研发部',
                                                            children: [
                                                                {
                                                                    id: 9,
                                                                    label: '研发部',
                                                                },
                                                                {
                                                                    id: 10,
                                                                    label: '研发部',
                                                                    children: [
                                                                        {
                                                                            id: 9,
                                                                            label: '研发部',
                                                                        },
                                                                        {
                                                                            id: 10,
                                                                            label: '研发部',
                                                                            children: [
                                                                                {
                                                                                    id: 9,
                                                                                    label: '研发部',
                                                                                },
                                                                                {
                                                                                    id: 10,
                                                                                    label: '研发部',
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    id: 10,
                                                    label: '研发部',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    id: 21,
                                    label: '研发部',
                                    children: [
                                        {
                                            id: 5,
                                            label: '研发部',
                                        },
                                        {
                                            id: 6,
                                            label: '研发部',
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    label: 'Level one 3',
                                    children: [
                                        {
                                            id: 7,
                                            label: 'Level two 3-1',
                                        },
                                        {
                                            id: 8,
                                            label: 'Level two 3-2',
                                            children: [
                                                {
                                                    id: 9,
                                                    label: '研发部',
                                                },
                                                {
                                                    id: 10,
                                                    label: '研发部',
                                                    children: [
                                                        {
                                                            id: 9,
                                                            label: '研发部',
                                                        },
                                                        {
                                                            id: 10,
                                                            label: '研发部',
                                                            children: [
                                                                {
                                                                    id: 9,
                                                                    label: '研发部',
                                                                    children: [
                                                                        {
                                                                            id: 9,
                                                                            label: '研发部',
                                                                        },
                                                                        {
                                                                            id: 10,
                                                                            label: '研发部',
                                                                            children: [
                                                                                {
                                                                                    id: 9,
                                                                                    label: '研发部',
                                                                                },
                                                                                {
                                                                                    id: 10,
                                                                                    label: '研发部',
                                                                                    children: [
                                                                                        {
                                                                                            id: 9,
                                                                                            label: '研发部',
                                                                                        },
                                                                                        {
                                                                                            id: 10,
                                                                                            label: '研发部',
                                                                                        },
                                                                                    ],
                                                                                },
                                                                            ],
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    id: 10,
                                                                    label: '研发部',
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        }
                    },
                    validate: [
                        { required: true, message: "请选择", trigger: 'change' }
                    ],
                },
            ]
        },
        {
            type: 'col',
            props: {
                span: 24
            },
            children: [
                {
                    type: "icon-select",
                    field: "iconSelect",
                    title: "图标选择",
                    component: markRaw(IconSelect),
                    name: "IconSelect",
                    props: {
                        selectInput: {
                            placeholder: "请选择图标",
                        },
                        filterInput: {
                            placeholder: "图标搜索",
                            show: true,
                        },
                        noDataText: '暂无数据'
                    },
                    on: {
                        // 监听组件事件
                        selected: (iconName: any) => {
                            console.log(iconName);
                        }
                    },
                    validate: [
                        { required: true, message: "请选择", trigger: 'change' }
                    ],
                }
            ]
        }
    ],
    option: {
        form: {
            labelPosition: "top",
            size: "default",
            labelWidth: "80px",
            hideRequiredAsterisk: false,
            showMessage: true,
            inlineMessage: false,
        },
        submitBtn: {
            show: true,
        },
        onSubmit: (formData: any) => {
            alert(JSON.stringify(formData))
        }
    },
})

const slotForm = reactive({
    formValue: {},
    fApi: {},
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
        form: {
            labelPosition: "top",
            size: "default",
            labelWidth: "80px",
            hideRequiredAsterisk: false,
            showMessage: true,
            inlineMessage: false,
        },
        submitBtn: {
            show: false,
        },
        onSubmit: (formData: any) => {
            alert(JSON.stringify(formData))
        }
    },
})

const dialogForm = [
    {
        id: 'form1',
        title: '用户信息',
        iconClass: 'user',
        formValue: {},
        fApi: {},
        rule: [
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
                        validator: (rule: any, val: any, d: any) => {
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
                        validator: (rule: any, val: any, d: any) => {
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
                        validator: (rule: any, val: any, d: any) => {
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
                        validator: (rule: any, val: any, d: any) => {
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
                size: "default",
                labelWidth: "80px",
                hideRequiredAsterisk: false,
                showMessage: true,
                inlineMessage: false,
                inline: true
            },
            submitBtn: {
                show: false,
            },
        },
    },
    {
        id: 'form2',
        title: '组织关系',
        iconClass: 'fits-system',
        formValue: {},
        fApi: {},
        rule: [
            {
                type: "tree-search",
                component: TreeSelect,
                field: "Department",
                name: "organization",
                title: "所属部门",
                props: {
                    selectInput: {
                        class: "mySelect",
                        placeholder: "请选择组织机构",
                        // popperClass: 'new-popper',
                    },
                    filterInput: {
                        class: "myInput",
                        placeholder: "部门搜索",
                        show: true
                    },
                    tree: {
                        class: "myTree",
                        nodeKey: "id",
                        defaultExpandAll: false,
                        data: [
                            {
                                "id": "1",
                                "label": '研发部',
                                "children": [
                                    {
                                        "id": 4,
                                        "label": '研发部',
                                        "children": [
                                            {
                                                "id": 9,
                                                "label": '研发部',
                                                "children": [
                                                    {
                                                        "id": "2",
                                                        "disabled": true,
                                                        "label": '研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发研发部研发部研发部研发部研发部研发部研发部研发部发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部研发部',
                                                    },
                                                    {
                                                        "id": 10,
                                                        "label": '研发部',
                                                        "children": [
                                                            {
                                                                "id": 9,
                                                                "label": '研发部',
                                                            },
                                                            {
                                                                "id": 10,
                                                                "label": '研发部',
                                                                "children": [
                                                                    {
                                                                        "id": 9,
                                                                        "label": '研发部',
                                                                    },
                                                                    {
                                                                        "id": 10,
                                                                        "label": '研发部',
                                                                        "children": [
                                                                            {
                                                                                "id": 9,
                                                                                "label": '研发部',
                                                                            },
                                                                            {
                                                                                "id": 10,
                                                                                "label": '研发部',
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                "id": 10,
                                                "label": '研发部',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                "id": 21,
                                "label": '研发部',
                                "children": [
                                    {
                                        "id": 5,
                                        "label": '研发部',
                                    },
                                    {
                                        "id": 6,
                                        "label": '研发部',
                                    },
                                ],
                            },
                            {
                                "id": 3,
                                "label": 'Level one 3',
                                "children": [
                                    {
                                        "id": 7,
                                        "label": 'Level two 3-1',
                                    },
                                    {
                                        "id": 8,
                                        "label": 'Level two 3-2',
                                        "children": [
                                            {
                                                "id": 9,
                                                "label": '研发部',
                                            },
                                            {
                                                "id": 10,
                                                "label": '研发部',
                                                "children": [
                                                    {
                                                        "id": 9,
                                                        "label": '研发部',
                                                    },
                                                    {
                                                        "id": 10,
                                                        "label": '研发部',
                                                        "children": [
                                                            {
                                                                "id": 9,
                                                                "label": '研发部',
                                                                "children": [
                                                                    {
                                                                        "id": 9,
                                                                        "label": '研发部',
                                                                    },
                                                                    {
                                                                        "id": 10,
                                                                        "label": '研发部',
                                                                        "children": [
                                                                            {
                                                                                "id": 9,
                                                                                "label": '研发部',
                                                                            },
                                                                            {
                                                                                "id": 10,
                                                                                "label": '研发部',
                                                                                "children": [
                                                                                    {
                                                                                        "id": 9,
                                                                                        "label": '研发部',
                                                                                    },
                                                                                    {
                                                                                        "id": 10,
                                                                                        "label": '研发部',
                                                                                    },
                                                                                ],
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                "id": 10,
                                                                "label": '研发部',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    }
                }
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
                        validator: (rule: any, val: any, d: any) => {
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
                labelPosition: "right",
                size: "default",
                labelWidth: "80px",
                hideRequiredAsterisk: false,
                showMessage: true,
                inlineMessage: false,
                inline: true
            },
            submitBtn: {
                show: false,
            },
        },
    }
]

const state: any = reactive({
    spliceVisible: false,
    dialogVisible: false,
    myProps: {
        title: '新增用户',
        direction: 'rtl',
        customClass: 'myFormType',
    },
    spliceProps: {
        title: '删除字段',
        width: '30%',
        customClass: 'spliceDialog'
    }
})
const { spliceVisible, dialogVisible, myProps, spliceProps } = toRefs(state)
const spliceForm: FormTypeArray = [
    {
        id: 'form1',
        api: {},
        formValue: {
        },
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
            form: {
                labelPosition: 'right',
                size: "default",
                labelWidth: "80px",
                showMessage: true,
                inlineMessage: false,
                inline: true
            },
            submitBtn: false
        },
    },
]

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
    dynamicForm.fApi.prepend(getRule())
}

function appendRule() {
    dynamicForm.fApi.append(getRule())
}

function spliceRule() {
    dynamicForm.rule.splice(0, 1)
}

function spliceSpecifyRule() {
    spliceVisible.value = true
}

function closeForm() {
    spliceVisible.value = false
    dialogVisible.value = false
}

function submitSpliceForm(formValue: any) {
    if (formValue.fieldName) {
        // appendInput1
        if (dynamicForm.fApi.removeField(formValue.fieldName) === undefined) {
            ElMessage.error('找不到该规则')
        } else {
            dynamicForm.fApi.removeField(formValue.fieldName)
            ElMessage.success('删除成功')
            closeForm()
        }
    }
}

function submitDialogForm(formValue: any) {
    console.log(formValue);
}
</script>

<style lang="scss">
.form-example {

    .exampleForm {
        .el-row {
            width: 100%;
        }

        .el-form-item {
            margin-bottom: 28px;

            .el-select {
                width: 100%;
            }
        }
    }

    .simpleForm {
        .el-row {
            // width: 100%;
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

    .spliceDialog {
        .el-form-item {
            width: 100%;
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
        // border: 1px #f3f3f3 solid;
        border: 1px dashed #dcdfe6;
        border-radius: 10px;
        margin-top: 20px;

        h1 {
            margin: 20px;
        }
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