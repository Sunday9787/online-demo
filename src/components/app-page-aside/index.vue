<template lang="pug">
  aside.app-page-aside
    h3.app-page-aside__head {{ title }}

    hr.app-page-aside__gap

    nav.app-page-aside__menu
      a.app-page-aside__menu__item(
        v-for="(item, k) in menu"
        :class="{ current: tabActive === item.name }"
        :key="k"
        href="javascript:;"
        @click="changeTab(item.name)") {{ item.label }}
</template>

<script>
import { watch } from 'vue'
import { useTab } from '@/hooks/useTab'

export default {
  name: 'AppPageAside',
  props: {
    value: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { tabActive, changeTab } = useTab(props.value)

    watch(
      () => props.value,
      function (val) {
        tabActive.value = val
      }
    )

    return {
      tabActive,
      changeTab
    }
  }
}
</script>

<style lang="scss">
.app-page-aside {
  width: 120px;
  padding: 0 10px;
  background-color: var(--color-background);
  border-radius: 12px;
  @extend %themed;
}

.app-page-aside__head {
  margin-top: 18px;
  margin-bottom: 14px;
  font-size: 14px;
  text-align: center;
}

.app-page-aside__menu {
  position: relative;
  padding: 0;
  margin: 0 -17px 0 0;
}

.app-page-aside__menu__item {
  position: relative;
  display: flex;
  align-items: center;
  height: 38px;
  padding-left: 20px;
  border-radius: 8px 0 8px 8px;
  @extend %themed;

  &::after {
    position: absolute;
    top: -5px;
    right: 0;
    content: '';
    border-right: 7px solid transparent;
    border-bottom: 5px solid transparent;
    @extend %themed;
  }

  &.current {
    color: var(--color-text-regular-current);
    background-color: var(--color-primary);

    &::after {
      border-bottom-color: #1e64ce;
    }
  }
}

.app-page-aside__gap {
  height: 1px;
  margin: 0;
  margin: 10px 0;
  background-color: var(--color-toolbar-gap);
  border: none;
  @extend %themed;
}
</style>
