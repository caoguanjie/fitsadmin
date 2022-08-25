---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-23
---

# 风格指南

:::tip 官方文档
[vue3 风格指南](https://cn.vuejs.org/style-guide/)
:::

本项目的风格指南主要是参照 `vue` 官方的风格指南。在真正开始使用该项目之前建议先阅读一遍指南，这能帮助让你写出更规范和统一的代码。当然每个团队都会有所区别。其中大部分规则也都配置在了[eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)之中，当没有遵循规则的时候会报错，详细内容见[eslint](/)章节。

当然也有一些特殊的规范，是不能被 eslint 校验的。需要人为的自己注意，并且来遵循。最主要的就是文件的命名规则，这里拿`FitsAdmin`来举例。


## Component

::: info 组件命名规范
1. 所有的Component文件都是以单词首字母大写命名 (PascalCase)，这也是官方所推荐的
2. 组件的命名必须有两个或者两个以上的单词命名，但是`index.vue`除外
3. `FitsAdmin`框架封装的组件必须要加上前缀`Fits-xx`,业务系统的组件封装不做限制
:::

**组件的使用规范**

1. 使用遵循 `kebab-case` （短横线分隔命名）约定。在.vue页面中使用组件需要前后闭合，并以短线分隔

::: note 例子
```html
<fits-data-picker></fits-data-picker>
// 或者
<fits-table></fits-table>
```
:::

2. 或者使用`PascalCase`方式，但是不需要前后闭合
::: note 例子
```html
<MyComponent />
// 或者
<FitsTable />
```
:::



## View视图

::: info View里面的文件和文件夹的命名规范
1. 文件夹命名都使用横线连接 (kebab-case)，可以单个单词，但是必须小写
2. 所有的`.vue`文件都采用大写开头 (PascalCase)命名，`index.vue`除外
:::

例子：
```sh
@/views/svg-icons/index.vue
@/views/svg-icons/TreeSelectBasicUse.vue
```
使用横线连接 (kebab-case)来命名views主要是出于以下几个考虑。

* 横线连接 (kebab-case) 也是官方推荐的命名规范之一
* 没有大小写敏感问题
* 页面的url 也都是横线连接的，比如https://www.xxx.admin/export-excel，所以路由对应的view应该要保持统一
::: warning
这里要提醒一下，`router`的`path`属性，一定要采用 横线连接 (kebab-case) 来命名，例如：
```ts
{
    path: '/login-form',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
},
```
:::


## Ts文件
::: info ts、js的命名规范
1. 所有的`.ts`和`.js`文件都遵循横线连接 (kebab-case)，`index.ts`除外
2. 可以允许单个单词命名
:::

例子：
```sh
@/utils/open-window.js
@/utils/request.js
@/views/svg-icons/require-icons.js
@/components/MarkdownEditor/default-options.js
@/views/svg-icons/require-icons.js
@/components/MarkdownEditor/default-options.js
```

::: warning 注意事项
如果在项目中发现有一些ts文件没有遵循横线连接 (kebab-case)命名，不需要惊讶，由于历史原因，跟不同项目直接代码共用的原因，造成一部分文件命名不够规范，后续各个业务系统都要遵循kebab-case命名的原则
:::

## 文件夹命名

* 公共组件文件夹命名（src/components），跟组件命名一样，采用 PascalCase (单词首字母大写命名) ，例如`src/components/FitsDataPicker/index.vue`

* 除了`src/components/*`以外的所有文件夹命名，都采用横线连接 (kebab-case)命名


## Ts类型声明规范
::: tip type.d.ts 和 type.ts 的区别
* `*.ts` 是标准的 `TypeScript` 文件。其内容将被编译为 `JavaScript`。
* `*.d.ts `是允许在 TypeScript 中使用现有 JavaScript 代码的类型定义文件。`*.d.ts `文件不包含任何实现，并且根本不编译为 JavaScript。
* 在`*.d.ts `声明变量或者模块等东西之后，在其他地方可以不用import导入这些东西就可以直接用，而且有语法提示。
* `*.d.ts `文件中，不能存在`export`和`import`两个关键字，否则里面的声明会变成局部声明，其他地方要使用，只能通过`import`导入
:::

在项目中，需要注意两个文件夹，搞清楚它们各自的功能
1. `src/model/*`该目录底下存放的是框架和业务所需的局部声明文件，通过`export`关键字导出，使用情况如下：
   * 一般存放实体类（class）,
   * 当接口类（interface）继承其他接口的时候，需要导入`import`其他接口的情况
   * 存放业务系统的各个局部变量，如果你的变量只需要导入一两次，使用频率不高，可以用局部变量声明
   * 存放每个业务的api返回参的实体表结构，更多请参考[前端如何建数据表](http://192.168.32.108:8012/#/knowledge/docs/newClass)
2.  `src/types/*`该目录下存放是全局声明文件，不需要通过`export`关键字导出，使用时也不需要`import`导入，使用情况如下：
    * 一般存放接口类interface和类型type
    * 只要不存在`import`和任何方法的实现，都可以采用这种全局声明的方式，减少`import`导入操作。
    * 除了`interface`和`type`两种类型不需要加关键字`declare`，其他需要全局声明的变量、函数、枚举、class都需要加上关键字`declare`才算全局声明

## 变量和常量声明规范

1. 变量命名必须是驼峰命名法（Camel-Case），并且跟需求的内容相关的词，比如说我想申明一个变量，用来表示我的学校，我们可以这样定义`const mySchool = '广州软件学院'`
2. 变量命名是复数的时候需要加s,比如说我想申明一个数组，表示很多人的名字，那么我们可以这样定义`const names = new Array()`;
3. 常量命名必须全部字母大写，多单词时，使用大写字母和下划线来组合命名，下划线用以分割单词，例如：
```js
const TIME = 1000
const URL_HTTP = 'https://www.baidu.com/'
```

## 函数命名规范

1. 驼峰命名法（Camel-Case），统一使用动词或者动词+名词形式， init、refresh 单词除外

```js
// 可以使用动词，但是不够好
go、nextPage、show、open、login

// 使用动词+名词形式，效果更好，语义更强
jumpPage、openCarInfoDialog、openPage、goHomePage()

// init、refresh 单词 通常用于初始化某些方法，刷新整个页面，所以这种关键字类型的命名要对应相应的功能
init() 、 refresh()

```
2. 请求数据方法，以 data 结尾，统一使用：请求类型+函数说明的名词+data结尾的形式
```js
// 以下命名不够完美
takeData、confirmData、getList、postForm

// 统一使用：请求类型+函数说明的名词+data结尾的形式
getListData、getWorkOrderListData、postFormData、deleteFormData、putListData

```

3. 尽量使用常用单词开头（set、get、go、can、has、is）

::: details 函数方法常用的动词
|     同义词     |      反义词       |
| :------------: | :---------------: |
|    add 增加    |    remove 删除    |
|  create 创建   |   destory 移除    |
|    get 获取    |     set 设置      |
|   start 启动   |     stop 停止     |
|   open 打开    |    close 关闭     |
|   read 读取    |    write 写入     |
|   load 载入    |     save 保存     |
|   begin 开始   |     end 结束      |
|  backup 备份   |   restore 恢复    |
|  import 导入   |    export 导出    |
|   split 分割   |    merge 合并     |
|  inject 注入   |   extract 提取    |
|  attach 附着   |    detach 脱离    |
|   bind 绑定    |   separate 分离   |
|   view 查看    |    browse 浏览    |
|   edit 编辑    |    modify 修改    |
|  select 选取   |     mark 标记     |
|   copy 复制    |    paste 粘贴     |
|   undo 撤销    |     redo 重做     |
|  insert 插入   |    delete 移除    |
|    add 加入    |    append 添加    |
|   clean 清理   |    clear 清除     |
|   index 索引   |     sort 排序     |
|   find 查找    |    search 搜索    |
| increase 增加  |   decrease 减少   |
|   play 播放    |    pause 暂停     |
|  launch 启动   |     run 运行      |
|  compile 编译  |   execute 执行    |
|   debug 调试   |    trace 跟踪     |
|  observe 观察  |    listen 监听    |
|   build 构建   |   publish 发布    |
|   input 输入   |    output 输出    |
|  encode 编码   |    decode 解码    |
|  encrypt 加密  |   decrypt 解密    |
| compress 压缩  | decompress 解压缩 |
|   pack 打包    |    unpack 解包    |
|   parse 解析   |     emit 生成     |
|  connect 连接  |  disconnect 断开  |
|   send 发送    |   receive 接收    |
| download 下载  |    upload 上传    |
|  refresh 刷新  | synchronize 同步  |
|  update 更新   |    revert 复原    |
|   lock 锁定    |    unlock 解锁    |
| check out 签出 |   check in 签入   |
|  submit 提交   |    commit 交付    |
|    push 推     |      pull 拉      |
|  expand 展开   |   collapse 折叠   |
|   start 开始   |    finish 完成    |
|   enter 进入   |     exit 退出     |
|   abort 放弃   |     quit 离开     |
| obsolete 废弃  |  depreciate 废旧  |
|  collect 收集  |  aggregate 聚集   |
:::

## 结构化规范
首先看看一个`.vue`文件结构如下：


::: tabs
@tab:active vue3
```vue
<template>
    <div class="ready-container"></div>
</template>
<script lang='ts' setup>


</script>
<style lang='scss' scoped>

</style>
```
@tab vue2
```vue
//es6写法的常用文件结构
  <template>
    <div>
      <!--必须在div中编写页面-->
    </div>
  </template>
  <script>
    export default {
      components : {
      },
      data () {
        return {
        }
      },
      mounted() {
      }，
      methods: {
      }
   }
  </script>
  <!--声明语言，并且添加scoped-->
  <style lang="scss" scoped>
  </style>
```
:::

你会发现两者比较大的变化就是`<script>`模块的写法区别，vue2最令人诟病的一点就是，把`data`、`methods`这种类型区分开太多，在做复杂的业务时，比较难阅读，相反vue3的新写法，去繁入简，让代码更加整洁好看，但是同样带了一些弊端，就是不同的前端开发，没有一个好的规范，他们的写法千奇百怪，导致阅读性也非常差，所以要制定规范，约束每个模块的顺序应该如何写。下面先说结论：


::: note 组件选项顺序
  - components  
  - props       
  - data
  - computed
  - created
  - mounted
  - methods
  - filter
  - watch
:::

根据上面的顺序，我整理一份简单的模板结构给大家参考

```vue
<script lang='ts' setup>
/*======component of start=======*/
// 组件直接导入就可以使用
import SvgIcon from '@/components/SvgIcon/index.vue';
/*======component of end=======*/

/*======props of start=======*/
// 如果是组件封装，需要用到props属性的，必须
const { props } = toRefs(withDefaults(defineProps<{ props: TimeModalProps }>(), {
    props: () => new TimeModalProps(),
}))
/*======props of end=======*/


/*======data of start=======*/
// vue2里面的data，可以用一个变量state解决，里面包裹所有页面需要用到的变量，然后通过toRefs解构出来
// toRefs 用于将一个 reactive 对象转化为属性全部为 ref 对象的普通对象。
const state = reactive({
  fixedHeader: setting.fixedHeader,
  tagsView: setting.tagsView,
  sidebarLogo: setting.sidebarLogo,
  theme: setting.theme,
  showFooterBreadcrumb: setting.showFooterBreadcrumb,
  formType: setting.formType,
});
const { fixedHeader, tagsView, sidebarLogo, theme, showFooterBreadcrumb, formType } = toRefs(state);
/*======data of end=======*/

/*======computed of start=======*/
// 计算属性，其实也是一个变量命名
const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
/*======computed of end=======*/

/*======mounted of start=======*/
// 声明周期函数写在计算属性后面
onMounted(() => {
  handleQuery();
});
/*======mounted of end=======*/

/*======methods of start=======*/
// 这个部分就是放一些封装方法，点击事件
// 这里最后写成一个function的格式，function关键字有个好处，就是函数提升。如果写const func = () =>{},这个格式的方法，只能是后面的函数调用前面的函数，不然会报错，提示你该函数未声明，不能使用
function clickEvent(selection: any) {
   // something
}
/*======methods of end=======*/



/*======watch of start=======*/
// watch函数放在文件最后面
watch(() => props.modelValue, (val: any) => {
    initValue(val)
})
/*======watch of start=======*/

</script>
```

## 编码规范化

### props

* 当你的组件显式声明它所接受的 props的属性，并且传入的属性只有1-5个时候，可以按照下面的模式，编写
  
```ts
const prop = withDefaults(defineProps<{
    visible: boolean,
    loading?: boolean,
    props?: any
}>(), {
    visible: false,
    loading: false,
    props: {}
})

```

* 当传入的属性`attr > 5`的时候，必须要用`class`类声明，并且在模块class里面处理默认值
```ts
// 这里的类型命名，最后是组件名+Props，类似：MyComponentProps
export class MyComponentProps{
    name: string;
    sex: string;
    age: string;
    label: string;
    title: string;
     constructor({ name, sex, age, label, title }: any = {}) {
        this.name = name ?? '';
        this.sex = name ?? '';
        this.age = name ?? '';
        this.label = name ?? '';
        this.label = title ?? '';
    }
}
const { props } = toRefs(withDefaults(defineProps<{ props: MyComponentProps }>(), {
    props: () => new MyComponentProps(),
}))
```

这里分析一下关键代码：
1. `toRefs()`的作用是将一个 `reactive` 对象转化为属性全部为 `ref` 对象
2. `withDefaults()`方便地给 prop 声明这些属性一个默认值

大家可以先看看下面成功和失败的代码，有什么不一样，后面我们具体说一下为什么要写成这种形式
```ts
// 失败的代码
const props = withDefaults(defineProps<MyComponentProps>(),() => new MyComponentProps()})


// 成功的代码
const { props } = toRefs(withDefaults(defineProps<{ props: MyComponentProps }>(), {
    props: () => new MyComponentProps(),
}))
```

一开始我们是想用新建的复杂类型`MyComponentProps`代替简单的对象`{}`,但是这样有个弊端，就是我新建类型和给默认值这两个动作，需要把props的属性写两次，当props属性很多的时候，代码过于冗余，于是想用复杂类型。
::: warning 类型的 props/emit 声明不支持复杂类型！！
[官网提到](https://cn.vuejs.org/api/sfc-script-setup.html#default-props-values-when-using-type-declaration)下面一句话：
> 现在还不支持复杂的类型和从其他文件进行类型导入，但我们有计划在将来支持。
:::

综上所述，我们优化props属性的步骤如下：
1. 用一个简单对象的`{ props: MyComponentProps }`类型，其中`props`属性承载复杂类型`MyComponentProps`,`props`这个命名可以改其他命名，我这里是为了让效果跟原来的效果一样，所以用了`props`
2. 由于`defineProps()`得到的值，无法通过解构函数直接解构出来，直接解构会导致失去响应式，所以需要通过`toRefs()`进行解构，这样既保留的响应式，也保证了调用属性的时候，可以直接链式点出来。例如`props.name`,如果没有`toRefs()`，使用的时候需要点两层`props.props.name`,失去代码的可阅读性。

### data

`data`其实就是定义在ts前面的所有变量，在实践过程中，发现很多前端开发都随便命名变量，导致代码的阅读性、维护性变的非常差，因此需要制定标准，约束各位开发的编码习惯。先看一组代码
```ts
let monthRange:any = reactive([])
const num = ref(0)
let selectDate:any = {}
const btnDisabled = ref(true)

/**
 * @desc 点击日历触发事件
 * @param res 
 */
const onSelect = (res:any) => {
    switch(props.calendarOption.selectMode) {
        case 'range':
            btnDisabled.value = JSON.stringify(res) === '{}' || !res.start || !res.end
            break
        case 'select': 
            btnDisabled.value = !res
            break
        case 'multi': 
            btnDisabled.value = res.length === 0
            break
        case 'multiRange': 
            btnDisabled.value = res.length === 0 || JSON.stringify(res[0]) === '{}' || !res[0].start || 
            break
    }

```

上面代码中，最令人难以忍受就是大量`.value`简直就是灾难，这也是vue3一直被人吐槽的写法，还有变量声明什么需要用`ref()`、`reactive()`,什么时候不需要使用，很多开发自己未必能搞明白。因此有了下面的标准写法：

```ts

const state = reactive({
  fixedHeader: setting.fixedHeader,
  tagsView: setting.tagsView,
  sidebarLogo: setting.sidebarLogo,
  theme: setting.theme,
  showFooterBreadcrumb: setting.showFooterBreadcrumb,
  formType: setting.formType,
});
const { fixedHeader, tagsView, sidebarLogo, theme, showFooterBreadcrumb, formType } = toRefs(state);
```

* 把所有变量都存放在`reactive()`里面，类似于vue2的里面的`data()`函数，这些写变量能让变量结果和声明变得更加清晰
* 至于为什么需要`toRefs()`重新解构一次呢？这里解构的目的，是因为有一些变量需要返回给HTML的模板使用，这样解构出来的变量，会令HTML的代码更加简洁直观，阅读性更强，记住只有HTML需要的变量才需要解构，不需要把`reactive`里面所有的变量都解构
* `ref()`更多可以用于组件的实例化`const passwordRef = ref(ElInput)`

::: warning 
这里提醒一下，并不是说以后就不能用`ref()`声明单个变量使用，我们制定风格标准，编码规范，目的是让代码变得更加简洁，阅读性好，后期维护容易，多人开发可以无缝切换等好处，所以当你的页面足够简单，只有一两个变量的时候，是可以用`ref()`，如果复杂的页面交互，望各位开发能够遵循编码规范
:::


::: note
想了解更多的规范标准，请看[Vue2.x的开发规范](http://192.168.32.108:8012/#/knowledge/docs/vue2)
:::