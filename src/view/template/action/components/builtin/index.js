import { usePosition } from '@/view/template/hooks/useProperty'
import { createComponentGroup, createComponent } from '@/view/template/utils'

export function useBuiltinComponent() {
  /**
   * @type {Template.BuiltinComponent[]}
   */
  const base = [
    createComponent({ props: { label: '病例名称' } }),
    createComponent({ props: { label: '产前编号' } }),
    createComponent({ props: { label: '姓名' } }),
    createComponentGroup({ props: { label: '姓名组', position: usePosition(0, 20) } }, [
      { props: { label: '姓名1' } },
      { props: { label: '姓名2', position: usePosition(20, 20) } }
    ])
  ]

  return { base }
}
