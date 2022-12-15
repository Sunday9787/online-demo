export function useBuiltinComponent() {
  /**
   * @type {Template.BuiltinComponent[]}
   */
  const base = [
    {
      component: 'template-input',
      props: {
        label: '病例名称',
        style: {
          width: '60px'
        },
        property: {
          underline: false,
          color: '#333'
        }
      }
    },
    {
      component: 'template-input',
      props: {
        label: '姓名',
        style: {
          width: '30px'
        },
        property: {
          underline: false,
          color: '#333'
        }
      }
    }
  ]

  return { base }
}
