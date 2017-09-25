export default {
  name: 'login',
  data () {
    return {
      msg: 'Авторизация',
      fixed: true,
      loginData: {Login: '', Password: ''},
      valid: false,
      rememberMe: false,
      passwordRules: [
        (v) => !!v || 'Введите пароль',
        (v) => v.length > 3 || 'Пароль должен быть больше 3-х символов',
        (v) => v.length <= 10 || 'Пароль должен быть не более 10-и символов'
      ],
      emailRules: [
        (v) => !!v || 'Введите логин',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введите валидный е-mail'
      ],
      errors: []
    }
  },
  computed: {
  },
  methods: {
    loginUser: function () {
      if (this.valid) {
        this.$store.commit('showSpinner', true)
        this.$http.post('login', {UserId: -1, Id: -1, UserLogin: this.loginData.Login, UserPassword: this.loginData.Password})
        .then(response => {
          this.$store.commit('showSpinner', false)
          let responseData = JSON.parse(response.data)
          if (responseData.Error != null) {
            this.$store.commit('showSnackbar', {text: 'Пользователь не найден. Введите верный логин и пароль', snackbar: true, context: 'error'})
          } else if (responseData.UserLoginStateId === 3) {
            this.$store.commit('showSnackbar', {text: 'Пользователь заблокирован. Обратитесь к администратору', snackbar: true, context: 'warning'})
          } else {
            if (this.rememberMe) {
              this.$store.commit('addRUserData', responseData)
            } else {
              this.$store.commit('addUserData', responseData)
            }
            this.$router.push({ path: '/' })
          }
        })
        .catch(e => {
          this.errors.push(e)
          this.$store.commit('showSpinner', false)
        })
      }
    }
  }
}
