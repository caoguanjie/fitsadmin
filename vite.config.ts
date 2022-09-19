/* eslint-disable @typescript-eslint/no-var-requires */
import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());


  return {
    base: mode !== 'dev' ? '/' : '/',
    plugins: [

      // 自动导入elment-plus
      AutoImport({

        imports: ['vue', 'vue-router', '@vueuse/core', { 'moment': [['default', 'moment']] }],
        dts: './src/auto-imports.d.ts',
        // imports: [
        //   { 'fits-admin-ui': ['FitsAdmin'] }
        // ],
        resolvers: [
          ElementPlusResolver()],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

      }),
      Components({
        dts: './src/components.d.ts',
        resolvers: [ElementPlusResolver()],
      }),


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
      outDir: 'FitsAdmin',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode !== 'dev',
          drop_debugger: mode !== 'dev',
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 设置 manualChunks方案，将echarts单独打包并通过按需引入减少主包体积，
            // 这种方式可以跟unplugin-auto-import形成互补，当用unplugin-auto-import无法实现按需自动加载的功能是，可以用manualChunks方案减少包体积大小
            echarts: ['echarts'],
            vxetable: ['vxe-table']
          }
        },
      }
    }
  };
};


