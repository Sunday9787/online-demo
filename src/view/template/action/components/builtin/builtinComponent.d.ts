declare namespace Template {
  interface Property {
    underline: boolean
  }

  interface BuiltinComponent {
    /** 组件id */
    id: string
    /** 组件名称 */
    name: string
    /** 组件类型 */
    type: 'input',
    props: {
      label: string
      style: import('vue/types/jsx').StyleValue
      property: Property
    }
  }
}
