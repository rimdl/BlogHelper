// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
//
//
// // https://vitejs.dev/config/
// export default defineConfig( {
//   plugins: [
//     vue(),
//   ],
// } );


import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createRequire } from 'node:module'
const require = createRequire( import.meta.url )
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5' // 引入 ckeditor5 vite 插件

export default defineConfig( {
  plugins: [
    vue(),
    ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }) // ckeditor5 插件，记得安装好主题哦
  ],
  resolve: {
    alias: {
      '@': fileURLToPath( new URL( './src', import.meta.url ) )
    }
  }
})