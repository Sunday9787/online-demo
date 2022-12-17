import { useLocation } from '@/view/template/hooks/useLocation'

export function useBuiltinComponent() {
  /**
   * @type {Template.BuiltinComponent[]}
   */
  const base = [
    {
      component: 'template-input',
      type: 'input',
      props: {
        label: '病例名称',
        style: {
          width: '60px'
        },
        property: {
          underline: false,
          color: '#333'
        },
        location: useLocation()
      }
    },
    {
      component: 'template-input',
      type: 'input',
      props: {
        label: '产前编号',
        style: {
          width: '60px'
        },
        property: {
          underline: false,
          color: '#333'
        },
        location: useLocation()
      }
    },
    {
      component: 'template-input',
      type: 'input',
      props: {
        label: '姓名',
        style: {
          width: '30px'
        },
        property: {
          underline: false,
          color: '#333'
        },
        location: useLocation()
      }
    }
  ]

  return { base }
}
