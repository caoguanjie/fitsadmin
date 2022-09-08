<template>
    <div class="organization">
        <fits-form-create :form="form" ref="FormRef" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { isHomeNumber, isPhoneNumber } from '@/utils/is';
import FitsTreeSelect from '@/components/Form/FitsTreeSelect.vue'
import { postUserDetail } from '@/api/base/user';
import { ResultEnum } from '@/utils/http/types';
import { FitsFormCreateModel } from '@/components/Common/model';
import FitsFormCreate from '@/components/Common/FitsFormCreate.vue';
import { FitsTreeSelectModel } from '@/components/Form/model';

const props = defineProps<{
    userDetail: any
}>();

const FormRef: any = ref(null)

const form = reactive(
    new FitsFormCreateModel({
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
                component: markRaw(FitsTreeSelect),
                field: "Department",
                name: "organization",
                title: "组织机构",
                props: {
                    options: new FitsTreeSelectModel({
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
                    { required: true, message: "请选择入职日期", trigger: 'change' }
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
                inline: true
            },
            submitBtn: {
                className: "footerBtn el-button el-button--medium",
                innerText: "保存信息",
            },
            onSubmit: (form: any) => {
                saveUserDetail()
            }
        }
    })
)

watch(() => props.userDetail, (val: any) => {
    FormRef.value.fApi.setValue(val)
})

async function saveUserDetail() {
    const formValue = FormRef.value.fApi.formData()
    const { Message, RetCode }: any = await postUserDetail(formValue);
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