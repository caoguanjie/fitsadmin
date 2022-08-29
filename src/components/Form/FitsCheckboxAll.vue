<template>
    <!-- 全选按钮 -->
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange" style="width: 100%">
        全选
    </el-checkbox>
    <el-checkbox-group v-bind=checkboxGroup v-model="checkedValue" @change="handleCheckedChange">
        <el-checkbox v-for="item in option" :key="item.label" v-bind="item">
            {{ item.label }}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script lang="ts" setup>
import { CheckboxValueType } from 'element-plus';
import { onMounted, reactive, toRefs, watch } from 'vue'
import { FitsCheckboxAllModel } from './model';

const props = withDefaults(defineProps<{ options?: FitsCheckboxAllModel }>(), {
    options: () => new FitsCheckboxAllModel()
})
const { modelValue, option, checkboxGroup }: any = toRefs(props.options)

const emit = defineEmits(["update:modelValue"])

const state: any = reactive({
    checkAll: false,
    isIndeterminate: true,
    checkedValue: []
})
const { checkAll, isIndeterminate, checkedValue } = toRefs(state)

watch(() => checkedValue.value, (val: any) => {
    emit("update:modelValue", val);
})

onMounted(() => {
    checkedValue.value = modelValue.value
    checkAll.value = checkedValue.value?.length === option.value?.length
    isIndeterminate.value = !checkAll.value
})

function handleCheckAllChange(val: CheckboxValueType) {
    checkedValue.value = []
    if (val) {
        option.value.map((item: any) => checkedValue.value.push(item.label))
    }
    isIndeterminate.value = false
}

function handleCheckedChange(value: CheckboxValueType[]) {
    const checkedCount = value?.length
    checkAll.value = checkedCount === option.value?.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < option.value?.length
}
</script>
