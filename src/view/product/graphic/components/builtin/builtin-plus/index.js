import component from './view.vue'

const node = {
  label: '加法',
  name: component.name,
  register() {
    return {
      shape: component.name,
      width: 150,
      height: 50,
      data: {
        input: Object.create(null),
        output: null
      },
      ports: {
        items: [
          { id: `${component.name}-input-1`, group: 'input', key: 'input' },
          { id: `${component.name}-output-1`, group: 'output', key: 'output' }
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
      },
      component
    }
  }
}

export default node
