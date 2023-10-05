import { createBuiltinComponent, createBuiltinComponentGroup } from '@/views/template/utils'
import { usePosition, useSize } from '@/views/template/hooks/useProperty'

/**
 * @param {string} namespace
 * @param {Template.Builtin[]} components
 */
function initBuiltinComponent(namespace, components) {
  components.forEach(function (item, index) {
    item.id = namespace + '-' + index
  })

  return components
}

/**
 * @type {Template.Builtin[]}
 */
export const basicBuiltinComponent = initBuiltinComponent('basicBuiltinComponent', [
  {
    id: '',
    label: '病例名称',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '产前编号',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '姓名',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '姓名组',
    create() {
      return createBuiltinComponentGroup(
        { builtin: true, props: { label: this.label, position: usePosition(0, 20) } },
        [
          createBuiltinComponent({ props: { label: '姓名1' } }),
          createBuiltinComponent({ props: { label: '姓名2', position: usePosition(20, 20) } })
        ]
      )
    }
  }
])

/**
 * @type {Template.Builtin[]}
 */
export const resultsAnalysisBuiltinComponent = initBuiltinComponent('resultsAnalysisBuiltinComponent', [
  {
    id: '',
    label: '核型表达式',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '排列图',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '中期分裂图',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '所有细胞数',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '计数细胞数',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '排列细胞数',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  }
])

/**
 * @type {Template.Builtin[]}
 */
export const otherBuiltinComponent = initBuiltinComponent('otherBuiltinComponent', [
  {
    id: '',
    label: '机构名称',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '样本类型',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '采集日期',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '接收日期',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '检查方法',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '报告日期',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '审核日期',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '接收医师',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '审核医师',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  }
])

/**
 * @type {Template.Builtin[]}
 */
export const customBuiltinComponent = initBuiltinComponent('customBuiltinComponent', [
  {
    id: '',
    label: '输入框',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '下拉框',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '日期',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '电子签名',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '文本域',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '图片',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '矩形',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '矩形1',
    create() {
      return createBuiltinComponent({ props: { label: this.label, size: useSize({ w: 120, h: 60 }) } })
    }
  },
  {
    id: '',
    label: '矩形2',
    create() {
      return createBuiltinComponent({ props: { label: this.label, size: useSize({ w: 60, h: 120 }) } })
    }
  },
  {
    id: '',
    label: '横线',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '竖线',
    create() {
      return createBuiltinComponent({ props: { label: this.label } })
    }
  },
  {
    id: '',
    label: '筛选项',
    create() {
      return createBuiltinComponent({ name: 'builtin-select', props: { label: this.label } })
    }
  }
])

/**
 * @type {Map<string, Template.Builtin>}
 */
export const builtinComponent = new Map(
  Array.prototype.concat
    .apply([], [basicBuiltinComponent, resultsAnalysisBuiltinComponent, otherBuiltinComponent, customBuiltinComponent])
    .map(item => [item.id, item])
)
