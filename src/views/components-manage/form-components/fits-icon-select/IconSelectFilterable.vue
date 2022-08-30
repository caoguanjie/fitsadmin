<template>
    <div class="iconSelectFilterable">
        <div class="filterType">
            <span>开启外部输入筛选</span>
            <fits-icon-select :options="state" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import FitsIconSelect from '@/components/Form/FitsIconSelect.vue';
import { FitsIconSelectModel } from '@/components/Form/model';
import { reactive } from 'vue'

const state = reactive(new FitsIconSelectModel({
    input: {
        show: false,
    },
    select: {
        filterable: true
    },
}))


</script>
<style lang="scss" scoped>
.iconSelectFilterable {
    display: flex;

    .filterType {
        flex: 1;
    }
}
</style>

<style lang="scss">
.iconSelectFilterable {
    .el-select {
        width: 90% !important;
        margin-top: 10px;
    }
}
</style>
