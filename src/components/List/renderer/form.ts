import { ElInput } from "element-plus"
import { VXETable } from "vxe-table"
import ListSeachBtnGroud from '../components/ListSeachBtnGroud.vue'
import FitsTreeSelect from '@/components/Form/FitsTreeSelect.vue'
import FitsIconSelect from '@/components/Form/FitsIconSelect.vue'


// 创建搜索表单栏-输入框
VXETable.renderer.add('input', {
    renderItemContent(renderOpts, params) {
        const { data, field }: any = params
        const { props }: any = renderOpts
        return h(ElInput,
            {
                modelValue: data[field],
                ...props,
                onInput: (value: any) => data[field] = value
            }
        )
    }
})

// 创建搜索表单栏-输入框
VXETable.renderer.add('FormBtnGroup', {
    renderItemContent(renderOpts, params) {
        const { data, field }: any = params
        const { props }: any = renderOpts
        return h(ListSeachBtnGroud)
    }
})

// 创建搜索表单栏-下拉树
VXETable.renderer.add('FitsTreeSelect', {
    renderItemContent(renderOpts, params) {
        const { data, field }: any = params
        const { props }: any = renderOpts
        return h(FitsTreeSelect,
            {
                modelValue: data[field],
                ...props,
            }
        )
    }
})

// 创建搜索表单栏-图标选择
VXETable.renderer.add('FitsIconSelect', {
    renderItemContent(renderOpts, params) {
        const { data, field }: any = params
        const { props }: any = renderOpts
        return h(FitsIconSelect,
            {
                modelValue: data[field],
                ...props,
            }
        )
    }
})