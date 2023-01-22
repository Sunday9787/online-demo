import {
  basicBuiltinComponent,
  otherBuiltinComponent,
  customBuiltinComponent
} from '@/view/template/action/components/builtin'

const builtinComponents = [basicBuiltinComponent, otherBuiltinComponent, customBuiltinComponent]

export function useBuiltinComponent() {
  /**
   * @type {Array<{label: string, items: Template.BuiltinComponentItem[]}>}
   */
  const data = [
    { label: '基本控件', items: [] },
    { label: '其他控件', items: [] },
    { label: '自定义控件', items: [] }
  ]

  builtinComponents.forEach((components, index) => {
    for (const [id, item] of components) {
      data[index].items.push({ label: item.props.label, id })
    }
  })

  return data
}
