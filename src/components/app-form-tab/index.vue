<template>
  <div class="app-tabs">
    <div class="app-tabs__header">
      <section class="app-tabs-nav">
        <div
          class="app-tabs__active-bar"
          :style="{
            width: barStyle[currentName].width + 'px',
            transform: `translateX(${barStyle[currentName].offset}px)`
          }"
          v-if="barStyle[currentName]"
        />

        <a
          v-for="pane in panes"
          href="javascript:;"
          :key="pane.name"
          :id="pane.name"
          class="app-tabs-nav__item"
          ref="pane"
          :class="{ active: currentName === pane.name }"
          @click="handleTabClick(pane, pane.name, $event)"
          >{{ pane.title }}</a
        >
      </section>
      <hr class="app-tabs__line" />
    </div>

    <div class="app-tabs__content">
      <slot />
    </div>
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
      currentName: '',
      barStyle: {}
    }
  },
  created() {
    this.currentName = this.value
  },
  mounted() {
    this.calcPaneInstances()
    this.calcBarWidths()
  },
  methods: {
    handleTabClick(tab, tabName, event) {
      if (tab.disabled) return
      this.currentName = tabName
      this.$emit('input', tabName)
      this.$emit('change', tabName)
      this.$emit('tab-click', tab, event)
    },
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        /**
         * 过滤仅 app-form-tab-pane 组件
         */
        const paneSlots = this.$slots.default.filter(
          vnode =>
            vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'app-form-tab-pane'
        )
        const panes = paneSlots.map(({ componentInstance }) => componentInstance)

        this.panes = panes
      }
    },
    calcBarWidths() {
      this.$nextTick(function () {
        /**
         * @type {HTMLAnchorElement[]}
         */
        const pane = this.$refs.pane
        const vm = this
        pane.forEach(function (item) {
          vm.$set(vm.barStyle, item.id, {
            width: item.offsetWidth,
            offset: item.offsetLeft
          })
        })
      })
    }
  }
}
</script>

<style lang="scss">
.app-tabs-nav {
  position: relative;
  display: flex;
  height: 40px;
  align-items: center;
}

.app-tabs-nav__item {
  display: block;
  @include themed;

  &.active {
    @include themeify {
      color: theme('color-primary');
    }
  }

  & + & {
    margin-left: 16px;
  }
}

.app-tabs__header {
  position: relative;
}

.app-tabs__line {
  height: 1px;
  border: none;
  margin-top: 0;
  margin-bottom: 10px;
  margin-left: -16px;
  margin-right: -16px;

  @include themed;
  @include themeify {
    background-color: theme('color-border-light');
  }
}

.app-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #409eff;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
