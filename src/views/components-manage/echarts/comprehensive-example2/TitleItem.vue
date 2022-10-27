<template>
    <div class="header">
        <div class="left">
            <div class="title">{{ title }}</div>
            <div class="refresh-wrap" @click="emit('refreshData')">
                <el-icon color="#007dff">
                    <Refresh />
                </el-icon>
                <div class="refresh">
                    <div>刷新</div>
                </div>
            </div>
        </div>
        <div class="right">
            <slot>
                <el-select v-model="project" placeholder="所属项目" @change="emit('refreshData')">
                    <el-option v-for="item in projectOps" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="workGroup" placeholder="选择工作组" @change="emit('refreshData')">
                    <el-option v-for="item in workGroupOps" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-date-picker v-model="timeRange" type="daterange" unlink-panels range-separator="一"
                    start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts"
                    @change="emit('refreshData')" />
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FitsEchartsProps } from "@/fits-components";
import { Refresh } from '@element-plus/icons-vue';

const emit = defineEmits(["refreshData"])
const props = withDefaults(defineProps<{ title: string }>(), { title: "" })
const state = reactive({
    echartsOptions: new FitsEchartsProps({
        legend: {
            show: true,
            positon: "topRight",
            data: [
                { name: "新建状态", color: "rgba(91, 143, 249, 0.85)" },
                { name: "处理中", color: "rgba(90, 216, 166, 0.85)" },
                { name: "挂起", color: "#7484a1" },
                { name: "失败解决", color: "#f6c638" },
                { name: "成功解决", color: "#ea7d64" },
                { name: "已关闭", color: "#82cfee" },
            ]
        },
        isShowZoom: true,
        isStack: true,
        hasBarRadius: false
    }),
    projectOps: [
        { value: "工时系统", label: "工时系统" },
        { value: "个案管理系统", label: "个案管理系统" },
        { value: "电子病历", label: "电子病历" },
    ],
    workGroupOps: [
        { value: "网络组", label: "网络组" },
        { value: "运维组", label: "运维组" },
        { value: "客户组", label: "客户组" },
        { value: "维修组", label: "维修组" },
        { value: "框架组", label: "框架组" },
    ],
    shortcuts: [
        {
            text: '昨天',
            value: () => {
                const end = new Date()
                const start = moment().subtract(1, 'days').valueOf()
                return [start, end]
            },
        },
        {
            text: '近3个月',
            value: () => {
                const end = new Date()
                const start = moment().subtract(90, 'days').valueOf()
                return [start, end]
            },
        },
        {
            text: '近半年',
            value: () => {
                const end = new Date()
                const start = moment().subtract(180, 'days').valueOf()
                return [start, end]
            },
        },
    ],
    project: "",
    workGroup: "",
    timeRange: "",
})

const { projectOps, workGroupOps, project, workGroup, timeRange, shortcuts } = toRefs(state)
const { title } = toRefs(props)

</script>

<style lang="scss" scoped>
.header {
    height: 48px;
    background-color: #f7f8fa;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    align-items: center;

    .left {
        display: flex;
        align-items: center;
        flex-shrink: 0;

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
            margin-left: 8px;

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

    .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 1;

        :deep(.el-date-editor) {
            flex-grow: initial;
            width: auto;
            border-radius: 2px;

            &>.el-icon {
                display: none;
            }

            .el-range-separator {
                flex: initial;
            }

            &>.el-range-input {
                width: 80px;
            }

            &.active {
                --el-input-border-color: #007dff;

                &>.el-range-input {
                    color: #007dff;
                }
            }
        }

        .el-select {
            margin-right: 8px;
        }
    }
}
</style>
