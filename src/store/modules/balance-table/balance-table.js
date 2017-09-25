import * as types from '../../mutation-types'
import * as actions from './actions'

// initial state
const state = {
  balanceTable: {}
}

// getters
const getters = {
  balanceTable: state => state.balanceTable
}

// mutations
const mutations = {
  [types.UPDATE_BALANCE_TABLE] (state, balanceTable) {
    state.balanceTable = balanceTable
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
