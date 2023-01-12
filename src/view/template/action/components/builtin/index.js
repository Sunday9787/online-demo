import { usePosition, useSize, useFont } from '@/view/template/hooks/useProperty'
import { getRect } from '@/view/template/utils'

/**
 * @param {Template.BuiltinComponent} component
 * @param {Template.BuiltinComponent[]} children
 */
function createGroup(component, children) {
  const rects = children.map(getRect)

  component.props.size.w = Math.abs(
    Math.min.apply(
      null,
      rects.map(item => item.left)
    ) -
      Math.max.apply(
        null,
        rects.map(item => item.right)
      )
  )

  component.props.size.h = Math.abs(
    Math.min.apply(
      null,
      rects.map(item => item.top)
    ) -
      Math.max.apply(
        null,
        rects.map(item => item.bottom)
      )
  )

  component.children = children

  return component
}

export function useBuiltinComponent() {
  const { font } = useFont()

  /**
   * @type {Template.BuiltinComponent[]}
   */
  const base = [
    {
      id: 0,
      name: 'builtin-input',
      visible: false,
      props: {
        label: '病例名称',
        property: {
          underline: true,
          color: '#333',
          font: font.value
        },
        position: usePosition(100, 100),
        size: useSize({ type: 'builtin-input' })
      }
    },
    {
      id: 0,
      name: 'builtin-input',
      visible: false,
      props: {
        label: '产前编号',
        property: {
          underline: true,
          color: '#333',
          font: font.value
        },
        position: usePosition(120, 120),
        size: useSize({ type: 'builtin-input' })
      }
    },
    {
      id: 0,
      name: 'builtin-input',
      visible: false,
      props: {
        label: '姓名',
        property: {
          underline: true,
          color: '#333',
          font: font.value
        },
        position: usePosition(),
        size: useSize({ type: 'builtin-input' })
      }
    },
    createGroup(
      {
        id: 0,
        name: 'builtin-group',
        visible: false,
        props: {
          label: '姓名组',
          property: {
            underline: true,
            color: '#333',
            font: font.value
          },
          position: usePosition(0, 20),
          size: useSize()
        }
      },
      [
        {
          id: 0,
          name: 'builtin-input',
          visible: false,
          props: {
            label: '姓名1',
            property: {
              underline: true,
              color: '#333',
              font: font.value
            },
            position: usePosition(),
            size: useSize({ type: 'builtin-input' })
          }
        },
        {
          id: 0,
          name: 'builtin-input',
          visible: false,
          props: {
            label: '姓名2',
            property: {
              underline: true,
              color: '#333',
              font: font.value
            },
            position: usePosition(20, 20),
            size: useSize({ type: 'builtin-input' })
          }
        }
      ]
    )
  ]

  return { base }
}
