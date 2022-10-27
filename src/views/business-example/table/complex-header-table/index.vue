<template>
    <div class="complex-header-table">
        <el-scrollbar class="left" @scroll="scroll" always>
            <div class="content" v-outline="tocProps">
                <fits-card title="复杂表头" desc="通过给 columns 中的对象传递 children 属性定义子列，即可实现表头分组。">
                    <fits-table :option="fitsTablePro" ref="xGrid" />
                </fits-card>
            </div>
        </el-scrollbar>

        <div class="right">
            <div class="menu">
                <div class="menu-title">此页内容</div>
                <div v-for="(i,k) in navTree" :class="{'active':menuData.num===k}" :key="k" :id="'menuItem' + k"
                    @click.stop="jumpToAnchor(i.el,k)" class="defaultStyle">
                    {{i.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useFitsTablePro } from '@/components/FitsTablePro/FitsTable/FitsTableProHook';
import { FitsTableProps } from '@/components/FitsTablePro/FitsTable/type';
import { VxeGridInstance } from 'vxe-table';

const gridOptions: FitsTableProps = {
    border: true,
    columns: [
        { type: 'seq', field: "Index", width: 50, title: '序号' },
        {
            title: '基本信息',
            field: "basic",
            children: [
                { field: 'name', title: '姓名' },
                {
                    title: '其他信息',
                    field: "other",
                    children: [
                        { field: 'phone', title: '电话' },
                        { field: 'birth', title: '生日' }
                    ]
                },
                { field: 'sex', title: '性别' }
            ]
        },
        { field: 'mark', title: '备注', sortable: true, showOverflow: true },
    ],
    data: [
        { name: '王五', phone: '13224452121', birth: '1999-10-08', sex: '男', mark: '下周五入住201房' },
        { name: '李晓明', phone: '13754456492', birth: '2015-05-18', sex: '男', mark: '无' },
        { name: '王大陆', phone: '13324459856', birth: '2000-01-05', sex: '女', mark: '已离职，归还设备' },
        { name: '李萌萌', phone: '18712458736', birth: '1879-12-13', sex: '女', mark: '此人不存在 ' },
        { name: '张兴', phone: '18924584265', birth: '1954-03-25', sex: '男', mark: '办理手续、护照、签证 、身份汇总' },
    ],
    headerAlign: 'center',
    toolbarConfig: {
        tools: {
            enabled: true
        }
    }
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
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
.complex-header-table {
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
.complex-header-table {
    .fits-card {
        min-width: 500px;
    }

    .fits-grid {
        // height: 500px;
    }
}
</style>