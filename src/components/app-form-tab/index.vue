<template>
  <div class="app-tabs">
    <div class="app-tabs__header">
      <ol class="app-tabs-nav">
        <li
          class="app-tabs__active-bar"
          :style="{
            width: barStyle[currentName].width + 'px',
            transform: `translateX(${barStyle[currentName].offset}px)`
          }"
          v-if="barStyle"
        />

        <li
          v-for="pane in panes"
          href="javascript:;"
          :key="pane.name"
          :id="pane.name"
          class="app-tabs-nav__item"
          ref="tabNav"
          :class="{ active: currentName === pane.name }"
          @click="handleTabClick(pane, pane.name, $event)"
        >
          <a href="javascript:;">{{ pane.title }}</a>
        </li>
      </ol>
      <hr class="app-tabs__line" />
    </div>

    <div class="app-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, useSlots, nextTick, getCurrentInstance } from 'vue'

function useAppFormTab() {
  const vm = getCurrentInstance().proxy
  const slots = useSlots()
  /**
   * @type {import('vue').Ref<import('vue').VNode[]>}
   */
  const panes = ref([])
  const barStyle = ref(null)

  onMounted(function () {
    if (slots.default) {
      const paneSlots = slots.default().filter(function (vnode) {
        return vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'AppFormTabPane'
      })

      const panesData = paneSlots.map(({ componentInstance }) => componentInstance)
      panes.value = panesData
    }
  })

  onMounted(function () {
    nextTick(function () {
      /**
       * @type {HTMLAnchorElement[]}
       */
      const tabNav = vm.$refs.tabNav
      const result = Object.create(null)

      tabNav.forEach(function (item) {
        result[item.id] = {
          width: item.offsetWidth,
          offset: item.offsetLeft
        }
      })

      barStyle.value = result
    })
  })

  return { panes, barStyle }
}

/**
 * @type {Vue.ComponentOptions<Vue>}
 */
export default {
  name: 'AppFormTab',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  provide() {
    return {
      rootTabs: this
    }
  },
  setup() {
    const { panes, barStyle } = useAppFormTab()

    return {
      panes,
      barStyle
    }
  },
  data() {
    return {
      currentName: ''
    }
  },
  created() {
    this.currentName = this.value
  },
  methods: {
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return
      this.currentName = tabName
      this.$emit('input', tabName)
      this.$emit('change', tabName)
      this.$emit('tab-click', tab, event)
    }
  }
}
</script>

<style lang="scss">
.app-tabs-nav {
  position: relative;
  display: flex;
  column-gap: 16px;
  align-items: center;
  height: 40px;
  padding: 0;
  margin: 0;
}

.app-tabs-nav__item {
  display: block;
  @extend %themed;

  &.active {
    color: var(--color-primary);
  }
}

.app-tabs__header {
  position: relative;
}

.app-tabs__line {
  height: 1px;
  margin-top: 0;
  margin-right: -16px;
  margin-bottom: 10px;
  margin-left: -16px;
  background-color: var(--color-border-light);
  border: none;

  @extend %themed;
}

.app-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 2px;
  background-color: var(--color-primary);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
