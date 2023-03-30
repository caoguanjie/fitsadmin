<template>
    <div class="edit-dict">
        <div class="edit-content">
            <!-- 编辑字典内容 -->
            <el-form v-if="props.keys == 'editDict'" @change="changeData" ref="ruleFormRef" :model="ruleForm"
                :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="字典分类" prop="Name">
                    <el-select style="width:100%;" v-model="ruleForm.Dictdescribe" class="m-2" placeholder="请选择">
                        <el-option v-for="item in dictClass" :key="item.Cname" :label="item.Cname"
                            :value="item.Cname" />
                    </el-select>
                </el-form-item>
                <el-form-item label="字典名称" prop="Name">
                    <el-input v-model="ruleForm.Name" />
                </el-form-item>
                <el-form-item label="字典描述" prop="Udescribe">
                    <el-input v-model="ruleForm.Dictdescribe" rows="5" resize="none" type="textarea" />
                </el-form-item>
                <el-form-item label="状态" prop="Ustate" style="display:flex;align-items:center;">
                    <el-radio-group v-model="ruleForm.IsEnabled" class="ml-4">
                        <el-radio :label="true" size="large">启用</el-radio>
                        <el-radio :label="false" size="large">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <!-- 字典管理编辑内容 -->
            <el-form v-else-if="props.keys == 'editClass'" @change="changeData" ref="ruleFormRef" :model="classyForm"
                :rules="rules" label-width="120px" class="demo-classyForm" :size="formSize" status-icon>
                <el-form-item label="分类名称" prop="Cname">
                    <el-input v-model="classyForm.Cname" />
                </el-form-item>
                <el-form-item label="分类描述" prop="Cdescribe">
                    <el-input v-model="classyForm.Cdescribe" rows="5" resize="none" type="textarea" />
                </el-form-item>
            </el-form>

        </div>

        <div class="edit-bottom">
            <el-button class="edit-button" size="large" @click="closeDialog('cancle')">取消</el-button>
            <el-button class="edit-button" type="primary" size="large" @click="closeDialog('submit')">确定
            </el-button>
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
    setData: Object
})
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive({
    Name: '',
    Code: '',
    SortNum: '',
    Dictdescribe: '',
    IsEnabled: false,
})
//新增分类的数据
let classyForm = reactive({
    Cname: '',
    Cdescribe: ""
})
const dictClass = ref([
    {
        Cname: '变异场景',
        Cdescribe: ""
    },
    {
        Cname: '非计划重返住院',
        Cdescribe: ""
    },
    {
        Cname: '非计划重返手术室次数',
        Cdescribe: ""
    },
    {
        Cname: '护理评率',
        Cdescribe: ""
    },
    {
        Cname: '手术并发症',
        Cdescribe: ""
    },
    {
        Cname: '等级',
        Cdescribe: ""
    }
])
const rules = reactive<FormRules>({
    Name: [
        { required: true, message: '请输入字典名称', trigger: 'blur' },
    ],
    Cname: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    Code: [
        {
            required: true,
            message: '请输入字典编码',
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
        else if (props.keys == "editDict") {
            ruleForm = Object.assign(ruleForm, props.setData)
        }
    },
    {
        //初始化立即执行
        immediate: true,
        deep: true
    }
);
const changeData = () => {
    if (props.keys == 'editClass') {
        let obj = {
            Cname: classyForm.Cname,
            Cdescribe: classyForm.Cdescribe,
        }
        emit('dataChange', obj, props.keys)
    }
}
const closeDialog = (key: string) => {
    if (key == "cancle") {
        emit("closeDialog", props.keys)
        return
    }
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            if (props.keys == 'editClass') {
                let obj = XEUtils.clone(classyForm)
                emit('dataChange', obj)
            }
            else if (props.keys == 'editDict') {
                let obj = XEUtils.clone(classyForm)
                emit('dataChange', obj)
            }
            emit("closeDialog", props.keys)
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
.edit-dict {
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