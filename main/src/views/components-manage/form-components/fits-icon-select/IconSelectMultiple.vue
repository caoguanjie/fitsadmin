<template>
    <div class="iconSelectMultiple">
        <div class="box">
            <div class="innerTitle">基础多选</div>
            <fits-icon-select :options="state1" />
        </div>
        <div class="box">
            <div class="innerTitle">多选项通过文字展示</div>
            <fits-icon-select :options="state2" />
        </div>
    </div>
    <div class="outerBox">
        <div class="innerTitle">鼠标悬浮文字出现多选项标签</div>
        <fits-icon-select :options="state3" />
    </div>
</template>

<script lang="ts" setup>
import { FitsIconSelect } from '@/fits-components';
import { FitsIconSelectModel } from '@/fits-components/type';
import { reactive } from 'vue'

const state1 = reactive(new FitsIconSelectModel({
    select: {
        multiple: true,
    },
}))

const state2 = reactive(new FitsIconSelectModel({
    select: {
        multiple: true,
        collapseTags: true
    },
}))

const state3 = reactive(new FitsIconSelectModel({
    select: {
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true
    },
}))

</script>
<style lang="scss" scoped>
.iconSelectMultiple {
    display: flex;

    .box {
        flex: 1;

        :deep(.el-select) {
            width: 90%;
        }
    }
}

.outerBox {
    margin-top: 10px;
}
</style>

<style lang="scss">

</style>
