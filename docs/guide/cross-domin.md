---
# 设置作者
author: caoguanjie
# 设置写作时间
date: 2022-08-22
---

# 浏览器跨域处理


## 跨域原理
::: tip 
浏览器同源策略: 协议、域名和端口都相同是同源，浏览器会限制非同源请求读取响应结果。
:::

### 什么是跨域（CORS）
跨域（CORS）是指不同域名之间相互访问。跨域，指的是浏览器不能执行其他网站的脚本，它是由浏览器的同源策略所造成的，是浏览器对于JavaScript所定义的安全限制策略。

### 什么情况会跨域
* 同一协议， 如http或https
* 同一IP地址, 如127.0.0.1
* 同一端口, 如8080
以上三个条件中有一个条件不同就会产生跨域问题。



## 后端解决跨域的方案
1. nginx反向代理解决跨域
2. 服务端设置Response Header(响应头部)的Access-Control-Allow-Origin: *

::: info
服务端设置`Access-Control-Allow-Origin: *`允许所有源访问的方案，这种方案对于前端来说没有什么工作量，和正常发送请求写法上没有任何区别，工作量基本都在后端这里。每一次请求，浏览器必须先以 `OPTIONS` 请求方式发送一个预请求（也不是所有请求都会发送 options，展开介绍 [点我](https://panjiachen.github.io/awesome-bookmarks/blog/cs.html#gzip)），通过预检请求从而获知服务器端对跨源请求支持的 HTTP 方法。在确认服务器允许该跨源请求的情况下，再以实际的 HTTP 请求方法发送那个真正的请求。推荐的原因是：只要第一次配好了，之后不管有多少接口和项目复用就可以了，一劳永逸的解决了跨域问题，而且不管是开发环境还是正式环境都能方便的使用。详细[ MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)。不过更加严谨的方案是，应该配置只能允许前端部署好的网站的ip站点，而不是`*`所有
:::


## 前端解决跨域的方案

1. 使用JSONP方式实现跨域调用；
2. 使用NodeJS服务器做为服务代理，前端发起请求到NodeJS服务器， NodeJS服务器代理转发请求到后端服务器；也就是所谓的前端反向代理方法。

下面重点介绍前端如何通过反向代理解决跨域问题

::: warning
前端的反向代理方案，仅适于用开发环境，通过`Vite`内置了基于 `node-http-proxy` 实现的反向代理功能，
::: 

Vite 配置反向代理解决跨域，因为需要读取环境变量，故写法和上文的出入较大，这里贴出完整的 vite.config.ts 配置。

```ts
export default defineConfig({
  // 本地反向代理解决浏览器跨域限制
    server: {
        host: 'localhost', 
        port: Number(env[`VITE_APP_PORT_${mode}`]), 
        open: true, // 启动是否自动打开浏览器
        proxy: {
            '/apis': {
                target: 'http://192.168.32.108:3000/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apis/, '')
            }
        }
    },
})
```

这个反向代理的基本逻辑如下：
1. 当你请求接口`http://localhost:3300/apis/Login`
2. 会得到路径Path: `/apis/Login`
3. `rewrite`属性就是把`/apis/Login` 的 前缀去掉，变成 `/Login`
4. 最后得到的代理地址就是`http://192.168.32.108:3000/api/Login`