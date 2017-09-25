export const addUserData = (state, payload) => {
  state.userData = payload
}

export const deleteUserData = (state, payload) => {
  state.userData = null
}

export const addRUserData = (state, payload) => {
  state.userData = payload
}

export const showSpinner = (state, payload) => {
  state.loading += payload ? 1 : -1
}

export const showSnackbar = (state, payload) => {
  state.snackbarOptions.context = payload.context ? payload.context : 'info'
  state.snackbarOptions.mode = payload.mode ? payload.mode : 'vertical'
  state.snackbarOptions.text = payload.text ? payload.text : 'Hello'
  state.snackbarOptions.timeout = payload.timeout ? payload.timeout : 4000
  state.snackbarOptions.xlay = payload.xlay ? payload.xlay : 'right'
  state.snackbarOptions.ylay = payload.ylay ? payload.ylay : 'top'
  state.snackbarOptions.snackbar = payload.snackbar ? payload.snackbar : false
}

export const setUpdateProperty = (state, payload) => {
  state.updateProperty = payload
}
