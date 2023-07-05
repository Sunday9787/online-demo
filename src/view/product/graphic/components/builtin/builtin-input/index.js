import component from './view.vue'

const node = {
  label: '输入',
  name: component.name,
  /**
   * @returns {import('@antv/x6-vue-shape').VueShapeConfig}
   */
  register() {
    return {
      shape: component.name,
      width: 150,
      height: 50,
      data: {
        value: 10
      },
      ports: {
        items: [{ id: `${component.name}-output-1`, group: 'output', key: 'value' }],
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
      },
      component
    }
  }
}

export default node
