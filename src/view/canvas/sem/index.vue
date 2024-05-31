<template lang="pug">
.sem-container
  .sem-toolbar
    el-form(size="small" inline)
      el-row
        el-col(:span="12")
          el-input(size="small" type="text" v-model="form.img")
        el-col(:span="12")
          el-button(size="small" @click="loadImg(form.img)") 加载图片

  .sem-stage.flex1(ref="stageRef")
    //- canvas.sem-canvas(ref="canvas")
</template>

<script>
import { onMounted, ref } from 'vue'
import * as SEM from '@/class/sem'

export default {
  name: 'CanvasSem',
  data() {
    return {
      form: {
        img: ''
      },
      /** @type {HTMLCanvasElement} */
      canvas: null,
      /** @type {CanvasRenderingContext2D|null } */
      ctx: null
    }
  },
  setup() {
    /**
     * @type {import('vue').Ref<HTMLElement>}
     */
    const stageRef = ref()
    const app = new SEM.Application()

    onMounted(function () {
      stageRef.value.appendChild(app.canvas)
      app.init({ background: 'rgb(16,153,187)', resizeTo: window })
      const texture = new SEM.Texture('https://static-1256180570.oss-cn-hangzhou.aliyuncs.com/upload/1711958376112.jpg')
      const texture2 = new SEM.Texture(
        'https://static-1256180570.oss-cn-hangzhou.aliyuncs.com/upload/1712046170892.jpg',
        800,
        600
      )
      const sprit = new SEM.Spirit(texture)
      const sprit2 = new SEM.Spirit(texture2)
      sprit.anchor.set(0.5)
      sprit.x = app.width / 2
      sprit.y = app.height / 2

      app.stage.add(sprit)
      app.stage.add(sprit2)
    })

    return {
      stageRef
    }
  },
  methods: {
    /**
     * @param {string} src
     */
    loadImg(src) {
      const ctx = this.ctx
      const img = new Image()
      const canvas = this.canvas

      img.onload = function () {
        const originalHeight = img.height
        const originalWidth = img.width

        // 目标宽度和高度（缩放）
        const targetWidth = originalWidth * 0.2
        const targetHeight = originalHeight * 0.2

        ctx.drawImage(
          img,
          canvas.width / 2 - targetWidth / 2,
          canvas.height / 2 - targetHeight / 2,
          targetWidth,
          targetHeight
        )
      }

      img.src = src
    }
  },
  mounted() {
    /** @type {HTMLCanvasElement} */
    const el = this.$refs.canvas
    this.canvas = el

    if (!this.canvas) {
      throw new Error('画布初始化失败')
    }

    this.ctx = el.getContext('2d')

    const resize = function () {
      el.width = document.documentElement.clientWidth
      el.height = document.documentElement.clientHeight - 32
    }

    window.addEventListener('resize', resize)

    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('resize', resize)
    })

    window.dispatchEvent(new Event('resize'))
  }
}
</script>

<style lang="scss">
.sem-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
