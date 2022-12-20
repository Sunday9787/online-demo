<template>
  <aside class="app-page-aside">
    <h3 class="app-page-aside__head">{{ title }}</h3>

    <hr class="app-page-aside__gap" />

    <ol class="app-page-aside__menu">
      <li
        class="app-page-aside__menu__item"
        :class="{ current: tabActive === item.name }"
        v-for="(item, k) in menu"
        :key="k"
      >
        <a href="javascript:;" @click="changeTab(item.name)">{{ item.label }}</a>
      </li>
    </ol>
  </aside>
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
  border-radius: 12px;
  background-color: var(--color-background);
  @extend %themed;
}

.app-page-aside__head {
  font-size: 14px;
  margin-top: 18px;
  margin-bottom: 14px;
  text-align: center;
}

.app-page-aside__menu {
  position: relative;
  margin: 0 -17px 0 0;
  padding: 0;
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
    right: 0;
    top: -5px;
    content: '';
    border-bottom: 5px solid transparent;
    border-right: 7px solid transparent;
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
  border: none;
  margin: 0;
  height: 1px;
  margin: 10px 0;
  background-color: var(--color-toolbar-gap);
  @extend %themed;
}
</style>
