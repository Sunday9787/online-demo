import { request } from '@/util/net'

/**
 * @type {Readonly<[string, string]>}
 */
const safePreferredColorScheme = ['light', 'dark']
const defaultTheme = { manual: false, model: 'light' }

/**
 * @type {import('vuex').Module}
 */
const module = {
  namespaced: true,
  state: {
    organization: {
      id: 1,
      name: 'FBI',
      currentMechanism: null,
      mechanismList: [
        {
          createTime: '2021-06-10 10:49:38',
          isDelete: 0,
          mechanismId: 415,
          mechanismName: '德适官方机构',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        },
        {
          createTime: '2021-06-10 15:12:08',
          isDelete: 0,
          mechanismId: 424,
          mechanismName: '德适666',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        },
        {
          createTime: '2021-06-10 15:19:40',
          isDelete: 0,
          mechanismId: 425,
          mechanismName: '微服务',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        },
        {
          createTime: '2021-06-10 15:21:13',
          isDelete: 0,
          mechanismId: 427,
          mechanismName: '合议庭和用途',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        },
        {
          createTime: '2021-06-10 15:22:10',
          isDelete: 0,
          mechanismId: 428,
          mechanismName: '东方夫人',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        },
        {
          createTime: '2021-06-10 15:24:22',
          isDelete: 0,
          mechanismId: 430,
          mechanismName: '德适1234567',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        },
        {
          createTime: '2021-11-12 09:34:52',
          isDelete: 0,
          mechanismId: 515,
          mechanismName: '德适888',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        },
        {
          createTime: '2022-04-02 09:46:43',
          isDelete: 0,
          mechanismId: 531,
          mechanismName: '核桃仁和投入',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        },
        {
          createTime: '2022-04-07 11:00:21',
          isDelete: 0,
          mechanismId: 534,
          mechanismName: '哈哈哈哈',
          patientCount: 0,
          userName: '17600129340',
          accountType: 2,
          isExpert: false
        }
      ]
    },
    dispatchedTransInOrgList: false,
    theme: {
      manual: false,
      model: 'light'
    }
  },
  getters: {
    mechanismMap(state) {
      const result = Object.create(null)
      state.organization.mechanismList.forEach(item => {
        result[item.mechanismId] = item
      })

      return result
    },
    currentMechanism(state) {
      if (state.organization.currentMechanism) {
        return state.organization.currentMechanism
      }

      return state.organization.mechanismList[0]
    }
  },
  mutations: {
    updateOrganization(state, payload) {
      state.organization = payload
    },
    updateCurrentMechanism(state, payload) {
      state.organization.currentMechanism = payload
      this.commit('userModule/updatePower', {})
    },
    updateDispatchedTransInOrgList(state, payload) {
      state.dispatchedTransInOrgList = payload
    },
    updateTheme(state, payload) {
      const data = Object.assign({}, defaultTheme, payload)

      if (safePreferredColorScheme.some(item => item === data.model)) {
        state.theme = data
        document.documentElement.dataset.theme = data.model
      }
    }
  },
  actions: {
    async login(context, param) {
      const response = await request(param)
      this.commit('userModule/updateUser', response)
    },
    async getTransInOrgList({ commit }) {
      const response = await request({
        allTransInMechList: [
          {
            createTime: null,
            isDelete: 1,
            mechanismId: 455,
            mechanismName: '机构13588865329-1',
            patientCount: 0,
            userName: ''
          },
          {
            createTime: null,
            isDelete: 1,
            mechanismId: 464,
            mechanismName: '机构测试0624',
            patientCount: 0,
            userName: ''
          },
          {
            createTime: null,
            isDelete: 1,
            mechanismId: 480,
            mechanismName: '你好机构',
            patientCount: 0,
            userName: ''
          },
          {
            createTime: null,
            isDelete: 1,
            mechanismId: 484,
            mechanismName: '0075机构',
            patientCount: 0,
            userName: ''
          },
          {
            createTime: null,
            isDelete: 0,
            mechanismId: 524,
            mechanismName: 'hail hydra',
            patientCount: 13,
            userName: ''
          }
        ],
        mechanismVOS: [
          {
            createTime: null,
            isDelete: 0,
            mechanismId: 524,
            mechanismName: 'hail hydra',
            patientCount: 13,
            userName: ''
          }
        ]
      })

      commit('updateDispatchedTransInOrgList', true)
      this.commit('userModule/updateTransInOrgList', response.data)
    }
  }
}

export default module
