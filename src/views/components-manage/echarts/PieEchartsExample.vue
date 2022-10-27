<template>
    <div class="pie-echarts-example">
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
import BaseExample from "./pie-examples/BaseExample.vue"
import ShowLegendExample from "./pie-examples/ShowLegendExample.vue"
import GapExample from "./pie-examples/GapExample.vue"
import ColorExample from "./pie-examples/ColorExample.vue"
import FitsCard from '@/components/Card/FitsCard.vue'

const examples = shallowRef([
    { component: BaseExample, title: "基础用法", desc: "基础饼图展示，传入data数据即可" },
    { component: ShowLegendExample, title: "图例用法", desc: "通过设置legend.show=true显示图例，无需传data，以及位置固定为左侧居中" },
    { component: GapExample, title: "空隙用法", desc: "通过设置isHasGap=true表示项目之间都空隙，并且会有圆角" },
    { component: ColorExample, title: "颜色用法", desc: "在传入data数据中，给每项数据设置color属性，如果不传则使用默认颜色" },
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
.pie-echarts-example {
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
