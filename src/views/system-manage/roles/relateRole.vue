<template>
    <div class="relate-role">
        <div class="relate-content">
            <div class="relateLeft">
                <div class="leftTree">
                    <div class="search">
                        <el-input class="searchBox" placeholder="关键词搜索" :prefix-icon="Search" />
                    </div>
                    <div class="contain">

                        <el-scrollbar height="480px">
                            <el-tree ref="treeRef" :data="roleClass" default-expand-all node-key="id" highlight-current
                                :props="defaultProps" @check-change="handleCheckChange">
                                <template #default="scope">
                                    <div class="treeItem" style="display:flex;align-items:flex-end;">
                                        <div class="parentItem" v-if="'children' in scope.data"
                                            style="padding-right:4px;">
                                            <el-icon>
                                                <el-image style="width: 100%; height: 100%" :src="images.img1" />
                                            </el-icon>
                                            {{ scope.data.name }}
                                        </div>
                                        <div class="ChildItem" v-else style="padding-right:4px;" @click="clickTree">
                                            <el-icon>
                                                <el-image style="width: 100%; height: 100%" :src="images.img2" />
                                            </el-icon>
                                            {{ scope.data.name }}
                                        </div>
                                    </div>
                                </template>
                            </el-tree>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="leftTable">
                    <div class="scrollContent">
                        <div class="tableContent">
                            <fits-table :option="fitsTablePro" ref="xGrid" @checkbox-change="tableCheckChange"
                                @checkbox-all="tableCheckChange" />
                        </div>
                        <el-scrollbar height="150px">
                            <div class="tableBottom">
                                <div v-if="!selectRole">已选用户:0人</div>
                                <div v-else>已选用户:{{ selectRole.length }}人</div>
                                <div class="tableBottomContent">
                                    <div class="contentItem" v-for="(item, key) in selectRole" :key="key">
                                        <span>
                                            {{ item.name }}
                                        </span>
                                        <el-icon>
                                            <Close style="cursor:pointer;" @click="delSelects(key)" />
                                        </el-icon>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="relateRight">
                <div class="title">分配角色</div>
                <div class="search">
                    <el-input class="searchBox" placeholder="关键词搜索" :prefix-icon="Search" />
                </div>
                <div class="contain">
                    <el-checkbox label="全选" size="large" v-model="checkAll" @change="handleCheckAllChange" />
                    <el-scrollbar height="480px">
                        <el-tree ref="treeRef" :data="treeData" show-checkbox default-expand-all node-key="id"
                            highlight-current :props="defaultProps" @check-change="handleCheckChange" />
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <div class="relate-bottom">
            <el-button class="relate-button" @click="closeDialog('cancle')" size="large">取消</el-button>
            <el-button class="relate-button" type="primary" @click="closeDialog('submit')" size="large">提交</el-button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import XEUtils from 'xe-utils';
import { getRoleList, getDepartment } from '@/api/base/system';
import useStore from '@/store';
import { AxiosResponse } from 'axios';
import { VxeGridInstance } from 'vxe-table';
import { useFitsTablePro, FitsTableProps, FitsTable } from 'fits-admin-ui'
import { ElTree } from 'element-plus'
import { Search, Close } from '@element-plus/icons-vue'
interface Tree {
    id: number
    label: string
    children?: Tree[]
}
let images = {
    img1: new URL(`../../../assets/sysmanger/wenjianjia.png`, import.meta.url).href,
    img2: new URL(`../../../assets/sysmanger/yingyerenyuan.png`, import.meta.url).href,
}

const defaultProps = {
    children: 'children',
    label: 'label',
}

const emit = defineEmits(["closeDialog"])
const { user } = useStore();
const xGrid = ref<VxeGridInstance | any>()
const closeDialog = (key: string) => {
    if (key == "cancle") {
        console.log("cancle")
    } else {
        console.log("submit")
    }
    emit("closeDialog", "relateRole")
}
const gridOptions: FitsTableProps = {
    // border: true,
    keepSource: true,
    showOverflow: false,
    id: 'toolbar_demo_1',
    height: 450,
    rowConfig: {
        height: 40
    },
    storage: {
        enabled: true,
        key: 'relateRoleList',
        dataBase: (user.userInfo as any).id,
    },
    formConfig: {
        items: [
            { field: 'keyword', title: '', itemRender: { name: 'ElInput', props: { placeholder: '搜索用户' } } },
        ]
    },
    importConfig: {},
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    columns: [
        { field: 'Checkbox', type: 'checkbox', title: '多选', width: 50 },
        { field: 'Indexes', title: '序号', type: 'seq', width: 100 },
        { field: 'Uname', title: '角色名称', minWidth: 130, treeNode: true },
        { field: 'Ucode', title: '角色编码', minWidth: 100 },
        { field: 'Udescribe', title: '角色描述', minWidth: 100 },
    ],
    toolbarConfig: {
        buttons: [
            // { code: 'myadd', name: '新增', status: 'primary', onClick: () => { alert(1) } },
            // { code: 'mySave', name: '启用' },
            // { code: 'mydisable', name: '禁用' },
            // { code: 'myExport', name: '导出' },
            // { code: 'remove', name: '批量删除' }
        ],
        tools: {
            enabled: false
        },
    },
    // treeConfig: {
    //     transform: true,
    //     rowField: 'Id',
    //     parentField: 'PId',
    // },
    proxyConfig: {
        form: true, // 启用表单代理
        autoLoad: true,
        ajax: {
            query: ({ form }) => {
                return new Promise(resolve => {
                    // 整合分页参数
                    const pageParam = {
                        pageIndex: 11,
                        pageSize: 23,
                    }
                    // formConfig?.data和proxyConfig不能同时存在，会报【参数 "grid.data" 与 "grid.proxy-config" 有冲突】这个错误信息，所以需要把data这个默认值赋值给form变量
                    // XEUtils.merge(form, gridOptions.formConfig?.data)
                    getRoleList(form, pageParam).then((result: AxiosResponse) => {
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


onMounted(async () => {
    const res = await getDepartment()
    roleClass.value = res.ReturnData.TableList
})
//左侧角色管理数据
const roleClass = ref()
//菜单权限管理列表数据
const treeData = [
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
        label: '工作人员',
    },
    {
        id: 5,
        label: '开发人员',
    },
    {
        id: 6,
        label: '测试人员',
    },
]
//选中的数据，在灰色板块中显示
const selectRole = ref(null) as any
//保存菜单权限管理列表的key
const keys: Array<number> = []
let checkAll = ref(false)
const treeRef = ref<InstanceType<typeof ElTree>>()
//右侧数列表全选按钮
const handleCheckAllChange = () => {
    if (checkAll.value) {
        //全选，通过setChecked，第一个true为选中节点，第二个true为其子节点也选中
        treeData.forEach((item) => {
            treeRef.value!.setChecked(item, true, true)
        })
    } else {
        treeRef.value!.setCheckedNodes([])
    }
}
//右侧树列表单选
const handleCheckChange = (val: Tree, checked: boolean, indeterminate: boolean) => {
    let sub = 0
    keys.forEach((key: number, index) => {
        let node = treeRef.value!.getNode(key)
        if (node.checked) {
            //选中加一，当选中的节点树等于总节点树则全选，否则取消全选
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
//灰色区域已选择的删除
const delSelects = (key: number) => {
    xGrid.value.fitsTablePro.setCheckboxRow(selectRole.value[key].data, false)
    selectRole.value.splice(key, 1)
}
//fitsTable单选框事件监听,全选按钮通用
const tableCheckChange = () => {
    let data = xGrid.value.fitsTablePro.getCheckboxRecords(true)
    selectRole.value = []
    data.forEach((item: any, index: number) => {
        let obj = {
            name: item.Uname,
            data: item
        }
        selectRole.value.push(obj)
    });
}
//点击左侧树节点
const clickTree = () => {
    nextTick(() => {
        xGrid.value.fitsTablePro.commitProxy('query')
    })
}
</script>
<style lang='scss' scoped>
.relate-role {
    position: relative;
    font-size: 12px;
    min-height: 665px;


    .relate-content {
        background: #F2F2F2;
        padding: 8px 8px 0px;
        display: flex;

        .relateLeft {
            background: #FFFFFF;
            margin-right: 8px;
            font-size: 14px;
            width: 100%;

            .leftTree {
                padding: 16px 8px;
                border-right: 1px solid #DCDFE6;
                min-width: 220px;
                float: left;
                height: 100%;

                .contain {
                    padding-top: 8px;

                    :deep(.treeItem) {
                        width: 100%;

                        .ChildItem {
                            font-size: 12px;
                        }
                    }

                    :deep(.el-tree:first-child>.el-tree-node>.el-tree-node__content:first-child>.treeItem) {
                        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                        font-weight: 800;
                        color: #303133;
                        font-size: 14px;
                    }
                }
            }

            .leftTable {
                overflow: hidden;

                .scrollContent {
                    padding: 0px 16px 0 17px;

                    .tableContent {
                        overflow: hidden;

                    }

                    :deep(.el-scrollbar__wrap) {
                        overscroll-behavior: contain;
                    }

                    .tableBottom {
                        background: #F3F3F3;
                        padding: 12px 16px;
                        min-height: 150px;

                        .tableBottomContent {
                            display: flex;
                            flex-wrap: wrap;

                            .contentItem {
                                color: #007DFF;
                                background: #D9EDFF;
                                border-radius: 2px;
                                margin-right: 10px;
                                padding: 8px;
                                margin-top: 14px;
                                display: flex;
                                align-items: center;
                            }
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
                font-weight: bold;
                font-size: 12px;
                padding-bottom: 8px;
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
            border-radius: 2px;
            display: flex;
            align-items: flex-end;
            line-height: 16px;
            height: auto;
        }
    }

    :deep(.body--wrapper) {
        overscroll-behavior: contain;
    }

    :deep(.el-button--large) {
        padding: 8px 24px;
    }
}
</style>
