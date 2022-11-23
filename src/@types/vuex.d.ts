declare interface VuexModule {
  commit: import('vuex').Commit
  dispatch: import('vuex').Dispatch
  state: Record<string, unknown>
  getters: Record<string, unknown>
}
