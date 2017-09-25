import mutations from './mutations'
import * as actions from './actions'

// initial state
const state = {
  projects: [],
  currentProject: {}
}

// getters
const getters = {
  projects: state => state.projects,
  currentProject: state => Object.assign({}, state.currentProject)
}
export default {
  state,
  getters,
  actions,
  mutations
}
