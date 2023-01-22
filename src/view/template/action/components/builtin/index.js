import { createComponent, createGroupComponent } from '@/view/template/utils'
import { usePosition } from '@/view/template/hooks/useProperty'

export const basicBuiltinComponent = new Map([
  ['basicBuiltinComponent-0', createComponent({ props: { label: '病例名称' } })],
  ['basicBuiltinComponent-1', createComponent({ props: { label: '产前编号' } })],
  ['basicBuiltinComponent-2', createComponent({ props: { label: '姓名' } })],
  [
    'basicBuiltinComponent-3',
    createGroupComponent({ props: { label: '姓名组', position: usePosition(0, 20) } }, [
      createComponent({ props: { label: '姓名1' } }),
      createComponent({ props: { label: '姓名2', position: usePosition(20, 20) } })
    ])
  ]
])

export const resultsAnalysisBuiltinComponent = new Map([
  ['resultsAnalysisBuiltinComponent-0', createComponent({ props: { label: '核型表达式' } })],
  ['resultsAnalysisBuiltinComponent-1', createComponent({ props: { label: '排列图' } })],
  ['resultsAnalysisBuiltinComponent-2', createComponent({ props: { label: '中期分裂图' } })],
  ['resultsAnalysisBuiltinComponent-3', createComponent({ props: { label: '所有细胞数' } })],
  ['resultsAnalysisBuiltinComponent-4', createComponent({ props: { label: '计数细胞数' } })],
  ['resultsAnalysisBuiltinComponent-5', createComponent({ props: { label: '排列细胞数' } })]
])

export const otherBuiltinComponent = new Map([
  ['otherBuiltinComponent-0', createComponent({ props: { label: '机构名称' } })],
  ['otherBuiltinComponent-1', createComponent({ props: { label: '样本类型' } })],
  ['otherBuiltinComponent-2', createComponent({ props: { label: '采集日期' } })],
  ['otherBuiltinComponent-3', createComponent({ props: { label: '接收日期' } })],
  ['otherBuiltinComponent-4', createComponent({ props: { label: '检查方法' } })],
  ['otherBuiltinComponent-5', createComponent({ props: { label: '报告日期' } })],
  ['otherBuiltinComponent-6', createComponent({ props: { label: '审核日期' } })],
  ['otherBuiltinComponent-7', createComponent({ props: { label: '接收医师' } })],
  ['otherBuiltinComponent-8', createComponent({ props: { label: '审核医师' } })]
])

export const customBuiltinComponent = new Map([
  ['customBuiltinComponent-0', createComponent({ props: { label: '输入框' } })],
  ['customBuiltinComponent-1', createComponent({ props: { label: '下拉框' } })],
  ['customBuiltinComponent-2', createComponent({ props: { label: '日期' } })],
  ['customBuiltinComponent-3', createComponent({ props: { label: '电子签名' } })],
  ['customBuiltinComponent-4', createComponent({ props: { label: '文本域' } })],
  ['customBuiltinComponent-5', createComponent({ props: { label: '图片' } })],
  ['customBuiltinComponent-6', createComponent({ props: { label: '矩形' } })],
  ['customBuiltinComponent-7', createComponent({ props: { label: '横线' } })],
  ['customBuiltinComponent-8', createComponent({ props: { label: '竖线' } })]
])

/**
 * @type {Map<string, Template.BuiltinComponent>}
 */
export const builtinComponent = new Map(
  Array.prototype.concat.apply(
    [],
    [
      Array.from(basicBuiltinComponent),
      Array.from(resultsAnalysisBuiltinComponent),
      Array.from(otherBuiltinComponent),
      Array.from(customBuiltinComponent)
    ]
  )
)
