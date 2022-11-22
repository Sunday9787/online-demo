/**
 * @type {import('vuex').Module}
 */
const module = {
  namespaced: true,
  state: {
    user: {
      userName: ''
    },
    transInOrgList: {
      /** 转入机构 */
      allTransInMechList: [],
      /** 转出机构、合作机构 */
      mechanismVOS: []
    },
    power: {
      analysis: true,
      sample: true,
      audit: true,
      expertConsultRecord: true,
      transfer: true,
      setting: true,
      invite: true,
      upload: true
    }
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload
    },
    updatePower(state, payload) {},
    updateTransInOrgList(state, payload) {
      console.log('updateTransInOrgList', payload)
      state.transInOrgList.allTransInMechList = payload.allTransInMechList
      state.transInOrgList.mechanismVOS = payload.mechanismVOS
    }
  },
  actions: {}
}

export default module
