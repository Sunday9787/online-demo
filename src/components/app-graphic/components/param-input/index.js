import view from './view.vue'

/**
 * @type {GtGraphic.NodeComponent}
 */
const node = {
  label: 'param-input',
  shape: view.name,
  register() {
    return {
      component: view,
      shape: view.name,
      size: {
        width: 178,
        height: 54
      },
      data: {
        value: 11
      },
      ports: {
        items: [{ id: `${view.name}-output-1`, group: 'output', key: 'value' }],
        groups: {
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
