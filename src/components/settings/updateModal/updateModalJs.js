import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dialogHeader',
  props: ['data'],
  data () {
    return {
      valid: false,
      sNameRules: [
        (v) => !!v || 'Имя параметра должно быть заполнено',
        (v) => v && v.length <= 270 || 'Не более 270 символов'
      ],
      sValueRules: [
        (v) => !!v || 'Значение параметра должна быть заполнено'
      ]
    }
  },
  computed: {
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
