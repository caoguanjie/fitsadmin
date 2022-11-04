<template>
    <div class="IconSelect">
        <el-select :filter-method="filterMethod" v-bind='options.select' v-model="selectedNames" ref="selectInputRef"
            @visible-change="VisibleChange" @clear="clearSelected"
            :popper-class="`${options.select?.popperClass} icon-popper`" @remove-tag="RemoveTag">
            <template #empty>
                <el-input v-bind='options.input' v-model="filterText" class="filterInput"
                    @input="filterMethod(filterText)" v-show="options.showInput" />
                <el-scrollbar class="icon-scrollbar" max-height="40vh">
                    <div class="IconSelect__list" v-if="iconList.length">
                        <el-card shadow="hover" v-for="(item, index) in iconList" :key="index"
                            @click="selectedIcon(item)" class="icon-wrapper" :class="{ 'isSelected': item.isSelected }">
                            <el-tooltip effect="dark" :content="item.name" placement="top">
                                <div class="inner-content">
                                    <svg-icon color="#999" :icon-class="item.name" />
                                    <div :class="'itemName-' + item.name">{{ item.name }}</div>
                                </div>
                            </el-tooltip>
                        </el-card>
                    </div>
                    <div class="no-data-text" v-else>{{ options.noListText }}</div>
                </el-scrollbar>
            </template>
        </el-select>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, useAttrs, watch } from 'vue';
import { FitsIconSelectModel } from './select';
import { SvgIcon } from '../../Basic/SvgIcon'
const props = withDefaults(defineProps<{ options?: FitsIconSelectModel }>(), {
    options: () => new FitsIconSelectModel(),
})

// 不结构options，是因为toRefs只能接收响应式对象，不能是普通对象。浏览器会警告
const { options }: any = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const icons: any = [];
const modules = import.meta.glob('../../assets/icons/*.svg');
for (const path in modules) {
    const p = path.split('assets/icons/')[1].split('.svg')[0];
    icons.push({
        name: p,
        isSelected: false
    });
}

const state = reactive({
    filterText: '',
    iconList: icons,
    isMultiple: options.value.select.multiple,
})
const { filterText, iconList, isMultiple }: any = toRefs(state);

const selectedNames: any = isMultiple.value ? ref([]) : ref('')
const _attrs: any = useAttrs()
const selectInputRef = ref()

watch(() => _attrs.modelValue, (val) => {
    // 值为空，将列表选中样式去除
    if (!val || !val?.length) {
        selectedNames.value = isMultiple.value ? [] : ''
        iconList.value.map((item: any) => {
            item.isSelected = false
        })
        return
    }
    initData(val)
})

onMounted(() => {
    initData(_attrs.modelValue)
})

function initData(val: any) {
    // 初始化默认值
    if (!val || !val?.length) return
    selectedNames.value = val
    // 单选
    if (!isMultiple.value) {
        iconList.value.find((item: any) => item.name === val).isSelected = true
    } else {
        // 多选
        iconList.value.map((item: any) => {
            item.isSelected = val.includes(item.name)
        })
    }
    emit('update:modelValue', val)
}

function filterMethod(val: string) {
    iconList.value = icons.filter((item: any) => item.name.indexOf(val) !== -1)
}

// 下拉框打开/关闭的时候清空内部输入框的值，恢复所有下拉数据
function VisibleChange() {
    filterText.value = ''
    iconList.value = icons
}

/**
 * @desc 选择图标
 */
function selectedIcon(item: any) {
    // 单选
    if (!isMultiple.value) {
        iconList.value.map((item: any) => item.isSelected = false)
        item.isSelected = !item.isSelected
        if (item.isSelected) {
            selectedNames.value = item.name
        }
        selectInputRef.value.blur()
    } else {
        // 多选
        item.isSelected = !item.isSelected
        // 之前是被选中
        if (!item.isSelected) {
            // 重新用一个变量赋值是因为，调用splice方法或者直接赋值的话，emit的值监听不到变化
            const arr = [...selectedNames.value]
            const index = arr.indexOf(item.name)
            arr.splice(index, 1)
            selectedNames.value = [...arr]
        } else {
            selectedNames.value = [...selectedNames.value, item.name]
        }
    }
    emit('update:modelValue', selectedNames.value)
}

/**
 * @desc 多选模式下取消勾选
 */
function RemoveTag(val: any) {
    iconList.value.find((item: any) => item.name === val).isSelected = false
    emit('update:modelValue', selectedNames.value)
}

function clearSelected() {
    selectedNames.value = isMultiple.value ? [] : ''
    iconList.value.map((item: any) => item.isSelected = false)
    emit('update:modelValue', selectedNames.value)
}

</script>

<style lang="scss" scoped>
.IconSelect {
    width: 100%;

    .el-select {
        width: 100%;
    }

    &__list {

        .icon-wrapper {
            display: inline-block;
            cursor: pointer;
            width: calc(25% - 20px);
            min-width: 50px;
            margin: 10px;
            max-height: 60px;

            .inner-content {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }

        .icon-wrapper.isSelected {
            background: #e8f4ff;
        }
    }
}
</style>
<style lang="scss">
.icon-popper {
    .el-card__body {
        padding: 5px 20px;
    }

    .filterInput {
        padding: 10px;
    }

    .inner-content {

        div {
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            text-align: center;
        }
    }

    .no-data-text {
        height: 60px;
        color: #909399;
        text-align: center;
        line-height: 60px;
        font-size: 14px;
    }

    .svg-icon {
        height: 30px;
        width: 22px;
        vertical-align: middle;
    }
}
</style>
