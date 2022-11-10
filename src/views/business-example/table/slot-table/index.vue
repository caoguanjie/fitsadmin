<template>
    <div class="slot-table ">
        <el-scrollbar class="left" @scroll="scroll" always>
            <div class="content" v-outline="tocProps">
                <fits-card title="自定义列模板"
                    desc="通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为default，值为自定义插槽名称。之后在FitsTable组件中通过<template #自定义插槽名称>的形式即可自定义列模板。">
                    <custom-content-table />
                </fits-card>

                <fits-card title="自定义表头"
                    desc="通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为header，值为自定义插槽名称。之后在FitsTable组件中通过<template #自定义插槽名称>的形式即可自定义表头模板。本例还演示了给columns中的对象设置headerClassName表头类名。">
                    <custom-header-table />
                </fits-card>

                <fits-card title="展开行"
                    desc="给 columns 里的对象配置 type=expand 开启展开行，并通过给 columns 里的对象设置 slots 属性，该属性是一个对象，其中键为content，值为自定义插槽名称。之后在FitsTable组件中通过 <template #自定义插槽名称> 的形式即可自定义列模板。">
                    <expand-row-table />
                </fits-card>

                <fits-card title="自定义按钮区域"
                    desc="通过配置 toolbarConfig.slots 属性可以使用插槽。该属性是一个对象，其中键为 buttons，值为自定义插槽名称。之后在FitsTable组件中通过 <template #自定义插槽名称> 的形式即可自定义工具栏左侧的按钮区域。">
                    <custom-buttons-table />
                </fits-card>

                <fits-card title="主从表" desc="">
                    <master-slave-table />
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
import CustomContentTable from './components/CustomContentTable.vue'
import CustomHeaderTable from './components/CustomHeaderTable.vue'
import ExpandRowTable from './components/ExpandRowTable.vue'
import CustomButtonsTable from './components/CustomButtonsTable.vue'
import MasterSlaveTable from './components/MasterSlaveTable.vue'
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
.slot-table {
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
.slot-table {
    .fits-card {
        min-width: 500px;
    }
}
</style>