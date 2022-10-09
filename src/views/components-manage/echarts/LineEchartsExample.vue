<template>
    <div class="line-echarts-example">
        <el-scrollbar height="100%" always @scroll="scroll">
            <div class="examples" v-outline="tocProps">
                <fits-card v-for="(item, index) in examples" :key="index" :title="item.title" :desc="item.desc"
                    :is-active="index === menuData.num">
                    <component :is="item.component" />
                </fits-card>
            </div>
        </el-scrollbar>
        <div class="catalogue">
            <div class="menu-title">此页内容</div>
            <div v-for="(i, k) in navTree" :class="{ 'active': menuData.num === k }" :key="k" :id="'menuItem' + k"
                @click.stop="jumpToAnchor(i.el, k)" class="defaultStyle">
                {{ i.title }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseExample from "./line-examples/BaseExample.vue"
import SmoothExample from "./line-examples/SmoothExample.vue"
import AreaExample from "./line-examples/AreaExample.vue"
import ShowLegendExample from "./line-examples/ShowLegendExample.vue"
import PositionLegendExample from "./line-examples/PositionLegendExample.vue"
import ColorExample from "./line-examples/ColorExample.vue"
import ShowZoomExample from "./line-examples/ShowZoomExample.vue"

const examples = shallowRef([
    { component: BaseExample, title: "基础用法", desc: "基础折线图展示，需要传入legend.data：图例数组、xAxisNames：x轴数据以及图表数据：data" },
    { component: SmoothExample, title: "线条用法", desc: "通过设置isSmooth线条是否平滑" },
    { component: AreaExample, title: "面积用法", desc: "通过设置isShowArea是否显示面积" },
    { component: ShowLegendExample, title: "图例用法", desc: "通过设置legend.show=true显示图例" },
    { component: PositionLegendExample, title: "图例用法", desc: "通过设置legend.positon来控制图例的显示位置，并且需要将legend.show设置true" },
    { component: ColorExample, title: "设置线条颜色用法", desc: "通过传入legend.data，给每项设置color即可设置线条颜色，也可以传入渐变色" },
    { component: ShowZoomExample, title: "缩放组件用法", desc: "通过设置isShowZoom来控制是否显示缩放滑块组件（注：如果内容超出容器大小，则自动显示缩放组件）" },
])

//锚点目录所需数据
const navTree: any = ref([]);
const menuData = reactive({
    num: 0
})
let clickItem: number | null = 0
const tocProps = {
    callback: refreshNavTree,
    //配置哪些标签作为目录内容
    selectors: ['h1', 'h2'],
    exceptSelector: '[un-nav]',
    listenScroll: true
};

//获取目录节点的回调函数
function refreshNavTree(treeData: any) {
    navTree.value = treeData;
}
//锚点目录点击事件,并设置点击产生的高亮
function jumpToAnchor(el: any, k: number) {
    clickItem = k
    menuData.num = k
    el.scrollIntoView({ block: 'start', inline: 'nearest' });
    removeHeigthLight(clickItem)
}
//滚动事件设置高亮
const scroll = (data: any) => {
    //通过点击目录，位置跳转产生的滚动
    if (clickItem !== null) {
        removeHeigthLight(clickItem)
    }
    //非点击产生的滚动
    else if (clickItem === null) {
        for (let i = 0; i < navTree.value.length; i++) {
            let doc = document.getElementById('menuItem' + i)
            if (navTree.value[i].pos.top <= data.scrollTop + navTree.value[0].pos.top && doc) {
                menuData.num = i
            }
        }
    }
}
//去除高亮
const removeHeigthLight = (k: number) => {
    for (let i = 0; i < navTree.value.length; i++) {
        let dom = document.getElementById('menuItem' + i)
        if (k !== i && dom) {
            dom.className = "defaultStyle"
        }
    }
    //避免HeightLight设置为null时，点击产生的滚动还没停止
    setTimeout((
    ) => {
        clickItem = null
    }, 100)
}
</script>

<style lang="scss" scoped>
.line-echarts-example {
    display: flex;
    height: calc(100vh - $headHeight - $tagsViewHeight - $basePadding - $footerHeight);

    .el-scrollbar {
        padding: 32px;
        flex: 1;
        background: #fff;
    }

    .catalogue {
        background: #fff;
        width: 240px;
        margin-left: 16px;
        padding: 20px 30px;

        .menu-title {
            padding: 15px 0;
            font-weight: 600;
            font-size: 16px;
        }

        .active {
            padding-left: 15px;
            color: #188aff;
            border-left: 3px solid #188aff;
            cursor: pointer;
            line-height: 30px;
        }

        .defaultStyle {
            padding-left: 15px;
            cursor: pointer;
            line-height: 30px;
        }
    }
}
</style>
