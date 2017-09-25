import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || 'Наименование должно быть заполнено',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ],
      addressRules: [
        (v) => !!v || 'Адрес должен быть заполнен',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ],
      regRules: [
        (v) => !!v || 'Регистрационный номер должен быть заполнен'
      ]
    }
  },
  computed: {
    clientTypeItems () {
      return this.data.item.ClientTypes ? this.data.item.ClientTypes : this.$store.state.updateProperty
    }
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        ModalService.submit(this.data.item) // resolve .open() promise
      }
    },
    cancel: function () {
      ModalService.cancel(this.data.item) // reject .open() promise
    },
    clear: function () {
      this.$refs.form.reset()
    }
  }
}
