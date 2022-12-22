export const storeSymbol = Symbol('store')

export const templateChannel = Object.freeze({
  /** 画布 添加组件 */
  'stage:component:add': 'template-stage:component:add',
  /** 画布 缩放变化 */
  'stage:scale:change': 'template-stage:scale:change',
  /** 画布 定位变化 */
  'stage:position:change': 'template-stage:position:change',
  /** 画布 大小变化 */
  'stage:size:change': 'template-stage:size:change',
  /** 画布 边距变化 */
  'stage:padding:change': 'template-stage:padding:change'
})
