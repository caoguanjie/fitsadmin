<template>
    <div :class="isActive ? 'fits-card active' : 'fits-card'">
        <!-- 标题插槽,vue3outline会将注释也认为是目录内容 -->
        <h1>
            <slot name="title" :title="title">{{ title }}</slot>
        </h1>
        <div class="desc">
            <!-- 描述插槽 -->
            <slot name="desc" :desc="desc">{{ desc }}</slot>
        </div>
        <!-- 范例组件内容插槽 -->
        <slot />
    </div>
</template>

<script lang="ts" setup>
/**
 * FitsCard组件的props（在vue3中，如果interface从外部导入作为props的类型时会报错，如果在同一文件中就不会）
 * 官方问题链接：https://github.com/vuejs/core/issues/4294
 * @member title 标题
 * @member desc 描述
 * @member isActive 是否选中（右侧浏览的锚点是否是当前组件）
 */
export interface FitsCardProps {
    title?: string
    desc?: string
    isActive?: boolean
}

const props = withDefaults(defineProps<FitsCardProps>(), {
    title: "",
    desc: "",
    isActive: false
})
const { title, desc, isActive } = toRefs(props)

</script>

<style lang="scss" scoped>
.fits-card {
    max-width: 1000px;
    min-height: 180px;
    background: #ffffff;
    font-family: MicrosoftYaHei;
    padding: 24px;
    border: 1px solid rgba(151, 151, 151, 0.49);
    border-radius: 10px;
    margin: 0 auto;
    margin-bottom: 24px;
    overflow: hidden;

    &.active {
        border-color: rgb(0, 125, 255);
    }

    h1 {
        font-size: 20px;
        color: #303133;
        font-weight: 400;
        margin-bottom: 8px;
        margin-top: 0;
    }

    .desc {
        font-size: 14px;
        color: #606266;
        font-weight: 400;
        margin-bottom: 24px;
    }
}
</style>