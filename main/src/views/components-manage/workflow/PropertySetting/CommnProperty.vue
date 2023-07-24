<template>
  <!-- 点击节点时弹出的抽屉 -->
  <div class="commProperty">
    <el-form label-width="80px" :model="formData" ref="formName">
      <el-form-item class="CommnProperty-formItem" prop="text" label="阶段名称" :rules="[
        { required: true, message: '请输入阶段名称', trigger: 'blur' },
        { min: 2, max: 50, message: '长度不得超过50个字符', trigger: 'blur' }
      ]">
        <el-input v-model="formData.text" />
      </el-form-item>
      <el-form-item label="阶段类型">
        <el-input v-model="formData.type" />
      </el-form-item>
      <el-form-item label="费用上限">
        <el-input v-model="formData.cost1" />
      </el-form-item>
      <el-form-item label="费用下限">
        <el-input v-model="formData.cost2" />
      </el-form-item>
      <el-form-item label="配合事项">
        <el-input v-model="formData.a.a1" />
      </el-form-item>
      <el-form-item label="注意事项">
        <el-input v-model="formData.a.a2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
const props = defineProps<{
  lf: any;
  nodeData: any;
}>();
const emit = defineEmits(['onClose']);
//扩展业务时使用的数据
const extendData = reactive({
  text: '',
  type: ''
});
//节点属性抽屉输入框绑定的数据
let formData = reactive({
  text: '',
  cost1: '2000',
  cost2: '1000',
  type: '',
  a: {
    a1: '',
    a2: ''
  }
});
const formName = ref<any>(null);
onMounted(() => {
  const { properties, text, type } = props.nodeData.data;
  // properties用于给开发者存放自己的业务属性
  if (properties.length) {
    formData = Object.assign({}, formData, properties);
  }
  //获取节点上的名称,text为对象
  if (text && text.value) {
    formData.text = text.value;
    extendData.text = text.value;
  }
  //获取节点上的类型，type为字符串
  if (type) {
    formData.type = type;
    extendData.type = type;
  }
});

const onSubmit = (): void => {
  if (!formName.value) {
    console.log('mistake');
    return;
  }
  //element-plus表单校验方法
  formName.value.validate((valid: any) => {
    //校验成功
    if (valid) {
      props.lf.setProperties(props.nodeData.data.id, { ...formData });
      if (formData.text.length > 25) {
        formData.text =
          formData.text.substring(0, 25) + '\n' + formData.text.substring(25);
      }
      props.lf.updateText(props.nodeData.data.id, formData.text);
      //关闭节点属性抽屉，从property-dialog组件中获取
      emit('onClose');
      //未通过校验
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  height: 32px;
  line-height: 32px;
  font-weight: 500;
}
</style>
