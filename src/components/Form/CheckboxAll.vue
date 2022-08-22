<template>
    <!-- 全选按钮 -->
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange" style="width: 100%">
        全选
    </el-checkbox>
    <el-checkbox-group v-model="checkedValue" @change="handleCheckedChange">
        <el-checkbox v-for="item in options" :key="item.label" :label="item.label" :disabled="item.disabled"
            :checked="item.checked">
            {{ item.label }}
        </el-checkbox>
    </el-checkbox-group>
</template>

<script lang="ts" setup>
import { CheckboxValueType } from 'element-plus';
import { onMounted, reactive, toRefs, watch } from 'vue'

const prop = withDefaults(defineProps<{
    modelValue: any,
    options: any
}>(), {
    modelValue: [],
    options: [],
})

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
    checkedValue.value = prop.modelValue
    checkAll.value = checkedValue.value.length === prop.options.length
    isIndeterminate.value = !checkAll.value
})

function handleCheckAllChange(val: CheckboxValueType) {
    checkedValue.value = []
    if (val) {
        prop.options.map((item: any) => checkedValue.value.push(item.label))
    }
    isIndeterminate.value = false
}

function handleCheckedChange(value: CheckboxValueType[]) {
    const checkedCount = value.length
    checkAll.value = checkedCount === prop.options.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < prop.options.length
}
</script>
