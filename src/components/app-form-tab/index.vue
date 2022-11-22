<template>
  <div class="app-tabs">
    <div class="app-tabs__header">
      <section class="app-tabs-nav">
        <a
          v-for="pane in panes"
          href="javascript:;"
          :key="pane.name"
          class="app-tabs-nav__item"
          @click="handleTabClick(pane, pane.name, $event)"
          >{{ pane.title }}</a
        >
      </section>
      <hr class="app-tabs__line" />
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
    return {
      rootTabs: this
    }
  },
  data() {
    return {
      panes: [],
      currentName: ''
    }
  },
  created() {
    this.currentName = this.value
  },
  mounted() {
    this.calcPaneInstances()
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
  }
}
</script>

<style lang="scss">
.app-tabs-nav {
  display: flex;
  padding: 10px 0;
}

.app-tabs-nav__item {
  display: block;

  & + & {
    margin-left: 10px;
  }
}

.app-tabs__header {
  position: relative;
}

.app-tabs__line {
  height: 1px;
  border: none;
  margin-left: -16px;
  margin-right: -196px;

  @include themed;
  @include themeify {
    background-color: theme('color-border-light');
  }
}
</style>
