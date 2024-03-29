<template>
    <div class="group-table-example">
        <el-scrollbar class="left" @scroll="scroll" always>
            <div class="content" v-outline="tocProps">
                <fits-card title="基础分组表格"
                    desc="传入headers属性声明列配置。然后传入ajax.query属性，通过promise的形式返回组件表格的数据，传入result属性中即可。groupConditions属性（分组条件）可传可不传，defaultChecked属性表示默认选中哪个分组。">
                    <base-group-table />
                </fits-card>
                <fits-card title="插槽分组表格"
                    desc="可通过插槽去重写表格单元格的内容（插槽名是字段名），另外还提供了额外的插槽：query表格查询条件插槽、noData暂无数据插槽、right组头右侧插槽、groupName组名插槽、expand展开行插槽。">
                    <slot-group-table />
                </fits-card>
                <fits-card title="默认展开分组表格"
                    desc="通过设置expandGroupsNum属性表示默认展开多少个分组，默认展开的分组第一次请求时会返回表格数据，其余分组表格的数据通过分段请求返回（会在组头开启loading图标）。但expandGroupsNum属性的值必须大于1（后端规定的）。">
                    <expand-group-table />
                </fits-card>
                <fits-card title="分段请求分组表格"
                    desc="如果当前页的分组表格个数大于默认展开分组表格的个数，剩余的分组表格会开启分段请求（会在组头开启loading图标）。可以通过requestGroupNums属性设置多少个表格为一组去分段请求。">
                    <subsection-group-table />
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

<script lang='ts' setup name="GroupTable">
import BaseGroupTable from "./components/BaseGroupTable.vue"
import ExpandGroupTable from "./components/ExpandGroupTable.vue"
import SubsectionGroupTable from "./components/SubsectionGroupTable.vue"
import SlotGroupTable from "./components/SlotGroupTable.vue"
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
.group-table-example {
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
.basic-table {
    .fits-card {
        min-width: 500px;
    }
}
</style>