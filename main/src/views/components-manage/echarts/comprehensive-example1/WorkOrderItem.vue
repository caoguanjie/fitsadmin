<template>
    <div class="work-order">
        <work-order-trend-item />
        <work-order-time-out-item />
    </div>
</template>

<script lang="ts" setup>
import WorkOrderTrendItem from "./WorkOrderTrendItem.vue"
import WorkOrderTimeOutItem from "./WorkOrderTimeOutItem.vue"

</script>

<style lang="scss" scoped>
.work-order {
    display: flex;
    height: 521px;
    margin-top: 16px;

    .line {
        flex: 4;
        background: #fff;
        height: 100%;
    }

    .pie {
        background: #fff;
        margin-left: 16px;
        flex: 3;
        height: 100%;
    }
}
</style>
