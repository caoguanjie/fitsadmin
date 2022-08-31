<template>
    <div class="ui-container">
        <div class="ui-area">
            <img src="/images/Sketch.png" alt="">
            <div class="text">Sketch 源文件</div>
            <div class="decs">全新的设计文件，结合了element plus的设计风格，提供完整的组件支持。在提升设计效率的同时，保证统一的视觉风格。</div>
            <RouterLink to="/resources/encrypt.html#相关设计文件" style='text-decoration:none'>
                <el-button type="primary">下载</el-button>
            </RouterLink>
        </div>
        <div class="ui-area">
            <img src="/images/PxCook.png" alt="">
            <div class="text">PxCook 源文件</div>
            <div class="decs">由Sketch源文件导出的像素大厨格式，方便前端开发读取元素尺寸、元素距离、文本样式、颜色的智能标注,支持智能切图等等</div>
            <a href="https://github.com/caoguanjie/fitsadmin/blob/master/docs/.vuepress/public/images/PxCook.pxcp"
                style='text-decoration:none'>
                <el-button type="primary">下载</el-button>
            </a>
        </div>
    </div>
</template>

<script lang='ts' setup>



</script>
<style lang='scss' scoped>
.ui-container {
    display: flex;
    justify-content: center;
}

.ui-area {
    width: 40%;
    margin: 5%;
    text-align: center;
    padding: 32px 0 60px;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.ui-area:hover {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12)
}

img {
    display: block;
    width: 120px;
    height: 120px;
}

.text {
    margin: 10px;
    font-size: 18px;
    font-weight: 400;
    color: #606266;
}

.decs {
    margin-top: 8px;
    font-size: 14px;
    color: #99a9bf;
    padding: 0 30px;
    margin: 0 0 16px;
    word-break: break-word;
    line-height: 1.8;
    min-height: 75px;
}

a {
    font-weight: 500;
    text-decoration: none;
    color: #409eff;

}
</style>