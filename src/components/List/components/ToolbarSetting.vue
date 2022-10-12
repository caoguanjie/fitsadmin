<template>
    <el-tooltip class="box-item" effect="dark" :content="props.msg" :hide-after="0" :placement="placement">
        <vxe-button icon="vxe-icon-setting" v-bind="$attrs" @click="openWindow" />
    </el-tooltip>

    <fits-dialog :visible="state.visible" :dialogProp="state.dialogProp" @cancel="state.visible=false"
        @submit="state.visible=false">
        <div class="setting-wrap">
            <div class="queryItem">
                <div class="title">常用查询项</div>
                <div class="use-query">
                    <template v-if="state.customQuery.length">
                        <div class="query-item" v-for="(item, index) in state.customQuery" :key="index">
                            <span class="name clickRipple">{{item.name}}</span>
                            <el-button :icon="Delete" link text class="delete" />
                        </div>
                    </template>
                    <div class="nodata" v-else>
                        <SvgIcon icon-class="nodata" />
                        <div class="text">暂无数据</div>
                    </div>

                </div>

                <div class="save-query">
                    <el-input v-model="state.inputValue" placeholder="请输入查询值名称,10个字以内" maxLength="10" />
                    <el-button type="primary" class="addBtn" plain>添加</el-button>
                </div>
            </div>
            <div class="searchItem">
                <div class="title">配置查询项</div>
                <div class="form-list">
                    <div class="form-item" v-for="(item, index) in state.formConfigItem" :key="index">
                        <el-checkbox :label="item.title" v-if="item.field" :checked="item.visible"
                            @change="changeFormConfigItems(item)" />
                    </div>
                </div>
            </div>
        </div>
    </fits-dialog>
</template>

<script lang='ts' setup>
import { VxeFormItemProps, VxeGridConstructor } from 'vxe-table';
import eventBus from '@/utils/base/EventBus';
import { Delete } from '@element-plus/icons-vue'
const props = defineProps<{
    // 自定义提示信息
    msg?: string,
    // 表格公共的api
    grid: VxeGridConstructor
}>()
const placement = ref<any>('top')

const state = reactive({
    visible: false,
    dialogProp: {
        title: '常用查询设置',
        width: 520,
        draggable: true
    },
    customQuery: [

    ] as any,
    inputValue: '',
    formConfigItem: props.grid.props.formConfig?.items ?? []
})

onMounted(() => {
    console.error(props.grid)
    eventBus.on('IsShowSearchForm', (isShowSearchForm: boolean) => {
        placement.value = isShowSearchForm ? 'top' : 'bottom'
    })
})
function changeFormConfigItems(item: VxeFormItemProps) {

    item.visible = !item.visible

    eventBus.emit('changFromItemStatus', item)
}

function openWindow() {
    state.visible = true;
}
</script>
<style lang='scss' scoped>
:deep(.fits-dialog .el-scrollbar__view) {
    padding: 16px;
}

.setting-wrap {
    display: flex;
    justify-content: center;
    align-items: stretch;

    &>* {
        border-radius: 2px;
        border: solid 1px #e9e9eb;
        font-size: 14px;
        color: #333;
        min-height: 405px;
    }

    & .title {
        padding: 8px;
        font-size: 12px;
        margin-bottom: 5px;
    }

    & .query-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;

        &:hover,
        &:focus,
        &:active {
            background-color: #e8f4ff;
        }
    }

    & .name {
        padding: 8px;
        display: inline-block;
        width: 92%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    & .delete {
        border: none;
        color: #cccccc;
        background: transparent;
    }


}

.save-query {
    margin: 10px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    --el-component-siz: 36px;
    --el-border-radius-base: 2px;

    & .addBtn {
        margin-left: 8px;
    }
}

.use-query {
    min-height: 320px;
}

.queryItem {
    min-width: 310px;
    width: 60%;
    max-width: 500px;
}

.searchItem {
    flex: 1;
    margin-left: 8px;
}

.form-item {
    margin: 0 8px;
}

.nodata {
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #666;
    text-align: center;


    & .svg-icon {
        font-size: 100px;
    }

    & .text {
        margin-left: -8px;
    }
}
</style>
