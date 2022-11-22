<template>
  <el-row class="app-form-collapse" :style="collapseStyle">
    <el-col class="app-form-collapse__content">
      <slot />
    </el-col>

    <div class="app-form-collapse__action">
      <slot name="action" />
      <el-button type="text" size="small" :icon="icon" @click="toggleCollapse()">{{ text }}</el-button>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'app-form-collapse',
  props: {
    height: {
      type: Number,
      default: 90
    }
  },
  data() {
    return {
      open: false
    }
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
    maxHeight() {
      if (this.$el) {
        return this.$el.scrollHeight
      }

      return this.height
    }
  },
  methods: {
    toggleCollapse() {
      this.open = !this.open
      this.$emit('change', this.open)
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
  justify-content: center;
  align-items: flex-start;
  right: 0;
  height: 100%;
  width: $width;
}
</style>
