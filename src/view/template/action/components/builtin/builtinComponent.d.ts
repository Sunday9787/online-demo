declare namespace Template {

  type BuiltinComponentType =
    'template:scale:change'|
    'template:size:change'|
    'template:padding:change'|
    'template:clear'|
    'template:undo'|
    'template:restore'|
    'group:pack'|
    'group:un'|
    'component:add'|
    'component:del'|
    'component:select'|
    'component:select:un'|
    'component:move:start'|
    'component:move'|
    'component:move:end'|
    'component:font:change'|
    'component:resize:start'|
    'component:resize'|
    'component:resize:end'
  type AddNameSpace<N extends string,T extends string> = `${N}:${T}`
  type BuiltinComponentRecordType = AddNameSpace<'record',BuiltinComponentType>

  type EventTarget = 'stage'|'property'|'toolbar'

  interface Event {
    target: EventTarget
    detail: BuiltinComponent
    timestamp: number
    type: BuiltinComponentType
  }

  interface Property {
    underline: boolean
  }

  interface BuiltinComponent {
    /** 组件id */
    id: string
    key: number
    visible: boolean
    group: number
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
      size: {
        w: number
        h: number
      }
    }
  }

  interface BuiltinComponentRecord {
    type: BuiltinComponentType
    component: BuiltinComponent
  }

  interface Padding {
    top: number
    bottom: number
    left: number
    right: number
  }

  interface Rect {
    top: number
    bottom: number
    left: number
    right: number
    width: number
    height: number
  }

  interface Size {
    name: string
    width: number
    height: number
  }

  interface Store {
    name: string
    direction: 'vertical' | 'horizontal'
    get size(): Size
    padding: Padding
    currentComponent: BuiltinComponent
    components: Map<number, BuiltinComponent>
    componentsData: BuiltinComponent[]
    get componentsGroup(): number
    /** 历史记录 */
    record: BuiltinComponentRecord[]
    /** 恢复队列 */
    restore: BuiltinComponentRecord[]
  }
}
