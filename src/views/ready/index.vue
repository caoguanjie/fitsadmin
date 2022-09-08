<template>
    <div class="ready-container">
        <div class="welcomebg" />
        <div class="title-box">
            <div class="title">功能开发中…</div>
            <div class="title">正在努力研发中，敬请期待哦～～～</div>
            <div class="subtitle">This feature is under development, so stay tuned~~~</div>
        </div>
        <vxe-table border :data="tableData">
            <vxe-column type="seq" width="60" />
            <vxe-column field="name" title="Name">
                <template #default="{ row }">
                    <span>自定义插槽模板 {{ row.name }}</span>
                </template>
            </vxe-column>
            <vxe-column field="sex" title="Sex" />
            <vxe-column field="age" title="Age" />
        </vxe-table>
    </div>
</template>

<script lang='ts' setup>

const tableData = reactive([
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
])
</script>
<style lang='scss' scoped>
.ready-container {
    position: relative;
    height: calc(100vh - $headHeight - $tagsViewHeight - $basePadding);
    background-color: #fff;
    background-image: linear-gradient(180deg,
            #eff5fd 0%,
            #ffffff 100%);

    background-position: top center;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .welcomebg {
        position: absolute;
        width: 100%;
        height: inherit;
        background: url(@/assets/Base/ready.svg) no-repeat;
        background-position: 80% 60%;
        background-size: auto 50%;
    }

    .title-box {
        position: absolute;
        left: 70px;
        top: 140px;

        .title {

            font-size: 30px;
            color: #1b8afe;
            font-weight: 500;
        }

        .subtitle {
            margin-top: 10px;
            font-size: 16px;
            color: #999999;
        }
    }

}
</style>