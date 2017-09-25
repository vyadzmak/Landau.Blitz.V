import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'projects',
  data () {
    return {
      msg: 'Проекты',
      search: '',
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'Id' },
        { text: 'Наименование', align: 'left', value: 'Name' },
        { text: 'Клиент', align: 'left', value: 'Content.ClientData.OrganizationName' },
        { text: 'Пользователь', align: 'left', value: 'CreatorName' },
        { text: 'Дата создания', align: 'left', value: 'CreationDate' }
      ]
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    },
    projects: function () {
      return this.$store.getters.projects
    }
  },
  methods: {
    showDeleteModal: function (itemId) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить проект?',
          title: 'Удаление проекта',
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
      }
      this.$store.dispatch('updateProjectModal', {http: this.$http, updateItem: item}).then(() => {
        let modalConfig = {
          size: 'lg',
          data: {
            title: (isUpdate ? 'Обновление' : 'Добавление') + ' проекта',
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
        this.$store.commit('showSnackbar', {text: err.noClients ? err.error : err.error.message, snackbar: true, context: 'error'})
      })
    },
    deleteItem: function (itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('userprojects', {params: {id: itemId}})
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.projects.splice(this.projects.findIndex((element, index, array) => {
            if (element.Id === itemId) {
              return true
            }
          }), 1)
          this.$store.commit('showSnackbar', {text: 'Удаление проекта прошло успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: 'Удаление проекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Удаление проекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    },
    updateItem: function (item, isUpdate) {
      this.$store.dispatch('updateProject', {http: this.$http, isUpdate: isUpdate, project: item})
    },
    getProjectItem (isUpdate) {
      return new Promise((resolve, reject) => {
        if (!isUpdate) {
          this.$http.get('projectconfig', {params: {id: this.userData.UserId}})
          .then(response => {
            let responseData = response.data && response.data !== 'Error' ? JSON.parse(response.data) : null
            if (!responseData.Clients || responseData.Clients.length === 0) {
              this.$store.commit('showSnackbar', {text: 'Отсутствуют компании заемщики. Перед созданием заявки необходимо создать заемщика', snackbar: true, context: 'error'})
            } else {
              this.$store.commit('setUpdateProperty', responseData)
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
    },
    goToProject (itemId) {
      this.$router.push({name: 'Project', params: {id: itemId}})
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$store.dispatch('getAllProjects', this.$http)
    .then(response => {
      this.$store.commit('showSpinner', false)
    })
    .catch(e => {
      this.errors.push(e)
      this.$store.commit('showSpinner', false)
    })
  }
}
