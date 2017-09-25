import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      menu: false,
      updateItem: this._.cloneDeep(this.$store.getters.currentProject),
      sNameRules: [
        (v) => !!v || 'Наименование проекта должно быть заполнено',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ]
    }
  },
  computed: {
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.$store.commit('UPDATE_CURRENT_PROJECT', this.updateItem)
        ModalService.submit(this.updateItem) // resolve .open() promise
      }
    },
    cancel: function () {
      ModalService.cancel(this.updateItem) // reject .open() promise
    },
    clear: function () {
      this.$refs.form.reset()
    },
    clientSelected (value) {
      this.updateItem.ProjectSetting.SelectedClient = value
      this.$store.commit('UPDATE_CURRENT_PROJECT', this.updateItem)
      this.$store.dispatch('selectClientParent', this.$http).then(() => {
        this.updateItem = this._.cloneDeep(this.$store.getters.currentProject)
      })
    }
  }
}
