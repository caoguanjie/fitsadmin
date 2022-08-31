/* eslint-disable @typescript-eslint/no-var-requires */
import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import svgLoader from 'vite-svg-loader'



// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());


  return {
    base: mode !== 'dev' ? '/' : '/',
    plugins: [
      vue(),
      svgLoader(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),

    ],
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          charset: false,
          // 引入全局scss变量，不过这样有个坑，就是一定要下划线的scss文件路径才引入正常。
          additionalData: '@import "./src/styles/_global.scss";',
        },
      },
    },
    // 本地反向代理解决浏览器跨域限制
    server: {
      // 此处添加以下设置host:0.0.0.0 或true
      // 将监听所有地址，包括局域网和公网地址
      host: '0.0.0.0',
      port: Number(env[`VITE_APP_PORT_${mode}`]),
      open: true, // 运行自动打开浏览器
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     target: 'http://vue3.youlai.tech',
      //     changeOrigin: true,
      //     rewrite: path =>
      //       path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
      //   }
      // }
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src')
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode !== 'dev',
          drop_debugger: mode !== 'dev',
        },
      }
    }
  };
};
