import { getCurrentInstance } from 'vue'

/**
 * @param {string} [module]
 * @returns {VuexModule}
 */
export function useStore(module) {
  const vm = getCurrentInstance()

  if (!vm) {
    throw new Error('只能在 setup 中使用')
  }

  if (module) {
    const moduleNamespace = module.indexOf('/') < 0 ? module + '/' : module
    return vm.proxy.$store._modulesNamespaceMap[moduleNamespace].context
  }

  return vm.proxy.$store
}
