<template>
  <el-row class="app-form-collapse" :style="collapseStyle">
    <el-col class="app-form-collapse__content">
      <slot />
    </el-col>

    <div class="app-form-collapse__action">
      <slot name="action" />
      <transition name="fade">
        <el-button type="text" size="small" :icon="icon" @click="toggleCollapse()" v-show="showToggleCollapse">{{
          text
        }}</el-button>
      </transition>
    </div>
  </el-row>
</template>

<script>
import { getCurrentInstance, ref, onMounted, onBeforeUnmount } from 'vue'
import { debounce } from 'lodash-es'

/**
 * @param {number} height
 */
function useFormCollapse(height) {
  const maxHeight = ref(height)
  const open = ref(false)
  const vm = getCurrentInstance().proxy
  const resizeHandle = debounce(function (e) {
    maxHeight.value = vm.$el.scrollHeight
    if (e) open.value = false
  })

  onMounted(resizeHandle)
  onBeforeUnmount(function () {
    window.removeEventListener('resize', resizeHandle)
  })

  window.addEventListener('resize', resizeHandle)

  return { maxHeight, open }
}

export default {
  name: 'AppFormCollapse',
  props: {
    visible: Boolean,
    height: {
      type: Number,
      default: 51
    }
  },
  setup(props) {
    const { maxHeight, open } = useFormCollapse(props.height)
    return { maxHeight, open }
  },
  computed: {
    text() {
      return this.open ? '收起' : '展开'
    },
    icon() {
      return this.open ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    collapseStyle() {
      return {
        height: this.open ? this.maxHeight + 'px' : this.height + 'px'
      }
    },
    showToggleCollapse() {
      return this.height < this.maxHeight
    }
  },
  methods: {
    toggleCollapse() {
      this.open = !this.open
      this.$emit('change', this.open)
    }
  },
  watch: {
    visible(val) {
      if (this.maxHeight) return
      if (val) window.dispatchEvent(new Event('resize'))
    }
  }
}
</script>

<style lang="scss">
$width: 180px;

.app-form-collapse {
  position: relative;
  overflow: hidden;
  padding-right: $width;
  transition-duration: 0.2s;
}

.app-form-collapse__content {
  position: relative;
}

.app-form-collapse__action {
  position: absolute;
  display: flex;
  align-items: flex-start;
  right: 0;
  height: 100%;
  width: $width;
}
</style>
