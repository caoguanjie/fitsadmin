---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-25
---

# 权限验证

该项目中权限的实现方式是：通过获取当前用户的权限去比对路由表，生成当前用户具有的权限可访问的路由表，通过 `router.addRoutes` 动态挂载到 `router` 上。

但其实公司的不同业务的逻辑可能不是这样的，举一个例子来说，公司项目的很多需求是每个页面的权限是动态配置的，不像本项目中是写死预设的。但其实原理是相同的。如：你可以在后台通过一个 `tree `控件或者其它展现形式给每一个页面动态配置权限，之后将这份路由表存储到后端。当用户登录后得到`roles`，前端根据`roles` 去向后端请求可访问的路由表，从而动态生成可访问页面，之后就是` router.addRoutes `动态挂载到 `router` 上，你会发现原理是相同的，万变不离其宗。

其实就是在后台项目新增一个菜单权限管理，才菜单权限树里面挂载所有的`目录`、`按钮`、`菜单`、`数据`等权限。每次登录成功后，后端通过接口把菜单权限树返回给前端，动态挂载到`router` 上

## 权限实现思路

1. 登录：当用户填写完账号和密码后,请求登录接口，向服务端验证登录信息是否正确
2. 验证通过之后，服务端会返回一个token，拿到token之后，把这个token存贮到cookie中，保证刷新页面后能记住用户登录状态
3. 前端会根据token再去拉取一个 `user_info` 的接口来获取用户的详细信息（如用户权限，用户名、菜单权限树等等信息）
4. 通过`user_info` 的接口拿到菜单权限后，动态根据用户的` role `算出其对应有权限的路由，通过 `router.addRoutes `动态挂载这些路由。根据业务系统的不同，也可以通过`user_info` 的接口拿到菜单权限树之后，直接动态`router.addRoutes `动态挂载这些路由

::: warning 为什么菜单树不是在登录接口返回，而是在用户信息接口user_info返回？
理由有下面几点：
1. 用户信息、菜单信息是存放在状态管理器pinia里面，不是保存在localstorage本地，所以每次刷新页面的时候，用户信息就会丢失，要重新请求接口，获取最新的用户信息。
2. 当用户新开一个浏览器的页签，把复制的URL到浏览器，访问我们的系统，这个时候因为cookie是存在的，这个时候无需重新登录，但是用重新访问用户信息接口，拿到最新的菜单和用户信息，以防其他人把当前用户信息和权限做了更改，其实跟刷新的性质是一样的，每次刷新就是要拿最新的菜单树，如果放登录接口的话，每次刷新我都需要做登录操作，这个时候token又会被刷新，耦合性太强。
:::

如果还是不能理解的话，我再举个例子：

假设我把用户权限和用户名也存在了本地，但我这时候用另一台电脑登录修改了自己的用户名，之后再用这台存有之前用户信息的电脑登录，它默认会去读取本地` cookie `中的名字，并不会去拉去新的用户信息。

因此我的策略是：页面会先从` cookie `中查看是否存有` token`，没有，就走一遍上一部分的流程重新登录，如果有`token,`就会把这个` token `返给后端去拉取`user_info`，保证用户信息是最新的。

当然如果是做了`单点登录功能`的话，用户信息存储在本地也是可以的。当你一台电脑登录时，另一台会被提下线，所以总会重新登录获取最新的内容。

综上所述， 从代码层面我建议还是把`login`和`get_user_info`两件事分开比较好，不仅降低了业务的耦合性，让前端更灵活运用接口，而且还能让后端写出更优雅的代码


## 逻辑修改

根据公司每个业务系统不同，对权限控制这块代码都会有不同的逻辑处理，现在路由层面权限的控制代码都在`@/router/routerGuard.ts`路由守卫 中，直接在适当的判断逻辑中` next() `释放钩子即可。

## 按钮权限

封装了一个指令权限，能简单快速的实现按钮级别的权限判断

1. Directive 自定义指令

::: tabs 

@tab:active 按钮权限校验
```ts
// src/directive/permission/index.ts

import useStore from "@/store";
import { Directive, DirectiveBinding } from "vue";

/**
 * 按钮权限校验
 */
export const hasPerm: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        // 「超级管理员」拥有所有的按钮权限
        const { user } = useStore()
        const roles = user.roles;
        if (roles.includes('ROOT')) {
            return true
        }
        // 「其他角色」按钮权限校验
        const { value } = binding;
        if (value) {
            const requiredPerms = value; // DOM绑定需要的按钮权限标识

            const hasPerm = user.perms.some(perm => {
                return requiredPerms.includes(perm)
            })

            if (!hasPerm) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error("need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\"");
        }
    }
};
```
@tab 角色权限校验

```ts
/**
 * 角色权限校验
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;

    if (value) {
      const requiredRoles = value; // DOM绑定需要的角色编码
      const { user } = useStore();
      const hasRole = user.roles.some(perm => {
        return requiredRoles.includes(perm);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("need roles! Like v-has-role=\"['admin','test']\"");
    }
  }
};
```
:::

2. 自定义指令全局注册

```ts
// src/main.ts

const app = createApp(App)
// 自定义指令
import * as directive from "@/directive";

Object.keys(directive).forEach(key => {
    app.directive(key, (directive as { [key: string]: Directive })[key]);
});
```

3. 指令使用

```html
// src/views/system/user/index.vue
<el-button v-hasPerm="['sys:user:add']">新增</el-button>
<el-button v-hasPerm="['sys:user:delete']">删除</el-button>
<el-button v-hasRole="['admin','user']">编辑</el-button>
```

::: danger 局限性
在某些情况下不适合使用` v-permission`，比如 `element Tab` 组件只能通过手动设置` v-if `来实现。

可以使用全局权限判断函数，用法和指令` v-hasPerm `类似。

尚未开发完善！！！！
:::

```vue
<template>
  <el-tab-pane v-if="hasRole(['admin'])" label="Admin">Admin can see this</el-tab-pane>
  <el-tab-pane v-if="hasPerm(['sys:user:delete'])" label="Editor">Editor can see this</el-tab-pane>
  <el-tab-pane v-if="hasRole(['admin','editor'])" label="Admin-OR-Editor">Both admin or editor can see this</el-tab-pane>
</template>

<script setup lang="ts">

import { hasPerm, hasRole } from '@/directive/permission/index';
</script>
```