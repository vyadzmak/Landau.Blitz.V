import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import * as mutations from './mutations'
import projects from './modules/projects/projects'
import balanceTable from './modules/balance-table/balance-table'

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
  strict: process.env.NODE_ENV !== 'production', // check if something updates our model not through mutation
  state: {
    userData: null,
    loading: 0,
    snackbarOptions: {snackbar: false},
    updateProperty: null
  },
  // getters
  getters: {
    userData: state => state.userData,
    snackbarOptions: state => state.snackbarOptions,
    updateProperty: state => state.updateProperty,
    loading: state => state.loading
  },
  mutations,
  plugins: [localStorage, sessionStorage],
  modules: {projects, balanceTable}
})

export default store
