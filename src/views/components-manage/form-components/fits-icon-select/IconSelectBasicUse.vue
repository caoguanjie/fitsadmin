<template>
    <fits-icon-select :options="state" />
</template>

<script lang="ts" setup>
import FitsIconSelect from '@/components/Form/FitsIconSelect.vue';
import { FitsIconSelectModel } from '@/components/Form/model';
import { reactive } from 'vue';

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
