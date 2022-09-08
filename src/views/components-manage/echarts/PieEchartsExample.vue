<template>
    <div class="pie-echarts-example">
        <div class="examples">
            <fits-card title="基础用法" desc="基础饼图展示，传入data数据即可" :is-active="true">
                <base-example />
            </fits-card>
            <fits-card title="图例用法" desc="通过设置legend.show=true显示图例，无需传data，以及位置固定为左侧居中">
                <show-legend-example />
            </fits-card>
            <fits-card title="空隙用法" desc="通过设置isHasGap=true表示项目之间都空隙，并且会有圆角">
                <gap-example />
            </fits-card>
            <fits-card title="颜色用法" desc="在传入data数据中，给每项数据设置color属性，如果不传则使用默认颜色">
                <color-example />
            </fits-card>
        </div>
        <div class="catalogue">
            <!-- 目录 -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseExample from "./pie-examples/BaseExample.vue"
import ShowLegendExample from "./pie-examples/ShowLegendExample.vue"
import GapExample from "./pie-examples/GapExample.vue"
import ColorExample from "./pie-examples/ColorExample.vue"

</script>

<style lang="scss" scoped>
.pie-echarts-example {
    display: flex;

    .examples {
        padding: 32px;
        flex: 1;
        background: #fff;
    }

    .catalogue {
        background: #fff;
        width: 240px;
        margin-left: 16px;
    }
}
</style>
