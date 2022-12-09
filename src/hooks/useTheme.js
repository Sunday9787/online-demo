import { computed } from 'vue'
import { useStore } from './useStore'

export function useTheme() {
  const appModule = useStore('appModule')

  /**
   * @type {import("vue").Ref<boolean>}
   */
  const isLightModel = computed(() => appModule.getters.isLightModel)
  /**
   * @type {import("vue").Ref<boolean>}
   */
  const isDarkModel = computed(() => appModule.getters.isDarkModel)

  return {
    isLightModel,
    isDarkModel
  }
}
