let types = {
  // root mutations
  addUserData: 'addUserData', // adding to session storage
  addRUserData: 'addRUserData', // adding to local and session storage
  deleteUserData: 'deleteUserData', // deleting from local and session storage
  showSpinner: 'showSpinner',
  showSnackbar: 'showSnackbar',
  setUpdateProperty: 'setUpdateProperty',

  // project and currentProject mutations
  UPDATE_PROJECTS: 'UPDATE_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  UPDATE_CURRENT_PROJECT: 'UPDATE_CURRENT_PROJECT',
  UPDATE_CURRENT_PROJECT_FIELD: 'UPDATE_CURRENT_PROJECT_FIELD',
  INIT_PROJECT: 'INIT_PROJECT',
  INIT_PROJECT_DATA: 'INIT_PROJECT_DATA',
  PROJECT_SET_DATA: 'PROJECT_SET_DATA',
  PROJECT_INIT_CLIENT_DATA: 'PROJECT_INIT_CLIENT_DATA'
}

export default types

