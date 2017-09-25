import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'questionDialog',
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    submit: function () {
      ModalService.submit() // resolve .open() promise
    },
    cancel: function () {
      ModalService.cancel() // reject .open() promise
    }
  }
}

