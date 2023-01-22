import { merge } from 'lodash-es'
import { useFont, useSize, usePosition } from '@/view/template/hooks/useProperty'

/**
 * @type {Template.TemplateProperty}
 */
export class TemplateProperty {
  /**
   * @param {Template.TemplatePropertyOptions} options
   */
  constructor(options) {
    /**
     * @type {Template.TemplatePropertyOptions}
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
   */
  constructor(event, options) {
    /** @type {Template.EventTarget} */
    this.target = options.target
    /** @type {Readonly<Template.BuiltinComponent>} */
    this.detail = options.detail
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
 * @param {[Template.BuiltinComponent]|
 * [Template.BuiltinComponentName]|
 * [Template.BuiltinComponent, Template.BuiltinComponentName]} args
 */
export function createComponent(...args) {
  const { font } = useFont()
  /**
   * @type {Template.BuiltinComponent}
   */
  let component = null
  /**
   * @type {Template.BuiltinComponentName}
   */
  let type = 'builtin-input'

  if (args.length === 2) {
    component = args[0]
    type = args[1]
  } else {
    if (typeof args[0] === 'string') {
      type = args[0]
    } else {
      component = args[0]
    }
  }

  const property = {
    display: new TemplateProperty({ value: 'flex' }),
    color: new TemplateProperty({ value: '#333' }),
    fontFamily: new TemplateProperty({ value: font.value }),
    lineHeight: new TemplateProperty({ value: 25, unit: 'px' }),
    borderWidth: new TemplateProperty({ value: 1, unit: 'px' }),
    borderStyle: new TemplateProperty({
      value: false,
      trueValue: 'dashed',
      falseValue: 'solid',
      indeterminate: true,
      indeterminateTrueValue: 'solid',
      indeterminateFalseValue: 'none'
    }),
    borderColor: new TemplateProperty({ value: '#333' }),
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

  /**
   * @type {Template.BuiltinComponent}
   */
  const result = {
    id: 0,
    name: type,
    visible: false,
    props: {
      lock: false,
      required: false,
      label: '',
      property,
      position: usePosition(),
      size: useSize({ type })
    }
  }

  if (component) {
    merge(result, component)
  }

  return result
}

/**
 * @param {[Template.BuiltinComponent, Template.BuiltinComponent[]]|[Template.BuiltinComponent[]]} args
 */
export function createGroupComponent(...args) {
  const component =
    args.length === 2
      ? createComponent(args[0], 'builtin-group')
      : createComponent({ label: '自定义组' }, 'builtin-group')
  const children = args.length === 2 ? args[1] : args[0]

  const rects = children.map(getRect)

  component.props.position.x = Math.min.apply(
    null,
    rects.map(item => item.left)
  )

  component.props.position.y = Math.min.apply(
    null,
    rects.map(item => item.top)
  )

  component.props.size.w = Math.abs(
    Math.min.apply(
      null,
      rects.map(item => item.left)
    ) -
      Math.max.apply(
        null,
        rects.map(item => item.right)
      )
  )

  component.props.size.h = Math.abs(
    Math.min.apply(
      null,
      rects.map(item => item.top)
    ) -
      Math.max.apply(
        null,
        rects.map(item => item.bottom)
      )
  )

  children.forEach(item => {
    item.props.position.x -= component.props.position.x
    item.props.position.y -= component.props.position.y
  })

  component.children = children

  return component
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
