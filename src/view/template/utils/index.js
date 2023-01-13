import { cloneDeep, merge } from 'lodash-es'
import { useFont, useSize, usePosition } from '@/view/template/hooks/useProperty'

/**
 * 创建组件 id
 * @param {number} id
 */
export function createId(id) {
  return `component-${id}-${Date.now().toString()}`
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
    this.detail = options.detail ? cloneDeep(options.detail) : options.detail
    /** @type {Template.BuiltinComponentType} */
    this.type = event
    /** @type {number} */
    this.timestamp = Date.now()
  }
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

  /**
   * @type {Template.BuiltinComponent}
   */
  const result = {
    id: 0,
    name: type,
    visible: false,
    props: {
      label: '',
      property: {
        underline: true,
        color: '#333',
        font: font.value
      },
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
export function createComponentGroup(...args) {
  const component =
    args.length === 2
      ? createComponent(args[0], 'builtin-group')
      : createComponent({ label: '自定义组' }, 'builtin-group')
  const children = (args.length === 2 ? args[1] : args[0]).map(createComponent)

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
export function removeComponentGroup(component) {
  component.children.forEach(item => {
    item.props.position.x += component.props.position.x
    item.props.position.y += component.props.position.y
  })

  return component.children
}
