<template>
    <div class="add-role">
        <!-- 新增角色内容 -->
        <el-form v-if="props.keys == 'addRole'" @change="changeData" ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="角色分类" prop="Uname">
                <el-select style="width:100%;" v-model="ruleForm.Udescribe" class="m-2" placeholder="请选择">
                    <el-option v-for="item in roleC" :key="item.Cname" :label="item.Cname" :value="item.Cname" />
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

        <!-- 新增分类内容 -->
        <el-form v-else-if="props.keys == 'addClass'" @change="changeData" ref="ClassyFormRef" :model="classyForm"
            :rules="rules" label-width="120px" class="demo-classyForm" :size="formSize" status-icon>
            <el-form-item label="分类名称" prop="Cname">
                <el-input v-model="classyForm.Cname" />
            </el-form-item>
            <el-form-item label="分类描述" prop="Cdescribe">
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

const roleC = ref([
    {
        Cname: '后勤',
        Cdescribe: ""
    },
    {
        Cname: '财务',
        Cdescribe: ""
    },
    {
        Cname: '产品中心',
        Cdescribe: ""
    },
    {
        Cname: '前端',
        Cdescribe: ""
    },
    {
        Cname: '设计',
        Cdescribe: ""
    },
    {
        Cname: '维护中心',
        Cdescribe: ""
    }
])
watch(
    () => props.setData,
    () => {
        if (props.keys == "addClass") {
            classyForm = Object.assign(classyForm, props.setData)
        }
        else if (props.keys == "addRole") {
            ruleForm = Object.assign(ruleForm, props.setData)
        }
    },
    {
        //初始化立即执行
        immediate: true,
        deep: true
    }
);
const rules = reactive<FormRules>({
    // Uname: [
    //     { required: true, message: '请输入角色名称', trigger: 'blur' },
    // ],
    // Ucode: [
    //     {
    //         required: true,
    //         message: '请输入角色编码',
    //         trigger: 'blur',
    //     },
    //     { min: 3, max: 10, message: '长度请大于3，小于10', trigger: 'blur' },
    // ],
})
const changeData = () => {
    if (props.keys == 'addClass') {
        let obj = {
            Cname: classyForm.Cname,
            Cdescribe: classyForm.Cdescribe,
        }
        emit('addChange', obj, props.keys)
    }
    else if (props.keys == 'addRole') {
        let obj = {
            Uname: ruleForm.Uname,
            Ucode: ruleForm.Ucode,
            Udescribe: ruleForm.Udescribe,
            Sort: ruleForm.Sort,
            Ustate: ruleForm.Ustate
        }
        emit('addChange', obj, props.keys)
    }
}
</script>
<style lang='scss' scoped>

</style>