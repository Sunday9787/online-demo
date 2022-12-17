import { useFont } from '@/view/template/hooks/useFont'
import { useLocation } from '@/view/template/hooks/useLocation'

export function useBuiltinComponent() {
  const { font } = useFont()

  /**
   * @type {Template.BuiltinComponent[]}
   */
  const base = [
    {
      id: 0,
      name: 'template-input',
      type: 'input',
      props: {
        label: '病例名称',
        property: {
          underline: false,
          color: '#333',
          font: font.value
        },
        location: useLocation()
      }
    },
    {
      id: 0,
      name: 'template-input',
      type: 'input',
      props: {
        label: '产前编号',
        property: {
          underline: false,
          color: '#333',
          font: font.value
        },
        location: useLocation()
      }
    },
    {
      id: 0,
      name: 'template-input',
      type: 'input',
      props: {
        label: '姓名',
        property: {
          underline: false,
          color: '#333',
          font: font.value
        },
        location: useLocation()
      }
    }
  ]

  return { base }
}
