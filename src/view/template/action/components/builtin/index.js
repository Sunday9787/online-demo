import { createComponent, createGroupComponent } from '@/view/template/utils'
import { usePosition, useSize } from '@/view/template/hooks/useProperty'

/**
 * @type {Template.Builtin[]}
 */
export const basicBuiltinComponent = [
  {
    id: 'basicBuiltinComponent-0',
    label: '病例名称',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'basicBuiltinComponent-1',
    label: '产前编号',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'basicBuiltinComponent-2',
    label: '姓名',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'basicBuiltinComponent-3',
    label: '姓名组',
    create() {
      return createGroupComponent({ props: { label: this.label, position: usePosition(0, 20) } }, [
        createComponent({ props: { label: '姓名1' } }),
        createComponent({ props: { label: '姓名2', position: usePosition(20, 20) } })
      ])
    }
  }
]

/**
 * @type {Template.Builtin[]}
 */
export const resultsAnalysisBuiltinComponent = [
  {
    id: 'resultsAnalysisBuiltinComponent-0',
    label: '核型表达式',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'resultsAnalysisBuiltinComponent-1',
    label: '排列图',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'resultsAnalysisBuiltinComponent-2',
    label: '中期分裂图',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'resultsAnalysisBuiltinComponent-3',
    label: '所有细胞数',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'resultsAnalysisBuiltinComponent-4',
    label: '计数细胞数',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'resultsAnalysisBuiltinComponent-5',
    label: '排列细胞数',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  }
]

/**
 * @type {Template.Builtin[]}
 */
export const otherBuiltinComponent = [
  {
    id: 'otherBuiltinComponent-0',
    label: '机构名称',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'otherBuiltinComponent-1',
    label: '样本类型',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'otherBuiltinComponent-2',
    label: '采集日期',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'otherBuiltinComponent-3',
    label: '接收日期',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'otherBuiltinComponent-4',
    label: '检查方法',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'otherBuiltinComponent-5',
    label: '报告日期',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'otherBuiltinComponent-6',
    label: '审核日期',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'otherBuiltinComponent-7',
    label: '接收医师',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'otherBuiltinComponent-8',
    label: '审核医师',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  }
]

/**
 * @type {Template.Builtin[]}
 */
export const customBuiltinComponent = [
  {
    id: 'customBuiltinComponent-0',
    label: '输入框',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-1',
    label: '下拉框',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-2',
    label: '日期',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-3',
    label: '电子签名',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-4',
    label: '文本域',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-5',
    label: '图片',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-6',
    label: '矩形',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-7',
    label: '矩形1',
    create() {
      return createComponent({ props: { label: this.label, size: useSize({ w: 120, h: 60 }) } })
    }
  },
  {
    id: 'customBuiltinComponent-8',
    label: '矩形2',
    create() {
      return createComponent({ props: { label: this.label, size: useSize({ w: 60, h: 120 }) } })
    }
  },
  {
    id: 'customBuiltinComponent-9',
    label: '横线',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-10',
    label: '竖线',
    create() {
      return createComponent({ props: { label: this.label } })
    }
  },
  {
    id: 'customBuiltinComponent-11',
    label: '筛选项',
    create() {
      return createComponent({ props: { label: this.label } }, 'builtin-select')
    }
  }
]

/**
 * @type {Map<string, Template.Builtin>}
 */
export const builtinComponent = new Map(
  Array.prototype.concat
    .apply([], [basicBuiltinComponent, resultsAnalysisBuiltinComponent, otherBuiltinComponent, customBuiltinComponent])
    .map(item => [item.id, item])
)
