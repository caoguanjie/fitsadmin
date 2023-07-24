<template>
    <fits-table :option="fitsTablePro" ref="xGrid">
        <template #buttons>
            <el-button @click="getData">
                获取数据
            </el-button>
            <el-button @click="saveData">
                保存
            </el-button>
        </template>
        <template #addDefault>
            <el-button @click="insertItem">
                <i class="vxe-icon-add" />
            </el-button>
        </template>
        <template #requiredHeader="{ slotProps: { column } }">
            <span class="redStar">*</span>
            <span>{{ column.title }}</span>
        </template>

        <template #projectDefault="{ slotProps: { row, column } }">
            <el-form :ref="'requiredFormRef_' + row.rowKey + column.id" :model="row" :rules="rules" :key="row.rowKey">
                <el-form-item prop="project">
                    <el-autocomplete v-model="row.project" placeholder="请输入" :fetch-suggestions="queryProject"
                        clearable />
                </el-form-item>
            </el-form>
        </template>
        <template #batchDefault="{ slotProps: { row, column } }">
            <el-form :ref="'requiredFormRef_' + row.rowKey + column.id" :model="row" :rules="rules" :key="row.rowKey">
                <el-form-item prop="batch">
                    <el-select v-model="row.batch">
                        <el-option v-for="item in batch_Arr" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
        </template>
        <template #typeDefault="{ slotProps: { row } }">
            <el-form-item>
                <el-select v-model="row.type">
                    <el-option v-for="item in worktype_Arr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

        </template>
        <template #taskDefault="{ slotProps: { row, column } }">
            <el-form :ref="'requiredFormRef_' + row.rowKey + column.id" :model="row" :rules="rules" :key="row.rowKey">
                <el-form-item prop="task">
                    <el-input v-model="row.task" />
                </el-form-item>
            </el-form>
        </template>
        <template #responsibleDefault="{ slotProps: { row, column } }">
            <el-form :ref="'requiredFormRef_' + row.rowKey + column.id" :model="row" :rules="rules" :key="row.rowKey">
                <el-form-item prop="responsible">
                    <el-select v-model="row.responsible">
                        <el-option v-for="item in responsible_Arr" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
        </template>
        <template #reviewerDefault="{ slotProps: { row } }">
            <el-form-item>
                <el-select v-model="row.reviewer">
                    <el-option v-for="item in responsible_Arr" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
        </template>
        <template #startdateDefault="{ slotProps: { row, column } }">
            <el-form :ref="'dateFormRef_' + row.rowKey + column.id" :model="row" :rules="rules" :key="row.rowKey">
                <el-form-item prop="startdate">
                    <el-date-picker v-model="row.startdate" value-format="YYYY-MM-DD"
                        @change="dateChange(row, column)" />
                </el-form-item>
            </el-form>
        </template>
        <template #enddateDefault="{ slotProps: { row, column } }">
            <el-form :ref="'dateFormRef_' + row.rowKey + column.id" :model="row" :rules="rules" :key="row.rowKey">
                <el-form-item prop="enddate">
                    <el-date-picker v-model="row.enddate" value-format="YYYY-MM-DD" @change="dateChange(row, column)" />
                </el-form-item>
            </el-form>
        </template>

        <template #deleteDefault="{ slotProps: { row } }">
            <el-button @click="removeItem(row)">
                <i class="vxe-icon-delete" />
            </el-button>
        </template>
    </fits-table>
    <div class="dataBox">
        表格数据：
        {{ tableData }}
    </div>
</template>

<script lang='ts' setup>
import { ElMessage } from 'element-plus'
import { FitsTable } from '@/fits-components';
import { FitsTableProps, useFitsTablePro } from '@/fits-components/type'
import { VxeGridInstance } from 'vxe-table';

const instance = ref()
const tableData = ref([])
const dateObj: any = ref({})
const rowID = ref()
const dateRef = ref()
const gridOptions: FitsTableProps = {
    keepSource: true,
    columns: [
        { field: 'add', title: '操作', width: 80, slots: { default: 'addDefault' } },
        { field: 'project', title: '项目', slots: { default: 'projectDefault', header: 'requiredHeader' } },
        { field: 'batch', title: '批次/迭代', slots: { default: 'batchDefault', header: 'requiredHeader' } },
        { field: 'type', title: '工时类型', slots: { default: 'typeDefault' } },
        { field: 'task', title: '任务内容', slots: { default: 'taskDefault', header: 'requiredHeader' } },
        { field: 'responsible', title: '责任人', slots: { default: 'responsibleDefault', header: 'requiredHeader' } },
        { field: 'reviewer', title: '工时审核人', slots: { default: 'reviewerDefault' } },
        { field: 'startdate', title: '计划开始', slots: { default: 'startdateDefault' } },
        { field: 'enddate', title: '计划完成', slots: { default: 'enddateDefault' } },
        { field: 'delete', title: '操作', width: 80, slots: { default: 'deleteDefault' } },
    ],
    data: [
        { project: '', batch: '', type: '', task: '', responsible: '', reviewer: '', startdate: '', enddate: '' },
        { project: '', batch: '', type: '', task: '', responsible: '', reviewer: '', startdate: '', enddate: '' },
        { project: '', batch: '', type: '', task: '', responsible: '', reviewer: '', startdate: '', enddate: '' },
    ],
    align: 'center',
    toolbarConfig: {
        slots: {
            buttons: 'buttons'
        }
    },
    rowConfig: {
        keyField: 'rowKey',
        useKey: true
    },
    columnConfig: {
        useKey: true
    },
}
const xGrid = ref<VxeGridInstance | any>()
const { fitsTablePro } = useFitsTablePro(gridOptions, xGrid)
// 项目数据源
const project_Arr: any = ref([
    { value: '丰德开发框架项目' },
    { value: '2019年领床路径系统二期产品' },
    { value: '2019年领床路径系统一期产品' },
    { value: '开发组' },
    { value: '2022年特种机电设备检测' },
    { value: '健康档案系统' },
    { value: '2021年资产管理系统' },
    { value: '2023Vue升级' },
])
// 项目的搜索方法
const queryProject = (queryString: string, cb: any) => {
    const results = queryString
        ? project_Arr.value.filter((item: any) => item.value.toLowerCase().indexOf(queryString) !== -1)
        : project_Arr.value
    cb(results)
}
// 批次数据源
const batch_Arr: any = ref([
    { label: '.net core开原框架研究', value: '0' },
    { label: 'Fits Framework', value: '1' },
    { label: 'PC后台管理网站', value: '2' },
    { label: '混合app-ionic5', value: '3' },
    { label: '辅助工具', value: '4' },
    { label: '新PC前端框架研发', value: '5' },
])
// 工时类型数据源
const worktype_Arr: any = ref([
    { label: '项目管理', value: '0' },
    { label: '售前支持', value: '1' },
    { label: '需求分析', value: '2' },
    { label: '系统设计', value: '3' },
    { label: '功能开发', value: '4' },
])
// 责任人数据源
const responsible_Arr: any = ref([
    { label: '李小白', value: '0' },
    { label: '王辉', value: '1' },
    { label: '张冰冰', value: '2' },
    { label: '李萌萌', value: '3' },
    { label: '白静', value: '4' },
])
// 校验规则
const rules = reactive({
    project: [
        { required: true, message: '请选择项目', trigger: 'change' },
    ],
    task: [
        { required: true, message: '请输入任务内容', trigger: 'change' },
    ],
    batch: [
        { required: true, message: '请选择批次', trigger: 'change' },
    ],
    responsible: [
        { required: true, message: '请选择责任人', trigger: 'change' },
    ],
    startdate: [
        { validator: checkDate, type: 'date', trigger: 'change' }
    ],
    enddate: [
        { validator: checkDate, type: 'date', trigger: 'change' }
    ]
})

function insertItem() {
    xGrid.value.fitsTablePro.insertAt({ project: '', batch: '', type: '', task: '', responsible: '', reviewer: '', startdate: '', enddate: '' }, -1)
    tableData.value = xGrid.value.fitsTablePro.getTableData().tableData
}

function removeItem(row: any) {
    xGrid.value.fitsTablePro.remove(row)
    tableData.value = xGrid.value.fitsTablePro.getTableData().tableData
}

function dateChange(row: any, column: any) {
    rowID.value = row.rowKey
    const refName = 'dateFormRef_' + row.rowKey + column.id
    dateRef.value = refName
    if (dateObj.value[row.rowKey] === undefined) {
        dateObj.value[row.rowKey] = {
            [column.field]: row[column.field],
        }
    } else {
        dateObj.value[row.rowKey][column.field] = row[column.field]
    }
    if (dateObj.value[row.rowKey] && dateObj.value[row.rowKey]['startdate'] !== undefined && dateObj.value[row.rowKey]['enddate'] !== undefined) {
        // 点了开始时间，顺便校验结束时间。点了结束时间，顺便校验开始时间
        const arr = refName.split('_')
        const num = column.field === 'startdate' ? Number(arr.slice(-1)) + 1 : Number(arr.slice(-1)) - 1
        const dateName = `dateFormRef_${row.rowKey}col_${num}`
        instance.value.refs[dateName].validate()
    }
}

function checkDate(rule: any, value: any, callback: any, evt: any, e: any) {
    if (!dateObj.value[rowID.value] || !value) {
        callback()
        return
    }
    if (dateObj.value[rowID.value] && dateObj.value[rowID.value]['startdate'] && dateObj.value[rowID.value]['enddate']) {
        if (!moment(dateObj.value[rowID.value]['startdate']).isBefore(dateObj.value[rowID.value]['enddate'])) {
            const msg = rule.field === 'startdate' ? '不得大于结束时间' : '不得小于开始时间'
            callback(new Error(msg))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

function getData() {
    tableData.value = xGrid.value.fitsTablePro.getTableData().tableData
}

function saveData() {
    let requiredFlag = 0
    let requiredRefsNum = 0
    let dateFlag = 0
    let dateRefsNum = 0
    for (let item in instance.value.refs) {
        item.indexOf('requiredFormRef_') !== -1 && instance.value.refs[item] !== null && requiredRefsNum++
        item.indexOf('dateFormRef_') !== -1 && instance.value.refs[item] !== null && dateRefsNum++
    }
    for (let item in instance.value.refs) {
        if (item.indexOf('requiredFormRef_') !== -1 && instance.value.refs[item] !== null) {
            instance.value.refs[item].validate((valid: any, fields: any) => {
                if (valid) {
                    requiredFlag++
                }
            })
        }
        if (item.indexOf('dateFormRef_') !== -1 && instance.value.refs[item] !== null) {
            instance.value.refs[item].validate((valid: any, fields: any) => {
                if (valid) {
                    dateFlag++
                    if (requiredFlag === requiredRefsNum && dateFlag === dateRefsNum) {
                        ElMessage({
                            message: '保存成功',
                            type: 'success'
                        })
                    }
                }
            })
        }
    }
}

onMounted(() => {
    instance.value = getCurrentInstance()
})

</script>
<style lang='scss' scoped>
.dataBox {
    border: 1px solid #fefefe;
    margin-top: 20px;
}

.redStar {
    color: #f84a23;
    margin-right: 3px;
}

.el-form-item {
    margin: 10px auto;
}
</style>

<style lang="scss">

</style>