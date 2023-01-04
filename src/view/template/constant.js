import { readonly } from 'vue'

export const storeSymbol = Symbol('store')

export const templateChannel = readonly({
  /** 画布 添加组件 */
  stageComponentAdd: 'template-stage:component:add',
  /** 画布 缩放变化 */
  stageScaleChange: 'template-stage:scale:change',
  /** 画布 定位变化 */
  stagePositionChange: 'template-stage:position:change',
  /** 画布 大小变化 */
  stageSizeChange: 'template-stage:size:change',
  /** 画布 边距变化 */
  stagePaddingChange: 'template-stage:padding:change',
  /** 组件添加 */
  componentAdd: 'editor-component:add',
  /** 组件删除 */
  componentDel: 'editor-component:del',
  componentPropertyPositionChange: 'editor-component:property:position:change',
  componentPropertyPositionChangeEnd: 'editor-component:property:position:change:end',
  componentPropertyFontChange: 'editor-component:property:font:change',
  componentPropertySizeChange: 'editor-component:property:size:change'
})

export const componentRecordType = readonly({
  componentAdd: 'component:add',
  componentDel: 'component:del',
  componentPropertyPositionChange: 'component:property:position:change',
  componentPropertyPositionChangeEnd: 'component:property:position:change:end',
  componentPropertyFontChange: 'component:property:font:change',
  componentPropertySizeChange: 'component:property:size:change'
})
