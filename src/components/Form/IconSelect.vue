<template>
    <div class="icon-select">
        <el-select v-model="iconName" popper-class="icon-popper" ref="selectInput" v-bind='$attrs.selectInput'
            :fit-input-width="true" :filter-method="filterMethod" @visible-change="VisibleChange">
            <template #empty>
                <el-scrollbar class="icon-scrollbar">
                    <div class="custom-icon">
                        <el-input v-model="filterText" class="filterInput" @input="filterIcons"
                            v-bind='$attrs.filterInput' v-show="($attrs.filterInput as any)?.show"
                            :prefix-icon="Search" />
                        <div class="icon-select__list" v-if="iconList.length">
                            <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)"
                                class="icon-wrapper" :class="{ 'isSelected': item === selectedName }">
                                <svg-icon color="#999" :icon-class="item"
                                    style="height: 30px; width: 16px; margin-right: 5px" />
                                <span>{{ item }}</span>
                            </div>
                        </div>
                        <!-- 筛选后没有数据的展示 -->
                        <div class="no-data-text" v-else>{{ $attrs?.noDataText || 'No Data' }}</div>
                    </div>
                </el-scrollbar>
            </template>
        </el-select>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { Search } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
    modelValue: string
}>(), {
    modelValue: ''
})

const emit = defineEmits(['selected', 'update:modelValue'])

const icons = [] as string[];
const modules = import.meta.glob('../../assets/icons/*.svg');
for (const path in modules) {
    const p = path.split('assets/icons/')[1].split('.svg')[0];
    icons.push(p);
}

const state = reactive({
    filterText: '',
    iconList: icons,
    iconName: '',
    selectedName: ''
})
const { filterText, iconList, iconName, selectedName } = toRefs(state);

const selectInput = ref()

watch(() => props.modelValue, (val: string) => {
    initValue(val)
})

onMounted(() => {
    initValue(props.modelValue)
})

function initValue(val: string) {
    if (val && !selectedName.value) {
        selectedIcon(val)
    }
}

function filterMethod(val: string) {
    iconList.value = icons
    iconList.value = icons.filter(item => item.indexOf(val) !== -1)
}

function filterIcons() {
    iconList.value = icons
    iconList.value = icons.filter(item => item.indexOf(filterText.value) !== -1)
}

// 下拉框打开/关闭的时候清空内部输入框的值，恢复所有下拉数据
function VisibleChange() {
    filterText.value = ''
    iconList.value = icons
}

function selectedIcon(name: string) {
    // 把值放进输入框，关闭下拉
    selectInput.value.blur()
    iconName.value = name
    selectedName.value = name
    emit("update:modelValue", name)
    emit('selected', name);
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
}
</style>
