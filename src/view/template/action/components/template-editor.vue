<template lang="pug">
  main.template-editor
    div.template-stage(
      tabindex="-1"
      ref="stage"
      :style="{ width: size.width + 'px', height: size.height + 'px', position: 'absolute', left: offsetPosition(x, boundingClientRect.x) + 'px', top: offsetPosition(y, boundingClientRect.y) + 'px' }"
      @keydown.space.exact="keydownHandle"
      @keyup.space.exact="keyupHandle"
    )
      TemplateSprite(:size="size", :scale="scale / 100")
    app-scale(:scale.sync="scale", :max-scale="200", :mini-scale="20", :step="5")
</template>

<script>
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import { useSize } from '@/view/template/hooks/size'
import { useStore } from '@/hooks/useStore'
import { useBoundingClientRect } from '@/view/template/hooks/dom'
import TemplateSprite from './template-sprite.vue'

export default {
  name: 'TemplateEditor',
  components: {
    TemplateSprite
  },
  setup() {
    const store = useStore('globalModule')
    const { A4: size } = useSize()
    const stage = ref(null)
    const keyUp = ref(false)
    const keyDown = ref(false)
    const scale = ref(100)
    const { boundingClientRect } = useBoundingClientRect(stage)
    const { x, y } = useDraggable(stage, {
      onStart(position, event) {
        if (keyDown.value) {
          console.log('onStart', position, event)
          return
        }

        return false
      },
      onMove(position, event) {
        console.log('onMove', position, event)
      }
    })

    store.commit('updateSize', size)
    console.log(store.state)

    /**
     * @param {KeyboardEvent} e
     */
    const keydownHandle = function (e) {
      /** @type {HTMLDivElement} */
      const target = e.target
      target.style.cursor = 'grab'
      keyUp.value = false
      keyDown.value = true
    }

    /**
     * @param {KeyboardEvent} e
     */
    const keyupHandle = function (e) {
      /** @type {HTMLDivElement} */
      const target = e.target
      target.style.cursor = 'grabbing'
      keyUp.value = true
      keyDown.value = false
    }

    /**
     * @param {number} position
     * @param {number} offset
     */
    const offsetPosition = function (position, offset) {
      if (position) {
        return position - offset
      }

      return 0
    }

    return { size, scale, stage, x, y, keyupHandle, keydownHandle, boundingClientRect, offsetPosition }
  }
}
</script>

<style lang="scss">
.template-editor {
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
}

.template-stage {
  position: relative;
  outline: none;
  background-color: #f2f2f2;
}
</style>
