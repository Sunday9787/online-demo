import path from 'path'
import { defineConfig } from 'vite'
import vue2Plugin from '@vitejs/plugin-vue2'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  build: {
    rollupOptions: {
      input: path.resolve('./index.html')
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  plugins: [
    vue2Plugin(),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js',
      template: 'index.html'
    })
  ]
})
