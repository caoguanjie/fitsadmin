<template>
    <div class="role-manage">
        <div class="role-left">
            <div class="left-classification">
                <div class="top">
                    <el-input class="searchBox" placeholder="搜索角色分类" :prefix-icon="Search" />
                    <el-icon style="cursor: pointer;">
                        <CirclePlusFilled :color='"#007dff"' @click="addClassfy" />
                    </el-icon>
                </div>
                <div div class=" bottom">
                    <div class="title">
                        <el-icon @click="showHide" :color="'#909399'" style="margin-right:8px" v-show="!isShow">
                            <CaretRight />
                        </el-icon>
                        <el-icon @click="showHide" :color="'#909399'" style="margin-right:8px" v-show="isShow">
                            <CaretBottom />
                        </el-icon>
                        角色管理
                    </div>
                    <el-collapse-transition>
                        <div v-show="isShow">
                            <!-- <div class="text" v-for="(item, key) in roleClass" :key="key">
                                <div class=" textLeft" @click="clickTree">
                                    <el-icon>
                                        <UserFilled :color='"#007dff"' />
                                    </el-icon>
                                    <div class="textContent">
                                        {{ item.Cname }}
                                    </div>
                                </div>
                                <el-icon class="moreButton">
                                    <el-popover placement="bottom" title="" trigger="click"
                                        :popper-class="'Role-popover'" :hide-after=0>
                                        <template #reference>
                                            <MoreFilled :color='"#999999"' />
                                        </template>

                                        <div class="btn">
                                            <el-button @click="classifyButton(key, 'editClass')">编辑</el-button>
                                        </div>
                                        <div class="btn">
                                            <el-button @click="classifyButton(key, 'delete')">删除</el-button>
                                        </div>
                                    </el-popover>
                                </el-icon>
                            </div> -->
                            <el-tree :data="roleClass" node-key="id" default-expand-all :expand-on-click-node="false"
                                @node-click="clickTree">
                                <template #default="{ data }">
                                    <span class="custom-tree-node">
                                        <el-popover placement="bottom" title="" trigger="contextmenu"
                                            :popper-class="'Role-popover'" :hide-after=0>
                                            <template #reference>
                                                <div class=" text">
                                                    <div class=" textLeft">
                                                        <div class="textContent">
                                                            <span>{{ data.Cname }}</span>
                                                        </div>
                                                    </div>
                                                    <el-icon class="moreButton">
                                                        <el-popover placement="bottom" title="" trigger="click"
                                                            :popper-class="'Role-popover'" :hide-after=0>
                                                            <template #reference>
                                                                <MoreFilled :color='"#999999"' />
                                                            </template>
                                                            <div class="btn">
                                                                <el-button @click="classifyButton(data, 'editClass')">编辑
                                                                </el-button>
                                                            </div>
                                                            <div class="btn">
                                                                <el-button @click="classifyButton(data, 'deleteClass')">
                                                                    删除
                                                                </el-button>
                                                            </div>
                                                        </el-popover>
                                                    </el-icon>
                                                </div>
                                            </template>
                                            <div class="btn">
                                                <el-button @click="classifyButton(data, 'editClass')">编辑
                                                </el-button>
                                            </div>
                                            <div class="btn">
                                                <el-button @click="classifyButton(data, 'deleteClass')">删除
                                                </el-button>
                                            </div>
                                        </el-popover>
                                    </span>
                                </template>
                            </el-tree>
                        </div>
                    </el-collapse-transition>
                </div>
            </div>
            <div class="left-contain">
                <!-- <fits-list-seach :formItem='formItem' /> -->
                <fits-table :option="fitsTablePro" ref="xGrid" :grid-events="gridEvents">
                    <template #operate="{ slotProps }">
                        <!-- <fits-table :option="fitsTablePro" ref="xGrid" :grid-events="gridEvents"
                            @checkbox-all="onCheckAll" @checkbox-change="onCheckOne">
                            <template #operate> -->
                        <span class="FromButton underline" @click="FormOperation(slotProps.row, 'editRole')">编辑</span>
                        <span class="FromButton delete" @click="FormOperation(slotProps.row, 'deleteRole')">删除</span>
                        <span class="FromButton" @click="FormOperation(slotProps.row, 'relaRole')">关联用户</span>
                        <!-- <el-button type="warning">Warning</el-button>
                            <el-button type="danger">Danger</el-button> -->
                    </template>
                    <template #state="{ slotProps }">
                        <el-switch v-model="slotProps.row.Ustate"
                            style="--el-switch-on-color: #000000; --el-switch-off-color: #dcdfe6" />
                        <!-- {{ slotProps.row.Ustate }} -->
                    </template>
                </fits-table>
            </div>
        </div>
        <div class="role-right">
            <div class="title">菜单权限管理列表</div>
            <div class="search">
                <el-input class="searchBox" placeholder="关键词搜索" :prefix-icon="Search" />
                <el-button class="Savebotton" @click="savePower">保存</el-button>
            </div>
            <div class="contain">
                <el-checkbox label="全选" size="large" v-model="checkAll" @change="handleCheckAllChange" />
                <el-tree ref="treeRef" :data="treeData" show-checkbox default-expand-all node-key="id" highlight-current
                    :props="defaultProps" @check-change="handleCheckChange" />
            </div>
        </div>
        <!-- 数据弹窗（新增角色、角色分类、编辑角色分类） -->
        <fits-dialog :class="'onfooter'" :visible="dialogData.operateRole.visible"
            :dialogProp="dialogData.operateRole.props" @cancel="closeDialog('addRole')" :showFooter="false">
            <add-role v-if="dialogData.operateRole.key == 'addRole' || dialogData.operateRole.key == 'addClass'"
                @dataChange="dataChange" :keys="dialogData.operateRole.key" :setData="dialogData.operateRole.data"
                @closeDialog="closeDialog" />
            <edit-role v-if="dialogData.operateRole.key == 'editRole' || dialogData.operateRole.key == 'editClass'"
                @dataChange="dataChange" :keys="dialogData.operateRole.key" :setData="dialogData.operateRole.data"
                @closeDialog="closeDialog" />
        </fits-dialog>
        <!-- 工具栏操作确认弹窗（关联、启用、禁用、导出、删除） -->
        <fits-dialog :class="'Roles-baseDialog'" :visible="dialogData.baseRole.visible"
            :dialogProp="dialogData.baseRole.props" @cancel="closeDialog('baseRole')"
            @submit="onSubmint(dialogData.baseRole.key)">
            {{ dialogData.baseRole.dialogText }}
        </fits-dialog>
        <!-- 关联用户弹窗 -->
        <fits-dialog :class="'Roles-relateDialog onfooter'" :visible="dialogData.relateRole.visible"
            :dialogProp="dialogData.relateRole.props" :showFooter="false"
            @cancel="dialogData.relateRole.visible = false">
            <relate-role @closeDialog="closeDialog" />
        </fits-dialog>
    </div>
</template>

<script lang='ts' setup>
import XEUtils from 'xe-utils';
import { Search, CirclePlusFilled, MoreFilled, UserFilled, CaretBottom, CaretRight } from '@element-plus/icons-vue'
import { getRoleList } from '@/api/base/system';
import useStore from '@/store';
import { AxiosResponse } from 'axios';
import { VxeGridInstance, VxeGridListeners } from 'vxe-table';
import { useFitsTablePro, FitsTableProps, FitsTable } from 'fits-admin-ui'
import { ref } from 'vue'
import { ElTree, ElMessage } from 'element-plus'
import addRole from "./addRole.vue"
import editRole from "./editRole.vue"
import relateRole from "./relateRole.vue"
import { FitsDialog } from '@/fits-components'

interface Tree {
    id: number
    label: string
    children?: Tree[]
}
const defaultProps = {
    children: 'children',
    label: 'label',
}

const { user } = useStore();
const xGrid = ref<VxeGridInstance | any>()

const dialogData = reactive({
    operateRole: {
        visible: false,
        key: "",
        data: {},
        props: {
            title: '',
            width: '40%'
        }
    },
    baseRole: {
        dialogText: "",
        key: "",
        visible: false,
        props: {
            title: '',
            width: '30%'
        }
    },
    relateRole: {
        dialogText: "关联用户",
        key: "",
        visible: false,
        props: {
            title: '关联用户',
            width: '75%'
        }
    }
})
const openMessage = (mess: string) => {
    ElMessage({
        message: mess,
        type: 'warning',
    })
}
let isShow = ref(true)
// let checkArr: any[] = []
const showHide = () => {
    isShow.value = !isShow.value
}
//表头工具栏监听事件
const gridEvents: VxeGridListeners = {
    async toolbarButtonClick({ code }) {
        //表格
        const $grid = xGrid.value.fitsTablePro
        //获取选中的数据
        let record = $grid.getCheckboxRecords()
        switch (code) {
            case 'addRole': {
                dialogData.operateRole.props.title = "新增角色"
                dialogData.operateRole.visible = true
                dialogData.operateRole.key = 'addRole'
                let obj = {
                    Uname: '',
                    Ucode: '',
                    Udescribe: '',
                    Sort: '',
                    Ustate: false,
                    Roledisable: ""
                }
                dialogData.operateRole.data = obj
                break
            }
            case 'RoleRelation': {
                dialogData.relateRole.visible = true
                break
            }
            case 'RoleUse': {
                if (record.length) {
                    dialogData.baseRole.visible = true
                    dialogData.baseRole.dialogText = "是否确定启用选中的用户？"
                    dialogData.baseRole.key = "RoleUse"
                } else {
                    openMessage('请选择至少一个角色！')
                }
                break
            }
            case 'Roledisable': {
                if (record.length) {
                    dialogData.baseRole.visible = true
                    dialogData.baseRole.dialogText = "是否确定禁用选中的用户？"
                    dialogData.baseRole.key = "Roledisable"
                } else {
                    openMessage('请选择至少一个角色！')
                }
                break
            }
            case 'RoleyExport': {
                if (record.length) {
                    dialogData.baseRole.visible = true
                    dialogData.baseRole.dialogText = "是否确定导出选中的用户？"
                    dialogData.baseRole.key = "RoleyExport"
                } else {
                    openMessage('请选择至少一个角色！')
                }
                break
            }
            case 'Roleremove': {
                if (record.length) {
                    dialogData.baseRole.visible = true
                    dialogData.baseRole.dialogText = "是否确定删除选中的用户？"
                    dialogData.baseRole.key = "Roleremove"
                } else {
                    openMessage('请选择至少一个角色！')
                }
                break
            }
        }
    }
}
const gridOptions: FitsTableProps = {
    // border: true,
    keepSource: false,
    showOverflow: "tooltip",
    id: 'rolestable',
    rowConfig: {
        height: 52,
        isCurrent: true,
    },
    //数据缓存，如果其他表格也使用了同一个key会导致表格数据串用
    storage: {
        enabled: true,
        key: 'SystemManageRoleList',
        dataBase: (user.userInfo as any).id,
    },
    formConfig: {
        // data: {
        //     keyword: '1',
        //     number: '2',
        // },
        items: [
            // { field: 'keyword', title: '模糊搜索', itemRender: { name: 'ElInput', props: { placeholder: '请输入菜单关键字、权限标识、路径' } } },
            // { field: 'sex', span: 3, title: '性别', itemRender: { name: '$select', options: [{ value: '0', label: '女' }, { value: '1', label: '男' }], props: { placeholder: '请选择性别' } } },
            // { field: 'role', span: 3, title: '角色', itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
            // { field: 'age1', span: 3, title: '年龄1', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            // { field: 'age2', span: 3, title: '年龄2', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            // { field: 'age3', span: 3, title: '年龄3', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            // { field: 'age4', span: 3, title: '年龄5', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            // { field: 'age5', span: 3, title: '年龄5', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            // { field: 'age6', span: 3, title: '年龄6', itemRender: { name: '$input', props: { type: 'number', placeholder: '请输入年龄' } } },
            // { field: 'flag', span: 3, title: '开关', itemRender: { name: '$switch', props: { openLabel: '是', closeLabel: '否' } } },
            { field: 'name', span: 3, title: '角色名称', itemRender: { name: 'ElInput', props: { placeholder: '请输入角色名称' } } },
            { field: 'code', span: 3, title: '角色编码', itemRender: { name: 'ElInput', props: { placeholder: '请输入角色编码' } } },
        ]
    },
    importConfig: {},
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    columns: [
        // <<<<<<< .mine
        { field: 'Checkbox', type: 'checkbox', title: '多选', minWidth: 50 },
        { field: 'Indexes', title: '序号', type: 'seq', minWidth: 80 },
        { field: 'Uname', title: '角色名称', minWidth: 130 },
        { field: 'Ucode', title: '角色编码', minWidth: 130 },
        { field: 'Udescribe', title: '角色描述', minWidth: 130 },
        { field: 'Sort', title: '排序', minWidth: 100 },
        { field: 'Ustate', title: '角色状态', slots: { default: 'state' }, minWidth: 100 },
        // { field: 'Operation', title: '操作列', minWidth: 150, slots: { default: 'operate' }, fixed: 'right' }
        { field: 'Operation', title: '操作列', width: 200, fixed: 'right', slots: { default: 'operate' }, contentRender: { name: 'TableOpeate' } }
    ],
    toolbarConfig: {
        buttons: [
            { code: 'addRole', name: '添加角色', status: 'primary' },
            { code: 'RoleRelation', name: '关联用户' },
            { code: 'RoleUse', name: '启用' },
            { code: 'Roledisable', name: '禁用' },
            { code: 'RoleyExport', name: '导出' },
            { code: 'Roleremove', name: '批量删除' }
        ],
        tools: {
            enabled: true
        },
        // refresh: {
        //     // 刷新
        //     icon: 'vxe-icon-refresh'
        // },
        // zoom: true,
        // export: false,
        // custom: false,
        // tools: [
        //     {
        //         toolRender: {
        //             name: 'ToolbarSearch', events: {
        //                 click: () => {
        //                     console.log('关闭搜索')
        //                 }
        //             }
        //         }
        //     },
        //     { toolRender: { name: 'ToolbarSetting' } },
        //     { toolRender: { name: 'ToolbarRefresh' } },

        //     {
        //         toolRender: {
        //             name: 'ToolbarExport', events: {
        //                 click: () => {

        //                     // xGrid.value?.openExport()
        //                 }
        //             },
        //         }
        //     },
        //     {
        //         toolRender: { name: 'ToolbarFullscreen' }
        //     },
        //     {
        //         toolRender: {
        //             name: 'ToolbarCustomColumn', events: {
        //                 click: () => {
        //                     console.log(111);

        //                 }
        //             },

        //         }
        //     },
        // ],
    },

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
                            result: ReturnData.TableList,
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
//左侧角色管理数据
const roleClass = ref([
    {
        Cname: '后勤',
        Cdescribe: ""
    },
    {
        Cname: '财务',
        Cdescribe: ""
    },
    {
        Cname: '产品中心',
        Cdescribe: ""
    },
    {
        Cname: '前端',
        Cdescribe: ""
    },
    {
        Cname: '设计',
        Cdescribe: ""
    },
    {
        Cname: '维护中心',
        Cdescribe: ""
    },
    {
        Cname: '测试',
        Cdescribe: ""
    },
    {
        Cname: '运维',
        Cdescribe: ""
    },
    {
        Cname: '需求',
        Cdescribe: ""
    },
    {
        Cname: '售后',
        Cdescribe: ""
    },
    {
        Cname: '维护',
        Cdescribe: ""
    }
])
let checkAll = ref(false)
const treeRef = ref<InstanceType<typeof ElTree>>()
//菜单权限管理列表数据
const treeData: Tree[] = [
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
    },
    {
        id: 5,
        label: '服务人员',
    },
    {
        id: 6,
        label: '服务人员',
    },
]
//保存菜单权限管理列表的key
const keys: Array<number> = []
onMounted(() => {
    nextTick(() => {
        // xGrid.value?.xGrid?.commitProxy('query')
    })
    setTimeout(() => {
        // gridOptions.id = 'test'
        // gridOptions.formConfig = {}
    }, 2000)
    treeData.forEach((item) => {
        returnID(item)
    })
})
//全选按钮
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
//树列表单选
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
//关闭弹窗
const closeDialog = (key: string) => {
    switch (key) {
        case "addRole":
            dialogData.operateRole.visible = false
            break;
        case "baseRole":
            dialogData.baseRole.visible = false
            break;
        case "relateRole":
            dialogData.relateRole.visible = false
            break;
    }
}
//弹窗数据返回
const dataChange = (val: any, key: string) => {
    if (dialogData.operateRole.key == 'addClass') {
        if (val.Cname) {
            roleClass.value.push(val)
            val = []
        }
    }
    else if (dialogData.operateRole.key == 'addRole') {
        console.log("增加角色", val)
    }
    else if (dialogData.operateRole.key == 'editClass') {
        console.log('修改分类', val)
    }
}
//点击表格全选框触发
// const onCheckAll = (val: any) => {
//     if (val.checked) {
//         let treeData = xGrid.value.fitsTablePro.getCheckboxRecords(true)
//         treeData.forEach((item: any, index: number) => {
//             checkArr.push(index)
//         })
//     } else {
//         //取消全选
//         checkArr = []
//     }
// }
//点击表格选框触发
// const onCheckOne = (val: any) => {
//     if (val.checked) {
//         checkArr.push(val.$rowIndex)
//     } else {
//         let key = checkArr.indexOf(val.$rowIndex)
//         if (key != -1) {
//             checkArr.splice(key, 1)
//         }
//     }
// }
//点击弹窗确定按钮
const onSubmint = (key: string) => {
    let checkedData = xGrid.value.fitsTablePro.getCheckboxRecords(true)
    switch (key) {
        case 'RoleUse':
            checkedData.forEach((item: any, key: number) => {
                item.Ustate = true
            })
            break;
        case 'RoleRelation':
            console.log("关联")
            break;
        case 'Roledisable':
            checkedData.forEach((item: any, key: number) => {
                item.Ustate = false
            })
            break;
        case 'RoleyExport':
            console.log("导出")
            break;
        case 'Roleremove':
            console.log("删除")
            break;
        case 'addClass':
            closeDialog('operateRole')
            break;
        case 'addRole':
            closeDialog('operateRole')
            break;
        case 'RoleClassRemove':
            break
        case 'editClass':
            closeDialog('operateRole')
            break;
        case 'deleteClass':
            closeDialog('operateRole')
            break;
        case 'editRole':
            closeDialog('operateRole')
            break;
    }
    //关闭消息弹窗(上面关闭的是操作弹窗)
    closeDialog('baseRole')
}
//表格编辑按钮
const FormOperation = (val: any, key: string) => {
    if (key == 'editRole') {
        dialogData.operateRole.visible = true
        dialogData.operateRole.props.title = "编辑角色"
        dialogData.operateRole.key = "editRole"
        dialogData.operateRole.data = val
    } else if (key == 'relaRole') {
        dialogData.baseRole.visible = true
        dialogData.baseRole.dialogText = "是否确定关联选中的用户？"
        dialogData.baseRole.key = "relaRole"
    } else if (key == 'deleteRole') {
        dialogData.baseRole.visible = true
        dialogData.baseRole.dialogText = "是否确定删除选中的用户？"
        dialogData.baseRole.key = "deleteRole"
    }
}
//新增角色分类按钮
const addClassfy = () => {
    dialogData.operateRole.props.title = "新增角色分类"
    dialogData.operateRole.visible = true
    dialogData.operateRole.key = 'addClass'
    //每次新建都传入新的对象解决会有数据残留
    let obj = {
        Cname: '',
        Cdescribe: ""
    }
    dialogData.operateRole.data = obj
}
//角色管理操作
const classifyButton = (data: any, key: string) => {
    if (key == 'delete') {
        dialogData.baseRole.visible = true
        dialogData.baseRole.dialogText = "是否确定删除？"
        dialogData.baseRole.key = "deleteClass"
    }
    else if (key == 'editClass') {
        dialogData.operateRole.visible = true
        dialogData.operateRole.props.title = "编辑角色分类"
        dialogData.operateRole.key = "editClass"
        dialogData.operateRole.data = data
    }
}
//保存权限
const savePower = () => {
    let checkedData = xGrid.value.fitsTablePro.getCheckboxRecords(true)
    let treeCheckedData = treeRef.value!.getCheckedNodes()
    if (!checkedData.length) {
        openMessage('请选择至少一个角色！')
        return
    }
    if (!treeCheckedData.length) {
        openMessage('请选择至少一个权限进行分配！')
        return
    }
    console.log("权限分配成功,分配角色：", checkedData, ",分配权限：", treeCheckedData)
}
//点击左侧树节点
const clickTree = () => {
    nextTick(() => {
        xGrid.value.fitsTablePro.commitProxy('query')
    })
}
</script>
<style lang='scss' scoped>
.role-manage {
    user-select: none;
    font-size: 14px;
    display: flex;
    margin: 0;
    padding: 16px 12px 0 12px;
    background: #F1F2F5;
    // height: calc(100vh - 50px - 40px - 16px - 32px);

    .role-left {
        display: flex;
        flex: 1;
        margin-right: 8px;
        background: #FFFFFF;
        display: flex;
        padding: 16px 12px 0 12px;

        .left-classification {
            border-right: 1px solid #DCDFE6;
            margin-right: 16px;
            min-width: 240px;

            .top {
                display: flex;
                align-items: center;
                padding-right: 12px;
                justify-content: space-between;

                :deep(.el-input) {
                    width: 90%;
                }
            }

            .bottom {
                padding: 10px 12px 0 0;

                .title {
                    display: flex;
                    align-items: center;
                    background: #F2F4F6;
                    font-weight: bold;
                    line-height: 36px;
                    padding: 0 8px;
                }

                :deep(.custom-tree-node) {
                    width: 100%;
                }


                .text {
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .textLeft {
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        .textContent {
                            padding-left: 8px;
                        }
                    }

                    .moreButton {
                        cursor: pointer;

                        :deep(svg) {
                            outline: none !important;
                        }
                    }
                }

                .text:hover {
                    background-color: #F5F7FA;
                }
            }
        }

        .left-contain {
            flex: 1;

            .FromButton {
                color: #007DFF;
                margin-right: 10px;
                cursor: pointer;
            }

            .delete {
                color: #FF4300;
                text-decoration: underline;
            }

            .underline {
                text-decoration: underline;
            }
        }
    }

    .role-right {
        background: #FFFFFF;
        padding: 16px 12px 0 16px;
        min-width: 200px;

        .title {
            font-weight: bold;
            padding-bottom: 12px;
        }

        .search {
            display: flex;

            .Savebotton {
                margin-left: 20px;
            }
        }

    }

    :deep(.fits-dialog .el-dialog__footer .el-button) {
        border-radius: 2px;
    }

    :deep(.Roles-baseDialog) {

        .el-dialog__header {
            display: none;
        }

        .el-dialog__body {
            padding-top: 30px;
            padding-bottom: 20px;
        }
    }

    :deep(.onfooter) {
        .el-dialog__body {
            .dialog-body {
                .el-scrollbar {
                    .el-scrollbar__wrap {
                        .el-scrollbar__view {
                            padding: 0px !important;
                        }
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.Role-popover {
    width: 110px !important;
    min-width: 110px !important;
    padding: 0 !important;
    border-radius: 0px;

    .btn {
        padding: 0 !important;
        width: 100%;
        margin-right: 0px !important;

        .el-button {
            border: none;
            font-size: 14px;
            width: 100%;
            height: 44px;
            border-radius: 0;
        }
    }
}
</style>