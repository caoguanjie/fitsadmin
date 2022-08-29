---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-29
---

# 构建和发布

## 构建

当项目开发完毕，只需要运行一行命令就可以打包你的应用：

```sh
# 打包正式环境
npm run build:prod

```

如果要构建其他环境，例如：105测试环境，106验证环境，
* 可以先到`package.json`设置命令：

```json
{
     "scripts": {
        "dev": "vite serve --mode dev",
        "build:prod": "vue-tsc --noEmit && vite build --mode prod",
        "build:105": "vue-tsc --noEmit && vite build --mode test",
        "build:106": "vue-tsc --noEmit && vite build --mode stage",
        "build:dev": " vite serve --mode prod",
        "serve": "vite preview",
        
    },
}
```

* 再运行一行命令就可以打包你的应用环境了
  
```sh
# 打包106验证环境
npm run build:106

# 打包105测试环境
npm run build:105
```

构建打包成功之后，会在根目录生成` dist `文件夹，里面就是构建打包好的文件，通常是`assets/***.js` 、`assets/***.css`、index.html 等静态文件。

如果需要自定义构建，比如指定` dist `目录等，则需要通过 [vite](https://cn.vitejs.dev/config/build-options.html#build-outdir) 的 `build.outDir` 进行配置。

## 环境变量

所有测试环境或者正式环境变量的配置都在`src/environment/modules/**.ts`中,里面的每个文件名，就是环境变量的名字，例如：`dev.ts`、`prod.ts`中的环境变量`dev`、`prod`

它们会通过`import.meta.globEager`函数插入到全局中。

::: danger
记得如果要切换环境变量，在输入命令的时候，带上参数`--mode dev`
:::

## 发布
对于发布来讲，只需要将最终生成的静态文件，也就是通常情况下 dist 文件夹的静态文件发布到你的静态服务器即可，需要注意的是其中的 index.html 通常会是你后台服务的入口页面，在确定了 js 和 css 的静态之后可能需要改变页面的引入路径。

::: warning 部署时可能会发现资源路径不对 ,只需修改 vite.config.ts 文件资源路径即可。
:::

```ts
export default ({ mode }: ConfigEnv): UserConfig => {
    return {
        // 请根据自己路径来配置更改
        base: mode !== 'dev' ? '/FitsAdminV3' : '/',
    }
}

```

## 前端路由与服务端的结合

FitsAdmin中， 前端路由使用的是 `vue-router`，所以你可以选择两种方式：`browserHistory `和 `hashHistory`。

两者的区别简单来说是对路由方式的处理不一样，`hashHistory `是以` # `后面的路径进行处理，通过 [HTML 5 History](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 进行前端路由管理，而 `browserHistory` 则是类似我们通常的页面访问路径，并没有 `#`，但要通过服务端的配置，能够访问指定的 url 都定向到当前页面，从而能够进行前端的路由管理。

本项目默认使用的是 `hashHistory` ，所以如果你的 url 里有` #`，想去掉的话，需要切换为 `browserHistory。` 修改 `src/router/index.ts`中的 `history` 即可

```ts
// 创建路由
const router = createRouter({
  history: createWebHistory(), // 将createWebHashHistory改为createWebHistory即可
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});
```

如果你使用的是静态站点，那么使用 `browserHistory` 可能会无法访问你的应用，因为假设你访问 `http://localhost:8080/home`，那么其实你的静态服务器并没有能够映射的文件，而使用 `hashHistory` 则不会有这个问题，因为它的页面路径是以` # `开始的，所有访问都在前端完成，如：`http://localhost:8080/#/home/`。

不过如果你有对应的后台服务器，那么我们推荐采用 `browserHistory`，只需要在服务端做一个映射，比如

### Apache

```
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx

```sh
location / {
  try_files $uri $uri/ /index.html;
}
```

::: tip
更多配置请查看 [vue-router 文档](https://router.vuejs.org/guide/essentials/history-mode.html#memory-mode)
:::

## 注意事项

如果是将网站部署在子文件夹，不是部署在根目录，你还需要把映射关系指向子文件，例如，替换`RewriteBase /`为`RewriteBase /vue/`, 这个子文件夹是跟你在` vite.config.ts`设置的`base`路径是一样的

**Apache**

```sh
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```