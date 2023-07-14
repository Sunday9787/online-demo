import { ref } from 'vue'
import builtinComponents from 'app-graphic/components'

/**
 * @type {Record<string, string>}
 */
const labelMap = {
  math: '数学',
  param: '参数'
}

export function useBuiltinComponents() {
  /**
   * @type {import('vue').Ref<GtGraphic.Menu[]>}
   */
  const result = ref([])

  for (const [name, children] of Object.entries(builtinComponents)) {
    result.value.push({ label: labelMap[name], name, children })
  }

  return result
}
