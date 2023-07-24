<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="上级部门" prop="PId">
            <!-- <el-select style="width:100%;" v-model="ruleForm.PId" class="m-2">
                <el-option v-for="item in leader" :key="item" :label="item" :value="item" />
            </el-select> -->
            <fits-tree-select :options="state" />
        </el-form-item>
        <el-form-item label="部门名称" prop="Title">
            <el-input v-model="ruleForm.Title" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="部门编号" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="部门描述" prop="remark">
            <el-input v-model="ruleForm.remark" rows="3" resize="none" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="排序" prop="Sort">
            <el-input v-model.number="ruleForm.Sort" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-radio-group v-model="ruleForm.status">
                <el-radio :label=true size="large">启用</el-radio>
                <el-radio :label=false size="large">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Create</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item> -->
    </el-form>

    <div class="add-bottom">
        <el-button class="add-button" size="large" @click="closeDialog('cancle')">取消</el-button>
        <el-button class="add-button" type="primary" size="large" @click="closeDialog('submit')">提交
        </el-button>
    </div>
</template>

<script lang='ts' setup>
import XEUtils from 'xe-utils';
import { FitsTreeSelect } from '@/fits-components';
import { FitsTreeSelectModel } from '@/fits-components/type';
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
const props = defineProps(['departmentInfo'])
// const emit = defineEmits(['addChange'])
const emit = defineEmits(['dataChange', "closeDialog"])
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = ref({
    PId: '',
    Title: '',
    code: '',
    remark: '',
    Sort: '',
    status: true,
    Id: ''
})
watch(() => props.departmentInfo, () => {
    ruleForm.value = props.departmentInfo
    if (ruleForm.value.PId === "null") {
        ruleForm.value.PId = '广东丰德科技有限公司'
    }
}, { immediate: true, deep: true })

defineExpose(ruleFormRef)

// const leader = [
//     '广东丰德科技有限公司',
//     '广州华侨医院',
//     '广州第一人民医院',
//     '广州南方医科附属第三医院'
// ]
const rules = reactive<FormRules>({
    PId: [
        { required: true, message: '请选中上级部门', trigger: 'blur' }
    ],
    Title: [
        { required: true, message: '请输入部门名称', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入部门编号', trigger: 'blur' }
    ]
})
// const changeData = () => {
//     let obj = {
//         Title: ruleForm.value.Title,
//         code: ruleForm.value.code,
//         remark: ruleForm.value.remark,
//         Sort: ruleForm.value.Sort,
//         status: ruleForm.value.status,
//         Id: ruleForm.value.Id
//     }
//     emit('addChange', obj)
// }

const state = reactive(new FitsTreeSelectModel({
    select: {
        clearable: true,
    },
    tree: {
        nodeKey: "id",
        data: [
            {
                id: '1',
                label: '广州华侨医院',
                children: [
                    {
                        id: '4',
                        label: '医院医技',
                        children: [
                            {
                                id: '9',
                                label: '医院医技01'
                            },
                            {
                                id: '11',
                                label: '医院医技02',
                            },
                        ],
                    },
                ],
            },
            {
                id: '21',
                label: '广州第一人民医院',
                children: [
                    {
                        id: '24',
                        label: '医院医技',
                        children: [
                            {
                                id: '29',
                                label: '医院医技01'
                            },
                            {
                                id: '211',
                                label: '医院医技02',
                            },
                        ],
                    },
                ],
            },
            {
                id: '3',
                label: '广州南方医科附属第三医院',
                children: [
                    {
                        id: '34',
                        label: '医院医技',
                        children: [
                            {
                                id: '39',
                                label: '医院医技01'
                            },
                            {
                                id: '311',
                                label: '医院医技02',
                            },
                        ],
                    },
                ],
            },
        ],
        checkStrictly: true
    },
}))
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const closeDialog = (key: string) => {
    if (key == "cancle") {
        emit("closeDialog", "addRole")
        return
    }
    if (!ruleFormRef.value) return
    // ruleFormRef.value.validate((valid) => {
    //     if (valid) {
    //         if (props.keys == 'addClass') {
    //             let obj = XEUtils.clone(classyForm)
    //             emit('dataChange', obj, props.keys)
    //         }
    //         else if (props.keys == 'addRole') {
    //             let obj = XEUtils.clone(ruleForm)
    //             emit('dataChange', obj, props.keys)
    //         }
    //         emit("closeDialog", "addRole")
    //     } else {
    //         ElMessage({
    //             message: '必填项未填写完整！',
    //             type: 'warning',
    //         })
    //         return false
    //     }
    // })
}
// defineExpose({ submitForm })
</script>
<style lang='scss' scoped>
 .add-bottom {
        margin-top: 10px;
        padding: 10px 24px;
        border-top: 1px solid #dcdfe6;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .add-button {
            font-size: 12px;
            border-radius: 0;
            display: flex;
            align-items: flex-end;
        }
    }
</style>