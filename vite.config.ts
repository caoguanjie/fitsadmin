/* eslint-disable @typescript-eslint/no-var-requires */
import { fileURLToPath, URL } from 'node:url'
import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import type { Plugin, ResolvedConfig } from 'vite'
import removeConsole from 'vite-plugin-remove-console';
// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());

  return {
    base: mode !== 'github' ? '/' : '/',
    plugins: [
      // 自动导入elment-plus
      AutoImport({

        imports: ['vue', 'vue-router', '@vueuse/core', { 'moment': [['default', 'moment']] }],
        dts: './src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

      }),
      mode === 'dev' ? fullImportPlugin() : Components({
        dts: './src/components.d.ts',
        dirs: '',
        directoryAsNamespace: true,
        resolvers: [ElementPlusResolver()],
      }),


      vue(),
      mode !== 'dev' && removeConsole(),
      svgLoader(),
      // 命名组件名字的插件
      vueSetupExtend(),
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
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: 'FitsAdmin',
      minify: 'terser',
      // 不生效
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

/**
 * element全局导入插件
 * 通过修改编译后的代码，全局增加ele的js和ts
 * @returns 
 */
function fullImportPlugin() {
  let config: ResolvedConfig
  return <Plugin>{
    name: 'fullImportElementPlus',
    async configResolved(conf) {
      config = conf
    },
    transform(code, id) {

      // 判断当前处理的是否是 _src/main.ts_
      if (path.join(config.root, 'src/main.ts') === id) {

        const name = 'ElementPlus'

        // 引入 ElementPlus 和 样式
        const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/dist/index.css';\n`
        // 把 ElementPlus 引入插入到文件的中部位置，不能至于开头，会导致vue来不及加载而报错
        const insertCode = code.replace('import * as directive', ($2) => prepend + $2)
        // 通过匹配字符串来使用 ElementPlus （此处替换规则根据 main.ts 的情况而定）
        // 相当于将字符串 `app.use(router).mount('#app')` 替换成 `app.use(router).use(ElementPlus).mount('#app')`
        code = insertCode.replace('.mount(', ($1) => `.use(${name})` + $1)

        return code
      }
      return code
    }
  }
}

