<template>
  <div class="app-scale" :style="offset">
    <a href="javascript:;" class="app-scale__button" @click="minus()">
      <i class="el-icon-minus" />
    </a>

    <a href="javascript:;" class="app-scale__button" @click="plus()">
      <i class="el-icon-plus" />
    </a>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppScale',
  props: {
    offset: {
      type: Object,
      default: () => ({ right: '20px', bottom: '20px' })
    },
    step: {
      type: Number,
      default: 1
    },
    scale: {
      type: Number,
      required: true
    },
    miniScale: {
      type: Number,
      default: 1
    },
    maxScale: {
      type: Number,
      default: 6
    },
    natural: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const currentScale = ref(props.scale)

    return { currentScale }
  },
  methods: {
    minus() {
      if (this.natural) {
        this._plus()
        return
      }

      this._minus()
    },
    _minus() {
      if (this.currentScale < this.maxScale) {
        this.currentScale += this.step
        this.$emit('update:scale', this.currentScale)
        this.$emit('change', this.currentScale)
      }
    },
    plus() {
      if (this.natural) {
        this._minus()
        return
      }

      this._plus()
    },
    _plus() {
      if (this.currentScale > this.miniScale) {
        this.currentScale -= this.step
        this.$emit('update:scale', this.currentScale)
        this.$emit('change', this.currentScale)
      }
    }
  },
  watch: {
    step(val) {
      this.currentScale = val
    }
  }
}
</script>

<style lang="scss">
.app-scale {
  position: absolute;
  z-index: 99;
  display: flex;
  column-gap: 20px;
}

.app-scale__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  @extend %themed;
  @include themeify {
    background-color: rgba(theme('color-primary'), 0.5);

    &:hover,
    &:active {
      background-color: rgba(theme('color-primary'), 0.8);
    }
  }
}
</style>
