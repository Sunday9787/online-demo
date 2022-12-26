declare namespace Template {

  type BuiltinComponentRecordType =
    'component:add' |
    'component:del' |
    'component:property:position:change' |
    'component:property:font:change' |
    'component:property:size:change'

  interface Property {
    underline: boolean
  }

  interface BuiltinComponent {
    /** 组件id */
    id: string
    key: number
    visible: boolean
    /** 组件名称 */
    name: string
    /** 组件类型 */
    type: 'input',
    props: {
      label: string
      style: import('vue/types/jsx').StyleValue
      property: Property
      position: {
        x: number
        y: number
      }
    }
  }

  interface BuiltinComponentRecord {
    type: BuiltinComponentRecordType
    record: BuiltinComponent
  }

  interface Padding {
    top: number
    bottom: number
    left: number
    right: number
  }

  interface Size {
    name: string
    width: number
    height: number
  }

  interface Store {
    name: string
    direction: 'vertical' | 'horizontal'
    size: Size
    padding: Padding
    currentComponent: BuiltinComponent
    components: Map<number, BuiltinComponent>
    /** 历史记录 */
    record: BuiltinComponentRecord[]
    /** 恢复队列 */
    restore: BuiltinComponentRecord[]
  }
}
