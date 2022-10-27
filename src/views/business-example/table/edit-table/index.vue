<template>
    <div class="edit-table ">
        <el-scrollbar class="left" @scroll="scroll" always>
            <div class="content" v-outline="tocProps">
                <fits-card title="编辑模式" desc="给 columns 里的对象配置 editRender 属性设置渲染器名称等，即可开启可编辑功能。">
                    <edit-mode-table></edit-mode-table>
                </fits-card>

                <fits-card title="点击触发编辑"
                    desc="通过配置 editConfig.trigger 设置编辑器的触发方式。可以通过单击、双击和手动方式触发。本例演示了切换单击和双击的触发方式，手动触发请移步下一个例子。">
                    <edit-trigger-table></edit-trigger-table>
                </fits-card>

                <fits-card title="手动触发编辑" desc="手动的触发方式需要配置 editConfig.trigger='manual'，且只对 editConfig.mode='row'有效。">
                    <manual-edit-table></manual-edit-table>
                </fits-card>
            </div>
        </el-scrollbar>

        <div class="right">
            <div class="menu">
                <div class="menu-title">此页内容</div>
                <div v-for="(i, k) in navTree" :class="{ 'active': menuData.num === k }" :key="k" :id="'menuItem' + k"
                    @click.stop="jumpToAnchor(i.el, k)" class="defaultStyle">
                    {{ i.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import EditModeTable from './components/EditModeTable.vue'
import EditTriggerTable from './components/EditTriggerTable.vue'
import ManualEditTable from './components/ManualEditTable.vue'
import FitsCard from '@/components/Card/FitsCard.vue'

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
.edit-table {
    padding: 0 16px;
    display: flex;

    .left {
        height: 85vh;
        flex: 6;
        padding: 15px 0;
        background-color: #fff;

        .content {
            background-color: #fff;
            padding: 0 100px;
            justify-content: center;
        }
    }

    .right {
        flex: 1;
        margin: 0 20px;

        .menu {
            position: fixed;
            padding: 20px 30px;
            background: #fff;
            height: 85vh;
            font-size: 14px;

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
}
</style>

<style lang="scss">
.edit-table {
    .fits-card {
        min-width: 500px;
    }
}
</style>