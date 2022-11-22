import { hasPermission } from '@/store'

export default {
  name: 'AppPermission',
  props: {
    power: {
      type: String,
      required: true
    }
  },
  render() {
    if (hasPermission(this.power)) {
      return this.$slots.default
    }

    return null
  }
}
