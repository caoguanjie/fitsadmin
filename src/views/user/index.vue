<template>
    <div class="user-container">
        <el-tabs v-model="activeName" tab-position="left" class="demo-tabs">
            <el-tab-pane label="基本信息" name="info">
                <basic-info :userDetail="userDetail" />
            </el-tab-pane>
            <el-tab-pane label="组织关系" name="reladddtion">
                <organization :userDetail="userDetail" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import BasicInfo from './components/BasicInfo.vue'
import Organization from './components/Organization.vue'
import { getUserDetail } from '@/api/base/user'

const state = reactive({
    activeName: "info",
    userDetail: {}
})

const { activeName, userDetail } = toRefs(state);

onMounted(() => {
    getUser()
})

async function getUser() {
    const { ReturnData }: any = await getUserDetail({
        /* Your params here */
    });
    userDetail.value = ReturnData
}
</script>

<style lang="scss">
.user-container {
    .form-create {
        width: 60%;
        font-size: 14px;
    }

    .footerBtn {
        border-radius: 0;
    }

    .title {
        padding: 8px;
        color: #333;
        font-weight: 700;
        font-size: 16px;
    }

    .el-row {
        justify-content: space-between;
    }

    .el-form-item {
        margin: 0;
        margin-top: 28px;
        min-width: 47%;
    }

    .el-input,
    .el-select {
        width: 100%;
        height: 32px;
    }

    .el-row>.el-form-item:last-child {
        margin-top: 56px;
        font-size: 18px;

        .el-button+.el-button {
            margin-left: 16px;
        }

        button {
            border-radius: 2px;
            font-size: 12px;
        }

        button:first-child {
            padding: 8px 12px;
        }

        button:last-child {
            padding: 8px 21px;
        }
    }

    .el-tabs__nav.is-left {
        padding: 15px 0;
    }

    .el-tabs__header {
        background: transparent;
        margin-right: 0 !important;
    }

    .el-tabs__content {
        background: #fff;
    }

    .el-tabs__item {
        font-size: 12px;
        height: 36px;
        margin: 11px 0;
        width: 80px;
    }

    .el-tabs__active-bar {
        width: 0 !important;
    }

    .el-tabs--left .el-tabs__nav-wrap.is-left::after {
        width: 0;
    }

    .el-tabs__content {
        padding: 0 30px 80px;
    }

    .el-tabs__item.is-left.is-active {
        border-radius: 30px 0 0 30px;
        background: #fff;
    }

    .el-tabs__item.is-left.is-active::after {
        content: "";
        position: absolute;
        right: 0px;
        bottom: 36px;
        width: 25px;
        height: 25px;
        background: radial-gradient(circle at 0% 0%, transparent 25px, #fff 0);
    }

    .el-tabs__item.is-left.is-active::before {
        transform: rotate(180deg);
        content: "";
        position: absolute;
        right: 0px;
        bottom: -25px;
        width: 25px;
        height: 25px;
        background: radial-gradient(circle at 100% 0%, transparent 25px, #fff 0);
    }

}
</style>
<style lang="scss" scoped>
.user-container {}
</style>