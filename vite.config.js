import path from 'path'
import { defineConfig } from 'vite'
import vue2Plugin from '@vitejs/plugin-vue2'
import { createHtmlPlugin } from 'vite-plugin-html'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'
import cssnano from 'cssnano'
import themePlugin from './plugin/theme'

console.log(path.resolve('./src/style/theme/__variables.scss'))

const productionGzipExtensions = /\.(js|css|json|txt|html|ico)(\?.*)?$/i

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
    }),
    manualChunksPlugin(),
    viteCompression({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      filter: productionGzipExtensions,
      threshold: 0,
      minRatio: 0.8
    }),
    themePlugin({
      path: path.resolve('./src/style/theme'),
      pattern: './src/style/theme/!(__element-ui|__theme|).scss'
    })
  ],
  build: {
    cssCodeSplit: true,
    sourcemap: true,
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
    devSourcemap: true,
    postcss: {
      plugins: [cssnano()]
    },
    preprocessorOptions: {
      scss: {
        javascriptEnable: true,
        additionalData: `
          @import "./src/style/__mixin.scss";
          @import "./src/style/theme/__theme.scss";
        `
      }
    }
  }
})
