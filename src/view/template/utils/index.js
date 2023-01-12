import { cloneDeep } from 'lodash-es'

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
