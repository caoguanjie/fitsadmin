<template>
  <div class="add-role">
    <div class="add-content">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item label="上级目录" prop="CreateTime">
          <el-select style="width: 100%" v-model="ruleForm.CreateTime" class="m-2" placeholder="请选择">
            <el-option v-for="item in roleC" :key="item.Cname" :label="item.Cname" :value="item.Cname" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" prop="Type">
          <!-- 只放按钮会导致字体没有加粗 -->
          <el-input style="display: none" />
          <el-button v-if="ruleForm.Type != 'mulu'" class="add-button" @click="ruleForm.Type = 'mulu'">目录</el-button>
          <el-button v-if="ruleForm.Type == 'mulu'" class="add-button" @click="ruleForm.Type = 'mulu'" type="primary"
            plain>目录</el-button>
          <el-button v-if="ruleForm.Type != 'caidan'" class="add-button" @click="ruleForm.Type = 'caidan'">菜单
          </el-button>
          <el-button v-if="ruleForm.Type == 'caidan'" class="add-button" @click="ruleForm.Type = 'caidan'"
            type="primary" plain>菜单</el-button>
          <el-button v-if="ruleForm.Type != 'anniu'" class="add-button" @click="ruleForm.Type = 'anniu'">按钮</el-button>
          <el-button v-if="ruleForm.Type == 'anniu'" class="add-button" @click="ruleForm.Type = 'anniu'" type="primary"
            plain>按钮</el-button>
        </el-form-item>
        <el-form-item label="菜单图标">
          <div style="display: flex; width: 100%; justify-content: space-between">
            <fits-icon-select :options="state" :class="'addMenuClass'" />
            <fits-upload :url="url" :type="['images']">
              <template #mybutton>
                <el-button class="add-button" type="primary" plain>开始上传</el-button>
              </template>
            </fits-upload>
          </div>
        </el-form-item>
        <el-form-item label="菜单标题" prop="Title">
          <el-input v-model="ruleForm.Title" rows="5" resize="none" placeholder="请输入" />
        </el-form-item>
        <div style="display: flex; justify-content: flex-start">
          <el-form-item label="菜单状态" prop="State" style="display: flex; align-items: center">
            <el-radio-group v-model="ruleForm.State" class="ml-4">
              <el-radio :label="true" size="large">启用</el-radio>
              <el-radio :label="false" size="large">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="外链菜单" prop="IsUrL" style="display: flex; align-items: center">
            <el-radio-group v-model="ruleForm.IsUrL" class="ml-4">
              <el-radio :label="true" size="large">是</el-radio>
              <el-radio :label="false" size="large">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item label="路由地址" prop="ComponentPath">
          <el-input v-model="ruleForm.ComponentPath" rows="5" resize="none" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="Sort">
          <el-input v-model="ruleForm.Sort" rows="5" resize="none" placeholder="请输入" />
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

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import XEUtils from 'xe-utils';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus'
import { FitsIconSelect } from '@/fits-components';
import { FitsIconSelectModel } from '@/fits-components/type';
import { FitsUpload } from '@/fits-components/Form/Upload';
const url = 'http://192.168.32.108:3000/mock/78/api/uploadPDF';
const state = reactive(
  new FitsIconSelectModel({
    select: {
      clearable: true
    }
  })
);
const emit = defineEmits(['dataChange', 'closeDialog']);
const props = defineProps({
  keys: String,
  setData: Object
});
const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
let ruleForm = reactive({
  Title: '',
  Icon: '',
  Type: '',
  Sort: '',
  ComponentPath: '',
  IsUrL: false,
  IsCache: false,
  State: false,
  CreateTime: ''
});
//下拉框数据
const roleC = ref([
  {
    Cname: '后勤',
    Cdescribe: ''
  },
  {
    Cname: '财务',
    Cdescribe: ''
  },
  {
    Cname: '产品中心',
    Cdescribe: ''
  },
  {
    Cname: '前端',
    Cdescribe: ''
  },
  {
    Cname: '设计',
    Cdescribe: ''
  },
  {
    Cname: '维护中心',
    Cdescribe: ''
  }
]);
watch(
  () => props.setData,
  () => {
    ruleForm = Object.assign(ruleForm, props.setData);
  },
  {
    //初始化立即执行
    immediate: true,
    deep: true
  }
);
// Title: '',
// Icon: '',
// Type: '',
// Sort: '',
// ComponentPath: "",
// IsUrL: false,
// IsCache: false,
// State: false,
// CreateTime: "",
const rules = reactive<FormRules>({
  Title: [{ required: true, message: '请输入菜单标题', trigger: 'blur' }],
  Type: [
    {
      required: true,
      message: '请选择菜单类型',
      trigger: 'blur'
    },
    { min: 3, max: 10, message: '长度请大于3，小于10', trigger: 'blur' }
  ]
});
// const changeData = () => {
//     if (props.keys == 'addClass') {
//         let obj = {
//             Cname: classyForm.Cname,
//             Cdescribe: classyForm.Cdescribe,
//         }
//         emit('dataChange', obj, props.keys)
//     }
//     else if (props.keys == 'addRole') {
//         let obj = {
//             Uname: ruleForm.Uname,
//             Ucode: ruleForm.Ucode,
//             Udescribe: ruleForm.Udescribe,
//             Sort: ruleForm.Sort,
//             Ustate: ruleForm.Ustate
//         }
//         emit('dataChange', obj, props.keys)
//     }
// }
const closeDialog = (key: string) => {
  if (key == 'cancle') {
    emit("closeDialog", "operate")
    return
  }
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (props.keys == 'edit') {
        let obj = XEUtils.clone(ruleForm);
        console.log(obj);
        emit('dataChange', obj, props.keys);
        emit('closeDialog', 'operate');
      } else if (props.keys == 'add') {
        let obj = XEUtils.clone(ruleForm);
        emit('dataChange', obj, props.keys);
        emit('closeDialog', 'operate');
      }
    } else {
      ElMessage({
        message: '必填项未填写完整！',
        type: 'warning',
      })
      return false
    }
  })

};
</script>
<style lang="scss" scoped>
.add-role {
  .add-content {
    padding: 24px 32px 20px 0;

    .addMenuClass {
      width: 70%;
    }
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
      border-radius: 0;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
