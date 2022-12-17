<template lang="pug">
  aside.template-property(key="1" v-if="store.currentComponent")
    el-row
      h1 字体
      section
        el-select(v-model="store.currentComponent")
          el-options(v-for="(font, k) in fonts" :key="k" :label="font.name" :value="font.value")
  aside.template-property(key="2" v-else)
</template>

<script>
import { inject } from 'vue'
import { storeSymbol } from '@/view/template/constant'

export default {
  name: 'TemplateProperty',
  setup() {
    const store = inject(storeSymbol)

    const fonts = [
      { name: '微软雅黑', value: 'Microsoft YaHei' },
      { name: '黑体', value: 'STHeitiSC-Light' },
      { name: '华文黑体', value: 'STXihei' },
      { name: '宋体', value: 'STSongti-SC-Regular' },
      { name: '楷体', value: 'STKaitiSC-Regular' }
    ]

    return { store, fonts }
  }
}
</script>

<style lang="scss">
.template-property {
  width: 242px;
}
</style>
