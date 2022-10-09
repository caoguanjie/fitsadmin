<template>
    <div class="form-example">
        <fits-card title="普通表单"
            desc="普通表单展示。数据类型为FitsFormCreateModel。需要传入rule：表单数据。为了展示提交表单的效果，传入了option.onSubmit，以提示框的形式展示表单数据。">
            <base-form-example />
        </fits-card>

        <fits-card title="行内表单" desc="行内表单展示。通过设置option.form.inline=true开启行内表单，并通过传入col设置显示多少列">
            <inline-form-example />
        </fits-card>

        <fits-card title="表单必填校验"
            desc="本案例展示了最基础的表单必填校验，给需要验证的表单项传入 effect.required=true 即可开启必填校验，并使用默认的错误提示信息。如果想自定义错误信息，需要传入一个字符串而不是'true'。">
            <validate-form-example />
        </fits-card>

        <fits-card title="自定义校验规则" desc="本例通过设置表单项的 validate 属性，展示了如何使用自定义验证规则来完成密码的二次验证。">
            <custom-validate-form-example />
        </fits-card>

        <fits-card title="动态增删表单项">
            <template #desc>
                <span>动态表单展示。通过获取表单组件实例，获得暴露出来的接口方法，调用相关的方法实现动态删减表单项。关于api方法调用请参照
                    <el-link type="primary" target="_blank" href="http://www.form-create.com/v3/instance.html">
                        form-create全局api</el-link>
                </span>
            </template>
            <dynamic-form-example />
        </fits-card>

        <fits-card title="自定义组件" desc="自定义表单组件展示。自定义的组件需要进行全局注册，注册后可以通过type传入注册时的组件名调用该组件。">
            <custom-form-example />
        </fits-card>

        <fits-card title="组件插槽">
            <template #desc>
                <span>通过传入rule，给需要插槽的项传入children数组。该数组由对象或者字符串组成。
                    如果使用组件的默认插槽，则不需要指定slot属性，表单会将children中的配置项遍历渲染。
                    如果使用组件的指定插槽，则需要通过slot传入插槽名称，指明使用哪个插槽。
                    <el-link type="primary" target="_blank" href="http://www.form-create.com/v3/guide/slot.html">
                        form-create官网:设置组件插槽</el-link>
                </span>
            </template>
            <slot-form-example />
        </fits-card>

        <fits-card title="弹窗表单"
            desc="调用表单弹窗需要使用 FitsFormDialog 组件，传递的数据类型为 FitsFormDialogModel。必填项为 visible 和 forms，visible 控制弹窗是否显示，forms 由一个或多个子表单组成，类型为 FitsFormModuleModel 数组。fits框架的表单有两种展现形式，一种是dialog对话框式，另一种是drawer抽屉式。">
            <dialog-form-example />
        </fits-card>
    </div>
</template>

<script setup lang="ts">
import BaseFormExample from './form-examples/BaseFormExample.vue';
import InlineFormExample from './form-examples/InlineFormExample.vue';
import ValidateFormExample from './form-examples/ValidateFormExample.vue'
import CustomValidateFormExample from './form-examples/CustomValidateFormExample.vue';
import DynamicFormExample from './form-examples/DynamicFormExample.vue';
import CustomFormExample from './form-examples/CustomFormExample.vue';
import SlotFormExample from './form-examples/SlotFormExample.vue';
import DialogFormExample from './form-examples/DialogFormExample.vue';


</script>

<style lang="scss">
.form-example {
    .fits-card {
        min-width: 500px;
    }

    // .el-form-item {
    //     min-width: 200px;
    // }
}
</style>

<style lang="scss" scoped>
.form-example {
    background: #fff;
    padding: 20px;
    width: 100%;
}
</style>