<template>
    <div class="checkboxAll">
        <!-- 全选按钮 -->
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
            全选
        </el-checkbox>

        <el-checkbox-group v-model="checkedValue" @change="handleCheckedChange" v-bind=checkboxGroup>
            <el-checkbox v-for="item in option" :key="item.label" v-bind="item">
                {{ item.label }}
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script lang="ts" setup name="FitsCheckboxAll">
import { CheckboxValueType } from 'element-plus';
import { onMounted, reactive, toRefs, watch, useAttrs } from 'vue'
import { FitsCheckboxAllModel } from './model';

const props = withDefaults(defineProps<{ options?: FitsCheckboxAllModel }>(), {
    options: () => new FitsCheckboxAllModel()
})
const { option, checkboxGroup }: any = toRefs(props.options)

const emit = defineEmits(["update:modelValue"])

const state: any = reactive({
    checkAll: false,
    isIndeterminate: true,
    checkedValue: []
})
const { checkAll, isIndeterminate, checkedValue } = toRefs(state)

const _attrs = useAttrs()

watch(() => _attrs.modelValue, () => {
    checkedValue.value = _attrs.modelValue
})

watch(checkedValue, (val: any) => {
    if (val === undefined) return
    checkAll.value = val?.length === option.value.length
    isIndeterminate.value = val?.length < option.value.length && val.length > 0
})

onMounted(() => {
    if (!_attrs.modelValue) return
    checkedValue.value = _attrs.modelValue
})

/**
 * @desc 全选按钮状态改变
 */
function handleCheckAllChange(val: CheckboxValueType) {
    checkedValue.value = []
    if (val) {
        option.value.map((item: any) => checkedValue.value.push(item.label))
    }
    // 将Proxy对象结构，转为普通对象
    emit('update:modelValue', [...checkedValue.value])

}

/**
 * @desc 选项的状态改变，改变全选按钮的状态
 */
function handleCheckedChange(val: CheckboxValueType[]) {
    // 已选的个数 === 全部选项的个数
    checkAll.value = val.length === option.value.length
    emit('update:modelValue', [...checkedValue.value])
}
</script>
