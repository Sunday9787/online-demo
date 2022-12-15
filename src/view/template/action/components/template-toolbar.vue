<template lang="pug">
  header.template-toolbar
    el-button(primary) 清空画布
    el-button(primary) 导入模板
    el-button(primary @click="visible = true") 模板属性

    el-dialog(
      :visible.sync="visible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      append-to-body
      title="画布配置"
      width="500px"
    )
      el-form(action="javascript:;")
        el-form-item(label="尺寸")
          el-radio-group(v-model="stageSize")
            el-radio(:label="size.A4.name") A4
            el-radio(:label="size.A5.name") A5
</template>

<script>
import { inject } from 'vue'
import { storeSymbol } from '@/view/template/constant'
import { useSize } from '@/view/template/hooks/useSize'

export default {
  name: 'TemplateToolbar',
  setup() {
    const store = inject(storeSymbol)
    const size = useSize()

    return { store, size }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    stageSize: {
      get() {
        return this.store.size.name
      },
      set(val) {
        this.store.size = this.size[val]
      }
    }
  }
}
</script>

<style lang="scss">
.template-toolbar {
  position: relative;
}
</style>
