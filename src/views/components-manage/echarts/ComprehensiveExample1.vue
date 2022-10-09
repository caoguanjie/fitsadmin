<template>
    <div class="comprehensive-example">
        <header-item />
        <more-work-group-item />
        <work-order-item />
        <single-work-group-item />
    </div>
</template>

<script lang="ts" setup>
import HeaderItem from "./comprehensive-example1/HeaderItem.vue"
import SingleWorkGroupItem from "./comprehensive-example1/SingleWorkGroupItem.vue"
import WorkOrderItem from "./comprehensive-example1/WorkOrderItem.vue"
import MoreWorkGroupItem from "./comprehensive-example1/MoreWorkGroupItem.vue"

</script>

<style lang="scss" scoped>
.comprehensive-example {
    padding-bottom: 50px;
    min-width: 1670px;
}
</style>
