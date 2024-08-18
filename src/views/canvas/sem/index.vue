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

    onMounted(async function () {
      await SEM.Asset.load([
        'https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/2023-03-08-18-10-03-pexels-photo-896763.jpeg?imageMogr2/thumbnail/1920x/quality/80'
      ])

      stageRef.value.appendChild(app.canvas)
      app.init({ background: 'rgb(16,153,187)', resizeTo: window })

      const texture = SEM.Texture.from(
        'https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/2023-03-08-18-10-03-pexels-photo-896763.jpeg?imageMogr2/thumbnail/1920x/quality/80'
      )

      const sprit = new SEM.Spirit(texture)

      sprit.anchor.set(0.5)
      sprit.x = app.width / 2
      sprit.y = app.height / 2

      app.stage.add(sprit)
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
