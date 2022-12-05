<template>
  <el-popover width="120px" placement="bottom" trigger="click" popper-class="table-widget-popper">
    <div class="table-widget__title">
      <span>表格设置</span>
      <a href="javascript:;" class="table-widget__reset" @click="reset()">恢复默认</a>
    </div>

    <el-scrollbar view-class="table-widget" tag="ul" wrap-style="padding-right: 10px;">
      <li v-for="item in showHead" :key="item.prop" :title="item.label" class="table-widget__item">
        <div class="table-widget__label">
          <div class="table-widget__icon">
            <img src="@/image/components/app-table-widget/table-widget.svg" />
          </div>
          <div class="table-widget__text">{{ item.label }}</div>
        </div>

        <el-switch
          v-model="item.on"
          :disabled="item.required"
          active-color="#3D8AFF"
          inactive-color="#D1D3D6"
          @change="updateConfig"
        />
      </li>
    </el-scrollbar>

    <div class="table-widget-head" slot="reference">
      <span class="table-widget-head__text" v-if="text">{{ text }}</span>
      <el-tooltip content="操作可以自定义设置" placement="top">
        <i class="icon el-icon-setting" />
      </el-tooltip>
    </div>
  </el-popover>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'

function useAppTableWidget() {
  const vm = getCurrentInstance().proxy
  const tableRef = ref(null)
  tableRef.value = vm.$parent

  while (true) {
    if (tableRef.value.doLayout) break
    tableRef.value = tableRef.value.$parent
  }

  return { tableRef }
}

export default {
  name: 'AppTableWidget',
  props: {
    text: {
      type: [Boolean, String],
      default: '操作'
    },
    data: {
      type: Array,
      default: () => []
    },
    storageKey: {
      type: String,
      required: true
    }
  },
  computed: {
    showHead() {
      return this.data.filter(d => d.prop)
    }
  },
  setup() {
    const { tableRef } = useAppTableWidget()

    return { tableRef }
  },
  created() {
    this.initConfig()
  },
  methods: {
    /**
     * 初始化 table prop 配置
     */
    initConfig() {
      /**
       * @type {string|undefined}
       */
      const config = localStorage.getItem(this.storageKey)

      if (!config) return

      /**
       * @type {[]unknown}
       */
      const data = JSON.parse(config)

      this.showHead.forEach(item => {
        const dataItem = data.find(d => d.prop === item.prop)
        if (dataItem) item.on = dataItem.on
      })

      this.updateConfig()
    },
    /**
     * 重置 tableWidget
     */
    reset() {
      this.showHead.forEach(d => {
        d.on = true
      })

      this.updateConfig()
    },
    updateConfig() {
      const data = JSON.stringify(this.showHead)
      localStorage.setItem(this.storageKey, data)

      this.$nextTick(function () {
        this.tableRef.doLayout()
      })
    }
  }
}
</script>

<style lang="scss">
.table-widget-popper {
  padding-top: 0;
  padding-bottom: 10px;
  padding-left: 1px;
  padding-right: 0;
}

.table-widget {
  max-height: 300px;
  user-select: none;

  &__reset {
    color: var(--color-primary);
  }

  &__label {
    display: flex;
    align-items: center;
  }

  &__icon {
    display: inline-block;
    height: 24px;
    width: 8px;
    line-height: 24px;
    color: inherit;
    border-radius: 4px;

    > img {
      vertical-align: middle;
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    padding-right: 14px;
    user-select: none;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--color-border-light);
    @extend %themed;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    padding-right: 14px;

    &:hover {
      @include themeify {
        background-color: mix(theme('color-background'), theme('color-primary'), 92%);
      }
    }

    &:not(:first-of-type) {
      margin-top: 10px;
    }
  }

  &__text {
    width: 100px;
    margin-right: 30px;
    @include ellipsis;
  }

  &__icon {
    margin-right: 6px;
  }
}

.table-widget-head {
  display: flex;
  align-items: center;

  &__text {
    margin: 0 8px 0 10px;
  }

  .icon {
    color: #3a8ee6;
    font-size: 18px;
  }
}
</style>
