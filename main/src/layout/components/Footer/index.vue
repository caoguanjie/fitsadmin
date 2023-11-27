<template>
    <div class="footeContainer">
        <div class="left">
            <breadcrumb v-if="swicthhamburgerPotion == 'bottom' && isshowFooterBreadcrumb" id="breadcrumb-container"
                class="breadcrumb-container" />
        </div>
        <div class="right">
            <span> {{ title }}V{{ packagesInfo.version }}</span>
            <el-tooltip :content="state.content" effect="footer-customized" placement="top" :visible="state.isShow"
                :auto-close="3000">
                <span class="update" @click="checkForUpdate">检查更新 <svg-icon icon-class="fits-update" /></span>
            </el-tooltip>

        </div>
    </div>
</template>

<script lang='ts' setup>
import ENV from '@/environment/index';
import Breadcrumb from '@/layout/components/Breadcrumb/index.vue';
import useStore from '@/store';
import { SvgIcon } from '@/fits-components';
import { ElNotification } from 'element-plus'
import packagesInfo from '../../../../package.json'
import { isPlatform } from '@/utils/base/platform';
const { project: { title, version } } = ENV
const { setting } = useStore();
const state = reactive({
    isShow: false,
    content: '检测到您有新版本更新...'
})
const swicthhamburgerPotion = computed(() => setting.breadcrumbPosition);
const isshowFooterBreadcrumb = computed(() => setting.showFooterBreadcrumb);
onMounted(() => {
    // 只有electron平台才有应用更新功能
    if (isPlatform('electron')) {
        checkForUpdate()
        // 监听主线程返回的更新的信息
        window.ipcRenderer.on('updateMessage', ({ action, updateInfo }: any) => {
            console.log(action, updateInfo)
            switch (action) {
                case 'updateAva': {
                    state.isShow = true;
                    break;
                }
                case 'error': {
                    ElNotification({
                        title: '温馨提示',
                        type: 'error',
                        duration: 10000,
                        offset: 20,
                        message: `更新失败,报错原因：${updateInfo}`,
                        position: 'top-right'
                    })
                    break;
                }
                case 'updateNotAva': {
                    // 没有更新信息
                }
            }
        })

        // 监听下载应用的进度
        window.ipcRenderer.on('downloadProgress', ({ percent }: any) => {
            state.content = `正在下载中...进度：${percent}%`
            if (percent === 100) {
                window.ipcRenderer.send('isUpdateNow')
            }
        })
    }


})

function checkForUpdate() {
    if (!isPlatform('electron')) {
        ElMessageBox.confirm(
            `下载最新客户端，得到更好的用户体验`,
            '客户端下载', {
            confirmButtonText: '马上下载',
            cancelButtonText: '下次再说',
        }
        ).then(() => {
            if (isPlatform('window')) {
                window.open('http://192.168.32.60:3001/release/FitsAdmin-v2.1.0-darwin-ia32-setup.exe', '_blank')
            } else if (isPlatform('mac')) {
                window.open('http://192.168.32.60:3001/release/FitsAdmin-v2.1.0-darwin.dmg', '_blank')
            }
        })
    } else {
        // 开始检查
        window.ipcRenderer.send('checkForUpdate')
        state.isShow && confirm();
    }


}

function confirm() {
    ElMessageBox.confirm(
        `<p>1. 集成了wujie作为微前端方法</p><p>2. 集成electron的技术</p>`,
        '更新提醒', {
        confirmButtonText: '马上更新',
        cancelButtonText: '下次再说',
        dangerouslyUseHTMLString: true,
    }
    ).then(() => {
        window.ipcRenderer.send('downloadUpdate')
    })
}
</script>
<style lang='scss'>
.el-popper.is-footer-customized {
    padding: 6px 12px;
    background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-footer-customized .el-popper__arrow::before {
    background: linear-gradient(45deg, #b2e68d, #bce689);
    right: 0;
}
</style>
<style lang='scss' scoped>
.footeContainer {
    position: fixed;
    bottom: 0;
    z-index: 1001;
    height: 24px;
    background-color: #333333;
    width: 100%;
    padding: 0 30px;
    display: flex;
    color: #fff;
    align-items: center;
    font-size: 10px;

    .left {
        flex: 1;

    }

    .update {
        color: #FCAC33;
        margin-left: 10px;
        font-size: 12px;
    }



    .right {
        cursor: pointer;
        user-select: none;
    }


}
</style>