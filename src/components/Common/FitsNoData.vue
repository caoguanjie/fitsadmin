<template>
    <div class="nodata" :style="{height: props.height}">
        <SvgIcon icon-class="nodata" />
        <div class="text">暂无数据</div>
    </div>
</template>

<script lang='ts' setup>
// 默认是300px
const props = withDefaults(defineProps<{
    height?: string,
}>(), {
    height: '300px'
})

</script>
<style lang='scss' scoped>
.nodata {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #666;
    text-align: center;


    & .svg-icon {
        font-size: 100px;
    }

    & .text {
        margin-left: -8px;
    }
}
</style>