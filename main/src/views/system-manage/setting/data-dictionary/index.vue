<template>
    <div class="dictionary-manage">
        <div class="dict-left">
            <div class="left-classification">
                <div class="top">
                    <el-input class="searchBox" placeholder="搜索字典分类" :prefix-icon="Search" />
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
                        业务字典
                    </div>

                    <el-collapse-transition>
                        <div v-show="isShow">
                            <el-scrollbar class="treeScrollbar">
                                <el-tree ref="treeRef" :data="dictClass" node-key="dictClass.id" default-expand-all
                                    :expand-on-click-node="false" @node-contextmenu="openMenu">
                                    <template #default="{ data }">
                                        <span class="custom-tree-node">
                                            <!-- <el-popover placement="bottom" title="" trigger="contextmenu"
                                            :popper-class="'Role-popover'" :hide-after=0
                                            v-model:visible="data.isVisible" :key="data" :offset="0">
                                            <template #reference> -->
                                            <div class=" text">
                                                <div class=" textLeft" @click="clickTree">
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
                                            <!-- </template>
                                            <div class="btn">
                                                <el-button @click="classifyButton(data, 'editClass')">编辑
                                                </el-button>
                                            </div>
                                            <div class="btn">
                                                <el-button @click="classifyButton(data, 'deleteClass')">删除
                                                </el-button>
                                            </div>
                                        </el-popover> -->
                                        </span>
                                    </template>
                                </el-tree>
                            </el-scrollbar>
                        </div>
                    </el-collapse-transition>
                </div>
            </div>
            <div div class=" left-contain">
                <!-- <fits-list-seach :formItem='formItem' /> -->
                <fits-table :option="fitsTablePro" ref="xGrid" :grid-events="gridEvents">
                    <template #operate="{ slotProps }">
                        <!-- <fits-table :option="fitsTablePro" ref="xGrid" :grid-events="gridEvents"
                            @checkbox-all="onCheckAll" @checkbox-change="onCheckOne">
                            <template #operate> -->
                        <span class="FromButton underline" @click="FormOperation(slotProps.row, 'editDict')">编辑</span>
                        <span class="FromButton delete" @click="FormOperation(slotProps.row, 'deleteRole')">删除</span>
                        <!-- <el-button type="warning">Warning</el-button>
                            <el-button type="danger">Danger</el-button> -->
                    </template>
                    <template #state="{ slotProps }">
                        <el-switch v-model="slotProps.row.IsEnabled"
                            style="--el-switch-on-color: #000000; --el-switch-off-color: #dcdfe6" />
                        <!-- {{ slotProps.row.Ustate }} -->
                    </template>
                </fits-table>
            </div>
        </div>
        <!-- 数据弹窗（新增业务字典、字典、编辑字典分类） -->
        <fits-dialog :class="'onfooter'" :visible="dialogData.operate.visible" dialogData.relateRole.visible=false
            :dialogProp="dialogData.operate.props" :showFooter="false" @cancel="closeDialog('operate')">
            <add-dict v-if="dialogData.operate.key == 'addDict' || dialogData.operate.key == 'addClass'"
                @dataChange="dataChange" @closeDialog="closeDialog" :keys="dialogData.operate.key"
                :setData="dialogData.operate.data" />
            <edit-dict v-if="dialogData.operate.key == 'editDict' || dialogData.operate.key == 'editClass'"
                @dataChange="dataChange" @closeDialog="closeDialog" :keys="dialogData.operate.key"
                :setData="dialogData.operate.data" />
        </fits-dialog>
        <!-- 工具栏操作确认弹窗（关联、启用、禁用、导出、删除） -->
        <fits-dialog :class="'Dicts-baseDialog'" :visible="dialogData.base.visible" :dialogProp="dialogData.base.props"
            @cancel="closeDialog('base')" @submit="onSubmint(dialogData.base.key)">
            {{ dialogData.base.dialogText }}
        </fits-dialog>
        <ul v-show="visible" :style="{ left: position.left + 'px', top: position.top + 'px' }" class="contextmenu">
            <div class="btn">
                <el-button @click="classifyButton(position.data, 'editClass')">编辑</el-button>
            </div>
            <div class="btn">
                <el-button @click="classifyButton(position.data, 'deleteClass')">删除 </el-button>
            </div>
        </ul>
    </div>
</template>

<script lang='ts' setup name="dictionary">
import XEUtils from 'xe-utils';
import { Search, CirclePlusFilled, MoreFilled, CaretBottom, CaretRight } from '@element-plus/icons-vue'
import { getDictItemList } from '@/api/base/system';
import useStore from '@/store';
import { AxiosResponse } from 'axios';
import { VxeGridInstance, VxeGridListeners } from 'vxe-table';
import { useFitsTablePro, FitsTableProps, FitsTable } from '@/fits-components'
import { ref } from 'vue'
import { FitsDialog } from '@/fits-components'
import addDict from './add-dict.vue'
import editDict from './edit-dict.vue'
import { ElMessage, ElTree } from 'element-plus'

const treeRef = ref<InstanceType<typeof ElTree>>()
const { user } = useStore();
const xGrid = ref<VxeGridInstance | any>()

// 鼠标右键菜单选项
let visible = ref(false)
let position = ref({
    top: 0,
    left: 0,
    data: []
})

const dialogData = reactive({
    operate: {
        visible: false,
        key: "",
        data: {},
        props: {
            title: '',
            width: '40%'
        }
    },
    base: {
        dialogText: "",
        key: "",
        visible: false,
        props: {
            title: '',
            width: '30%'
        }
    }
})
// 消息提醒
const openMessage = () => {
    ElMessage({
        message: '请选择至少一个字典！',
        type: 'warning',
    })
}
let isShow = ref(true)
const showHide = () => {
    isShow.value = !isShow.value
}
//表头工具栏事件
const gridEvents: VxeGridListeners = {
    async toolbarButtonClick({ code }) {
        //表格
        const $grid = xGrid.value.fitsTablePro
        //获取选中的数据
        let record = $grid.getCheckboxRecords()
        switch (code) {
            case 'addDict': {
                dialogData.operate.props.title = "新增字典"
                dialogData.operate.visible = true
                dialogData.operate.key = 'addDict'
                let obj = {
                    Uname: '',
                    Ucode: '',
                    Udescribe: '',
                    Sort: '',
                    Ustate: false,
                    Roledisable: ""
                }
                dialogData.operate.data = obj
                break
            }
            case 'Dictable': {
                if (record.length) {
                    dialogData.base.visible = true
                    dialogData.base.dialogText = "是否确定启用选中的字典？"
                    dialogData.base.key = 'Dictable'
                } else {
                    openMessage()
                }
                break
            }
            case 'Dictunable': {
                if (record.length) {
                    dialogData.base.visible = true
                    dialogData.base.dialogText = "是否确定禁用选中的字典？"
                    dialogData.base.key = 'Dictunable'
                } else {
                    openMessage()
                }
                break
            }
            case 'DictExport': {
                if (record.length) {
                    dialogData.base.visible = true
                    dialogData.base.dialogText = "是否确定导出选中的字典？"
                    dialogData.base.key = "DictExport"
                } else {
                    openMessage()
                }
                break
            }
            case 'DictDelete': {
                if (record.length) {
                    dialogData.base.visible = true
                    dialogData.base.dialogText = "是否确定删除选中的字典？"
                    dialogData.base.key = "DictDelete"
                } else {
                    openMessage()
                }
                break
            }
        }
    }
}
const gridOptions: FitsTableProps = {
    // border: true,
    keepSource: false,
    showOverflow: false,
    id: 'dictionarytable',
    rowConfig: {
        height: 52
    },
    //数据缓存，如果其他表格也使用了同一个key会导致表格数据串用
    storage: {
        enabled: true,
        key: 'SystemManageDictionaryList',
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
            { field: 'name', span: 3, title: '字典名称', itemRender: { name: 'ElInput', props: { placeholder: '请输入字典名称' } } },
            { field: 'code', span: 3, title: '字典值', itemRender: { name: 'ElInput', props: { placeholder: '请输入字典值' } } },
            {
                field: 'IsEnabled', span: 3, title: '字典状态', itemRender: {
                    name: 'ElSelect',
                    props: {
                        // multiple: true,
                        collapseTags: true,
                        collapseTagsTooltip: true,
                        clearable: true,
                        placeholder: '请输入请选择状态'
                    },
                    options: [
                        {
                            value: '1',
                            label: '启用',
                        },
                        {
                            value: '2',
                            label: '禁用',
                        },
                    ]
                }
            },
        ]
    },
    importConfig: {},
    exportConfig: {},
    pagerConfig: {
        enabled: true
    },
    columns: [
        { field: 'Checkbox', type: 'checkbox', title: '多选', minWidth: 50 },
        { field: 'Indexes', title: '序号', type: 'seq', minWidth: 80 },
        { field: 'Name', title: '字典名称', minWidth: 130 },
        { field: 'Code', title: '字典值', minWidth: 160 },
        { field: 'SortNum', title: '字典编码', minWidth: 130 },
        { field: 'DictionaryID', title: '备注', minWidth: 100 },
        { field: 'Sort', title: '排序', minWidth: 100 },
        { field: 'IsEnabled', title: '状态', slots: { default: 'state' }, minWidth: 100 },
        { field: 'Operation', title: '操作列', minWidth: 150, slots: { default: 'operate' }, fixed: 'right' }
        // { field: 'Operati on', title: '操作列', width: 200, fixed: 'right', contentRender: { name: 'TableOpeate' } }
    ],
    toolbarConfig: {
        buttons: [
            { code: 'addDict', name: '添加字典', status: 'primary' },
            { code: 'Dictable', name: '启用' },
            { code: 'Dictunable', name: '禁用' },
            { code: 'DictExport', name: '导出' },
            { code: 'DictDelete', name: '批量删除' }
        ],
        tools: {
            enabled: true
        },
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
                    getDictItemList(form, pageParam).then((result: AxiosResponse) => {
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
//左侧业务字典数据
const dictClass = ref([
    {
        id: 0,
        Cname: '变异场景',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 1,
        Cname: '非计划重返住院',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 2,
        Cname: '非计划重返手术室次数',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 3,
        Cname: '护理评率',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 4,
        Cname: '手术并发症',
        Cdescribe: "",
        isVisible: false,
    },
    {
        id: 5,
        Cname: '等级',
        Cdescribe: "",
        isVisible: false,
    }
])
onMounted(() => {
    nextTick(() => {

        // xGrid.value?.xGrid?.commitProxy('query')
    })
    setTimeout(() => {
        // gridOptions.id = 'test'
        // gridOptions.formConfig = {}
    }, 2000)
    document.addEventListener("click", e => {
        const thisClassName = (e.target as any).className;
        if (thisClassName !== "contextmenu") {
            visible.value = false;
        }
    });
})
//关闭弹窗
const closeDialog = (key: string) => {
    switch (key) {
        case "addDict":
            dialogData.operate.visible = false
            break;
        case "addClass":
            dialogData.operate.visible = false
            break;
        case "base":
            dialogData.base.visible = false
            break;
        case "editDict":
            dialogData.operate.visible = false
            break;
        case "editClass":
            dialogData.operate.visible = false
            break;
        case "operate":
            dialogData.operate.visible = false
    }
}
//弹窗数据返回
const dataChange = (val: any, key: string) => {
    if (dialogData.operate.key == 'addClass') {
        if (val.Cname) {
            dictClass.value.push(val)
            val = []
        }
    }
    if (dialogData.operate.key == 'editDict') {
        console.log("字典编辑", val)

    }
    if (dialogData.operate.key == 'editClass') {
        console.log("字典分类编辑", val)
        dictClass.value[dictIndex] = XEUtils.clone(val)
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
        case 'Dictable':
            checkedData.forEach((item: any, key: number) => {
                item.IsEnabled = true
            })
            break;
        case 'Dictunable':
            checkedData.forEach((item: any, key: number) => {
                item.IsEnabled = false
            })
            break;
        case 'DictExport':
            console.log("导出")
            break;
        case 'DictDelete':
            console.log("删除")
            break;
        case 'addClass':
            dialogData.operate.visible = false
            break;
        case 'addDict':
            dialogData.operate.visible = false
            break;
        case 'RoleClassRemove':
            dialogData.base.visible = false
            break
        case 'editClass':
            dialogData.operate.visible = false
            break;
        case 'deleteClass':
            treeRef.value!.remove(dictClass.value[dictIndex])
            break;
        case 'editDict':
            dialogData.operate.visible = false
            break;
    }
    closeDialog('base')
}
//表格编辑按钮
const FormOperation = (val: any, key: string) => {
    if (key == 'editDict') {
        dialogData.operate.visible = true
        dialogData.operate.props.title = "编辑字典"
        dialogData.operate.key = "editDict"
        dialogData.operate.data = val
    } else if (key == 'deleteRole') {
        dialogData.base.visible = true
        dialogData.base.dialogText = "是否确定删除选中的字典？"
        dialogData.base.key = "deleteRole"
    }
}
//新增业务字典按钮
const addClassfy = () => {
    dialogData.operate.props.title = "新增字典分类"
    dialogData.operate.visible = true
    dialogData.operate.key = 'addClass'
    //每次新建都传入新的对象解决会有数据残留
    let obj = {
        Cname: '',
        Cdescribe: ""
    }
    dialogData.operate.data = obj
}
let dictIndex: number
//左侧业务字典操作
const classifyButton = (data: any, key: string) => {
    if (key == 'deleteClass') {
        dialogData.base.visible = true
        dialogData.base.dialogText = "是否确定删除？"
        dialogData.base.key = 'deleteClass'
    }
    else if (key == 'editClass') {
        dialogData.operate.visible = true
        dialogData.operate.props.title = "编辑业务字典"
        dialogData.operate.key = "editClass"
        dialogData.operate.data = data
    }
}
//点击左侧树节点
const clickTree = () => {
    nextTick(() => {
        xGrid.value.fitsTablePro.commitProxy('query')
    })
}
const openMenu = (event: any, data: any, node: any, assembly: any) => {
    position.value.data = data
    visible.value = true;
    const left = event.clientX;
    position.value.left = left - 75;
    position.value.top = event.clientY - 90;
}
</script>
<style lang='scss' scoped>
.dictionary-manage {
    height: 100%;
    user-select: none;
    font-size: 14px;
    margin: 0;
    background: #F1F2F5;
    padding: 16px 12px 0 12px;

    .dict-left {
        height: 100%;
        margin-right: 8px;
        background: #FFFFFF;

        .left-classification {
            min-width: 240px;
            float: left;
            padding: 16px 0 0 12px;
            height: 100%;

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
                    line-height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: 15px;

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

                .treeScrollbar {
                    height: calc(100vh - 225px);
                }
            }
        }

        .left-contain {
            border-left: 1px solid #DCDFE6;
            padding-left: 16px;
            overflow: hidden;

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

    :deep(.fits-dialog .el-dialog__footer .el-button) {
        border-radius: 2px;
    }

    :deep(.Dicts-baseDialog) {

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

    :deep(.body--wrapper) {
        overscroll-behavior: contain;
    }

    .contextmenu {
        min-width: 100px;
        margin-left: 20px;
        // margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

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