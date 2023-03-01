import { readonly } from 'vue'

/**
 * @param {string} namespace
 * @param {string} event
 */
function nameSpace(namespace, event) {
  return namespace + ':' + event
}

export const storeSymbol = Symbol('store')

export const templateChannel = readonly({
  /** 画布 缩放变化 */
  stageScaleChange: 'template:scale:change',
  /** 画布 大小变化 */
  stageSizeChange: 'template:size:change',
  /** 画布 边距变化 */
  stagePaddingChange: 'template:padding:change',
  /** 画布 边距变化 */
  stageClear: 'template:clear',
  /** 画布 撤销 */
  stageUndo: 'template:undo',
  /** 画布 重做 */
  stageRestore: 'template:restore',
  /** 画布 移动 */
  stageMove: 'template:move',
  /** 组 组合 */
  groupPack: 'group:pack',
  /** 组 解散 */
  groupUn: 'group:un',
  /** 组件 添加 */
  componentAdd: 'component:add',
  /** 组件 添加完成 */
  componentAddFinish: 'component:add:finish',
  /** 组件 删除 */
  componentDel: 'component:del',
  /** 组件 选择 */
  componentSelect: 'component:select',
  /** 组件 取消选择 */
  componentSelectUn: 'component:select:un',
  /** 组件 定位变化开始 */
  componentMoveStart: 'component:move:start',
  /** 组件 定位变化 */
  componentMove: 'component:move',
  /** 组件 定位变化结束 */
  componentMoveEnd: 'component:move:end',
  /** 组件 字体变化 */
  componentFontChange: 'component:font:change',
  /** 组件 字体大小变化 */
  componentFontSizeChange: 'component:font:size:change',
  /** 组件 大小变化开始 */
  componentResizeStart: 'component:resize:start',
  /** 组件 大小变化 */
  componentResize: 'component:resize',
  /** 组件 大小变化结束 */
  componentResizeEnd: 'component:resize:end'
})

export const recordChannel = readonly({
  /** 画布 缩放变化 */
  stageScaleChange: nameSpace('record', templateChannel.stageScaleChange),
  /** 画布 大小变化 */
  stageSizeChange: nameSpace('record', templateChannel.stageSizeChange),
  /** 画布 边距变化 */
  stagePaddingChange: nameSpace('record', templateChannel.stagePaddingChange),
  /** 画布 边距变化 */
  stageClear: nameSpace('record', templateChannel.stageClear),
  /** 画布 撤销 */
  stageUndo: nameSpace('record', templateChannel.stageUndo),
  /** 画布 重做 */
  stageRestore: nameSpace('record', templateChannel.stageRestore),
  /** 画布 移动 */
  stageMove: nameSpace('record', templateChannel.stageMove),
  /** 组 组合 */
  groupPack: nameSpace('record', templateChannel.groupPack),
  /** 组 解散 */
  groupUn: nameSpace('record', templateChannel.groupUn),
  /** 组件 添加 */
  componentAdd: nameSpace('record', templateChannel.componentAdd),
  /** 组件 删除 */
  componentDel: nameSpace('record', templateChannel.componentDel),
  /** 组件 选择 */
  componentSelect: nameSpace('record', templateChannel.componentSelect),
  /** 组件 取消选择 */
  componentSelectUn: nameSpace('record', templateChannel.componentSelectUn),
  /** 组件 定位变化开始 */
  componentMoveStart: nameSpace('record', templateChannel.componentMoveStart),
  /** 组件 定位变化 */
  componentMove: nameSpace('record', templateChannel.componentMove),
  /** 组件 定位变化结束 */
  componentMoveEnd: nameSpace('record', templateChannel.componentMoveEnd),
  /** 组件 字体变化 */
  componentFontChange: nameSpace('record', templateChannel.componentFontChange),
  /** 组件 字体变化 */
  componentFontSizeChange: nameSpace('record', templateChannel.componentFontSizeChange),
  /** 组件 大小变化开始 */
  componentResizeStart: nameSpace('record', templateChannel.componentResizeStart),
  /** 组件 大小变化 */
  componentResize: nameSpace('record', templateChannel.componentResize),
  /** 组件 大小变化结束 */
  componentResizeEnd: nameSpace('record', templateChannel.componentResizeEnd)
})

/**
 * @type {Readonly<Record<Template.BuiltinComponentType, string>>}
 */
export const recordTypeMap = readonly({
  [templateChannel.stageScaleChange]: '画布 缩放变化',
  [templateChannel.stageSizeChange]: '画布 大小变化',
  [templateChannel.stagePaddingChange]: '画布 边距变化',
  [templateChannel.stageMove]: '画布 移动',
  [templateChannel.stageClear]: '画布 清空',
  [templateChannel.groupPack]: '组 组合',
  [templateChannel.groupUn]: '组 解散',
  [templateChannel.componentAdd]: '组件 添加',
  [templateChannel.componentDel]: '组件 删除',
  [templateChannel.componentSelect]: '组件 选择',
  [templateChannel.componentSelectUn]: '组件 取消选择',
  [templateChannel.componentMoveStart]: '组件 定位变化开始',
  [templateChannel.componentMove]: '组件 定位变化',
  [templateChannel.componentMoveEnd]: '组件 定位变化结束',
  [templateChannel.componentFontChange]: '组件 字体变化',
  [templateChannel.componentFontSizeChange]: '组件 字体大小变化',
  [templateChannel.componentResizeStart]: '组件 大小变化开始',
  [templateChannel.componentResize]: '组件 大小变化',
  [templateChannel.componentResizeEnd]: '组件 大小变化结束'
})
