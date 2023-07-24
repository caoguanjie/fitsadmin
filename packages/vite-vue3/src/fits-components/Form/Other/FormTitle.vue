<template>
    <div class="form-divider">
        {{ modelValue }}
    </div>
</template>

<script setup lang="ts"  name="FormTitle">

defineProps<{
    modelValue: string
}>()

</script>

<style lang="scss" scoped>
.form-divider {
    background: #e8f4ff;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    color: #007dff;
    padding: 5px 0 5px 12px;
    line-height: 20px;
    // margin-bottom: 24px;
}
</style>
<style lang="scss">

</style>
