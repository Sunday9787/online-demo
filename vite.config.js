import path from 'path'
import { defineConfig } from 'vite'
import vue2Plugin from '@vitejs/plugin-vue2'
import { createHtmlPlugin } from 'vite-plugin-html'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  server: {
    port: 7007
  },
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  plugins: [
    vue2Plugin(),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js',
      template: 'index.html'
    }),
    legacy({
      targets: ['chrome >= 52'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  build: {
    rollupOptions: {
      input: path.resolve('./index.html'),
      output: {
        manualChunks: {
          vendor: ['vue', 'vuex', 'vue-router'],
          element: ['element-ui'],
          lodash: ['lodash-es']
        },
        assetFileNames: assetInfo => {
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]

          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'img'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }

          return `static/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js'
      }
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnable: true,
        additionalData: `
          @import "./src/style/__mixin.scss";
          @import "./src/style/theme/__variables.scss";
          @import "./src/style/theme/__theme.scss";
        `
      }
    }
  }
})
