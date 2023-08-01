<template>
    <div>
        <div class="tophead">
            <p> 开箱即用 , 用最简单的方式体验无界</p>
            <div class="search">
                <el-input v-model="searchKeyword" class="w-50 m-2" placeholder="Type something" :prefix-icon="Search" />
                <el-button type="primary" @click="search">访问</el-button>

            </div>
            <p>您可以输入一个允许跨域访问的 https 协议网站来在线体验 微前端的集成效果</p>
        </div>
        <div class="maincontent">

            <WujieVue v-if="url" width="100%" height="100%" :name="url" :url="url" />
        </div>

    </div>
</template>

<script setup lang="ts" >
import { Search } from '@element-plus/icons-vue'
const searchKeyword = ref('https://wujicode.cn/xy/app/prod/official/index')
const url = ref('')

function search() {
    url.value = searchKeyword.value
}
</script>

<style lang="scss" scoped>
.tophead {
    max-width: 800px;
    margin: 10px auto;
    text-align: center;
}

.search {
    display: flex;
    flex: 1;
    flex-flow: row nowrap;
}

.maincontent {
    height: calc(85vh - 110px);
}
</style>
  