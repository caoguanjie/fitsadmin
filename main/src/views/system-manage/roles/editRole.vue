<template>
    <div class="edit-role">
        <div class="edit-content">
            <!-- 编辑角色内容 -->
            <el-form v-if="props.keys == 'editRole'" ref="ruleFormRef" :model="ruleForm" :rules="rules"
                label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="角色分类" prop="Ucode">
                    <el-select style="width:100%;" v-model="ruleForm.Ucode" class="m-2" placeholder="请选择">
                        <el-option v-for="(item, key) in roleC" :key="key" :label="item.Cname" :value="item.Cname" />
                    </el-select>
                </el-form-item>
                <el-form-item label="角色名称" prop="Uname">
                    <el-input v-model="ruleForm.Uname" />
                </el-form-item>
                <el-form-item label="角色描述" prop="Udescribe">
                    <el-input v-model="ruleForm.Udescribe" rows="5" resize="none" type="textarea" />
                </el-form-item>
                <el-form-item label="状态" prop="Ustate" style="display:flex;align-items:center;">
                    <el-radio-group v-model="ruleForm.Ustate" class="ml-4">
                        <el-radio :label="true" size="large">启用</el-radio>
                        <el-radio :label="false" size="large">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <!-- 角色管理编辑内容 -->
            <el-form v-else-if="props.keys == 'editClass'" ref="ruleFormRef" :model="classyForm" :rules="rules"
                label-width="120px" class="demo-classyForm" :size="formSize" status-icon>
                <el-form-item label="角色分类" prop="Cname">
                    <el-input v-model="classyForm.Cname" />
                </el-form-item>
                <el-form-item label="分类描述" prop="Cdescribe">
                    <el-input v-model="classyForm.Cdescribe" rows="5" resize="none" type="textarea" />
                </el-form-item>
            </el-form>
        </div>

        <div class="edit-bottom">
            <el-button class="edit-button" size="large" @click="closeDialog('cancle')">取消</el-button>
            <el-button class="edit-button" type="primary" size="large" @click="closeDialog('submit')">确定</el-button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import XEUtils from 'xe-utils';
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['dataChange', "closeDialog"])
const props = defineProps({
    keys: String,
    setData: Object,
    roleClass: Array
})
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive({
    Uname: '',
    Ucode: '',
    Udescribe: '',
    Sort: '',
    Ustate: false,
    Roledisable: ""
})
//新增分类的数据
let classyForm = reactive({
    Cname: '',
    Cdescribe: ""
})
const roleC = <any>ref()
const rules = reactive<FormRules>({
    Uname: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
    ],
    Cname: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    Ucode: [
        {
            required: true,
            message: '请输入角色编码',
            trigger: 'blur',
        },
        { min: 3, max: 10, message: '长度请大于3，小于10', trigger: 'blur' },
    ],
})
watch(
    () => props.setData,
    () => {
        if (props.keys == "editClass") {
            classyForm = Object.assign(classyForm, props.setData)
        }
        else if (props.keys == "editRole") {
            ruleForm = Object.assign(ruleForm, props.setData)
        }
    },
    {
        //初始化立即执行
        immediate: true,
        deep: true
    }
)
watch(
    () => props.roleClass,
    () => {
        roleC.value = XEUtils.clone(props.roleClass)
    },
    {
        //初始化立即执行
        immediate: true,
        deep: true
    }
);
const closeDialog = (key: string) => {
    if (key == "cancle") {
        emit("closeDialog", "addRole")
        return
    }
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            if (props.keys == 'editClass') {
                let obj = {
                    Cname: classyForm.Cname,
                    Cdescribe: classyForm.Cdescribe,
                }
                emit('dataChange', obj, props.keys)
            }
            else if (props.keys == 'editRole') {
                console.log("角色修改")
            }
            emit("closeDialog", "addRole")
        } else {
            ElMessage({
                message: '必填项未填写完整！',
                type: 'warning',
            })
            return false
        }

    })
}
</script>
<style lang='scss' scoped>
.edit-role {
    .edit-content {
        padding: 24px 32px 20px 0;
    }

    .edit-bottom {
        margin-top: 10px;
        padding: 10px 24px;
        border-top: 1px solid #dcdfe6;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .edit-button {
            font-size: 12px;
            border-radius: 2px;
            display: flex;
            align-items: flex-end;
            line-height: 16px;
            height: auto;
        }
    }

    :deep(.el-button--large) {
        padding: 8px 24px;
    }
}
</style>