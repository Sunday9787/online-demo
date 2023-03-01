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
    'component:fontSize:change'|
    'component:resize:start'|
    'component:resize'|
    'component:resize:end'
  type AddNameSpace<N extends string,T extends string> = `${N}:${T}`
  type BuiltinComponentRecordType = AddNameSpace<'record',BuiltinComponentType>

  type BuiltinComponentName = 'builtin-group' | 'builtin-input' | 'builtin-select'

  type EventTarget = 'stage'|'property'|'toolbar'

  interface Event<T = null, T extends unknown> {
    target: EventTarget
    detail: T
    timestamp: number
    type: BuiltinComponentType
  }

  interface TemplatePropertyValue {
    value: string | number | boolean
  }

  declare class TemplateProperty {
    constructor(opt: TemplateProperty)
    static format(this: TemplateProperty): string
    static options: TemplateProperty
    value: string | number | boolean
    unit?: string
    trueValue?: string | number
    falseValue?: string | number
    indeterminate?: boolean
    indeterminateTrueValue?: string | number
    indeterminateFalseValue?: string | number
  }

  interface Property {
    display: TemplatePropertyValue
    color: TemplatePropertyValue
    fontFamily: TemplatePropertyValue
    fontSize: TemplatePropertyValue
    lineHeight: TemplatePropertyValue
    borderWidth: TemplatePropertyValue
    borderStyle: TemplatePropertyValue
    borderColor: TemplatePropertyValue
    [key: string]: TemplatePropertyValue
  }

  interface BuiltinComponentProps {
    lock: boolean
    label: string
    zIndex: number
    property: Property
    position: {
      x: number
      y: number
    }
    size: {
      w: number
      h: number
    }
    value: string
    option: {
      value: BuiltinComponentPropsOptions[]
      del(key: number): void
      add(): void
    }
    get options(): BuiltinComponentPropsOptions[]
  }

  interface BuiltinComponentPropsOptions {
    label: string
    value: string
    key: number
  }

  interface BuiltinComponentItem {
    label: string
    id: string
    used: boolean
    offset: { x: number, y: number }
  }

  interface Builtin {
    /** 组件id */
    id: string
    label: string
    create(): Template.BuiltinComponent
  }

  interface BuiltinComponent {
    /** 组件id */
    id: string
    uid: number
    visible: boolean
    /** 组件名称 */
    name: BuiltinComponentName
    props: BuiltinComponentProps
    builtin: boolean
    children?: BuiltinComponent[]
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
    get changes(): number
    set changes(): number
    get size(): Readonly<Size>
    direction: 'vertical' | 'horizontal'
    padding: Padding
    currentComponent: BuiltinComponent
    components: Map<number, BuiltinComponent>
    componentsData: BuiltinComponent[]
    /** 历史记录 */
    record: BuiltinComponentRecord[]
    /** 恢复队列 */
    restore: BuiltinComponentRecord[]
  }
}
