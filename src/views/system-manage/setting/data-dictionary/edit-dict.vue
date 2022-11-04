<template>
    <div class="add-role">
        <!-- 编辑字典内容 -->
        <el-form v-if="props.keys == 'editRole'" @change="changeData" ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="字典分类" prop="Uname">
                <el-select style="width:100%;" v-model="ruleForm.Dictdescribe" class="m-2" placeholder="请选择">
                    <el-option v-for="item in dictClass" :key="item.Cname" :label="item.Cname" :value="item.Cname" />
                </el-select>
            </el-form-item>
            <el-form-item label="字典名称" prop="Uname">
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
        <el-form v-else-if="props.keys == 'editClass'" @change="changeData" ref="ClassyFormRef" :model="classyForm"
            :rules="rules" label-width="120px" class="demo-classyForm" :size="formSize" status-icon>
            <el-form-item label="分类名称" prop="classyForm.Cname">
                <el-input v-model="classyForm.Cname" />
            </el-form-item>
            <el-form-item label="分类描述" prop="classyForm.Cdescribe">
                <el-input v-model="classyForm.Cdescribe" rows="5" resize="none" type="textarea" />
            </el-form-item>
        </el-form>

    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const emit = defineEmits(['addChange'])
const props = defineProps({
    keys: String,
    setData: Object
})
const formSize = ref('default')
const ClassyFormRef = ref<FormInstance>()
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
    // Uname: [
    //     { required: true, message: '请输入字典名称', trigger: 'blur' },
    // ],
    // Ucode: [
    //     {
    //         required: true,
    //         message: '请输入字典编码',
    //         trigger: 'blur',
    //     },
    //     { min: 3, max: 10, message: '长度请大于3，小于10', trigger: 'blur' },
    // ],
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
);
const changeData = () => {
    if (props.keys == 'editClass') {
        let obj = {
            Cname: classyForm.Cname,
            Cdescribe: classyForm.Cdescribe,
        }
        emit('addChange', obj, props.keys)
    }
}
</script>
<style lang='scss' scoped>

</style>