<template>
  <section class="patient-popover" :style="popoverStyle">
    <div class="patient-popover__inner" :class="[popoverClass]">
      <slot />
      <i @pointerdown.stop="toggle($event)" :class="['el-icon-caret-' + toggleIcon]" ref="iconRef" />

      <ul class="patient-popover__content" v-show="visible" @pointerdown.stop="noop">
        <slot name="content" />
      </ul>
    </div>
  </section>
</template>

<script>
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import popoverManage from './popoverManage'

/**
 * @param {string|number} value
 */
function serializeSize(value) {
  if (typeof value === 'number') {
    return value + 'px'
  }

  return value
}

export default {
  name: 'PatientPopover',
  props: {
    popoverClass: String,
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    }
  },
  setup() {
    /**
     * @type {import('vue').Ref<HTMLElement>}
     */
    const iconRef = ref(null)
    const visible = ref(false)
    const vm = getCurrentInstance().proxy
    const toggleIcon = computed(() => (visible.value ? 'bottom' : 'top'))

    /**
     * @param {PointerEvent} e
     */
    const toggle = function (e) {
      if (e.target !== iconRef.value) {
        visible.value = false
        return
      }

      popoverManage.show(vm._uid)
      visible.value = !visible.value
    }

    onMounted(function () {
      popoverManage.register(vm._uid, vm)
      document.body.addEventListener('pointerdown', toggle)
    })

    onBeforeUnmount(function () {
      popoverManage.deregister(vm._uid)
      document.body.removeEventListener('pointerdown', toggle)
    })

    return { visible, toggleIcon, toggle, iconRef }
  },
  computed: {
    popoverStyle() {
      return {
        height: serializeSize(this.height),
        width: serializeSize(this.width)
      }
    }
  }
}
</script>

<style lang="scss">
.patient-popover {
  position: relative;
  z-index: 90;
  display: inline-block;
  vertical-align: middle;
  cursor: default;

  [class^='el-icon-'] {
    margin-left: 4px;
    font-size: 16px;
    color: var(--color-primary);
    @extend %themed;
  }
}

.patient-popover__inner {
  position: absolute;
  width: 100%;
}

.patient-popover__content {
  position: relative;
  overflow-y: auto;
  list-style: none;
  max-height: 50vh;
  margin: 0;
}
</style>
