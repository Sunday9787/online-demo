<template>
  <div>
    <div class="app-tabs__header">
      <ul>
        <li v-for="(pane, k) in panes" :key="k">{{ pane.name }}</li>
      </ul>
    </div>
    <slot />
  </div>
</template>

<script>
/**
 * @type {Vue.ComponentOptions<Vue>}
 */
export default {
  name: 'app-form-tab',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  provide() {
    return { rootTabs: this }
  },
  data() {
    return { panes: [], currentName: '' }
  },
  methods: {
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return
      this.currentName = tabName
      this.$emit('input', tabName)
      this.$emit('tab-click', tab, event)
    },
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(
          vnode =>
            vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'app-form-tab-pane'
        )
        // update indeed
        const panes = paneSlots.map(({ componentInstance }) => componentInstance)
        const panesChanged = !(
          panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index])
        )
        if (isForceUpdate || panesChanged) {
          this.panes = panes
        }
      } else if (this.panes.length !== 0) {
        this.panes = []
      }
    }
  },
  mounted() {
    this.calcPaneInstances()
  }
}
</script>
