<template>
    <div class="icon-select">
        <el-select v-bind='select' v-model="selectedNames" ref="selectInputRef" :filter-method="filterMethod"
            @visible-change="VisibleChange" :popper-class="`${select?.popperClass} icon-popper`">
            <template #empty>
                <el-scrollbar class="icon-scrollbar" max-height="30vh">
                    <div class="custom-icon">
                        <el-input v-bind='input?.elementProps' v-model="filterText" class="filterInput"
                            @input="filterMethod(filterText)" v-show="input?.show" />
                        <div class="icon-select__list" v-if="iconList.length">
                            <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)"
                                class="icon-wrapper" :class="{ 'isSelected': item.isSelected }">
                                <svg-icon color="#999" :icon-class="item.name" />
                                <span>{{  item.name  }}</span>
                            </div>
                        </div>
                        <div class="no-data-text" v-else>{{  noListText  }}</div>
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
    isMultiple: false,
    selectedNames: []
})
const { filterText, iconList, isMultiple, selectedNames }: any = toRefs(state);

const _attrs: any = useAttrs()

const selectInputRef = ref()

watch(_attrs.modelValue, (val) => {
    selectedValueChange(val)
})

watch(() => selectedNames.value, (val) => {
    selectedValueChange(val)
})

onMounted(() => {
    isMultiple.value = select.value.multiple
    // 初始化默认值
    if (_attrs.modelValue && _attrs.modelValue.length) {
        iconList.value.map((item: any) => {
            item.isSelected = _attrs.modelValue.includes(item.name)
        })
        selectedNames.value = _attrs.modelValue
    }
})

function selectedValueChange(val: any) {
    iconList.value.map((item: any) => item.isSelected = val?.includes(item.name))
    emit("update:modelValue", selectedNames.value)
}

function filterMethod(val: string) {
    iconList.value = icons.filter((item: any) => item.name.indexOf(val) !== -1)
}

// 下拉框打开/关闭的时候清空内部输入框的值，恢复所有下拉数据
function VisibleChange() {
    filterText.value = ''
    iconList.value = icons
}

function selectedIcon(item: any) {
    item.isSelected = !item.isSelected
    // 单选
    if (!isMultiple.value) {
        selectedNames.value = []
        if (item.isSelected) {
            selectedNames.value.push(item.name)
        }
        selectInputRef.value.blur()
        return
    }
    // 多选
    if (!item.isSelected) {
        const index = selectedNames.value.indexOf(item.name)
        selectedNames.value.splice(index, 1)
    } else {
        selectedNames.value.push(item.name)
    }
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
        width: 16px
    }
}
</style>
