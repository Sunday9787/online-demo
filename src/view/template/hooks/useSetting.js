import { ref, watch } from 'vue'

const builtinComponentName = {
  input: 'builtin-input',
  select: 'builtin-select'
}

const builtinComponentPropertySetting = {
  [builtinComponentName.input]: {
    setting: [
      { label: '锁定位置', type: 'lock', value: false },
      { label: '显示下划线', type: 'underline', value: false },
      { label: '设为虚线', type: 'dash', value: false },
      { label: '设为必填', type: 'required', value: false }
    ]
  },
  [builtinComponentName.select]: {
    setting: {}
  }
}

/**
 * @param {import('vue').Ref<Template.BuiltinComponent>} component
 * @returns {import('vue').Ref<null>}
 */
export function useSetting(component) {
  const result = ref(null)

  if (component.value) {
    result.value = builtinComponentPropertySetting[component.value.name]
  }

  watch(
    () => component.value,
    function (val) {
      result.value = val ? builtinComponentPropertySetting[val.name] : null
    }
  )

  return result
}
