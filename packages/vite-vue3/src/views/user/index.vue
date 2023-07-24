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
        // width: 85%;
        font-size: 14px;

        .el-form-item {
            // padding: 0 !important;
        }
    }

    @media (max-width: 670px) {

        .info-container,
        .organization {

            .el-form-item {
                // padding-right: 0 !important;
            }
        }
    }

    .el-row>.el-form-item:last-child {
        margin-top: 56px;
        font-size: 18px;
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
        padding: 0 0 58px;
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
