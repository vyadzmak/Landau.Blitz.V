import questionDialog from '../questionDialog/questionDialog'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'log',
  data () {
    return {
      msg: 'Лог',
      search: '',
      logs: [],
      errors: [],
      headers: [
        { text: 'ID', align: 'left', value: 'Id' },
        { text: 'Дата', align: 'left', value: 'Date' },
        { text: 'Сообщение', align: 'left', value: 'Message' }
      ]
    }
  },
  computed: {
    userData: function () {
      return this.$store.state.userData
    }
  },
  methods: {
    showDeleteModal: function () {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите очистить лог?',
          title: 'Очитска лога',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => { this.deleteItems() },
        modalCancel => {}
    ).catch(
      err => {
        console.log(err)
      }
    )
    },
    deleteItems: function () {
      this.$store.commit('showSpinner', true)
      this.$http.delete('log', {params: {id: -1}})
      .then(response => {
        if (response.data && response.data !== 'Error') {
          this.logs.splice(0, this.logs.length)
          this.$store.commit('showSnackbar', {text: 'Очистка лога прошла успешно', snackbar: true, context: 'success'})
        } else {
          this.$store.commit('showSnackbar', {text: 'Очистка лога не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
        }
        this.$store.commit('showSpinner', false)
      })
      .catch(e => {
        this.errors.push(e)
        this.$store.commit('showSpinner', false)
        this.$store.commit('showSnackbar', {text: 'Очистка лога не удалась. Обратитесь к администратору', snackbar: true, context: 'error'})
      })
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$http.get(`log`)
    .then(response => {
      this.$store.commit('showSpinner', false)
      this.logs = JSON.parse(response.data)
    })
    .catch(e => {
      this.errors.push(e)
      this.$store.commit('showSpinner', false)
    })
  }
}
