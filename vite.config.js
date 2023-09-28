import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue2Plugin from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vuePugPlugin from 'vue-pug-plugin'
import themePlugin from './plugin/theme'

console.log(path.resolve('./src/style/theme/__variables.scss'))

const productionGzipExtensions = /\.(js|css|json|txt|html|ico)(\?.*)?$/i

export default defineConfig(function (env) {
  return {
    mode: env.mode,
    server: {
      port: 7007
    },
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    },
    plugins: [
      vue2Plugin({
        template: {
          preprocessOptions: {
            plugins: [vuePugPlugin]
          }
        }
      }),
      vue2Jsx(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: loadEnv(env.mode, process.cwd())
        },
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
      chunkSplitPlugin({
        customSplitting: {
          vendor: [/src\/(mixins|directive)/, 'vue', 'vue-router', 'vuex', 'vuex-persistedstate'],
          components: [/src\/(components|layout)/],
          libs: ['moment', 'lodash-es', 'number-precision', 'nprogress', 'normalize.css', 'd3', '@vueuse/core'],
          'element-ui': ['element-ui'],
          utils: [/src\/(util)/]
        }
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.join(process.cwd(), 'src/icon')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
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
    css: {
      devSourcemap: true,
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
  }
})
