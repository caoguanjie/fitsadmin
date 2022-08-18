import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // dts这个插件主要解决index.ts在编译过程中，生成相应的type声明文件
        dts({
            include: [
                'src/components/**/*.ts',
                'src/components/**/*.d.ts',
                'src/components/**/*.tsx',
                'src/components/**/*.vue',
            ]
        })
    ],
    build: {
        // 编译之后输出的地址
        outDir: 'libs',
        lib: {
            // 需要编译的入口文件
            entry: path.resolve(__dirname, './src/components/index.ts'),
            name: 'FitsAdminUI',
            // 编译之后压缩的文件名字
            fileName: (format: string) => `fits-admin-ui.${format}.js`,
        },
        rollupOptions: {
            external: 'vue',
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
