import view from './view.vue'

/**
 * @type {GtGraphic.NodeComponent}
 */
const node = {
  label: 'param-panel',
  shape: view.name,
  register() {
    return {
      component: view,
      shape: view.name,
      size: {
        width: 400,
        height: 300
      },
      data: {
        input: Object.create(null),
        output: Object.create(null)
      },
      ports: {
        items: [
          { id: `${view.name}-input-1`, group: 'input', key: 'input' },
          { id: `${view.name}-output-1`, group: 'output', key: 'output' }
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
