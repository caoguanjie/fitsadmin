<template>
  <div class="FitsFreshIcon">
    <el-row>
      <el-col>
        <el-form>
          <el-form-item label="图标名称">
            <el-input v-model="searchName" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-right: 10px;" :icon="Search" @click="searchIconsClick">查询
            </el-button>
            <el-form-item label="文字大小">
              <el-input-number v-model="iconSize" :min="12" :max="40" @change="iconSizeChange"
                style="width: 120px; margin-right: 10px;" />
              px
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="6" :sm="8" :md="3" :lg="2" :xl="2" v-for="(item, index) in iconList.data" :key="index">
        <el-card shadow="hover" @click="copyIconCode(item.name)">
          <svg-icon color="#999" :icon-class="item.name" :style="{ fontSize: iconSize + 'px' }" />
        </el-card>
        <div class="icon-text" @click="copyIconCode(item.name)">
          {{ item.name }}
        </div>
      </el-col>
    </el-row>
    <el-pagination v-model:currentPage="currentPage" :background="true" :pageSizes="pageSizes" :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper" :total="allIconsNum" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { SvgIcon } from '@/fits-components';
import { Search } from '@element-plus/icons-vue';
import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';

const icons: any = []; // 指定路径下的所有icons名称数组
let isSearchList = false;// 是否查询

let paginations = reactive({
  searchName: '', // 查询名称
  limit: 72,// 一页展示数量
  iconList: { data: icons }, //icon名称数组
  currentPage: 1,// 当前所在页数
  allIconsNum: icons.length,// 全部图标数量
  pageSizes: [10, 30, 72, 144, 216, 288],
  iconSize: 28//icon 图标文字大小
})


let { searchName, limit, iconList, currentPage, allIconsNum, pageSizes, iconSize } = toRefs(paginations);
const { copy } = useClipboard();// 复制到剪切板

const searchIconsClick = () => {
  currentPage.value = 1;
  isSearchList = true;
  fliterIcons();
}

// 筛选图标
const fliterIcons = () => {
  let transferArray = [];
  if (searchName.value && isSearchList) {
    transferArray = icons.filter(isExist);
  } else {
    isSearchList = false;
    transferArray = icons;
  }
  allIconsNum.value = transferArray.length;
  iconList.value.data = transferArray.slice((currentPage.value - 1) * limit.value, currentPage.value * limit.value)

}

// 分页：当前页数发生改变
const handleCurrentChange = (val: any) => {
  currentPage.value = val;
  fliterIcons();
}

// 分页：当前页面展示个数发生改成
const handleSizeChange = (val: any) => {
  limit.value = val;
  fliterIcons();
}

// 字体大小发生变化
const iconSizeChange = (value: any) => {
  iconSize = value;
}

// 获取资源文件中所有图标
const getIconsList = () => {
  const modules = import.meta.glob('../../../assets/icons/*.svg');
  for (const path in modules) {
    const iconName = path.split('assets/icons/')[1].split('.svg')[0];
    icons.push({
      name: iconName
    });
  }
  // 响应式数组动态变化,根据分页条件筛选
  allIconsNum.value = icons.length;
  fliterIcons();
}

// 拷贝图标代码方法
function copyIconCode(iconName: string) {
  const iconCode = '<svg-icon icon-class="' + iconName + '" />';
  copy(iconCode);
  ElMessage.success({
    showClose: true,
    message: '拷贝' + iconCode + '成功',
    type: 'success',
    duration: 3000
  });
}

// 筛选条件：是否存在字符串
function isExist(element: any) {
  return element.name.indexOf(searchName.value) > -1;
}

onBeforeMount(() => {
  getIconsList();
})


</script>

<style lang="scss" scoped>
.FitsFreshIcon {
  background: #fff;
  padding: 16px;

  .el-form-item {
    display: inline-flex;
    vertical-align: middle;
    margin-right: 10px;
  }

  .el-col {
    padding-right: 10px;
    padding-left: 10px;
  }

  .el-card {
    margin-bottom: 20px;
    border-radius: var(--el-border-radius-base);
  }

  :deep(.el-card__body) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    max-height: 60px;
    padding: 14.2857142857px;
    cursor: pointer;
    font-size: 28px;
  }

  :deep(.el-card__body:hover svg) {
    margin-top: -16.6666666667px;
  }

  :deep(.el-card__body svg) {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
      color 0.1s, font-size 0s;
  }

  :deep(.el-card__body::after) {
    position: absolute;
    bottom: -30px;
    width: 100%;
    padding: 4px 0;
    font-size: 12px;
    color: #fff;
    text-align: center;
    content: '点击复制';
    background-color: var(--el-color-primary);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
      color 0.1s, font-size 0s;
  }

  :deep(.el-card__body:hover::after) {
    bottom: 0;
  }

  .icon-text {
    height: 30px;
    margin-top: -15px;
    overflow: hidden;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  :deep(.el-pagination) {
    justify-content: center;
    margin: 20px 0 0 0;
    font-weight: 400;
    color: var(--el-color-black);
  }

  :deep(.el-form-item__label) {
    padding: 0 10px 0 0;
    font-size: 14px;
  }

}
</style>
