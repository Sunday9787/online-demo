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

  interface Event<T extends unknown> {
    target: EventTarget
    detail: T
    timestamp: number
    type: BuiltinComponentType
  }

  interface TemplatePropertyOptions {
    value: string | number | boolean
    unit?: string
    trueValue?: string | number
    falseValue?: string | number
    indeterminate?: boolean
    indeterminateTrueValue?: string | number
    indeterminateFalseValue?: string | number
  }

  class TemplateProperty {
    static options: Omit<TemplatePropertyOptions, 'value'>
    static format(): string | void

    constructor(options: TemplatePropertyOptions)
    public property: string
    public unit: string
    public trueValue: string | number
    public falseValue: string | number
    public value: string | number | boolean
    public indeterminate: boolean | null
    public indeterminateTrueValue: string | number | null
    public indeterminateFalseValue: string | number | null
  }

  interface Property {
    underline: boolean
    lineHeight: TemplateProperty
    color: TemplateProperty
    fontFamily: TemplateProperty
    letterSpacing: TemplateProperty
    [key: string]: TemplateProperty | boolean
  }

  interface BuiltinComponentProps {
    lock: boolean
    label: string
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
