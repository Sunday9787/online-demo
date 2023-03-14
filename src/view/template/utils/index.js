import Vue from 'vue'
import { cloneDeep } from 'lodash-es'
import { useFont, useSize, usePosition, useFontSize } from '@/view/template/hooks/useProperty'

/**
 * @type {Template.TemplateProperty}
 */
export class TemplateProperty {
  /**
   * @param {Template.TemplateProperty} options
   */
  constructor(options) {
    /**
     * @type {Template.TemplateProperty}
     */
    const opt = Object.assign({}, TemplateProperty.options, options)

    this.value = opt.value
    this.unit = opt.unit
    this.trueValue = opt.trueValue
    this.falseValue = opt.falseValue

    this.indeterminate = opt.indeterminate
    this.indeterminateTrueValue = opt.indeterminateTrueValue
    this.indeterminateFalseValue = opt.indeterminateFalseValue
  }
}

TemplateProperty.options = {
  unit: null,
  trueValue: null,
  falseValue: null,
  indeterminate: null,
  indeterminateTrueValue: null,
  indeterminateFalseValue: null
}

export class TemplateEvent {
  /**
   * @param {Template.BuiltinComponentType} event
   * @param {object} options
   * @param {Template.BuiltinComponent|null} options.detail
   * @param {Template.EventTarget} options.target
   * @param {boolean} [options.clone]
   */
  constructor(event, options) {
    /** @type {Template.EventTarget} */
    this.target = options.target
    /** @type {Readonly<Template.BuiltinComponent>} */
    this.detail = options.clone ? cloneDeep(options.detail) : options.detail
    /** @type {Template.BuiltinComponentType} */
    this.type = event
    /** @type {number} */
    this.timestamp = Date.now()
  }
}

/**
 * 创建组件 id
 * @param {number} id
 */
export function createId(id) {
  return `component-${id}-${Date.now().toString()}`
}

/**
 * @param {Template.BuiltinComponent} component
 * @returns {Template.Rect}
 */
export function getRect(component) {
  const left = component.props.position.x
  const top = component.props.position.y
  const right = left + component.props.size.w
  const bottom = top + component.props.size.h
  const height = component.props.size.h
  const width = component.props.size.w

  return { left, top, right, bottom, height, width }
}

/**
 * 元件相对于画布的位置
 *
 * @param {object} option
 * @param {number} option.x
 * @param {number} option.y
 * @param {HTMLElement} option.el
 * @param {number} scale
 * @returns {[number, number]}
 */
export function shapeLocation(option, scale) {
  const [offsetLeft, offsetTop] = getBorderSize(option.el)
  const rect = option.el.getBoundingClientRect()
  return [(option.x - rect.left - offsetLeft * scale) / scale, (option.y - rect.top - offsetTop * scale) / scale]
}

/**
 * @param {HTMLElement} el
 * @returns {[number, number]}
 */
export function getBorderSize(el) {
  const reg = /(?<width>\d+\.?\d+)\w+/
  const style = window.getComputedStyle(el)
  const borderLeftWidthMatch = reg.exec(style.borderLeftWidth)
  const borderTopWidthMatch = reg.exec(style.borderTopWidth)

  if (borderLeftWidthMatch && borderTopWidthMatch) {
    const w = Number(borderLeftWidthMatch.groups.width)
    const h = Number(borderTopWidthMatch.groups.width)

    return [w, h]
  }

  return [0, 0]
}

const { font } = useFont()
const { fontSize } = useFontSize()

/**
 * @type {Record<string, Template.TemplateProperty>}
 */
const defaultProperty = {
  display: { value: 'flex' },
  color: { value: '#333' },
  fontFamily: { value: font.value },
  fontSize: { value: fontSize.value, unit: 'px' },
  lineHeight: { value: 25, unit: 'px' },
  borderWidth: { value: 1, unit: 'px' },
  borderStyle: {
    value: false,
    trueValue: 'dashed',
    falseValue: 'solid',
    indeterminate: true,
    indeterminateTrueValue: 'solid',
    indeterminateFalseValue: 'none'
  }
}

/**
 * @param {Document.BuiltinComponentProps} props
 * @param {Template.BuiltinComponentName} name
 * @param {'init'|'document'|'normal'} type `init` 初始化 `document` 模板数据 `normal` 普通初始化
 */
export function initBuiltinComponentProps(props, name, type) {
  /**
   * @type {Template.BuiltinComponentProps}
   */
  const result = {
    zIndex: props.zIndex ?? 1,
    required: props.required ?? false,
    lock: props.lock ?? false,
    label: props.label ?? '',
    value: props.value ?? '',
    property: initBuiltinComponentProperty(props.property ?? defaultProperty),
    position: props.position ?? usePosition(),
    size: props.size ?? useSize({ name }),
    option: {
      value: Vue.observable(props.options ?? []),
      add() {
        if (this.value.length) {
          // 当最后一项不为空时 才可以 新增项
          if (this.value[this.value.length - 1].value) {
            this.value.push({ value: '', key: Date.now() })
          }
          return
        }

        this.value.push({ value: '', key: Date.now() })
      },
      del(index) {
        this.value.splice(index, 1)
      }
    },
    get options() {
      return this.option.value
    }
  }

  if (type !== 'document' && !result.options.length) {
    result.option.add()
  }

  return result
}

/**
 * @param {Document.Property} property
 */
export function initBuiltinComponentProperty(property) {
  /**
   * @type {Document.Property}
   */
  const result = {
    get dashed() {
      return this.borderStyle.value
    },
    set dashed(val) {
      this.borderStyle.value = val
    },
    get underline() {
      return this.borderStyle.indeterminate
    },
    set underline(val) {
      this.borderStyle.indeterminate = val
    }
  }

  for (const [key, item] of Object.entries(property)) {
    result[key] = new TemplateProperty(item)
  }

  return result
}

/**
 * @param {Document.BuiltinComponent} data
 * @param {'init'|'document'|'normal'} type `init` 初始化 `document` 模板数据 `normal` 普通初始化
 */
export function createBuiltinComponent(data, type = 'normal') {
  const name = data.name ?? 'builtin-input'

  /**
   * @type {Template.BuiltinComponent}
   */
  const component = {
    id: data.id ?? '',
    uid: data.uid ?? -1,
    shapeId: data.shapeId,
    name,
    value: data.value ?? '',
    visible: data.visible ?? false,
    builtin: data.builtin ?? false,
    props: initBuiltinComponentProps(data.props ?? {}, name, type)
  }

  return component
}

/**
 * @param {[Document.BuiltinComponent, Document.BuiltinComponent[], Document.CreateBuiltinComponentType]|
 * [Document.BuiltinComponent[], Document.CreateBuiltinComponentType]} args
 */
export function createBuiltinComponentGroup(...args) {
  /**
   * @type {Document.CreateBuiltinComponentType}
   */
  let type = 'normal'
  /**
   * @type {Document.BuiltinComponent}
   */
  let group = null
  /**
   * @type {Document.BuiltinComponent[]}
   */
  let children = []

  if (Array.isArray(args[0])) {
    type = args[1]
    children = args[0]
    group = createBuiltinComponent({ name: 'builtin-group' }, type)
  } else {
    type = args[2]
    children = args[1]
    group = createBuiltinComponent({ name: 'builtin-group', ...args[0] }, type)
  }

  /**
   * @type {[number[],number[],number[],number[]]}
   */
  const [left, top, right, bottom] = children.map(getRect).reduce(
    function (previousValue, currentValue) {
      const [left, top, right, bottom] = previousValue

      left.push(currentValue.left)
      top.push(currentValue.top)
      right.push(currentValue.right)
      bottom.push(currentValue.bottom)
      return [].concat([left], [top], [right], [bottom])
    },
    [[], [], [], []]
  )

  group.props.position.x = Math.min.apply(null, left)
  group.props.position.y = Math.min.apply(null, top)
  group.props.size.w = Math.abs(Math.min.apply(null, left) - Math.max.apply(null, right))
  group.props.size.h = Math.abs(Math.min.apply(null, top) - Math.max.apply(null, bottom))

  if (type !== 'document') {
    children.forEach(item => {
      item.props.position.x -= group.props.position.x
      item.props.position.y -= group.props.position.y
    })
  }

  group.children = children

  return group
}

/**
 * @param {Template.BuiltinComponent} component
 * @returns {Template.BuiltinComponent[]}
 */
export function removeGroupComponent(component) {
  component.children.forEach(item => {
    item.props.position.x += component.props.position.x
    item.props.position.y += component.props.position.y
  })

  return component.children
}

/**
 * @this {Template.TemplateProperty}
 */
TemplateProperty.format = function () {
  if (typeof this.value === 'boolean') {
    if (this.trueValue === null && this.falseValue === null) {
      throw new Error('value 为 Boolean 类型时 trueValue 且 falseValue 不能为 null')
    }
  }

  if (typeof this.indeterminate === 'boolean') {
    if (this.indeterminateTrueValue === null && this.indeterminateFalseValue === null) {
      throw new Error(' indeterminate 为 Boolean 时 indeterminateTrueValue 且 indeterminateFalseValue 不能为 null')
    }
  }

  let val = this.value

  if (this.indeterminate !== null) {
    val = this.indeterminate ? this.indeterminateTrueValue : this.indeterminateFalseValue
  }

  if (this.indeterminate) {
    val = this.value ? this.trueValue : this.falseValue
  }

  if (typeof val === 'boolean') {
    return
  }

  if (this.unit) {
    return val + this.unit
  }

  return val
}

/**
 * @param {Template.Property} property
 */
export function formatComponentStyle(property) {
  /**
   * @type {import('vue/types/jsx').StyleValue}
   */
  const result = Object.create(null)

  for (const [key, value] of Object.entries(property)) {
    if (typeof value === 'boolean') continue

    const val = TemplateProperty.format.call(value)
    if (val) result[key] = val
  }

  return result
}
