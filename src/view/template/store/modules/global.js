/**
 * @type {import('vuex').Module}
 */
const globalModule = {
  namespaced: true,
  state: {
    size: {
      width: 0,
      height: 0
    },
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  mutations: {
    updateSize(state, payload) {
      state.size = payload
    },
    updatePadding(state, payload) {
      state.size = payload
    }
  }
}

export default globalModule
