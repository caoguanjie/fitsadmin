
import { on } from 'events';
<template>
    <div class="electron-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="请输入你要传输给dll文件的参数">
                <el-input v-model="formInline.keyword" placeholder="类型：string" clearable />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleDllFile">确定</el-button>
            </el-form-item>

            <el-form-item>
                <p>dll回调内容：{{ formInline.result }}</p>
            </el-form-item>
        </el-form>

        <el-form :inline="true" :model="formInline2" class="demo-form-inline">
            <el-form-item label="请输入你要传输给winform界面的参数">
                <el-input v-model="formInline2.keyword" placeholder="类型：string" clearable />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="openWinform">打开一个新的winform窗口</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts' setup>
const formInline = reactive({
    keyword: '',
    result: ''
})

const formInline2 = reactive({
    keyword: '',
})
function handleDllFile() {
    window.ipcRenderer.send('openWinFormWindow', {
        methodName: 'ShowText',
        params: formInline.keyword
    })
}

function openWinform() {
    window.ipcRenderer.send('openWinFormWindow', {
        methodName: 'ShowForm',
        params: formInline2.keyword
    })
}

onMounted(() => {
    window.ipcRenderer.on('handleWinFormWindow', ({ error, value }: any) => {
        console.log(error, value)
        if (error) {
            ElMessageBox.alert(`winform界面无法打开，错误提示：${error}`, '提示', {});
            return
        }
        formInline.result = value
    })
})
</script>
<style lang='scss' scoped>
.electron-container {
    padding: 10px;
    background: #fff;
    height: 100%;
}
</style>