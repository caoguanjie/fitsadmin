<template>
    <fits-form-create :form="form" class="fits-input-search" />
</template>

<script setup lang="ts" name="FitsInputSearch">
import { Search } from '@element-plus/icons-vue'
import { FitsFormCreate } from '@/fits-components';
import { reactive, markRaw } from 'vue';
import { FitsFormCreateModel } from '@/fits-components/type';

const props = defineProps<{
    defaultValue?: string | number;
}>();

const emit = defineEmits(["inputSearch", "inputChange"])

const form = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "input",
                field: "input",
                props: {
                    prefixIcon: markRaw(Search),
                    placeholder: '搜索用户',
                    onInput: (val: string) => {
                        emit('inputChange', val)
                    }
                },
                value: props.defaultValue
            },
        ],
        option: {
            form: {
                labelPosition: 'right',
                inline: true
            },
            resetBtn: false,
            onSubmit: (formData: any) => {
                emit('inputSearch', formData.input)
            },
            submitBtn: {
                innerText: '搜索'
            }
        },
    })
)

</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.fits-input-search {
    :deep(.el-form-item) {
        padding: 0;
        margin: 0;
        min-width: 100px;

        .el-button {
            margin-left: 10px;
        }
    }
}
</style>