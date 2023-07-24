<template>
    <div class="fits-group-conditions">
        <div v-for="item in conditions" :key="item.value" :class="item.value === modelValue ? 'active' : ''"
            @click="changeCondition(item.value)">
            {{ item.name }}
        </div>
    </div>
</template>

<script lang="ts" setup name="GroupConditions">
import { toRefs } from 'vue';
import { IFitsGroupCondition } from '../type';

const emit = defineEmits(["update:modelValue"])
const props = defineProps<{ conditions: IFitsGroupCondition[], modelValue: string | number }>()
const { conditions, modelValue } = toRefs(props)

/**
 * 点击分组条件
 */
function changeCondition(value: string | number) {
    // 如果点击的是当前选中的条件，则取消选中，默认查询全部
    emit("update:modelValue", modelValue.value === value ? "" : value)
}
</script>

<style lang="scss" scoped>
.fits-group-conditions {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    div {
        margin: 0 10px 10px 0;
        font-family: SimSun;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 19px;
        letter-spacing: 0px;
        color: #6b9edd;
        padding: 8px 29px;
        border-radius: 10px;
        border: solid 1px #6b9edd;
        cursor: pointer;
    }

    .active {
        background-color: #6b9edd;
        color: #ffffff;
    }
}
</style>