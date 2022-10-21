<template>
    <fits-form-create :form="form" class="fits-input-search" />
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { FitsFormCreateModel } from '@/components/Common/model'
import FitsFormCreate from '@/components/Common/FitsFormCreate.vue';

const form = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "input",
                // title: "输入框",
                field: "input",
                props: {
                    prefixIcon: markRaw(Search),
                    placeholder: '搜索用户'
                },
            },
        ],
        option: {
            form: {
                labelPosition: 'right',
                inline: true
            },
            resetBtn: false,
            onSubmit: (formData: any) => {
                alert(JSON.stringify(formData))
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