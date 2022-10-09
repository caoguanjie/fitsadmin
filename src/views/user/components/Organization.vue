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
                                    label: '总经办',
                                    children: [
                                        {
                                            id: '4',
                                            label: '业务部',
                                            children: [
                                                {
                                                    id: '9',
                                                    label: '业务A部'
                                                },
                                                {
                                                    id: '11',
                                                    label: '业务B部',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    id: '21',
                                    label: '研发部',
                                    children: [
                                        {
                                            id: '5',
                                            label: '研发1部',
                                        },
                                        {
                                            id: '6',
                                            label: '研发2部',
                                        },
                                    ],
                                },
                                {
                                    id: '3',
                                    label: '财务部',
                                    children: [
                                        {
                                            id: '7',
                                            label: '财务1部',
                                        },
                                        {
                                            id: '8',
                                            label: '财务2部',
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
                innerText: "保存信息",
            },
            onSubmit: (form: any) => {
                saveUserDetail()
            }
        },
        col: 2
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
    .FitsFormCreate {
        width: 65%;

        // .el-form-item {
        //     min-width: 380px;
        // }
    }

    @media screen and (max-width: 760px) {
        .el-form-item {
            width: 80%;
            min-width: 380px;
        }
    }
}
</style>

<style lang="scss" scoped>
.organization {
    padding-top: 40px;
}

@media screen and (max-width: 1157px) {
    .organization {
        .FitsFormCreate {
            width: 100%;
        }
    }
}
</style>