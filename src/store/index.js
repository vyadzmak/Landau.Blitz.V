import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const sessionStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage
}).plugin

const localStorageMutations = ['addRUserData', 'deleteUserData']

const localStorage = new VuexPersist({
  key: 'vuexLocal',
  storage: window.localStorage,
  reducer: state => ({
    userData: state.userData
  }),
  filter: mutation => (localStorageMutations.indexOf(mutation.type) !== -1)
}).plugin

const store = new Vuex.Store({
  state: {
    userData: null,
    loading: 0
  },
  mutations: {
    addUserData (state, payload) {
      state.userData = payload
    },
    deleteUserData (state) {
      state.userData = null
    },
    addRUserData (state, payload) {
      state.userData = payload
    },
    showSpinner (state, payload) {
      state.loading += payload ? 1 : -1
    }
  },
  plugins: [localStorage, sessionStorage]
})

export default store
