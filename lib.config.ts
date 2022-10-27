import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 命名组件名字的插件
        vueSetupExtend(),
        // dts这个插件主要解决index.ts在编译过程中，生成相应的type声明文件
        dts({
            outputDir: ['FitsAdminUI/umd', 'FitsAdminUI/es'],
            include: [
                'src/fits-components/**/*.ts',
                'src/fits-components/**/*.d.ts',
                'src/fits-components/**/*.tsx',
                'src/fits-components/**/*.vue',
                'src/types/**/*.ts',
                'src/types/**/*.d.ts',
            ]
        }),

    ],
    resolve: {
        // Vite路径别名配置
        alias: {
            '@': path.resolve('./src')
        }
    },
    css: {
        // css预处理器
        preprocessorOptions: {
            scss: {
                charset: false,
            },
        },
    },
    build: {
        target: 'modules',
        //打包文件目录
        outDir: "FitsAdminUI",
        // 生产环境移除console
        minify: 'terser',
        emptyOutDir: false,
        lib: {
            // 需要编译的入口文件
            entry: path.resolve(__dirname, './src/fits-components/index.ts'),
            // name: 'FitsAdminUI',
            // 编译之后压缩的文件名字
            // fileName: (format: string) => `fits-admin-ui.${format}.js`,
            // 已知IconSelected和FitTable两个组件不能打包成UMD格式，只能是es格式。
            formats: ['es', 'cjs'],
        },

        // terserOptions: {
        //     compress: {
        //         drop_console: true,
        //         drop_debugger: true,
        //     },
        // },
        rollupOptions: {

            external: ['vue', 'vxe-table'],
            input: ['src/fits-components/index.ts'],
            output: [
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                // globals: {
                //     vue: 'Vue',
                // },
                {
                    format: 'es',
                    //不用打包成.es.js,这里我们想把它打包成.js
                    entryFileNames: '[name].js',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    //配置打包根目录
                    dir: 'FitsAdminUI/es',
                    preserveModulesRoot: 'src'
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    //配置打包根目录
                    dir: 'FitsAdminUI/umd',
                    preserveModulesRoot: 'src'
                }
            ]
        }
    },

});
