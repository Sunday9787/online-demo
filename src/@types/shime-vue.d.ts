import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    loadAssets(path: string): string
  }
}
