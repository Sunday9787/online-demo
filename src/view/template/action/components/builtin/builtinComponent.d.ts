declare namespace Template {
  interface Property {
    underline: boolean
  }

  interface BuiltinComponent {
    component: string
    type: 'input',
    props: {
      label: string
      style: import('vue/types/jsx').StyleValue
      property: Property
    }
  }
}
