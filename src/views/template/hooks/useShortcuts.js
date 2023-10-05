import { onBeforeUnmount, onMounted } from 'vue'
import { templateChannel } from '@/views/template/constant'
import { TemplateEvent } from '@/views/template/utils'
import shortcuts from '@/utils/shortcuts'
import eventBus from '@/utils/eventBus'

/**
 * @type {Record<string, {hotkeys: string[], register: (store: Template.Store) => void>}}
 */
const eventHandle = {
  [templateChannel.groupUn]: {
    hotkeys: ['control', 'shift', 'g'],
    register(store) {
      shortcuts(this.hotkeys, function (e) {
        if (store.currentComponent) {
          if (store.currentComponent.children) {
            const event = new TemplateEvent(templateChannel.groupUn, {
              detail: store.currentComponent,
              target: 'stage'
            })
            eventBus.$emit(templateChannel.groupUn, event)
          }
        }
      })
    }
  }
}

/**
 * @param {Template.Store} store
 */
export function useShortcuts(store) {
  for (const handle of Object.values(eventHandle)) {
    onMounted(function () {
      handle.register(store)
    })

    onBeforeUnmount(function () {
      shortcuts.off(handle.hotkeys)
    })
  }
}
