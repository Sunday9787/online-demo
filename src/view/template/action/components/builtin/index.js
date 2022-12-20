import { usePosition, useSize, useFont } from '@/view/template/hooks/useProperty'

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
        position: usePosition(100, 100),
        size: useSize()
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
        position: usePosition(120, 120),
        size: useSize()
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
        position: usePosition(),
        size: useSize()
      }
    }
  ]

  return { base }
}
