declare namespace Template {
  interface Property {
    underline: boolean
  }

  interface BuiltinComponent {
    component: string
    props: {
      label: string
      style: import('vue/types/jsx').StyleValue
      property: Property
    }
  }
}
