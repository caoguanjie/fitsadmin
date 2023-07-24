<template>
    <div class="condition">
        <div class="time">
            <div :class="time === 'today' ? 'item active' : 'item'" @click="changeTime('today')">今天</div>
            <div :class="time === 'seven' ? 'item active' : 'item'" @click="changeTime('seven')">近7天</div>
            <div :class="time === 'thirty' ? 'item active' : 'item'" @click="changeTime('thirty')">近30天</div>
            <el-date-picker :class="time === 'range' ? 'active' : ''" v-model="timeRange" type="daterange" unlink-panels
                range-separator="一" start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts"
                @change="rangeTimeChange" />
        </div>
        <div class="selects">
            <el-select v-model="project" placeholder="所属项目" @change="emit('refreshData')">
                <el-option v-for="item in projectOps" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="workGroup" placeholder="选择工作组" @change="emit('refreshData')">
                <el-option v-for="item in workGroupOps" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(["refreshData"])
const state = reactive({
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
    time: "today",
    project: "",
    workGroup: "",
    timeRange: "",
})

const { projectOps, workGroupOps, time, project, workGroup, timeRange, shortcuts } = toRefs(state)

function changeTime(str: string) {
    if (str === time.value) return
    time.value = str
    emit("refreshData")
}

function rangeTimeChange() {
    time.value = "range"
    emit("refreshData")
}
</script>

<style lang="scss" scoped>
.condition {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    .time {
        display: flex;
        flex-shrink: 0;

        .item {
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #909399;
            padding: 8px 18px;
            height: 32px;
            background-color: #ffffff;
            border-radius: 2px;
            border: solid 1px #dcdfe6;
            margin-right: 8px;
            cursor: pointer;

            &.active {
                color: #007dff;
                border-color: #007dff;
            }
        }

        :deep(.el-date-editor) {
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
    }

    .selects {
        display: flex;
        justify-content: flex-end;
        flex: 1;

        .el-select {
            margin-left: 8px;
        }
    }
}
</style>
