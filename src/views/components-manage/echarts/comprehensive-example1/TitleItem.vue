<template>
    <div class="header">
        <div class="title">{{ title }}</div>
        <div class="refresh-wrap" @click="refreshData">
            <el-icon color="#007dff">
                <Refresh />
            </el-icon>
            <div class="refresh">
                <div>刷新</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Refresh } from '@element-plus/icons-vue';

const emit = defineEmits(["refreshData"])
const props = withDefaults(defineProps<{ title: string }>(), { title: "" })
const { title } = toRefs(props)

function refreshData() {
    emit("refreshData")
}
</script>

<style lang="scss" scoped>
.header {
    height: 40px;
    background-color: #f7f8fa;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .title {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #303133;
        position: relative;
        padding-left: 12px;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 70%;
            background-color: #007dff;
        }
    }

    .refresh-wrap {
        display: flex;
        align-items: center;
        cursor: pointer;

        .refresh {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #007dff;
        }
    }
}
</style>
