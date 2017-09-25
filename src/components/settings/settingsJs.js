import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'settings',
  data () {
    return {
      msg: 'Настройки',
      search: '',
      settings: [],
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'Id' },
        { text: 'Фамилия', align: 'left', value: 'SettingName' },
        { text: 'Имя', align: 'left', value: 'SettingValue' }
      ]
    }
  },
  computed: {
    userData: function () {
      return this.$store.state.userData
    }
  },
  methods: {
    showDeleteModal: function (itemId) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить настройку?',
          title: 'Удаление настройки',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => { this.deleteItem(itemId) },
        modalCancel => {}
    ).catch(
      err => {
        console.log(err)
      }
    )
    },
    showUpdateModal: function (item) {
      let isUpdate = true
      if (!item.Id) {
        isUpdate = false
        item.Id = -1
        item.SettingName = ''
        item.SettingValue = ''
      }
      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки',
          isClosable: true,
          item: isUpdate ? Object.assign({}, item) : item
        }
      }
      ModalService.open(updateModal, modalConfig).then(
        modalSubmit => {
          this.updateItem(modalSubmit, isUpdate)
        },
        modalCancel => { console.log(modalCancel) }
      ).catch(err => { console.log(err) })
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('settings', {params: {id: itemId}})
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.settings.splice(this.settings.findIndex((element, index, array) => {
            if (element.Id === itemId) {
              return true
            }
          }), 1)
          this.$store.commit('showSnackbar', {text: 'Удаление настройки прошло успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: 'Удаление настройки не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Удаление настройки не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    },
    updateItem: function (item, isUpdate) {
      this.$store.commit('showSpinner', true)
      this.$http({method: isUpdate ? 'put' : 'post',
        url: 'settings',
        data: item,
        config: { contentType: 'application/json' }
      })
      .then(response => {
        let responseData = response.data ? (response.data !== 'Error' ? JSON.parse(response.data) : null) : null
        if (responseData) {
          if (isUpdate) {
            this.settings.splice(this.settings.findIndex((element, index, array) => {
              if (element.Id === item.Id) {
                return true
              }
            }), 1)
          }
          this.settings.push(responseData)
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки прошло успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки не удалось', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' настройки не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$http.get(`settings`)
    .then(response => {
      this.$store.commit('showSpinner', false)
      this.settings = JSON.parse(response.data)
    })
    .catch(e => {
      this.errors.push(e)
      this.$store.commit('showSpinner', false)
    })
  }
}
