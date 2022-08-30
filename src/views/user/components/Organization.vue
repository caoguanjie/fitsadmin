<template>
    <div class="organization">
        <form-create v-model:api="fApi" :rule="rule" :option="option" v-model="formValue" ref="organizationForm" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue';
import { isHomeNumber, isPhoneNumber } from '@/utils/is';
import FitsTreeSelect from '@/components/Form/FitsTreeSelect.vue'
import { postUserDetail } from '@/api/base/user';
import { ResultEnum } from '@/utils/http/types';
import { ElMessage } from 'element-plus';

const props = defineProps({
    userDetail: {
        required: true,
        type: Object
    }
})

const organizationForm: any = ref(null)

const state = reactive({
    fApi: {},
    formValue: {},
    rule: [
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
            type: "tree-search",
            component: FitsTreeSelect,
            field: "Department",
            name: "organization",
            title: "组织机构",
            props: {
                select: {
                    class: "mySelect",
                    placeholder: "请选择组织机构",
                },
                input: {
                    elementProps: {
                        class: "myInput",
                        placeholder: "部门搜索",
                    },
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
            type: "datePicker",
            field: "offJobDate",
            title: "离职日期",
            props: {
                placeholder: "请选择离职日期"
            }
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
            inline: true
        },
        submitBtn: {
            show: true,
            className: "footerBtn el-button el-button--medium",
            innerText: "保存信息",
            color: "#007dff",
        },
        onSubmit: (form: any) => {
            saveUserDetail()
        }
    }
})

const { formValue, fApi, rule, option }: any = toRefs(state);

watch(() => props.userDetail, (val: any) => {
    Object.keys(formValue.value).forEach((item: any) => {
        formValue.value[item] = val[item]
    })
})

async function saveUserDetail() {
    const { Message, RetCode }: any = await postUserDetail(formValue.value);
    if (RetCode === ResultEnum.SUCCESS) {
        ElMessage.success(Message)
    }
}
</script>

<style lang="scss">
.organization {
    @media screen and (max-width: 580px) {
        .el-form-item {
            min-width: 250px !important;
        }
    }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 980px) {
    .organization {
        .form-create {
            width: 100%;
        }
    }
}
</style>