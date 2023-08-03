import { defineStore } from 'pinia';
import { nextTick } from 'vue';
import router from '@/router';
import { TagsViewState } from '@/model/base/store';

const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: [], //  keepAlive 缓存页面
    excludeViews: [], // 不缓存的组件
  }),
  actions: {
    /**
     * 添加可访问的视图
     * @param view 
     */
    addVisitedView(view: any) {
      if (this.visitedViews.some((v) => v.path === view.path)) return;
      if (view.meta && view.meta.affix) {
        this.visitedViews.unshift(
          Object.assign({}, view, {
            title: view.meta?.title || 'no-name',
          })
        );
      } else {
        this.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta?.title || 'no-name',
          })
        );
      }
    },
    /**
     * 添加缓存视图，把组件名字存入keep-alive的include属性里面
     * @param view 
     */
    addCachedView(view: any) {

      if (this.cachedViews.includes(view.name)) return;
      if (view.meta.cache) {
        this.cachedViews.push(view.name);
      }
    },
    /**
     * 添加不执行缓存视图，把组件名字存入keep-alive的exclude属性里面
     * @param view 
     */
    addExcludeView(view: any) {
      if (this.excludeViews.includes(view.name)) return;
      this.excludeViews.push(view.name);
    },
    /**
    * 删除不执行缓存视图，把组件名字存入keep-alive的exclude属性里面
    * @param view 
    */
    delExcludeView(view: any) {
      return new Promise((resolve) => {
        const index = this.excludeViews.indexOf(view.name);
        index > -1 && this.excludeViews.splice(index, 1);
        resolve([...this.excludeViews]);
      });
    },
    /**
     * 删除可访问的路由视图
     * @param view 
    */
    delVisitedView(view: any) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    /**
     * 删除缓存视图
     * @param view 
     * @returns 当前的缓存视图
     */
    delCachedView(view: any) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        index > -1 && this.cachedViews.splice(index, 1);
        resolve([...this.cachedViews]);
      });
    },
    /**
     * 删除其他路由
     * @param view 
     * @description affix 属性是route里面是否要固定在标签页的方法
     */
    delOtherVisitedViews(view: any) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta?.affix || v.path === view.path;
        });
        resolve([...this.visitedViews]);
      });
    },
    /**
     * 删除其他缓存路由
     * @param view 
     */
    delOtherCachedViews(view: any) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1);
        } else {
          // 如果index = -1, 这里就没有缓存的标签页了
          this.cachedViews = [];
        }
        resolve([...this.cachedViews]);
      });
    },
    /**
     * 更新路由
     * @param view 
     */
    updateVisitedView(view: any) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
    /**
    * 添加视图
    * @param view 
    */
    addView(view: any) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    /**
     * 删除可访问的视图和缓存视图
     * 扩展运算符(...) 把数组中的所有可遍历属性，拷贝到当前数组之中
     * [...this.visitedRoutes] == object.assign([],visitedRoutes)
     * 用这种方法拷贝的数组，新的数组的变化不会影响旧数组的内存指针
     * @param view 
     */
    delView(view: any) {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    /**
     * 删除其他的路由
     * @param view 
     */
    delOtherViews(view: any) {
      return new Promise((resolve) => {
        this.delOtherVisitedViews(view);
        this.delOtherCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    /**
     * 删除左侧路由
     * @param view 
     * @returns 
     */
    delLeftViews(view: any) {
      return new Promise((resolve) => {
        const currIndex = this.visitedViews.findIndex(
          (v) => v.path === view.path
        );
        if (currIndex === -1) {
          return;
        }
        this.visitedViews = this.visitedViews.filter((item, index) => {
          // affix:true 固定tag，例如“首页”
          if (index >= currIndex || (item.meta && item.meta.affix)) {
            return true;
          }
          // 当当前的索引比遍历的大的时候，把缓存的路由给删除
          const cacheIndex = this.cachedViews.indexOf(item.name as string);
          if (cacheIndex > -1) {
            this.cachedViews.splice(cacheIndex, 1);
          }
          return false;
        });
        resolve({
          visitedViews: [...this.visitedViews],
        });
      });
    },
    /**
     * 删除右侧路由
     * @param view 
     * @returns 
     */
    delRightViews(view: any) {
      return new Promise((resolve) => {
        const currIndex = this.visitedViews.findIndex(
          (v) => v.path === view.path
        );
        if (currIndex === -1) {
          return;
        }
        this.visitedViews = this.visitedViews.filter((item, index) => {
          // affix:true 固定tag，例如“首页”
          if (index <= currIndex || (item.meta && item.meta.affix)) {
            return true;
          }

          const cacheIndex = this.cachedViews.indexOf(item.name as string);
          if (cacheIndex > -1) {
            this.cachedViews.splice(cacheIndex, 1);
          }
          return false;
        });
        resolve({
          visitedViews: [...this.visitedViews],
        });
      });
    },
    /**
     * 删除所有的路由
     * @param view 
     */
    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    /**
      * 删除所有路由
      * @param view 
      */
    delAllVisitedViews() {
      return new Promise((resolve) => {
        const affixTags = this.visitedViews.filter((tag) => tag.meta?.affix);
        this.visitedViews = affixTags;
        resolve([...this.visitedViews]);
      });
    },
    /**
     * 删除所有路由
     * @param view 
    */
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    },
    /**
     * 刷新当前页面
     * @param view 
     */
    refreshSelectedTag(view: any) {
      this.delCachedView(view).then(() => {
        const { fullPath } = view;
        nextTick(() => {
          router.replace({
            path: "/redirect" + fullPath,
          });
        });
      });
    },
    /**
     * 跳到tab最后一项，如果没有就跳到首页
     */
    toLastView(visitedRoutes: any, view: any) {
      const latestView = visitedRoutes.slice(-1)[0];
      if (latestView) {
        router.push(latestView.fullPath);
      } else {
        // 现在，如果没有标签视图，默认情况下会重定向到主页，,
        // 您可以根据需要进行调整
        if (view.name === "Home") {
          // 重新加载主页
          router.replace({ path: "/redirect" + view.fullPath });
        } else {
          router.push("/");
        }
      }
    },
  },
});

export default useTagsViewStore;
