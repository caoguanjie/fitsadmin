import { VxeGrid } from "vxe-table"
import "./renderer/index"
import './fitstable.scss'
const FitsTable = (props: any, context: any) => {
    return h(VxeGrid, { ref: 'xGrid', class: "fits-grid", ...context.attrs, ...props.option }, context.slots)
}

FitsTable.props = ['option']
export default FitsTable