import types from '../../mutation-types'
import _ from 'lodash'
import * as dataInitilizer from './initializers/dataInitilizer'
import * as service from './project-service'

const mutations = {
  [types.UPDATE_PROJECTS] (state, projects) {
    state.projects = projects
  },

  [types.ADD_PROJECT] (state, project) {
    state.projects.push(project)
  },

  [types.UPDATE_PROJECT] (state, {project, index}) {
    state.projects[index] = project
  },

  [types.DELETE_PROJECT] (state, index) {
    state.projects.splice(index, 1)
  },

  [types.UPDATE_CURRENT_PROJECT] (state, currentProject) {
    state.currentProject = currentProject
  },

  [types.UPDATE_CURRENT_PROJECT_FIELD] (state, {field, value}) {
    Object.assign(state.currentProject, {
      [field]: value
    })
  },

  [types.INIT_PROJECT] (state, projectStateId) {
    let project = {}
    project.Id = -1
    if (projectStateId) {
      project.ProjectStateId = projectStateId
    }
    project.ParentProject = {}
    project.ParentExists = false
    project.Name = ''
    project.ClientData = {}
    project.CreditData = {}
    project.FinancePlanning = {}
    project.ProjectAnalysis = {}
    project.BusinessInfo = {}
    project.FinDataBalance = {}
    project.FinDataCrossChecking = {}
    project.FinDataOpiu = {}
    project.FinDataOdds = {}
    project.LargeExpenses = {}
    project.Provision = {}
    project.DataDamu = {}
    project.Conclusion = {}
    project.FinDataBalance.Table = {}
    state.currentProject = project
  },

  [types.INIT_PROJECT_DATA] ({currentProject}) {
    if (currentProject.ParentExists) {
      currentProject.ClientData = _.cloneDeep(currentProject.ParentProject.ClientData)
    // currentProject.CreditData = {};
    // currentProject.FinancePlanning = {};
      currentProject.ProjectAnalysis = {}
      currentProject.BusinessInfo = _.cloneDeep(currentProject.ParentProject.BusinessInfo)
      currentProject.FinDataBalance = {}
    // currentProject.FinDataCrossChecking = {};
    // currentProject.FinDataOpiu = {};
    // currentProject.FinDataOdds = {};
      currentProject.LargeExpenses = _.cloneDeep(currentProject.ParentProject.LargeExpenses)
      currentProject.Provision = _.cloneDeep(currentProject.ParentProject.Provision)
    // currentProject.DataDamu = _.cloneDeep(currentProject.ParentProject.DataDamu)
    // currentProject.Conclusion = _.cloneDeep(currentProject.ParentProject.ClientData)
    }
    currentProject = dataInitilizer.setBalanceData(currentProject)

    currentProject.ClientData.OrganizationName = currentProject.ProjectSetting.SelectedClient.Name

    currentProject.ProjectAnalysis.CreditBid = currentProject.PercentBid
    currentProject.ProjectAnalysis.DollarRate = currentProject.DollarRate
    currentProject.ProjectAnalysis.AlternativeBid = currentProject.AlternateBid

    currentProject.ProjectAnalysis.ActivityService = currentProject.ActivityService
    currentProject.ProjectAnalysis.ActivityTrade = currentProject.ActivityTrade
    currentProject.ProjectAnalysis.ActivityAgriculture = currentProject.ActivityAgriculture
    currentProject.ProjectAnalysis.ActivityProduction = currentProject.ActivityProduction
    currentProject.ProjectAnalysis.BalanceDate = currentProject.BalanceDate
    currentProject.Content = undefined
    currentProject.Content = JSON.stringify(currentProject)
  },

  [types.PROJECT_SET_DATA] ({currentProject}, payload) {
    currentProject = payload
    currentProject.ClientData = currentProject.ProjectContent.ClientData
    currentProject.ClientData.RegistrationDate = new Date(currentProject.ProjectContent.ClientData.RegistrationDate)
    currentProject.ClientData.ReRegistrationDate = new Date(currentProject.ProjectContent.ClientData.ReRegistrationDate)
    currentProject.ParentProject = currentProject.ProjectContent.ParentProject
    currentProject.ParentExists = currentProject.ProjectContent.ParentExists
            // alert(currentProject.ParentExists);
    currentProject.CreditData = currentProject.ProjectContent.CreditData
    currentProject.FinancePlanning = currentProject.ProjectContent.FinancePlanning
    currentProject.ProjectAnalysis = currentProject.ProjectContent.ProjectAnalysis
    currentProject.BusinessInfo = currentProject.ProjectContent.BusinessInfo
    currentProject.FinDataBalance = currentProject.ProjectContent.FinDataBalance
            // currentProject.FinDataBalance.Date = new Date(currentProject.FinDataBalance.Date);

            // if (currentProject.ParentExists) {
            //     currentProject.FinDataBalance.PreviousDate = new Date(currentProject.ParentProject.FinDataBalance.Date);
            // }

    currentProject.FinDataCrossChecking = currentProject.ProjectContent.FinDataCrossChecking
    currentProject.FinDataOpiu = currentProject.ProjectContent.FinDataOpiu
            // alert(JSON.stringify(currentProject.FinDataOpiu));
    if (JSON.stringify(currentProject.FinDataOpiu) === '{}') {
      currentProject.FinDataOpiu.Table = service.initOpiu()
    };
    currentProject.FinDataOdds = currentProject.ProjectContent.FinDataOdds

    if (JSON.stringify(currentProject.FinDataOdds) === '{}') {
      currentProject.FinDataOdds.Table = service.initOdds()
    };

    if (JSON.stringify(currentProject.FinDataBalance.Table) === '{}') {
  //    currentProject.FinDataBalance.Table = balanceTableFactory.initBalanceTable(currentProject)
    };

    currentProject.LargeExpenses = currentProject.ProjectContent.LargeExpenses
    currentProject.Provision = currentProject.ProjectContent.Provision
    currentProject.DataDamu = currentProject.ProjectContent.DataDamu
    currentProject.Conclusion = currentProject.ProjectContent.Conclusion
    currentProject.BalanceDate = currentProject.ProjectContent.BalanceDate
            // currentProject.FinDataBalance.Date = currentProject.ProjectContent.BalanceDate;

    currentProject.ProjectContent = {}
  },

  [types.PROJECT_INIT_CLIENT_DATA] (state) {
    state.currentProject.ClientData = {}
  }
}

export default mutations
