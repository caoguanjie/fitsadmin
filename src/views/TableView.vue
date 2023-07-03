<template>
    <div>组件view<input v-model="myname"> </div>
</template>
<script lang="ts">
export default {
    name: 'TableView'
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

//大概80mb
const a = new Array(20000000).fill(1)
let myname = ref<any>('')
const route = useRoute()
onMounted(() => {
    myname.value = route.query.name
})

</script>

