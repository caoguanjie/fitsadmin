<template>
    <fits-icon-select :options="state" />
</template>

<script lang="ts" setup>
import { FitsIconSelect } from '@/fits-components';
import { FitsIconSelectModel } from '@/fits-components/type'
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
