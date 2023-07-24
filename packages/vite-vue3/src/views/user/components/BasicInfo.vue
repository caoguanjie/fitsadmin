<template>
    <div class="basic-info">
        <div class="info-container">
            <fits-form-create :form="form" ref="FormRef" />
            <div class="right-box" v-show="showAvator">
                <el-upload class="avatar-uploader" :show-file-list="false" :before-upload="beforeAvatarUpload"
                    :http-request="httpRequest">
                    <div class="avator-box">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <img src="@/assets/avator.png" v-else>
                    </div>
                    <el-button>
                        上传头像
                    </el-button>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue';
import { isPhoneNumber, isHomeNumber, isEmail, isShortNumber } from "@/utils/is"
import { postUserDetail, postUserAvator } from '@/api/base/user';
import { ResultEnum } from '@/utils/http/types';
import { ElMessage, UploadRequestOptions } from 'element-plus';
// import FitsFormCreate from '@/fits-components/Form/FormCreate/FitsFormCreate.vue';
import { FitsFormCreate, FitsFormCreateModel } from '@/fits-components';
const props = defineProps<{
    userDetail: any
}>();

const FormRef: any = ref()

const state: any = reactive({
    showAvator: true,
    imageUrl: '',
    form: new FitsFormCreateModel({
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
                    placeholder: "请输入用户账号"
                },
                validate: [
                    { required: true, type: 'string', message: "请输入用户账号" }
                ],
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
                field: "familynumber",
                title: "家庭号码",
                props: {
                    placeholder: "请输入家庭号码"
                },
                validate: [
                    {
                        validator: (rule: any, val: any, d: any) => {
                            return val ? isHomeNumber(val) : true
                        },
                        message: "请输入正确的家庭号码"
                    }
                ]
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
        ],
        option: {
            form: {
                labelPosition: "top",
                inline: true
            },
            submitBtn: {
                innerText: "保存基本信息"
            },
            onSubmit: () => {
                saveUserDetail()
            }
        },
        col: 2
    })
})
const { form, showAvator, imageUrl } = toRefs(state);

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

async function httpRequest(options: UploadRequestOptions) {
    const { Message, RetCode, ReturnData }: any = await postUserAvator(options.file);
    if (RetCode === ResultEnum.SUCCESS) {
        ElMessage.success(Message)
        imageUrl.value = ReturnData.headUrl
    }
}

function beforeAvatarUpload(rawFile: any) {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('只能上传jpg格式文件！')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('文件大小不能超过2M')
        return false
    }
    return true
}

window.onresize = () => {
    if (document.documentElement.clientWidth > 1157) {
        showAvator.value = true;
    } else {
        showAvator.value = false;
    }
};
</script>

<style lang="scss" scoped>
.info-container {
    display: flex;
    justify-content: space-between;

    .right-box {
        text-align: center;
        // width: 800px;
        margin-right: 180px;

        .avator-box {
            height: 140px;
            width: 140px;
            background-color: #f2f2f2;
            border-radius: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;

            img {
                height: 87px;
                width: 77px;
            }
        }

        .avatar {
            height: 140px !important;
            width: 140px !important;
            border-radius: 70px;
        }

        .el-button {
            margin-top: 16px;
            background-color: #000000;
            border-radius: 4px;
            opacity: 0.6;
            font-size: 12px;
            color: #fff;
            padding: 8px 10px;
        }
    }
}

@media screen and (max-width: 1157px) {
    .info-container {
        width: 100%;

        .FitsFormCreate {
            width: 100%;
        }
    }
}
</style>

<style lang="scss">
.basic-info {
    padding-top: 40px;

    .FitsFormCreate {
        width: 65%;
    }

    .el-upload {
        flex-direction: column;
    }

    .el-row>.el-form-item:last-child {
        width: 100%;
    }

    @media screen and (max-width: 760px) {
        .el-form-item {
            width: 80%;
            min-width: 380px;
        }
    }
}
</style>