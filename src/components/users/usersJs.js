import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'users',
  data () {
    return {
      msg: 'Пользователи',
      search: '',
      users: [],
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'Id' },
        { text: 'Фамилия', align: 'left', value: 'LastName' },
        { text: 'Имя', align: 'left', value: 'FirstName' },
        { text: 'Email', align: 'left', value: 'Email' },
        { text: 'Телефон', align: 'left', value: 'PhoneNumber' },
        { text: 'Дата регистрации', align: 'left', value: 'Login.RegistrationDate' },
        { text: 'Последняя авторизация', align: 'left', value: 'Login.LastLoginDate' }
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
          message: 'Вы действительно хотите удалить пользователя?',
          title: 'Удаление пользователя',
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
      let isUpdate = false
      if (item.Id) {
        isUpdate = true
        item.Login.UserPassword = item.Login.DecryptedPassword
      }
      this.getUserItem(isUpdate).then(() => {
        let modalConfig = {
          size: 'lg',
          data: {
            title: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя',
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
      }).catch(err => {
        console.log(err)
        this.$store.commit('showSnackbar', {text: 'Не удалось загрузить нового пользователя', snackbar: true, context: 'error'})
      })
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('users', {params: {id: itemId}})
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.users.splice(this.users.findIndex((element, index, array) => {
            if (element.Id === itemId) {
              return true
            }
          }), 1)
          this.$store.commit('showSnackbar', {text: 'Удаление пользователя прошло успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: 'Удаление пользователя не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Удаление пользователя не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    },
    updateItem: function (item, isUpdate) {
      this.$store.commit('showSpinner', true)
      this.$http({method: isUpdate ? 'put' : 'post',
        url: 'users',
        data: item,
        config: { contentType: 'application/json' }
      })
      .then(response => {
        let responseData = response.data ? (response.data !== 'Error' ? JSON.parse(response.data) : null) : null
        if (responseData) {
          if (isUpdate) {
            this.users.splice(this.users.findIndex((element, index, array) => {
              if (element.Id === item.Id) {
                return true
              }
            }), 1)
          }
          this.users.push(responseData)
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя прошло успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя не удалось', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    },
    getUserItem (isUpdate) {
      return new Promise((resolve, reject) => {
        if (!isUpdate) {
          this.$http.get('users', {params: {id: -1, userId: this.userData.UserId}})
          .then(response => {
            if (response.data && response.data !== 'Error') {
              this.$store.commit('setUpdateProperty', JSON.parse(response.data))
            }
            resolve()
          })
          .catch(e => {
            this.errors.push(e)
            reject()
          })
        } else {
          resolve()
        }
      })
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    let config = {params: {userId: this.userData.UserId, id: this.$route.params.id}}
    console.log(config)
    this.$http.get(`clientUsers`, config)
    .then(response => {
      this.$store.commit('showSpinner', false)
      this.users = JSON.parse(response.data)
    })
    .catch(e => {
      this.errors.push(e)
      this.$store.commit('showSpinner', false)
    })
  }
}
