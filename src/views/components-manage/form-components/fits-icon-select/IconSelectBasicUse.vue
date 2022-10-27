<template>
    <fits-icon-select :options="state" />
</template>

<script lang="ts" setup>
import { FitsIconSelectModel, FitsIconSelect } from '@/fits-components';

const state = reactive(new FitsIconSelectModel({
    select: {
        clearable: true,
    },
}))
</script>
<style lang="scss" scoped>

</style>

<style lang="scss">

</style>
