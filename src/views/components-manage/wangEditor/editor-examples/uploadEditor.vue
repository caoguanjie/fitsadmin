<template>
    <fits-editor @uploadImg="uploadImg" @uploadVideo="uploadVideo" v-model="containerHtml" />
</template>
  
<script setup lang="ts">
let containerHtml = ref("")
const uploadImg = (file: any, callback: any) => {
    // 异步请求
    // uploadImage(file).then(response => {
    //     callback(response.data)
    // }).catch((err: any) => {
    //     console.log("img upload fail:", err)
    // });
    setTimeout(() => {
        //用定时器代替异步请求
        let data = {
            // 图片 src ，必须
            url: 'https://caoguanjie.github.io/fitsadmin/images/logo.png',
            alt: "yyy", // 图片描述文字，非必须
            href: "zzz" // 图片的链接，非必须
        }
        callback(data)
    }, 1000);
}
const uploadVideo = (file: any, callback: any) => {
    setTimeout(() => {
        let data = {
            // 视频 src ，必须
            url: 'https://caoguanjie.github.io/fitsadmin/images/logo.png',
            poster: "xxx.png" // 视频封面图片 url ，可选
        }
        callback(data)
    }, 1000);
}
</script>

<style lang="scss" scoped>

</style>
  