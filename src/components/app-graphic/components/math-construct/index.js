import view from './view.vue'

/**
 * @type {GtGraphic.NodeComponent}
 */
const node = {
  label: 'Construct',
  shape: view.name,
  register() {
    return {
      component: view,
      shape: view.name
    }
  }
}

export default node
