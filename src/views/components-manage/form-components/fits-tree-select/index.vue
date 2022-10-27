<template>
    <div class="FitsTreeSelectIndex">
        <el-scrollbar class="left" @scroll="scroll" always>
            <div class="content" v-outline="tocProps">
                <fits-card title="基础用法" desc="基础的树形筛选组件展示。当节点数据超过下拉框的长度时，会通过滚动条的形式进行展示。默认点击叶子节点时，节点会被选中，并且下拉框会收起。">
                    <tree-select-basic-use />
                </fits-card>

                <fits-card title="选择任意级别"
                    desc="通过设置 tree.checkStrictly=true ，任何节点都可以被选择，否则只有子节点可被选择。开启后通过点击箭头图标进行展开/收缩。">
                    <tree-select-any-level />
                </fits-card>

                <fits-card title="禁用状态" desc="禁用整个树形筛选组件。设置 select.disabled = true，则整个树形筛选组件不可用。">
                    <tree-select-disabled-select />
                </fits-card>

                <fits-card title="有禁用选项"
                    desc="设置 tree.showCheckbox 启用节点选择框，并为 tree.data 中的选项设置 disabled = true，即可禁用该选项。">
                    <tree-select-disabled-option />
                </fits-card>

                <fits-card title="过滤节点" desc="设置 input.show = true 开启内部过滤输入框。 默认情况下，TreeSelect 会找出所有 label 属性包含输入值的选项。">
                    <tree-select-filter />
                </fits-card>

                <fits-card title="自定义过滤方法"
                    desc="如果希望使用其他的搜索逻辑，可以通过设置 `tree.filterNodeMethod` 来实现。 `filterNodeMethod` 为一个函数，它会在输入值发生变化时调用，参数为当前输入值。此范例演示了 '输入什么就不返回什么' 的功能。">
                    <tree-select-custom-filter />
                </fits-card>

                <fits-card title="默认选中" desc="通过传递 modelValue 属性可以给下拉树筛选组件传递默认值，该值必须跟 tree.nodeKey 指定的属性值对应。">
                    <tree-select-default-value />
                </fits-card>

                <fits-card title="展开所有节点、可拖拽"
                    desc="通过设置 tree.defaultExpandAll=true 可以默认展开所有节点。通过设置 tree.draggable=true 可以开启树节点拖拽。">
                    <tree-select-draggable />
                </fits-card>

                <fits-card title="自定义节点内容" desc="通过设置 tree.renderContent 渲染函数，该函数返回需要的节点区内容即可。">
                    <tree-select-custom-node />
                </fits-card>

                <fits-card title="动态加载节点数据" desc="动态加载数据仅当 tree.lazy=true 时有效。并通过 tree.load 传递一个函数，参数为 node 和 resolve ， node为当前点击的节点，
                    resolve为数据加载完成的回调。">
                    <tree-select-dynamic-load />
                </fits-card>

                <fits-card title="多选节点" desc="通过配置 tree.showCheckbox=true 和 select.multiple=true 开启树节点的复选框按钮。">
                    <tree-select-multiple />
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

<script lang="ts" setup>
import TreeSelectBasicUse from './TreeSelectBasicUse.vue';
import TreeSelectAnyLevel from './TreeSelectAnyLevel.vue';
import TreeSelectDisabledSelect from './TreeSelectDisabledSelect.vue';
import TreeSelectDisabledOption from './TreeSelectDisabledOption.vue';
import TreeSelectFilter from './TreeSelectFilter.vue';
import TreeSelectCustomFilter from './TreeSelectCustomFilter.vue';
import TreeSelectDefaultValue from './TreeSelectDefaultValue.vue';
import TreeSelectDraggable from './TreeSelectDraggable.vue';
import TreeSelectCustomNode from './TreeSelectCustomNode.vue';
import TreeSelectDynamicLoad from './TreeSelectDynamicLoad.vue';
import TreeSelectMultiple from './TreeSelectMultiple.vue';
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
.FitsTreeSelectIndex {
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
.FitsTreeSelectIndex {
    .fits-card {
        min-width: 500px;

        .el-select {
            width: 70%;
        }
    }

    .innerTitle {
        font-weight: 700;
        margin-bottom: 8px;
        color: #303133;
    }
}
</style>
