<template>
    <div class="app-container guidePage" id="guide-diver" v-if="!props.isShowGuide">
        <div class="guideTitle">
            想了解更多，可以点击<a href="https://github.com/kamranahmedse/driver.js" target="_blank"
                style="color: blue">driver.js.</a>
        </div>
        <el-button type="primary" @click.prevent.stop="guide">
            <el-icon>
                <QuestionFilled />
            </el-icon>
            打开引导
        </el-button>
    </div>
</template>
  <script setup lang="ts">
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css';
import steps from "./steps"; // 引入配置步骤引导节点的文件
import { QuestionFilled } from '@element-plus/icons-vue';

let driver: Driver | null = null;

const props = defineProps<{
    isShowGuide: boolean
}>();

onMounted(() => {
    createDiver()
    if (props.isShowGuide) {
        guide()
    }
})

const createDiver = (): void => {
    driver = new Driver({
        className: "guidePage",
        prevBtnText: "上一步",
        nextBtnText: "下一步",
        doneBtnText: "完成",
        closeBtnText: "关闭",
        // 是否设置动画
        // animate: false,
        // 背景不透明度（0表示只有弹出框，没有覆盖）
        opacity: 0.75,
        // 元素与边缘之间的距离
        // padding: 10, 
        // 单击遮罩层是否应关闭
        allowClose: false,
        // 单击遮罩层是否应下一步移动
        // overlayClickNext: false, 
        // 高亮时的背景色
        stageBackground: "#ffffff",
        // 不在页脚中显示控制按钮
        // showButtons: false, 
        // 允许通过键盘进行控制（退出关闭，箭头键移动）
        // keyboardControl: true, 
        // 我们使用`scrollIntoView（）如果需要，请将选项传递给这里
        // scrollIntoViewOptions: {}, 
        // 在元素即将高亮显示时调用
        // onHighlightStarted: (Element: any) => {},
        // 在元素完全高亮显示时调用
        onHighlighted: (Element: any) => {
            //当元素为fixed固定定位时，将高亮区域设置为fixed
            //并在steps.ts中设置自定义类名，在全局样式中设置position
            let elClassname = Element.node.className.split(' ')[0]
            if (elClassname == 'footeContainer') {
                let el = Element.document.children[0].children[1].children
                el[5].style.position = 'fixed'
            }
        },
        // 在取消选择元素时调用
        // onDeselected: (Element: any) => {} 
        // 在即将清除覆盖时调用
        // onReset: Element => {} 
        // 在任何步骤上移动到下一步时调用
        // onNext: (Element: any) => {},
        // 在任何步骤上移动到上一步时调用
        // onPrevious: (Element: any) => {}
    });
}

const guide = (): void => {
    if (driver) {
        driver.defineSteps(steps);
        driver.start();
    }
}

</script>

<style lang="scss" scoped>
.guidePage {
    font-size: 20px;
    padding: 20px;

    .guideTitle {
        padding: 20px 0;
    }
}
</style>
  
<style lang="scss">
.guidePage_footerContainer {
    position: fixed !important;
}

div#driver-highlighted-element-stage,
div#driver-page-overlay {
    background: transparent !important;
    outline: 5000px solid rgba(0, 0, 0, .75);
}
</style>