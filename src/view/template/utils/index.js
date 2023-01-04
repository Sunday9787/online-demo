/**
 * 创建组件 id
 * @param {number} id
 */
export function createId(id) {
  return `component-${id}-${Date.now().toString()}`
}

/**
 * @type {Record<Template.BuiltinComponentRecordType, string>}
 */
export const recordNameMap = {
  'component:add': '添加组件',
  'component:del': '删除组件',
  'component:property:font:change': '组件字体修改',
  'component:property:position:change': '组件位置修改',
  'component:property:position:change:end': '组件位置修改结束',
  'component:property:size:change': '组件大小修改'
}
