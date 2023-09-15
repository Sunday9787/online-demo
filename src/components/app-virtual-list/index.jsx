import { computed, defineComponent, onMounted, ref } from 'vue'
import './style.scss'

const defaultProp = { limit: 15, current: 1, rowKey: 'id', offset: 80 }

export default defineComponent({
  name: 'app-virtual-list',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    /** item 高度 */
    itemHeight: {
      type: Number,
      required: true
    },
    prop: {
      type: Object,
      default: () => defaultProp
    }
  },
  setup(props, context) {
    /**
     * @type {{limit: number, current: number, rowKey: string, offset: number}}
     */
    const options = Object.assign({}, defaultProp, props.prop)

    const loading = ref(false)

    /**
     * 可视区高度
     */
    const screenHeight = ref(0)

    /**
     * @type {import('vue').Ref<HTMLUListElement>}
     */
    const virtualContainer = ref()

    /**
     * 可视区可展示数量 = 向上取整（可视区高度 / item 高度）
     */
    const visibleCount = computed(function () {
      return Math.ceil(screenHeight.value / props.itemHeight)
    })

    /**
     * 滚动的高度
     */
    const scrollTop = ref(0)

    /**
     * 列表总高度 = item 高度 * 总数量
     */
    const listHeight = computed(function () {
      return props.data.length * props.itemHeight
    })

    /**
     * 数据的起始索引 = 向下取整（滚动高度 / item 高度）
     */
    const startIndex = computed(function () {
      return Math.floor(scrollTop.value / props.itemHeight)
    })

    /**
     * 数据的结束索引 = 起始索引 + 可视区可展示数量
     */
    const endIndex = computed(function () {
      return startIndex.value + visibleCount.value
    })

    const startOffset = ref(0)

    /**
     * 列表显示数据为
     */
    const visibleData = computed(function () {
      return props.data.slice(startIndex.value, Math.min(endIndex.value, props.data.length))
    })

    /**
     * @type {import('vue').Ref<import('vue/types/jsx').StyleValue>}
     */
    const containerStyle = computed(function () {
      return {
        transform: `translate3d(0, ${startOffset.value}px, 0)`
      }
    })

    onMounted(function () {
      screenHeight.value = virtualContainer.value.clientHeight
    })

    /**
     * @param {UIEvent} e
     */
    function onScroll(e) {
      /**
       * @type {HTMLUListElement}
       */
      const target = e.target
      scrollTop.value = target.scrollTop
      startOffset.value = target.scrollTop - (target.scrollTop % props.itemHeight)

      console.log(target.scrollHeight)
      console.log(target.scrollTop)
      console.log(target.scrollHeight - target.scrollTop - screenHeight.value, options.offset)

      if (loading.value) return
      if (target.scrollHeight - target.scrollTop - screenHeight.value < options.offset) {
        loading.value = true
        options.current += 1

        context.emit('end', options)
      }
    }

    function loaded() {
      loading.value = false
    }

    context.emit('end', options)
    loading.value = true

    context.expose({ loaded })

    return {
      options,
      virtualContainer,
      listHeight,
      containerStyle,
      visibleData,
      onScroll
    }
  },
  render() {
    return (
      <div class='app-virtual-list' ref='virtualContainer' onScroll={this.onScroll}>
        <div class='app-virtual-scroll-bar' style={{ height: this.listHeight + 'px' }} />
        <ol class='app-virtual-container' style={this.containerStyle}>
          {this.visibleData.map(item => (
            <li class='app-virtual-item' key={item[this.options.rowKey]} style={{ height: this.itemHeight + 'px' }}>
              {this.$scopedSlots.default(item)}
            </li>
          ))}
        </ol>
      </div>
    )
  }
})
