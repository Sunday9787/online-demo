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
        input: []
      },
      ports: {
        items: [{ id: 'port_1', group: 'left', name: 'value' }],
        groups: {
          left: {
            position: 'left',
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
