<template>
    <div class="basic-table">
        <el-scrollbar class="left" @scroll="scroll" always>
            <div class="content" v-outline="tocProps">
                <fits-card title="基础表格" desc="通过 columns 传入对象数组，配置表格的列，其中 filed 设置列的字段名，title 设置列标题， width 定义列宽。
                    通过 data 配置表格的数据，对象的键与列字段名相对应。">
                    <basic-table />
                </fits-card>
                <fits-card title="斑马纹表格" desc="通过 stripe=true 开启斑马纹。另外，通过配置 rowConfig.isHover=true 开启当鼠标移到行时，高亮当前行。">
                    <stripe-table />
                </fits-card>
                <!-- 设置inner和outer无效果 -->
                <fits-card title="无边框表格"
                    desc="通过 border='none' 去掉表格的所有边框。可选值还有default（默认）, full（完整边框）, outer（外边框）, inner（内边框）。">
                    <border-table />
                </fits-card>
                <fits-card title="带状态表格" desc="通过配置 rowClassName，传入一个字符串或函数，给行附加类名。">
                    <status-table />
                </fits-card>
                <fits-card title="固定列"
                    desc="当横向内容过多时，将列固定在左右两侧。给列对象配置 fixed，传入'left' 或 'right'，设置固定列的位置。（注意：如果列宽足够的情况下，固定列不会浮动显示。）">
                    <fix-column-table />
                </fits-card>
                <fits-card title="单选行"
                    desc="通过配置 rowConfig.isCurrent=true 属性，点击并选中行数据。之后由 current-change 事件来管理选中时触发的事件。">
                    <select-row-table />
                </fits-card>
                <fits-card title="多选行" desc="在 columns 属性中配置一个 type='checkbox' 的对象，即可实现多选功能。之后由 checkbox-change 事件来管理手动勾选行复选框时触发的事件；
                    另外，通过配置 checkboxConfig.range = true 开启复选框范围选择功能（启用后通过鼠标在复选框的列内滑动选中或取消指定行）。
                    本例还演示了通过配置 checkboxConfig.checkMethod 指定了禁用地址在'幸福小区'的勾选项。">
                    <multiple-select-table />
                </fits-card>
                <fits-card title="流体高度" desc="通过配置 maxHeight 为表格指定最大高度。此时若表格所需的高度大于最大高度，则会显示一个滚动条。">
                    <fluid-table />
                </fits-card>
                <fits-card title="排序"
                    desc="给 columns 里的对象配置 sortable=true 即可开启排序。另外，可通过给 columns 里面的对象配置 sortBy 属性，自定义排序方法。本例演示了姓名列通过名字的长度进行排序。">
                    <sort-table />
                </fits-card>
                <fits-card title="筛选"
                    desc="给 columns 里的对象配置 filters 和 filterMethod，可以开启筛选表格数据。filters为对象数组，定义筛选条件。filterMethod 为筛选方法，该方法的返回值用来决定该行是否显示。">
                    <filter-table />
                </fits-card>
                <fits-card title="树结构"
                    desc="给 columns 里的对象配置 treeNode=true 指定该列为树节点。通过给 data 中的对象配置 children 属性，设置子节点。另外，可以通过设置 treeConfig.iconOpen 和 treeConfig.iconClose 定义收起和打开树的显示图标。">
                    <tree-table />
                </fits-card>
                <fits-card title="树形懒加载"
                    desc="通过配置 treeConfig.lazy=true 开启树形懒加载， 通过配置 treeConfig.loadMethod 定义异步加载子节点的方法。另外，还需要给 data 里的对象配置 hacChild=true 标识是否存在子节点，从而控制是否允许被点击，默认值为 false 不可点击。">
                    <tree-lazy-table />
                </fits-card>
                <fits-card title="表尾合计"
                    desc="通过配置 showFooter=true 开启表尾行。 再通过 footerMethod 定义表尾的数据获取方法，返回一个二维数组。另外，可以通过设置 footerRowClassName 给表尾行添加类名。">
                    <summary-table />
                </fits-card>
                <fits-card title="合并行、列" desc="通过配置 mergeCells 合并指定的单元格。">
                    <merge-table />
                </fits-card>
                <fits-card title="自定义索引"
                    desc="给 columns 里的对象配置 type=seq 开启序号列。另外，可通过 seqConfig.seqMethod 自定义序列号。 本例演示了自定义序列号，序列号的间隔为2。">
                    <custom-index-table />
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
import BasicTable from './BasicTable.vue'
import StripeTable from './StripeTable.vue'
import BorderTable from './BorderTable.vue'
import StatusTable from './StatusTable.vue'
import FixColumnTable from './FixColumnTable.vue'
import FluidTable from './FluidTable.vue'
import SelectRowTable from './SelectRowTable.vue'
import MultipleSelectTable from './MultipleSelectTable.vue'
import SortTable from './SortTable.vue'
import FilterTable from './FilterTable.vue'
import TreeTable from './TreeTable.vue'
import TreeLazyTable from './TreeLazyTable.vue'
import SummaryTable from './SummaryTable.vue'
import MergeTable from './MergeTable.vue'
import CustomIndexTable from './CustomIndexTable.vue'

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
.basic-table {
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

    .fits-grid {
        // height: 500px;
    }
}
</style>