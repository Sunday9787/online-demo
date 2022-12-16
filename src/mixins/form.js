/**
 * @type {Vue.ComponentOptions<Vue>}
 */
export const mixinForm = {
  methods: {
    resetForm(ref = 'form') {
      this.$refs[ref].resetFields()
    }
  }
}
