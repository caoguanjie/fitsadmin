<template>
    <el-empty :description="props.description" :image-size="props.imageSize" :image="props.image" />
</template>

<script lang='ts' setup name="FitsEmpty">

const props = withDefaults(defineProps<{
    image?: string,
    imageSize?: number,
    description?: string,
}>(), {
    image: new URL(`../../../assets/icons/nodata.svg`, import.meta.url).href,
    description: '暂无数据',
    imageSize: 120
})
</script>
