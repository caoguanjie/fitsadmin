<template>
    <div class="comprehensive-example">
        <div class="top">
            <single-work-group-item />
            <div class="right">
                <div class="set">
                    <div class="set-title">全局设置</div>
                    <el-date-picker v-model="timeRange" type="daterange" unlink-panels range-separator="一"
                        start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" />
                    <div class="update">
                        <span>更新时间：2021-12-14 15:50</span>
                        <span>更新数据</span>
                    </div>
                </div>
                <div class="to-do">
                    <div class="to-do-title">待办事项</div>
                    <div class="list">
                        <div class="item">
                            <div class="name">我的待办</div>
                            <div class="num">1866</div>
                        </div>
                        <div class="item">
                            <div class="name">我的待办</div>
                            <div class="num">1866</div>
                        </div>
                        <div class="item">
                            <div class="name">我的待办</div>
                            <div class="num">1866</div>
                        </div>
                    </div>
                </div>
                <div class="to-do">
                    <div class="to-do-title">待办事项</div>
                    <div class="list">
                        <div class="item">
                            <div class="name">我的待办</div>
                            <div class="num">1866</div>
                        </div>
                        <div class="item">
                            <div class="name">我的待办</div>
                            <div class="num">1866</div>
                        </div>
                        <div class="item">
                            <div class="name">我的待办</div>
                            <div class="num">1866</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle">
            <work-order-trend-item />
            <work-order-time-out-item />
        </div>
        <more-work-group-item />
    </div>
</template>

<script lang="ts" setup>
import MoreWorkGroupItem from "./comprehensive-example2/MoreWorkGroupItem.vue"
import SingleWorkGroupItem from "./comprehensive-example2/SingleWorkGroupItem.vue"
import WorkOrderTrendItem from "./comprehensive-example2/WorkOrderTrendItem.vue"
import WorkOrderTimeOutItem from "./comprehensive-example2/WorkOrderTimeOutItem.vue"

const state = reactive({
    timeRange: "",
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
})
const { timeRange, shortcuts } = toRefs(state)

</script>

<style lang="scss" scoped>
.comprehensive-example {
    padding-bottom: 50px;
    min-width: 1670px;

    .top {
        height: 473px;
        display: flex;

        .right {
            height: 100%;
            flex: 2;
            margin-left: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .set {
                height: 127px;
                background: #fff;
                padding: 16px 24px;

                .set-title {
                    font-family: MicrosoftYaHei-Bold;
                    font-size: 16px;
                    font-weight: bold;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #303133;
                }

                .update {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #999999;

                    span:nth-child(2) {
                        color: #007dff;
                        margin-left: 16px;
                    }
                }

                :deep(.el-date-editor) {
                    width: auto;
                    border-radius: 2px;
                    margin: 16px 0 11px 0;

                    &>.el-icon {
                        display: none;
                    }

                    .el-range-separator {
                        flex: initial;
                    }
                }
            }

            .to-do {
                height: 157px;
                background: #fff;
                padding: 16px 24px;

                .to-do-title {
                    font-family: MicrosoftYaHei;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #303133;
                    margin-bottom: 16px;
                }

                .list {
                    display: flex;
                    justify-content: space-between;

                    .item {
                        width: 130px;
                        height: 80px;
                        padding: 16px;
                        background-color: #f6f6f6;

                        .name {
                            font-family: MicrosoftYaHei;
                            font-size: 12px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #303133;
                            margin-bottom: 8px;
                        }

                        .num {
                            font-family: MicrosoftYaHei;
                            font-size: 18px;
                            font-weight: bold;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #303133;
                        }
                    }
                }
            }
        }
    }

    .middle {
        margin-top: 16px;
        height: 470px;
        display: flex;
    }
}
</style>
