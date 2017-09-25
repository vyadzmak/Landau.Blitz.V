import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'companies',
  data () {
    return {
      companies: [],
      errors: [],
      search: '',
      headers: [
        { text: 'ID', align: 'left', value: 'Id' },
        { text: 'Наименование', align: 'left', value: 'Name' },
        { text: 'Адрес', align: 'left', value: 'Address' },
        { text: 'Регистрационный номер', align: 'left', value: 'RegistrationNumber' },
        { text: 'Дата регистрации', align: 'left', value: 'RegistrationDate' },
        { text: 'Тип компании', align: 'left', value: 'ClientTypeName' }
      ]
    }
  },
  computed: {
    userData: function () {
      return this.$store.state.userData
    }
  },
  methods: {
    goToUsers: function (userId) {
      this.$router.push({name: 'Users', params: {id: userId}})
    },
    showDeleteModal: function (itemId) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить компанию?',
          title: 'Удаление компании',
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
        item = {Id: -1,
          Name: '',
          RegistrationNumber: '',
          Address: '',
          CurrentClientType: {Id: null, Name: '', Description: ''},
          ClientCreatorId: this.userData.UserId
        }
        this.getClientTypes()
      }
      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' компании',
          isClosable: true,
          item: isUpdate ? Object.assign({}, item) : item
        }
      }
      ModalService.open(updateModal, modalConfig).then(
        modalSubmit => {
          this.updateItem(modalSubmit, isUpdate)
        },
        modalCancel => { console.log(modalCancel) }
    ).catch(
      err => {
        console.log(err)
      }
    )
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('clients', {params: {id: itemId}})
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.companies.splice(this.companies.findIndex((element, index, array) => {
            if (element.Id === itemId) {
              return true
            }
          }), 1)
          this.$store.commit('showSnackbar', {text: 'Удаление клиента прошло успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: 'Удаление клиентов компании не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Удаление клиентов компании не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    },
    updateItem: function (item, isUpdate) {
      this.$store.commit('showSpinner', true)
      this.$http({method: isUpdate ? 'put' : 'post',
        url: 'clients',
        data: item,
        config: { contentType: 'application/json' }
      })
      .then(response => {
        let responseData = response.data ? (response.data !== 'Error' ? JSON.parse(response.data) : null) : null
        if (responseData) {
          responseData.ClientTypeName = responseData.CurrentClientType.Description
          if (isUpdate) {
            this.companies.splice(this.companies.findIndex((element, index, array) => {
              if (element.Id === item.Id) {
                return true
              }
            }), 1)
          }
          this.companies.push(responseData)
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' компании прошло успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' компании не удалось', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' компании не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    },
    getClientTypes () {
      this.$store.commit('showSpinner', true)
      this.$http.get('ClientType', {params: {userId: this.userData.UserId}})
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.$store.commit('showSpinner', false)
          this.$store.commit('setUpdateProperty', JSON.parse(response.data))
        } else {
          this.$store.commit('showSnackbar', {text: 'Не удалось загрузить типы клиента', snackbar: true, context: 'error'})
        }
        return []
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Не удалось загрузить типы клиента', snackbar: true, context: 'error'})
        return []
      })
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$http.get(`userclients`, {params: {userId: this.userData.UserId}})
    .then(response => {
      this.$store.commit('showSpinner', false)
      if (response.data) {
        this.companies = JSON.parse(response.data)
      } else {
        this.$store.commit('showSnackbar', {text: 'Загрузка клиентов компании не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
      }
    })
    .catch(e => {
      this.errors.push(e)
      this.$store.commit('showSpinner', false)
      this.$store.commit('showSnackbar', {text: 'Загрузка клиентов компании не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
    })
  }
}
