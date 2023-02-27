import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'AppBigScreen',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    wrapperStyle: {
      type: Object,
      default: () => ({})
    },
    wrapperClass: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const scale = ref(1)

    const handle = function () {
      const clientWidth = document.documentElement.clientWidth
      const clientHeight = document.documentElement.clientHeight

      if (clientWidth / clientHeight < props.width / props.height) {
        scale.value = clientWidth / props.width
      } else {
        scale.value = clientHeight / props.height
      }
    }

    onMounted(function () {
      window.addEventListener('resize', handle)
      window.dispatchEvent(new Event('resize'))
    })

    onBeforeUnmount(function () {
      window.removeEventListener('resize', handle)
    })

    return { scale }
  },
  render(h) {
    return (
      <section
        style={{
          position: 'absolute',
          width: this.width + 'px',
          height: this.height + 'px',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%)`
        }}
      >
        <div
          class={this.wrapperClass}
          style={{
            ...this.wrapperStyle,
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `scale3d(${this.scale}, ${this.scale}, 1)`
          }}
        >
          {this.$slots.default}
        </div>
      </section>
    )
  }
})
