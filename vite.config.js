import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue2Plugin from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import legacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vuePugPlugin from 'vue-pug-plugin'
import { visualizer } from 'rollup-plugin-visualizer'
import themePlugin from './plugin/theme'

console.log(path.resolve('./src/styles/theme/__variables.scss'))

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
        targets: ['chrome > 52', 'ie >= 11'],
        renderLegacyChunks: true,
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
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.join(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      themePlugin({
        path: path.resolve('./src/styles/theme'),
        pattern: './src/styles/theme/!(__element-ui|__theme|).scss'
      }),
      visualizer({
        open: true,
        filename: 'stats.html',
        gzipSize: true
      })
    ],
    build: {
      cssCodeSplit: true,
      sourcemap: true,
      minify: 'terser',
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
          chunkFileNames: 'static/js/[name].[hash].js',
          entryFileNames: 'static/js/[name].[hash].js',
          manualChunks(id) {
            if (/node_modules\/vue.+/.test(id) || /src\/(mixins|directive|util)/.test(id)) {
              return 'vendor'
            }

            if (/src\/(components|layout)/.test(id)) {
              return 'components'
            }

            if (id.includes('element-ui')) {
              return 'element-ui'
            }

            if (/node_modules/.test(id)) {
              return 'libs'
            }
          }
        }
      }
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          javascriptEnable: true,
          additionalData: `
            @import "./src/styles/__mixin.scss";
            @import "./src/styles/theme/__theme.scss";
          `
        }
      }
    }
  }
})
