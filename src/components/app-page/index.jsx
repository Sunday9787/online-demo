import './style.scss'

/**
 * @type {Vue.ComponentOptions<Vue>}
 */
export default {
  name: 'AppPage',
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
      <div class='app-page' v-loading={this.loading}>
        {this.$slots.default}
      </div>
    )
  }
}
