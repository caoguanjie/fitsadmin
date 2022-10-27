<template>
    <el-button-group style="margin:20px 30px">
        <el-button @click="prependRule">
            在头部追加规则
        </el-button>
        <el-button @click="appendRule">
            在尾部追加规则
        </el-button>
        <el-button @click="spliceRule">
            删除第一条规则
        </el-button>
        <el-button @click="spliceSpecifyRule">
            删除指定规则
        </el-button>
    </el-button-group>
    <fits-form-create :form="dynamicForm" ref="dynamicRef" />
    <fits-form-dialog :option="spliceOpt" @submit="submitSpliceForm" @cancel="spliceOpt.visible = false" />
</template>

<script setup lang="ts">
import { FitsFormCreateModel, FitsFormCreate, FitsFormDialog } from '@/fits-components';
import { ElMessage } from 'element-plus';

let num = 0

const dynamicForm = reactive(
    new FitsFormCreateModel({
        rule: [
            {
                type: "input",
                field: "UserName",
                title: "用户名称",
                props: {
                    placeholder: "请输入用户名称",
                },
                validate: [
                    { required: true, message: "请输入用户名称" }
                ],
            },
            {
                type: "input",
                title: "文本",
                field: "input2",
                props: {
                    placeholder: "请输入商品名称",
                }
            },
        ],
        option: {
            form: {
                labelPosition: 'right',
                inline: true
            },
        },
        col: 2
    })
)

const spliceOpt = reactive({
    visible: false,
    forms: [
        {
            form: new FitsFormCreateModel({
                rule: [
                    {
                        type: "input",
                        field: "fieldName",
                        title: "规则字段",
                        props: {
                            placeholder: "请输入规则字段",
                        },
                        validate: [
                            { required: true, message: "请输入规则字段" }
                        ],
                    }
                ],
                option: {
                    form: {
                        labelPosition: 'right'
                    },
                    submitBtn: false,
                    resetBtn: false
                },
            })
        },
    ],
    dialogProp: {
        title: '删除字段',
        width: '30%'
    }
})

const dynamicRef = ref()

/**
规则生成的规则
 */
function getRule() {
    num++
    return {
        type: "input",
        title: "追加规则" + num,
        field: "appendInput" + num,
        value: "追加规则" + num,
    }
}

function prependRule() {
    dynamicRef.value.fApi.prepend(getRule())
}

function appendRule() {
    dynamicRef.value.fApi.append(getRule())
}

function spliceRule() {
    dynamicRef.value.fApi.rule.splice(0, 1)
}

function spliceSpecifyRule() {
    spliceOpt.visible = true
}

function submitSpliceForm(formValue: any) {
    if (formValue.fieldName) {
        console.log(dynamicRef.value.fApi.removeField(formValue.fieldName));

        if (dynamicRef.value.fApi.removeField(formValue.fieldName) === undefined) {
            ElMessage.error('找不到该规则')
        } else {
            dynamicRef.value.fApi.removeField(formValue.fieldName)
            ElMessage.success('删除成功')
            spliceOpt.visible = false
        }
    }
}

</script>

<style lang="scss">

</style>

<style lang="scss" scoped>

</style>