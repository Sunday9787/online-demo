<template>
  <app-page>
    <h1>Organization</h1>
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
  </app-page>
</template>

<script>
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
