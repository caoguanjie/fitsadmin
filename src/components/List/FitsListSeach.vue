<template>
    <el-scrollbar ref="scrollbarRef" max-height="200px" class="list-search-wrap">
        <FitsForm ref='fitsForm' :option="option" class="fitsForm" />
    </el-scrollbar>
</template>

<script lang='ts' setup>
import { FitsFormItemProps, FitsFormModel } from '../Form/type.d';
import ListSeachBtnGroud from '@/components/List/components/ListSeachBtnGroud.vue'
import { ComponentInternalInstance } from 'vue';
import variables from '@/styles/variables.module.scss';

const props = defineProps<{
    formItem: FitsFormItemProps[]
}>();


// 获取 fitsForm 实例化元素
const fitsForm = ref()
const emit = defineEmits(['getFormData', 'reset'])
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const option = reactive(new FitsFormModel({
    formItem: [],
    form: {
        inline: true
    },
    btnProps: {
        submitBtn: {
            show: false
        },
        resetBtn: {
            show: false
        }
    }
}))
// 按钮组
const btnGroup: FitsFormItemProps = reactive({
    type: 'ListSeachBtnGroud',
    field: 'btn',
    component: shallowRef(ListSeachBtnGroud),
    props: {
        isExpand: false
    },
    on: {
        submit: () => {
            console.log(fitsForm.value.fApi)
            fitsForm.value.fApi.submit((formData: any) => {
                // 删除按钮btn的属性值
                let { btn, ...data } = formData
                emit('getFormData', data)
            })
        },
        reset: () => {
            fitsForm.value.fApi.resetFields()
            const formData = fitsForm.value.fApi.formData()
            let { btn, ...data } = formData
            emit('reset', data)
        },
        getOpenStatus: () => {
            const { props: _props } = btnGroup as any;
            _props.isExpand = !_props.isExpand;
            handleFormItemNumber(proxy?.$el.clientWidth)
        }

    }
})

onMounted(() => {

    console.log(proxy?.$el.clientWidth)
})
// 监听浏览器的变化事件
useResizeObserver(document.body, () => {
    handleFormItemNumber(proxy?.$el.clientWidth)
})
// 处理每个表单项应该显示几个
function handleFormItemNumber(width: number) {
    const formItemWidth = parseInt(variables.ListSearchFormItemWidth);
    console.log(width, formItemWidth)
    console.log(Math.floor(width / formItemWidth))
    const { props: _props } = btnGroup as any;
    if (_props.isExpand) {
        option.formItem = [...props.formItem, btnGroup];
    } else {
        option.formItem = [...props.formItem.slice(0, Math.floor(width / formItemWidth) - 1), btnGroup]
    }

    console.log(option.formItem)
}


</script>
<style lang='scss' scoped>
.list-search-wrap {
    padding: 18px 15px 0;

}

.fitsForm {
    border-bottom: 8px solid #f3f5f6;
}

.searchBtns {
    display: inline-flex;
    vertical-align: middle;
    margin-right: 32px;
}
</style>