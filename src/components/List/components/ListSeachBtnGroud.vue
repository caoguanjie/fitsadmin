<template>
    <div class="searchBtns">
        <el-button type="primary" @click="submit" class="search" :icon="Search">搜索</el-button>
        <el-button @click="reset" class="reset" :icon="RefreshLeft">重置</el-button>
        <el-button link class="expand" @click="handleExpand">{{!isExpand ? "展开" :'收起'}}
            <el-icon class="expandicon">
                <ArrowDown v-if="!isExpand" />
                <ArrowUp v-else />
            </el-icon>
        </el-button>
    </div>
</template>

<script lang='ts' setup>
import { ArrowDown, ArrowUp, Search, RefreshLeft } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
    isExpand: boolean,
}>(), {
    isExpand: false
});

const { isExpand } = toRefs(props);

const emit = defineEmits(['submit', 'reset', 'getOpenStatus'])



// 搜索
const submit = () => emit('submit')
// 重置
const reset = () => emit('reset')
// 展开或者收起
const handleExpand = () => {
    emit('getOpenStatus')
}



</script>
<style  lang='scss' >
.searchBtns {

    .el-button.el-button--primary {
        background-color: var(--fits-menu-active-color);


    }
}
</style>
<style lang='scss' scoped>
.searchBtns {
    text-align: center;
}

.search,
.reset {
    width: 75px;
    margin-left: 16px;
    font-size: 12px;
}

.expand {
    border: 0;
    background: transparent;
    color: var(--fits-menu-active-color);
    font-size: 13px;
    margin-left: 16px;

    & .expandicon {
        margin-left: 3px;
    }
}

:deep(.el-button.is-link:not(.is-disabled):active) {
    color: var(--fits-menu-active-color);
}
</style>