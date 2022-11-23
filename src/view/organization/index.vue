<template>
  <app-page>
    <app-card>
      <h1>Organization</h1>
      <h1>当前主题 {{ theme }}</h1>
      <p>{{ currentMechanism.mechanismName }}</p>
    </app-card>

    <app-card flex>
      <el-form ref="form" :model="form" label-width="80px" label-suffix=":">
        <el-form-item label="大小">
          <el-input v-model="form.size" />
        </el-form-item>

        <el-form-item label="单位">
          <el-radio-group v-model="form.unit">
            <el-radio-button :label="item.value" v-for="(item, k) in unitOptions" :key="k">{{
              item.label
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="单位">
          <el-radio-group v-model="form.formatUnit">
            <el-radio-button :label="item.value" v-for="(item, k) in unitOptions" :key="k">{{
              item.label
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原始">
          <p>{{ size }}</p>
        </el-form-item>
        <el-form-item label="转换">
          <p>{{ size | formatByte(form.formatUnit) }}</p>
        </el-form-item>
      </el-form>
    </app-card>
  </app-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/hooks/useStore'
import * as format from '@/util/format'

export default {
  name: 'OrganizationIndex',
  filters: {
    /**
     * @param {string} size
     * @param {string} unit
     */
    formatByte(size, unit) {
      if (unit) {
        return format.byte(size).format(unit)
      }

      return '-'
    }
  },
  setup() {
    const store = useStore('appModule')
    const theme = computed(() => store.state.theme)
    const currentMechanism = store.getters.currentMechanism
    console.log(theme, 'theme')
    console.log(currentMechanism, 'currentMechanism')
    console.log(currentMechanism.mechanismName, 'currentMechanism.mechanismName')

    return {
      theme,
      currentMechanism
    }
  },
  data() {
    return {
      form: {
        size: null,
        unit: null,
        formatUnit: null
      },
      unitOptions: [
        { label: 'B', value: 'b' },
        { label: 'Kb', value: 'kb' },
        { label: 'Mb', value: 'mb' },
        { label: 'Gb', value: 'gb' }
      ]
    }
  },
  computed: {
    size() {
      if (this.form.size !== null && this.form.unit !== null) {
        return this.form.size.toString() + this.form.unit
      }

      return '-'
    }
  }
}
</script>
