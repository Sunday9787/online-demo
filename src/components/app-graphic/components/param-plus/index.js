import view from './view.vue'

/**
 * @type {GtGraphic.NodeComponent}
 */
const node = {
  label: 'param-plus',
  shape: view.name,
  register() {
    return {
      component: view,
      shape: view.name,
      size: {
        width: 154,
        height: 54
      },
      data: {
        type: 'function',
        input: Object.create(null),
        output: Object.create(null)
      },
      ports: {
        items: [
          { id: `${view.name}-input-1`, group: 'input', key: 'input' },
          { id: `${view.name}-output-1`, group: 'output', key: 'input' }
        ],
        groups: {
          input: {
            position: 'left',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#8f8f8f',
                r: 6
              }
            }
          },
          output: {
            position: 'right',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#8f8f8f',
                r: 6
              }
            }
          }
        }
      }
    }
  }
}

export default node
