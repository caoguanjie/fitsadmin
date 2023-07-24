<template>
    <div class="header">
        <div class="to-do">
            <div class="title">待办事项</div>
            <div class="list">
                <div v-for="(item, index) in state.toDoList" :key="index" class="item">
                    <div class="desc">{{ item.desc }}</div>
                    <div class="num">{{ item.num }}</div>
                </div>
            </div>
        </div>
        <div class="set">
            <div class="title">全局设置</div>
            <div class="time">2022-08-01 —— 2022-08-08</div>
            <div class="update">
                <div class="update-time">更新时间：2021-08-08 15:50</div>
                <div class="updateBtn">更新数据</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const state = reactive({
    toDoList: [
        { desc: "我的代办", num: 1866 },
        { desc: "我的申请", num: 1866 },
        { desc: "我的已办", num: 1866 },
        { desc: "通知事项", num: 1866 },
        { desc: "运维工单", num: 1866 },
        { desc: "备件库", num: 1866 }
    ]
})

</script>

<style lang="scss" scoped>
.header {
    height: 157px;
    display: flex;

    .to-do {
        padding: 16px 24px;
        flex: 4;
        background: #fff;

        .title {
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
                width: 180px;
                height: 80px;
                background-color: #f6f6f6;
                padding: 16px;

                .desc {
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

    .set {
        padding: 16px 24px;
        margin-left: 16px;
        flex: 1;
        background: #fff;
        display: flex;
        flex-direction: column;

        .title {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #303133;
        }

        .time {
            width: 200px;
            height: 32px;
            border-radius: 2px;
            border: solid 1px #dcdfe6;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 16px 0 24px 0;
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #303133;
        }

        .update {
            display: flex;

            .update-time {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #999999;
            }

            .updateBtn {
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #007dff;
                margin-left: 16px;
            }
        }
    }
}
</style>
