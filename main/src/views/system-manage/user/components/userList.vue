<template>
    <div class="relate-user">
        <div class="relate-content">
            <div class="relateLeft">
                <div class="leftTree">
                    <div class="search">
                        <el-input v-model="filterText" placeholder="搜索部门" :prefix-icon="Search" />
                    </div>
                    <div class="tree_list">
                        <el-tree :data="treeData" highlight-current node-key="treeData.id" :props="defaultProps"
                            default-expand-all @node-click="getTreeTable" ref="treeRef"
                            :filter-node-method="filterNode">
                            <template #default="{ node, data }">
                                <span class="custom-tree-node">
                                    <img :src="images.img1" v-if="data.children && data.children.length > 0 && data.pid"
                                        style="color:#FFCA28">
                                    <img class="people" :src="images.img2" v-if="!data.children" style="color:#ACC6D3">
                                    {{ data.name }}
                                </span>
                            </template>
                        </el-tree>
                    </div>
                </div>
                <div class="leftTable">
                    <div class="scrollContent">
                        <div class="tableContent">
                            <fits-table ref="xGrid" max-height="400" :option="fitsTablePro" @checkbox-all="checkBoxAll"
                                @checkbox-change="checkChange">
                                <template #buttons>
                                    <fits-input-search @input-search="InputSearch" @input-change="InputChange" />
                                </template>
                            </fits-table>
                        </div>
                        <el-scrollbar height="140px" :class="'scrollPart'">
                            <div class="tableBottom">
                                <div class="title" v-if="dynamicTags?.length">已选用户:{{ dynamicTags.length }}人</div>
                                <div class="title" v-else>已选用户:0人</div>
                                <div class="list">
                                    <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable
                                        :disable-transitions="false" @close="handleClose(tag)">
                                        {{ tag.name }}
                                    </el-tag>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="relateRight">
                <div class="title">分配角色</div>
                <el-input v-model="filterResult" placeholder="搜索部门" :prefix-icon="Search" />
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-tree :data="data" ref="treeref" show-checkbox node-key="id" :props="defaultProps"
                    @check-change="handleCheckChange" :filter-node-method="filternode" default-expand-all />
            </div>
        </div>
        <div class="relate-bottom">
            <el-button class="relate-button" @click="closeDialog('cancel')">取消</el-button>
            <el-button class="relate-button" type="primary" @click="closeDialog('submit')">提交</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getDepartment, getUserList } from '@/api/base/system';
import { AxiosResponse } from "axios";
import { Search } from '@element-plus/icons-vue'
import { ElTree } from 'element-plus'
import useStore from '@/store';
import { VxeGridInstance } from 'vxe-table';
import { useFitsTablePro } from '@/fits-components'
import XEUtils from 'xe-utils';
import { FitsTableProps, FitsTable, FitsInputSearch } from '@/fits-components';
const { user } = useStore();
let xGrid = ref<VxeGridInstance | any>()
defineExpose(xGrid)
let images = {
    img1: new URL(`../../../../assets/sysmanger/wenjianjia.png`, import.meta.url).href,
    img2: new URL(`../../../../assets/sysmanger/yingyerenyuan.png`, import.meta.url).href
}
//表格配置项
const gridOptions: FitsTableProps = {
    keepSource: true,
    showOverflow: "tooltip",
    id: 'toolbar_demo_2',
    rowConfig: {
        height: 40,
        isCurrent: true,
    },
    storage: {
        enabled: true,
        key: 'userList',
        dataBase: (user.userInfo as any).id,
    },
    importConfig: {},
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    align: 'center',
    columns: [
        { field: 'Checkbox', type: 'checkbox', title: '多选', minWidth: 50 },
        { field: 'Indexes', title: '序号', type: 'seq', minWidth: 50 },
        { field: 'name', title: '用户名称', minWidth: 80 },
        { field: 'account', title: '用户账号', minWidth: 80 },
        { field: 'mobiTel', title: '手机号码', minWidth: 100 },
        { field: 'sex', title: '性别', minWidth: 50 },
    ],
    toolbarConfig: {
        slots: {
            buttons: 'buttons'
        }
    },
    proxyConfig: {
        form: true, // 启用表单代理
        autoLoad: true,
        ajax: {
            query: ({ form }, params) => {
                return new Promise(resolve => {
                    // 整合分页参数
                    const pageParam = {
                        pageIndex: 10,
                        pageSize: 20
                    }
                    let keyword = params
                    getUserList(keyword, pageParam).then((result: AxiosResponse) => {
                        const { ReturnData } = result;
                        if (!ReturnData) {
                            // 当接口不给力，随便返回null的时候，我们要初始化值
                            resolve({
                                result: [],
                                page: {
                                    total: 0
                                }
                            })
                            return;
                        }
                        resolve({
                            result: XEUtils.toTreeArray(ReturnData.TableList, { clear: true }),
                            page: {
                                total: ReturnData.ItemCount
                            },
                        })
                    })
                })

            }
        }
    },
}
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
//树的接口
interface Tree {
    id: string,
    name: string,
    children?: Tree[]
}
//关联对话框左侧输入框绑定值
let filterText = ref('')
//关联对话框右侧输入框绑定值
let filterResult = ref()
//声明树的数据源
let treeData = ref<Tree>()
const defaultProps = {
    children: 'children',
    lable: 'label'
}
//获取部门列表数据
const getDepartmentList = async () => {
    const res = await getDepartment()
    treeData.value = res.ReturnData.TableList
}
const treeRef = ref<InstanceType<typeof ElTree>>()
//关联对话框左侧树形过滤方法
watch(filterText, (val) => {
    treeRef.value!.filter(val)
})
const filterNode = (value: string, data: Tree) => {
    if (!value) return true
    return data.name.includes(value)
}
//根据点击树的id获取列表数据
const getTreeTable = (node: any) => {
    // changeData()
    if (!node.children) {
        nextTick(() => {
            xGrid.value.fitsTablePro.commitProxy('query')
        })
    }
    dynamicTags.value = ''
}
let dynamicTags = ref()
const handleClose = (tag: any) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    nextTick(() => {
        xGrid.value.fitsTablePro.setCheckboxRow(tag, false)
    })
}
//关联角色对话框表格的单选
const checkBoxAll = () => {
    let arr = xGrid.value.fitsTablePro.getCheckboxRecords()
    dynamicTags.value = arr
}
//关联角色对话框表格的全选
const checkChange = () => {
    let arr = xGrid.value.fitsTablePro.getCheckboxRecords()
    dynamicTags.value = arr
}
//关联对话框右侧树形过滤方法
watch(filterResult, (val) => {
    treeref.value!.filter(val)
})
const filternode = (value: string, data: tree) => {
    if (!value) return true
    return data.label.includes(value)
}
//保存菜单权限管理列表的key
const keys: Array<number> = []
const treeref = ref<InstanceType<typeof ElTree>>()
//菜单权限管理列表数据
interface tree {
    id: number,
    label: string,
    children?: { id: number, label: string }[]
}
//关联对话框右侧树形数据
const data: tree[] = [
    {
        id: 1,
        label: '销售人员',
        children: [
            {
                id: 11,
                label: '销售人员1',
            },
            {
                id: 12,
                label: '销售人员2',
            },
        ],
    },
    {
        id: 2,
        label: '销售人员',
    },
    {
        id: 3,
        label: '服务人员',
        children: [
            {
                id: 31,
                label: '服务人员1',
            },
            {
                id: 32,
                label: '服务人员2',
            },
        ],
    },
    {
        id: 4,
        label: '服务人员',
        children: [
            {
                id: 41,
                label: '服务人员1',
            },
            {
                id: 42,
                label: '服务人员2',
            }
        ],
    },
    {
        id: 5,
        label: '服务人员',
        children: []
    },
    {
        id: 6,
        label: '服务人员',
    },
]
//关联对话框全选按钮事件
const handleCheckAllChange = () => {
    if (checkAll.value) {
        //全选,通过setChecked,第一个为true为选中节点,第二个true为其子节点也选中
        data.forEach((item) => {
            treeref.value!.setChecked(item, true, true)
        })
    }
    else {
        treeref.value!.setCheckedNodes([])
    }
}
let checkAll = ref(false)
//关联对话框树列表单选事件
const handleCheckChange = (val: Tree, checked: boolean, indeterminate: boolean) => {
    let sub = 0
    keys.forEach((key: number, index) => {
        let node = treeref.value!.getNode(key)
        if (node.checked) {
            sub++
            if (sub == keys.length - 1) {
                sub = 0
                checkAll.value = true
            }
        }
        else {
            sub = 0
            checkAll.value = false
        }
    })
}
//递归所有节点id
const returnID = (val: any): any => {
    if ('children' in val) {
        val.children.forEach((item: any) => {
            return returnID(item)
        })
    }
    keys.push(val.id)
    return val.id
}
const emit = defineEmits(["closeDialog"])
const closeDialog = (key: string) => {
    if (key === "cancel") {
        // xGrid.value.fitsTablePro.commitProxy('query')
        dynamicTags.value = ''
        xGrid.value.fitsTablePro.setAllCheckboxRow(false)
    }
    else {
        xGrid.value.fitsTablePro.commitProxy('query')
        dynamicTags.value = ''
        xGrid.value.fitsTablePro.setAllCheckboxRow(false)
    }
    emit("closeDialog", false)
}

const inputValue = ref('')
/**
 * 点击搜索按钮的回调
 * @param input 拿到的表单数据
 */
function InputSearch(input: any) {
    inputValue.value = input
    xGrid.value?.fitsTablePro.commitProxy('query')
}
function InputChange(val: any) {
    inputValue.value = val
}

onMounted(async () => {
    getDepartmentList()
    data.forEach((item) => {
        returnID(item)
    })
})
onUnmounted(() => {
    xGrid = null
})
</script>
<style lang="scss" scoped>
.relate-user {
    font-size: 12px;
    min-height: 600px;
    position: relative;
    // width: 100%;
    // min-width: 1280px;

    .relate-content {
        display: flex;
        background-color: #F2F2F2;
        padding: 8px 8px 0px;
        overflow: hidden;

        .relateLeft {
            background: #FFFFFF;
            width: 100%;
            margin-right: 8px;

            .leftTree {
                min-width: 212px;
                padding: 16px 8px;
                float: left;

                .tree_list {
                    padding-top: 8px;

                    img {
                        width: 16px;
                    }

                    :deep(.el-tree:first-child>.el-tree-node>.el-tree-node__content:first-child>span) {
                        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                        font-weight: bold;
                        color: #303133;
                        font-size: 14px;
                    }

                    :deep(.el-tree:first-child>.el-tree-node>.el-tree-node__content:first-child>i) {
                        color: #909399
                    }

                    :deep(.el-scrollbar__view) {
                        padding: 0px;
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

            .leftTable {
                overflow: hidden;
                border-left: 1px solid #DCDFE6;

                .scrollContent {
                    padding: 0px 16px 0 17px;

                    .tableContent {
                        .vxe-grid {
                            :deep(.vxe-buttons--wrapper) {
                                padding: 9px 0 !important;
                            }

                            :deep(.el-input) {
                                width: 225px;
                                font-size: 12px;
                            }
                        }
                    }

                    .el-scrollbar {
                        margin-bottom: 10px;

                        :deep(.el-scrollbar__wrap) {
                            overscroll-behavior: contain;
                        }

                        :deep(.el-scrollbar__view) {
                            padding: 0px
                        }

                    }

                    .tableBottom {
                        background: #F3F3F3;
                        padding: 12px 16px;
                        min-height: 150px;
                        margin-bottom: 10px;
                        overscroll-behavior: contain;

                        .el-tag {
                            margin: 5px;
                        }

                        .tableBottomContent {
                            display: flex;
                            flex-wrap: wrap;
                        }
                    }
                }
            }
        }

        .relateRight {
            background: #FFFFFF;
            padding: 8px;
            min-width: 220px;

            .title {
                padding-bottom: 8px;
                font-family: MicrosoftYaHei-Bold;
                font-size: 12px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #333333;
            }
        }
    }

    .relate-bottom {
        position: absolute;
        padding: 10px 24px 10px 24px;
        border-top: 1px solid #dcdfe6;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .relate-button {
            font-size: 12px;
            border-radius: 0;
            display: flex;
            align-items: flex-end;
        }
    }

    .el-input {
        :deep(.el-input__wrapper) {
            border-radius: 2px;
            font-size: 12px;
        }
    }

    :deep(.body--wrapper) {
        overscroll-behavior: contain;
    }

}

.el-input {
    font-size: 12px;
}
</style>
