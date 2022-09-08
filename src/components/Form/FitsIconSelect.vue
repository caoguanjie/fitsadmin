<template>
    <div class="icon-select">
        <el-select v-bind='select' v-model="selectedNames" ref="selectInputRef" @visible-change="VisibleChange"
            @clear="clearSelected" :popper-class="`${select?.popperClass} icon-popper`" @remove-tag="RemoveTag">
            <template #empty>
                <el-scrollbar class="icon-scrollbar" max-height="30vh">
                    <div class="custom-icon">
                        <el-input v-bind='input?.elementProps' v-model="filterText" class="filterInput"
                            @input="filterMethod(filterText)" v-show="input?.show" />
                        <div class="icon-select__list" v-if="iconList.length">
                            <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)"
                                class="icon-wrapper" :class="{ 'isSelected': item.isSelected }">
                                <svg-icon color="#999" :icon-class="item.name" />
                                <span>{{ item.name }}</span>
                            </div>
                        </div>
                        <div class="no-data-text" v-else>{{ noListText }}</div>
                    </div>
                </el-scrollbar>
            </template>
        </el-select>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch, useAttrs } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { FitsIconSelectModel } from './model';

const props = withDefaults(defineProps<{ options: FitsIconSelectModel }>(), {
    options: () => new FitsIconSelectModel(),
})
const { noListText, select, input }: any = toRefs(props.options)

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
    isMultiple: select.value.multiple,
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
.icon-select {
    width: 100%;

    &__list {

        .icon-wrapper {
            cursor: pointer;
            width: 33.3%;
            display: inline-block;
        }

        .icon-wrapper:hover {
            background: #f3f3f3;
        }

        .icon-wrapper.isSelected {
            background: #e8f4ff;
        }

        span {
            display: inline-block;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 70%;
        }
    }
}
</style>
<style lang="scss">
.icon-popper {
    .el-scrollbar__wrap {
        max-height: 30vh;
    }

    .custom-icon {
        padding: 10px;
        box-sizing: border-box;

        .icon-select__list {
            span {
                vertical-align: middle;
            }
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
        margin-right: 10px;
        height: 30px;
        width: 16px;
        vertical-align: middle;
    }
}
</style>
