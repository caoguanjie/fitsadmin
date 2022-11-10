<template>
    <div class="add-dict">
        <div class="add-content">
            <!-- 新增字典内容 -->
            <el-form v-if="props.keys == 'addDict'" ref="ruleFormRef" :model="dictData" :rules="rules"
                label-width="120px" class="demo-dictData" :size="formSize" status-icon>
                <el-form-item label="字典分类" prop="Dictdescribe">
                    <el-select style="width:100%;" v-model="dictData.Dictdescribe" class="m-2" placeholder="请选择">
                        <el-option v-for="item in dictClass" :key="item" :label="item.Cname" :value="item.Cname" />
                    </el-select>
                </el-form-item>
                <el-form-item label="字典名称" prop="Name">
                    <el-input v-model="dictData.Name" />
                </el-form-item>
                <el-form-item label="字典描述" prop="Dictdescribe">
                    <el-input v-model="dictData.Dictdescribe" addDicts="5" resize="none" type="textarea" />
                </el-form-item>
                <el-form-item label="状态" prop="Ustate" style="display:flex;align-items:center;">
                    <el-radio-group v-model="dictData.IsEnabled" class="ml-4">
                        <el-radio :label="true" size="large">启用</el-radio>
                        <el-radio :label="false" size="large">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <!-- 新增字典分类内容 -->
            <el-form v-else-if="props.keys == 'addClass'" ref="ruleFormRef" :model="classyForm" :rules="rules"
                label-width="120px" class="demo-classyForm" :size="formSize" status-icon>
                <el-form-item label="分类名称" prop="Cname">
                    <el-input v-model="classyForm.Cname" />
                </el-form-item>
                <el-form-item label="分类描述" prop="Cdescribe">
                    <el-input v-model="classyForm.Cdescribe" addDicts="5" resize="none" type="textarea" />
                </el-form-item>
            </el-form>

        </div>

        <div class="add-bottom">
            <el-button class="add-button" size="large" @click="closeDialog('cancle')">取消</el-button>
            <el-button class="add-button" type="primary" size="large" @click="closeDialog('submit')">提交
            </el-button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import XEUtils from 'xe-utils';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['dataChange', "closeDialog"])
const props = defineProps({
    keys: String,
    setData: Object
})
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let dictData = ref({
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
watch(
    () => props.setData,
    () => {
        if (props.keys == "addClass") {
            classyForm = Object.assign(classyForm, props.setData)
        }
        else if (props.keys == "addDict") {
            dictData = Object.assign(dictData, props.setData)
        }
    },
    {
        //初始化立即执行
        immediate: true,
        deep: true
    }
);
const rules = reactive<FormRules>({
    Name: [
        { required: true, message: '请输入字典名称', trigger: 'blur' },
    ],
    Cname: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
})
// const changeData = () => {
//     if (props.keys == 'addClass') {
//         let obj = {
//             Cname: classyForm.Cname,
//             Cdescribe: classyForm.Cdescribe,
//         }
//         emit('dataChange', obj, props.keys)
//     }
//     else if (props.keys == 'addDict') {
//         let obj = {
//             Name: dictData.Name,
//             Code: dictData.Code,
//             SortNum: dictData.SortNum,
//             Dictdescribe: dictData.Dictdescribe,
//             IsEnabled: dictData.IsEnabled
//         }
//         emit('dataChange', obj, props.keys)
//     }
// }
const closeDialog = (key: string) => {
    if (key == 'cancle') {
        emit("closeDialog", props.keys)
        return
    }
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            if (props.keys == 'addClass') {
                let obj = XEUtils.clone(classyForm)
                emit('dataChange', obj)
            }
            else if (props.keys == 'addDict') {
                let obj = XEUtils.clone(dictData)
                emit('dataChange', obj)
            }
            if (key == "cancle") {
                console.log("cancle")
            } else {
                console.log("submit")
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
.add-dict {
    .add-content {
        padding: 24px 32px 20px 0;
    }

    .add-bottom {
        margin-top: 10px;
        padding: 10px 24px;
        border-top: 1px solid #dcdfe6;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .add-button {
            font-size: 12px;
            border-radius: 2px;
            display: flex;
            align-items: flex-end;
        }
    }
}
</style>