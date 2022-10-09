import { ElButton, ElInput } from "element-plus"
import { VXETable } from "vxe-table"
import ListSeachBtnGroud from '../components/ListSeachBtnGroud.vue'

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

