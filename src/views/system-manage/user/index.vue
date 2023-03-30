<template>
    <div class="user-manage">
        <div class="left">
            <div class="search">
                <el-input v-model="filterText" placeholder="搜索部门" :prefix-icon="Search" />
            </div>

            <div class="tree_list">
                <el-scrollbar>
                    <el-tree :data="treeData" highlight-current node-key="id" :props="defaultProps" default-expand-all
                        @node-click="getTreeTable" ref="treeRef" :filter-node-method="filterNode">
                        <template #default="{ node, data }">
                            <span class="custom-tree-node">
                                <img :src="images.img1" v-if="data.children && data.children.length > 0 && data.pid"
                                    style="color:#FFCA28" />
                                <img class="people" :src="images.img2" v-if="!data.children" style="color:#ACC6D3" />
                                {{ data.name }}
                            </span>
                        </template>
                    </el-tree>
                </el-scrollbar>
            </div>
        </div>
        <div class="right">
            <userManage ref="user" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import userManage from './components/userManage.vue'
import { getDepartment } from '@/api/base/system';;
import { Search } from '@element-plus/icons-vue'
import { ElTree } from 'element-plus'
let images = {
    img1: new URL(`../../../assets/sysmanger/wenjianjia.png`, import.meta.url).href,
    img2: new URL(`../../../assets/sysmanger/yingyerenyuan.png`, import.meta.url).href
}
interface Tree {
    id: string,
    name: string,
    children?: Tree[]
}
let filterText = ref('')
let treeData = ref()
const defaultProps = {
    children: 'children',
    lable: 'label'
}
//获取部门列表数据
const getDepartmentList = async () => {
    const res = await getDepartment()
    treeData.value = res.ReturnData.TableList
}
//组件实例对象
let user = ref()
//过滤方法
const filterNode = (value: string, data: Tree) => {
    if (!value) return true
    return data.name.includes(value)
}
const treeRef = ref<InstanceType<typeof ElTree>>()

watch(filterText, (val) => {
    treeRef.value!.filter(val)
})

//根据点击树的id获取列表数据
const getTreeTable = (node: any) => {
    if (!node.children) {
        nextTick(() => {
            user.value.xGrid.fitsTablePro.commitProxy('query')
        })
    }
}
onMounted(async () => {
    getDepartmentList()
})
</script>
<style lang='scss' scoped>
.user-manage {
    background-color: #fff;
    user-select: none;

    .left {
        float: left;
        min-width: 240px;
        height: 100%;
        .search {
            position: relative;

            :deep(.el-input) {
                padding: 16px 12px 8px;
                font-size: 12px;
                --el-border-radius-base: 2px;
            }

            :deep(.is-focus) {
                box-shadow: 0px 0px 4px 0px #74B8FF;
                border: 1px solid #409EFF;
            }

        }

        .tree_list {
            // overflow: hidden;
            flex: 1;
            margin: 0 12px;
            user-select: none;

            :deep(.el-tree:first-child>.el-tree-node>.el-tree-node__content:first-child>span) {
                font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                font-weight: bold;
                color: #303133;
                font-size: 14px;
            }

            :deep(.el-tree:first-child>.el-tree-node>.el-tree-node__content:first-child>i) {
                color: #909399
            }

            .el-tree {

                //一级节点选择器
                :deep(.el-tree-node> .el-tree-node__content) {
                    font-size: 14px;
                }

                :deep(.el-tree-node> .el-tree-node__content>i) {
                    font-size: 14px;
                    color: #CDD0D6;
                }

                //二级节点选择器
                :deep(.el-tree-node>.el-tree-node__children>.el-tree-node>.el-tree-node__content>.is-leaf+span) {
                    font-size: 12px;
                    font-family: MicrosoftYaHei;
                }

                :deep(.el-tree-node>.el-tree-node__children>.el-tree-node>.el-tree-node__content>.is-leaf) {
                    color: transparent !important;
                }

                :deep(.el-tree-node>.el-tree-node__children>.is-current>.el-tree-node__content>.is-leaf+span) {
                    color: #007DFF;
                    font-family: MicrosoftYaHei;
                }

                img {
                    width: 16px;
                    height: 16px;
                }

                .custom-tree-node {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }

    .right {
        padding-left: 12px;
        border-left: 1px solid #DCDFE6;
        overflow: hidden;
        padding-right: 8px;
    }

    .el-input {
        padding: $basePadding;
    }
}
</style>
<style lang="scss">
.dialog[data-v-bd6a426a] .el-overlay>div:first-child>.relate>.el-dialog__body>.dialog-body>.el-scrollbar>.el-scrollbar__wrap>.el-scrollbar__view {
    padding: 0px
}
</style>