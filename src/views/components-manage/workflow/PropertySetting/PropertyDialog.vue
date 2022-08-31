<template>
    <div class="property-dialog">
        <common-property :nodeData="nodeData" :lf="props.lf" @onClose="handleClose"/>
    </div>
</template>
<script lang="ts" setup>
import CommonProperty from '@/views/components-manage/workflow/PropertySetting/CommnProperty.vue'
import { onMounted } from 'vue';
const props = defineProps<{
    lf:any;
    nodeData:any;
}>();
const emit = defineEmits([
    "setPropertiesFinish"
])
onMounted(()=>{
    // console.log(props.nodeData)
})
//关闭节点属性抽屉，从index中接收，传递给common-property组件
function handleClose(){
    emit("setPropertiesFinish")
}
</script>
<style>
</style>
