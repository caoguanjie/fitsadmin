

<script lang='ts'>
import { VxeGrid, VxeGridProps } from 'vxe-table';
import { h } from 'vue'
export default defineComponent({
    name: 'FitsTables',
    props: ['option'],
    setup: function (props, context) {
        var renderVN = function () {
            return h(VxeGrid, { ref: 'xGrid', class: "fits-grid", ...context.attrs, ...props.option }, context.slots)
        }
        return
    },
})
</script>
<style lang='scss' scoped>
/* @import url(); 引入css类 */
</style>