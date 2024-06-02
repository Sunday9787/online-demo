<template lang="pug">
div
  app-card
    h1 Organization
    h1 当前主题 {{ theme }}
    p {{ currentMechanism.mechanismName }}
  app-card(flex1)
    el-form(ref="form" :model="form" label-width="80px" label-suffix=":")
      el-form-item(label="大小")
        el-input(v-model="form.size" v-integer="")
      el-form-item(label="单位")
        el-radio-group(v-model="form.unit")
          el-radio-button(:label="item.value" v-for="(item, k) in unitOptions" :key="k") {{ item.label }}
      el-form-item(label="单位")
        el-radio-group(v-model="form.formatUnit")
          el-radio-button(:label="item.value" v-for="(item, k) in unitOptions" :key="k") {{ item.label }}
      el-form-item(label="原始")
        p {{ size }}
      el-form-item(label="转换")
        p {{ size | formatByte(form.formatUnit) }}
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/hooks'

export default {
  name: 'AppHome',
  setup() {
    const store = useStore('appModule')
    const theme = computed(() => store.state.theme)

    return {
      theme
    }
  },
  data() {
    return {
      form: {
        mechanismId: null
      }
    }
  },
  computed: {
    size() {
      if (this.form.size !== null && this.form.unit !== null) {
        return this.form.size.toString() + this.form.unit
      }

      return '-'
    }
  },
  created() {
    this.form.mechanismId = this.currentMechanism.mechanismId
    this.search()
  }
}
</script>
