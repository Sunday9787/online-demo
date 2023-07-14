import { onBeforeUnmount, onMounted, ref } from 'vue'
import { templateChannel } from '@/view/template/constant'
import eventBus from '@/util/eventBus'

/**
 * @param {string} outerHTML
 */
function generatorHtml(outerHTML) {
  const template = /* HTML */ `<html lang="zh-CN">
    <head>
      <meta charset="utf-8" />
      <title>模板预览</title>
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      </style>
    </head>
    <body style="padding: 20px 0;background-color: #fafafa">
      <!-- out -->
    </body>
  </html>`

  return template.replace(/<!--(\sout\s)--}>/g, outerHTML)
}

export function useToHtml() {
  /**
   * @type {import('vue').Ref<Vue>}
   */
  const refComponent = ref(null)

  const toHtml = function () {
    const node = refComponent.value.toHtml()
    node.style.margin = '0 auto'

    const html = generatorHtml(node.outerHTML)

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    window.open(url, '_blank', 'width=1024,height=768,scrollbars')
  }

  onMounted(function () {
    eventBus.$on(templateChannel.editorToHtml, toHtml)
  })

  onBeforeUnmount(function () {
    eventBus.$off(templateChannel.editorToHtml, toHtml)
  })

  return { refComponent }
}
