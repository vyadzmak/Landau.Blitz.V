import types from '../../mutation-types'

export const getAllProjects = ({ commit, getters }, http) => {
  return new Promise((resolve, reject) => {
    http.get(`userprojects`, {params: {'userId': getters.userData.UserId}})
    .then(response => {
      let projects = JSON.parse(response.data)
      projects.forEach(function (element) {
        element.Content = JSON.parse(element.Content)
      }, this)
      commit(types.UPDATE_PROJECTS, projects)
      resolve()
    })
    .catch(e => {
      reject()
    })
  })
}

export const updateProjectModal = ({ commit, getters, dispatch }, {http, updateItem}) => {
  let userId = getters.userData.UserId
  return new Promise((resolve, reject) => {
    http.get(`projectconfig`, {params: {'id': userId}})
    .then(response => {
      let projectSetting = JSON.parse(response.data)
      if (!projectSetting.Clients || projectSetting.Clients.length === 0) {
        reject({noClients: true, error: 'Отсутствуют компании заемщики. Перед созданием заявки необходимо создать заемщика'})
      }
      if (updateItem.Id) {
        commit(types.UPDATE_CURRENT_PROJECT, updateItem)
      } else {
        commit(types.INIT_PROJECT, null)
        projectSetting.SelectedClient = projectSetting.Clients[0]
        projectSetting.StartMonth = projectSetting.StartDates.Months[0]
        projectSetting.StartYear = projectSetting.StartDates.Years[0]
        projectSetting.EndMonth = projectSetting.EndDates.Months[0]
        projectSetting.EndYear = projectSetting.EndDates.Years[0]
      }
      let currentProject = getters.currentProject
      if (updateItem.Id) {
        currentProject.ProjectSetting = currentProject.Content.ProjectSetting
        currentProject.ProjectSetting.Clients = projectSetting.Clients

        currentProject.ActivityService = currentProject.Content.ProjectAnalysis.ActivityService ? currentProject.Content.ProjectAnalysis.ActivityService : false
        currentProject.ActivityTrade = currentProject.Content.ProjectAnalysis.ActivityTrade ? currentProject.Content.ProjectAnalysis.ActivityTrade : false
        currentProject.ActivityAgriculture = currentProject.Content.ProjectAnalysis.ActivityAgriculture ? currentProject.Content.ProjectAnalysis.ActivityAgriculture : false
        currentProject.ActivityProduction = currentProject.Content.ProjectAnalysis.ActivityProduction ? currentProject.Content.ProjectAnalysis.ActivityProduction : false
        currentProject.AlternateBid = currentProject.Content.ProjectAnalysis.AlternativeBid ? currentProject.Content.ProjectAnalysis.AlternativeBid : ''
        currentProject.DollarRate = currentProject.Content.ProjectAnalysis.DollarRate ? currentProject.Content.ProjectAnalysis.DollarRate : ''
        currentProject.PercentBid = currentProject.Content.ProjectAnalysis.CreditBid
        currentProject.BalanceDate = projectSetting.BalanceDate
      } else {
        currentProject.ProjectSetting = projectSetting
        currentProject.CreatorId = userId
        currentProject.ActivityService = projectSetting.ActivityService ? projectSetting.ActivityService : false
        currentProject.ActivityTrade = projectSetting.ActivityTrade ? projectSetting.ActivityTrade : false
        currentProject.ActivityAgriculture = projectSetting.ActivityAgriculture ? projectSetting.ActivityAgriculture : false
        currentProject.ActivityProduction = projectSetting.ActivityProduction ? projectSetting.ActivityProduction : false
        currentProject.AlternateBid = projectSetting.AlternateBid ? projectSetting.AlternateBid : ''
        currentProject.DollarRate = projectSetting.DollarRate ? projectSetting.DollarRate : ''
        currentProject.PercentBid = projectSetting.PercentBid ? projectSetting.PercentBid : ''
        currentProject.BalanceDate = projectSetting.BalanceDate
      }

      dispatch('selectClientParent', http).then(() => {
        resolve()
      }).catch(e => { reject({noClients: false, error: e}) })
    })
    .catch(e => { reject({noClients: false, error: e}) })
  })
}

export const updateProject = ({ commit, getters, dispatch }, {http, isUpdate, project}) => {
  commit('showSpinner', true)
  let currentProject = project
  if (project.Id) {
    commit(types.INIT_PROJECT_DATA)
    currentProject = getters.currentProject
  }

  return new Promise((resolve, reject) => {
    http({method: isUpdate ? 'put' : 'post',
      url: 'projects',
      data: currentProject,
      config: { contentType: 'application/json' }
    })
  .then(response => {
    let projects = getters.projects
    let responseData = response.data ? (response.data !== 'Error' ? JSON.parse(response.data) : null) : null
    if (responseData) {
      responseData.Content = JSON.parse(responseData.Content)
      if (isUpdate) {
        let index = projects.findIndex((element, index, array) => {
          if (element.Id === currentProject.Id) {
            return true
          }
        })
        commit(types.UPDATE_PROJECT, {project: responseData, index})
      } else {
        commit(types.ADD_PROJECT, responseData)
      }
      commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' проекта прошло успешно', snackbar: true, context: 'success'})
    } else {
      commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' проекта не удалось', snackbar: true, context: 'error'})
    }
    commit('showSpinner', false)
  })
  .catch(e => {
    commit('showSpinner', false)
    commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' проекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
  })
  })
}

export const selectClientParent = ({ commit, getters }, http) => {
  let currentProject = getters.currentProject
  return new Promise((resolve, reject) => {
    http.get(`parentproject`, {params: {'id': currentProject.ProjectSetting.SelectedClient.Id}})
    .then(responseParent => {
      var ob = JSON.parse(responseParent.data)
      if (ob == null) {
        currentProject.ParentExists = false
        currentProject.ParentProject = undefined
      } else {
        currentProject.ParentExists = true
        currentProject.ParentProject = JSON.parse(ob.ProjectContent)
      }
      commit(types.UPDATE_CURRENT_PROJECT, currentProject)
      resolve()
    })
    .catch(e => {
      reject()
    })
  })
}

export const getProjectById = ({ commit, getters }, {http, projectId}) => {
  commit('showSpinner', true)

  return new Promise((resolve, reject) => {
    http.get(`projects`, {params: {'id': projectId}})
    .then(response => {
      let isSaved = true
      let responseData = response.data ? (response.data !== 'Error' ? JSON.parse(response.data) : null) : null
      if (responseData) {
        responseData.ProjectContent = JSON.parse(responseData.ProjectContent)
        commit(types.PROJECT_SET_DATA, responseData)
      } else {
        commit(types.INIT_PROJECT, 2)
        isSaved = false
      }
      commit('showSpinner', false)
      resolve(isSaved)
    })
    .catch(e => {
      commit('showSpinner', false)
      commit('showSnackbar', {text: 'Загрузка проекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      reject()
    })
  })
}
