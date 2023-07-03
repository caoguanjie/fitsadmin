---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2023-06-19
---

# 内存泄露（memory leak）


## 什么是JS内存泄露
`JS的内存泄漏`指的是在JavaScript程序中，由于一些对象或变量无法被垃圾回收机制正确释放，导致占用的内存无法被回收，从而造成内存的持续增长，最终导致程序运行变慢甚至崩溃的问题。
内存泄漏通常发生在以下情况下：
1. `未及时清除不再使用的对象或变量`：如果一个对象或变量不再被程序使用，但没有被正确清除，垃圾回收机制无法识别并回收这部分内存。
2.  `循环引用：`当两个或多个对象之间存在相互引用，而且这些对象都不再被程序使用时，垃圾回收机制也无法回收它们占用的内存。
3. `定时器未清除：`如果在程序中使用了定时器，但在不需要时没有正确清除，定时器会一直占用内存，导致内存泄漏。
4. `闭包未释放：`如果在函数内部定义了闭包，并且这个闭包引用了外部函数的变量，而这个闭包没有被正确释放，也会导致内存泄漏。

## vue3几种导致内存增加的方式

在Vue 3中，可能会出现以下几种情况导致内存不断增加：

1. `未正确销毁组件：`：在Vue 3中，组件的生命周期钩子函数发生了变化，需要手动调用`unmounted`函数来销毁组件。如果未正确销毁组件，可能会导致内存泄漏。
2. `大量使用响应式数据：`Vue 3中的响应式系统使用了Proxy代理对象，相比Vue 2中的Object.defineProperty，性能更高，但是如果大量使用响应式数据，可能会导致内存占用过高。
3. `频繁创建和销毁组件：`如在Vue 3中，组件的创建和销毁比Vue 2更加高效，但是如果频繁创建和销毁组件，可能会导致内存占用过高,例如`v-if`,`v-for`。
4. `频繁使用动态组件（component）：`在Vue 3中，动态组件的创建和销毁比静态组件更加耗费资源，如果频繁使用动态组件，可能会导致内存占用过高。
::: warning
框架中使用的`src/layout/components/AppMain.vue`布局文件，里面的用到`v-if`和`<component :is="Component" />`都是吃内存的大户，也是影响内存大小的重要因素，但是这个布局是合理需要的，属于正常范围的内存占用，不是内存泄露的主导因素
:::


在以往的vue3项目代码中，有很多前端开发都滥用响应式数据（Proxy代理对象），很多情况下变量的声明是不是需要使用响应式的，使用普通对象即可，但是截止目前代码检查发现，只要命名变量都要赋予它们响应式，这样的话，也会带来内存增加风险，从而导致内存泄露，页面崩溃的结果。Vue3中，`ref()`、`reactive()`、`toRef()`、`toRef()`、`computed()`等响应式API可以帮助我们更方便地管理组件的状态和响应式数据。以下是一些需要使用这些API的情况：
1. `需要管理组件的状态：`ref可以用来管理组件的状态，可以将一个普通的变量转换为响应式数据，方便在模板`<template>`中使用。如果你需要管理组件的状态，就需要使用ref,通俗点说，就是如果这个变量是作用于模板`<template>`里面的任何一个标签的话，是可以采用响应式声明。
2. `需要管理复杂的响应式数据：`reactive可以用来管理复杂的响应式数据，可以将一个对象转换为响应式数据，方便在模板中使用。如果你需要管理复杂的响应式数据，就需要使用reactive。
3. `需要将响应式数据转换为普通变量：`toRef、toRefs可以将一个响应式数据转换为普通变量，方便在组件中使用。如果你需要将响应式数据转换为普通变量，就需要使用toRef。
总之，如果你需要管理组件的状态、管理复杂的响应式数据或将响应式数据转换为普通变量，就需要使用ref、reactive、toRef等API。否则，可以不使用这些API。

## 如何调试和定位内存泄露
这里一般是使用谷歌浏览器（Chrome）的`内存工具栏`和`任务管理器`进行调试和定位内存泄露问题，下面简单介绍一下调试的流程
### 内存工具栏面板说明

![图 1](/images/20230619033457.png)  
这里的面板要注意两点内容：
* 第一，生成快照，是根据右边的性能分析内容，生成相应的快照，这个快照的大小是临时存放在内存中，生成的快照越多，内存占用越大。
* 第二：点击垃圾回收按钮，会马上触发`js垃圾回收机制`清理多余的符合条件的对象和数组等内容，释放内存。


::: tip 什么是js垃圾回收机制
JavaScript的垃圾回收机制是一种自动化的内存管理机制，它会自动检测不再使用的对象，并将其从内存中删除，以释放内存空间。垃圾回收机制通过跟踪对象的引用计数来确定哪些对象可以被删除。当一个对象不再被引用时，它的引用计数会减少，当引用计数为0时，该对象就可以被垃圾回收机制删除。JavaScript的垃圾回收机制可以帮助开发人员避免手动管理内存，从而提高开发效率和代码质量。JavaScript的垃圾回收机制是自动触发的，它会在特定的时机自动运行。具体来说，垃圾回收机制会在以下情况下触发：
* 当内存达到一定阈值时：JavaScript引擎会设置一个内存阈值，当内存使用量超过这个阈值时，就会触发垃圾回收机制。
* 当程序空闲时：JavaScript引擎会在程序空闲时触发垃圾回收机制，这样可以避免影响程序的性能。
* 当程序退出时：当程序退出时，JavaScript引擎会自动运行垃圾回收机制，以释放所有未使用的内存。
总之，JavaScript的垃圾回收机制是自动触发的，它会在特定的时机自动运行，以释放未使用的内存，但是我们也可以通过内存工具栏进行手动触发
:::

### 快照面板说明

![图 2](/images/20230619034836.png)  

::: info
在Chrome的内存工具栏中，
* 浅层大小（Shallow Size）指的是一个对象本身占用的内存大小，不包括其引用的其他对象占用的内存。
* 保留大小（Retained Size）则是指一个对象及其引用的其他对象占用的总内存大小。保留大小可以更好地反映一个对象对整个程序内存占用的影响，因为它考虑了对象之间的引用关系。例如，一个对象引用了其他对象，即使这些被引用的对象本身占用的内存很小，但是它们被引用后会被保留在内存中，因此对整个程序的内存占用也会有影响。
* `(closure)`代表了闭包代码占用了内存的大小
:::

### 谷歌浏览器的任务管理器

#### Window
![图 3](/images/20230619035425.png)  
#### MacOS
![图 4](/images/20230619035453.png)  

这里的任务管理器能详细的看到浏览器中每个选项卡的内存占用情况，但是要注意一点的是，开启了F12开发者模式后，看到内存工具栏的内存`js堆大小`占用的内存大小不等于任务管理器的内存占用大小。因为任务管理器中的大小还要包括浏览器执行当前页面的js时需要部份内存，所以任务管理器的内存大小要比内存工具栏看到的内存大小要略大一点。

![图 5](/images/20230619035948.png)  


## FitsAdminV1.0发现的“内存泄露”的情况
::: note
FitsAdminV1.0的涉及的版本如下：
vue: v3.2.37
vite: v2.9.7
:::

为了调试内存是否真的泄露，我简单写了一个组件，组件内声明了一个约`80MB`大小的变量。后面都以这个测试组件进行内存的测试
::: details 一个80m的测试组件

```ts
<template>
    <div>组件view<input v-model="myname"> </div>
</template>
<script lang="ts">
export default {
    name: 'TableView'
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

//大概80mb
const a = new Array(20000000).fill(1)
let myname = ref<any>('')
const route = useRoute()
onMounted(() => {
    myname.value = route.query.name
})

</script>


```

:::

### 第一种:所有页面不缓存
按正常情况下，所有页面不缓存的话，从第一个页面跳转到第二个页面的时候，第一个页面一段时间后会触发js垃圾回收机制，会清掉第一个页面的80m内存占用。但是实际测试的情况就是，第一个页面和第二页面的内存同时占用了80m内存，并没有按理想的情况回收80m

<video  width="100%"   muted="" controls autoplay loop><source src="/images/QQ20230619-164441-HD.mp4" type="video/mp4"></video>

由上面视频可以看出，每次生成一个测试组件`TableView.vue`，都会给内存增加80m，而且主动调用js垃圾回收机制，页面占用的内存也没有回收，此时也可以初步判断是，测试组件里面的变量产生了内存泄露。

### 第二种:所有页面缓存
按理论来看，页面缓存所占用的内存是一定大于没有缓存的，因为被缓存的组件是不会被js垃圾回收的，它会一直占用内存，所以当页面多且组件占用内存大的情况的项目，通常是页面缓存和不缓存混合存在的，全局设置页面缓存风险会高点。

<video   width="100%"    muted="" controls autoplay loop><source src="/images/QQ20230619-174601-HD.mp4" type="video/mp4"></video>

从上面视频可以看出，每次生成的新的测试组件，主动点了垃圾清理，也不会被回收，导致页面内存越来越大。

## 如何解决内存泄露

### FitsAdmin到底有没有存在内存泄露的情况？

我在vue的官方github库中[issue](https://github.com/vuejs/core/issues/6591#issuecomment-1259161408)找到了答案, Vue3创造者尤雨溪回复：

![图 6](/images/20230619055850.png) 

按他说的话，通俗点翻译就是，他们并没有泄露，只是当前组件有可能对上一个组件有引用关系，导致了上一个组件并没有被回收，这个的确占用了一定的内存。

 但是他被自己打脸了，事实上，他这种引用方式，的确造成了内存的泄露，他自己也回复了：

 ![图 7](/images/20230619060238.png)  


::: danger 结论
就是vue3.2.x的确是存在内存泄露的情况，无论是开发环境还是生产环境，但是内存泄露不是vue框架代码引起的，而是vue代码的测试工具Vue Devtools引起的。
:::

### Vue Devtools是什么？

Vue Devtools是一款用于Vue.js开发的浏览器扩展程序，它可以帮助开发人员更方便地调试和分析Vue.js应用程序。Vue Devtools可以在浏览器中显示Vue.js组件树、数据、事件和生命周期等信息，还可以实时监测Vue.js应用程序的状态变化，方便开发人员进行调试和优化。Vue Devtools支持Chrome、Firefox和Edge等主流浏览器，可以通过Chrome Web Store、Firefox Add-ons和Microsoft Edge Add-ons等渠道进行下载和安装。

Vue Devtools的代码能够调试Vue的代码，其原理是通过与Vue应用程序进行通信来获取应用程序的状态和行为信息。具体来说，Vue Devtools会与Vue应用程序建立一个通信通道，通过这个通道可以获取Vue应用程序的组件树、数据、事件和生命周期等信息。当开发人员在浏览器中使用Vue Devtools时，它会通过这个通道与Vue应用程序进行交互，从而实现调试功能。

在Vue应用程序中，开发人员可以通过在代码中添加相关的配置来启用Vue Devtools的通信功能。一旦启用，Vue Devtools就可以与Vue应用程序建立通信通道，并获取应用程序的状态和行为信息。通过这个通道，Vue Devtools可以实时监测Vue应用程序的状态变化，并在浏览器中显示相关的调试信息。

总之，Vue Devtools的代码能够调试Vue的代码，其原理是通过与Vue应用程序进行通信来获取应用程序的状态和行为信息。这种通信机制可以帮助开发人员更方便地调试和分析Vue应用程序。

### 解决内存泄露的方法是：升级新版本的vue代码

将框架的`vue@3.2.37`版本升级到截止文档发布之前最新的版本`vue@3.2.47 (2023-02-02)`, [vue3.2官方版本更新说明](https://github.com/vuejs/core/blob/main/changelogs/CHANGELOG-3.2.md)

上面说的Vue Devtools引起的内存泄露的问题，在版本`3.2.41 (2022-10-14)`已经修复了

![图 8](/images/20230619061444.png)  

在终端输入命令,即可以解决问题：
```shell
npm i vue@3.2.47
```


升级完vue的版本之后，我们继续来测试一下。

#### 第一种:所有页面不缓存

<video  width="100%" muted="" controls autoplay loop><source src="/images/QQ20230619-182629-HD.mp4" type="video/mp4"></video>

从上面视频可以看出，升级vue的版本之后，内存增加的过程如下：
1. 生成第一个内存快照是：初始首页，固定占用22.8m的内存
2. 当加载路径`/table/1`的时候，会生成第一个测试组件，此时点击生成第二个快照，此时内存占用103m，这个是初始22.8m，加上此时显示的第一个组件的内存。
3. 这个时候加载路径`/table/2`，生成第二个测试组件，内存马上增加了多80m，达到了183m左右，我此时主动点击了js垃圾回收按钮，这个时候内存占用下降到100m左右，此时点击生成第三次快照，你会发现第二次和第三次的快照都是103m，证明第一个页面的测试组件所占用的80m已经被浏览器回收了，并且释放了。后面几次操作都是反复验证这个问题。


::: info
上面我为什么不录浏览器的任务管理器的内存占用情况？从上面的理论知识打底后，我们已经明确知道了，内存工具的`垃圾桶`图标就是主动触发js回收机制的调试工具，js垃圾回收是需要一定的时机的，为了更快让大家提现效果，所以采取了主动触发的方式。从上面的理论知识我们也可以知道，当我们测试在频繁切换页面是，内存是会一直增加的，那会不会最终也会页面崩溃呢？理论上是不会的，因为如果已经验证了消失的页面是可以被回收的话，当内存增加到一定程度的话，会触发垃圾回收机制，就不会出现崩溃的情况，之前项目出现崩溃的情况，更多是内存一直在增加，缺没有被回收，内存低的时候，就发生了崩溃现象。
:::


### 第二种:所有页面缓存
<video  width="100%"  muted="" controls autoplay loop><source src="/images/QQ20230619-185041-HD.mp4" type="video/mp4"></video>

从上面的视频可以看出来，被缓存的测试组件，再怎么触发都不会被回收，因为这个组件都被`keepalive`组件缓存下来的，并不会消失。

::: tip 总结
1. 如果解决了内存泄露的问题后，项目组中使用全局组件缓存的方案不可取了，因为内存还是会因为你新开多少个页签就新增多少m固定的内存占用。后续各个项目组的前端开发最好根据项目组需要的复杂页面进行缓存，提高性能，对于一些简单的页面不采用缓存，不然会导致页面崩溃的情况
2. 项目已出现内存泄露的问题后，前端开发者，按照下面步骤进行升级即可解决问题：
   * 先执行命令：`npm i vue@3.2.47`
   * 把项目中的`package-lock.json`文件删掉
   * 再执行`npm install`命令重新生成`package-lock.json`

:::


## 2023年6月30日发现的内存泄露点
原本以为解决了vue的版本问题就能解决内存泄露的，但是我在项目中更新之后，发现结果并没有按照我们想象的想法来，内存并没有释放多少，虽然有减少，但是提升有限
于是我开始进行漫长的排查内存泄露的原因过程。下面直接说结果，找寻的过程就不做过多的赘叙了。

### FitsDialog组件存在内存泄露

起因是在`element-plus`的`issues`看到一篇文章：[[Component] [dialog] dialog组件导致内存泄漏 #8972](https://github.com/element-plus/element-plus/issues/8972)

看完文章之后发现这个内存泄露的根本原因是：vue的内置组件`Teleport`导致的，在vue的github的`issues`,也有相应的文章[The onUnmounted callback is not triggered when using Teleport #6347](https://github.com/vuejs/core/issues/6347)。大体的意思就是：包裹在`Teleport`组件里面的组件，无法正常调用销毁钩子函数`onUnmounted`导致了组件无法正常销毁。

有上面的证据作为理论进行分析的话，大概就是如果弹窗组件`FitsDialog`组件在页面切换之后，没有正确进行销毁，于是弹窗组件就被缓存在内存了，由于弹窗组件的上层组件是列表组件的页面，弹窗和列表组件存在父子关系，会导致整个列表页面被缓存下来，此时占用的内存无法被正常回收，一定程度导致了内存过高。

::: warning 总结
截止到vue的版本v3.2.47，依然没有解决这个问题。后面前端开发如果要利用element-plus的`el-dialog`组件的时候，或者vue的`Teleport`要注意这个影响。
:::

#### 解决方法

在`element-plus`的`issues`的帖子中有个临时的方法，给`el-dialog`加上`append-to-body`属性，在一定程度解决这个问题，实践之后，我发现加上属性之后，其实就是没有再使用vue`Teleport`组件了,会直接把弹窗组件的dom节点插入到body结束标签的上面，从而达到释放内存的效果。

因此 `FitsDialog`组件要修改的内容如下：

1.给`el-dialog`组件加上`append-to-body`,其他地方的代码不用动
```vue
<el-dialog ref="elDialogRef" :class="props.class ? props.class + ' fits-dialog' : 'fits-dialog'"
            :close-on-click-modal="false" v-bind="dialogProp" v-model="isVisible" append-to-body
            :top="props.dialogProp.top ? props.dialogProp.top : dialogMarginTop" @close="emitcancel">
           
        </el-dialog>
```

2. 调整弹窗的高度计算方法，让弹窗居中偏上的位置显示

```js
/**
 * 这里的代码主要是，当弹窗内容超过540的高度的时候，自动居中
 * 当弹窗内容低于540高度的时候，marginTop: -10vh。也能达到大概居中的目的
 */
function updatedWindowHeight() {

    // 实际弹窗部分
    const dialogWindowHeight = elDialogRef.value.dialogContentRef.$el.getBoundingClientRect().height
    // 黑色阴影的div
    const dialogWrapWindowHeight = elDialogRef.value.dialogContentRef.$parent.$parent.$el.getBoundingClientRect().height;

    /**
     * 下面是旧代码
     if (dialogWindowHeight > 540) {
         dialogMarginTop.value = "0";
     } else {
         dialogMarginTop.value = dialogWrapWindowHeight < 540 ? "20px" : "-10vh";
     }
     */
    
    // 下面是调整之后的代码
    if (dialogWindowHeight > dialogWrapWindowHeight) {
        dialogMarginTop.value = "0";
    } else {
        // 第一个2是为了弹框居中，第二个2是了弹框处于居中再上一半的距离，因为人的视线是在窗口的中部以上的位置，
        dialogMarginTop.value = (dialogWrapWindowHeight - dialogWindowHeight) / 2 / 2 + 'px'
    }

}
```


### ToolbarCustomColumn组件存在内存泄露
这个组件主要用于列表的工具栏，控制表格的排列的顺序和显示隐藏的组件，解决上面的`FitsDialog`组件的内存泄露问题，不解决这个组件，你会发现，页面一样没有减少内存，我也是排查好久，很难才能重新出来这个关联关系的

其实不是这个组件存在问题，根本原因出现在`el-popover`，看到这个组件，就让我联想到上面的`el-dialog`都是弹窗式的组件，很难不让我不怀疑根本原因，是不是归根到底还是`vue`的内置组件`Teleport`惹得祸呢？

这个问题也在在`element-plus`的`issues`中找到相关讨论：[[Component] [popover] <el-popover>'s content won't be destroyed with :teleported="false" #6378](https://github.com/element-plus/element-plus/issues/6378)。果不其然啊，根据简单dom的结构和`el-popover`开放出来的api来看，这个弹窗组件也是利用了`Teleport`组件，因此那里用到了`el-popover`、`el-dialog`这两个组件，都会缓存它们的父级组件，从而导致了页面在切换过程中，本该会销毁掉的页面，缺错过了销毁阶段，占用的内存也得不到释放

#### 解决办法
给`el-popover`组件增加`:teleported="false"`的属性，这个属性在文档中有说明：`当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除`

```vue
<el-popover ref="popoverRef" :persistent="false"> </el-popover>
```

::: danger 注意
`:persistent="false"`是有缺陷的，官网说的很清楚，只有长时间不触发才会，释放内存，但是如果你在刚进来页面就点击了这个弹框，就会激发了，这个时候内存是不会释放的，并且研究证明，这个popover组件并没有类似`el-dialog`组件那样`append-to-body`方式，能配置不使用`Teleport`组件。
:::



由上面两个组件就可以分析，受`Teleport`组件影响的组件就太多了，例如
* `el-select`
* `el-date-picker`
* `el-cascader`级联选择器

根据`vue/core`github上面issue的方案，修改组件的源码，也无法正常解决。

![图 8](/images/20230703044056.png)  


截止7月3日之前，内存泄露问题没有很好的方案可以解决。