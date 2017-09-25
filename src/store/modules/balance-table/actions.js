// import * as types from '../../mutation-types'

export const setDataToBalance = ({ commit, getters, state }, currentProject) => {
  try {
    state.balanceTable.forEach(function (element) {
      let activeName = element.ActiveName
      let activeValue = element.ActiveDate1
      let passiveName = element.PassiveName
      let passiveValue = element.PassiveDate1

      if (activeValue === '') activeValue = 0
      if (passiveValue === '') passiveValue = 0

      if (activeName !== '') {
        let lngt = Object.keys(currentProject.FinDataBalance).length
        let vIndex = -1
        for (let i = 0; i < lngt; i++) {
          if (Object.keys(currentProject.FinDataBalance)[i] === activeName) {
            vIndex = i
            break
          }
        }

        if (vIndex !== -1) {
          // let tb = Object.keys(currentProject.FinDataBalance)[vIndex]
          // let tv = Object.values(currentProject.FinDataBalance)[vIndex]
          currentProject.FinDataBalance[activeName] = +(activeValue)
        }
      }

      if (passiveName !== '') {
        let lngt = Object.keys(currentProject.FinDataBalance).length
        let vIndex = -1
        for (let i = 0; i < lngt; i++) {
          if (Object.keys(currentProject.FinDataBalance)[i] === passiveName) {
            vIndex = i
            break
          }
        }

        if (vIndex !== -1) {
          // let tb = Object.keys(currentProject.FinDataBalance)[vIndex]
          // let tv = Object.values(currentProject.FinDataBalance)[vIndex]
          currentProject.FinDataBalance[passiveName] = +(passiveValue)
        }
      }
    }, this)

    if (currentProject.ParentExists) {
      this.balanceTable.forEach(function (element) {
          // alert(JSON.stringify(element))
        let activeName = element.ActiveName
        let activeValue = element.ActiveDate2
        let passiveName = element.PassiveName
        let passiveValue = element.PassiveDate2

        if (activeValue === '') activeValue = 0
        if (passiveValue === '') passiveValue = 0

        if (activeName !== '') {
          let lngt = Object.keys(currentProject.FinDataBalance).length
          let vIndex = -1
          for (let i = 0; i < lngt; i++) {
            if (Object.keys(currentProject.FinDataBalance)[i] === activeName) {
              vIndex = i
              break
            }
          }

          if (vIndex !== -1) {
            // let tb = Object.keys(currentProject.FinDataBalance)[vIndex]
            // let tv = Object.values(currentProject.FinDataBalance)[vIndex]
            currentProject.FinDataBalance[activeName] = +(activeValue)
          }
        }

        if (passiveName !== '') {
          let lngt = Object.keys(currentProject.FinDataBalance).length
          let vIndex = -1
          for (let i = 0; i < lngt; i++) {
            if (Object.keys(currentProject.FinDataBalance)[i] === passiveName) {
              vIndex = i
              break
            }
          }

          if (vIndex !== -1) {
            // let tb = Object.keys(currentProject.FinDataBalance)[vIndex]
            // let tv = Object.values(currentProject.FinDataBalance)[vIndex]
            currentProject.FinDataBalance[passiveName] = +(passiveValue)
          }
        }
      }, this)
    }
    // balanceCalculatorFactory.calculateData(currentProject); !!!! STOPPED HERE
  } catch (error) {
    console.log(error)
  }
}
