import './style.scss'

/**
 * @type {Vue.ComponentOptions<Vue>}
 */
export default {
  name: 'AppPage',
  props: {
    direction: {
      type: String,
      default: 'vertical'
    }
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  render(h) {
    return (
      <div class={['app-page', 'is-' + this.direction]} v-loading={this.loading}>
        {this.$slots.default}
      </div>
    )
  }
}
