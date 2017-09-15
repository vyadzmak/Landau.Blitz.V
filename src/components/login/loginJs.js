export default {
  name: 'login',
  data () {
    return {
      msg: 'Login page',
      fixed: true,
      loginData: {Email: '', Name: ''},
      valid: false,
      rememberMe: false,
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
  },
  methods: {
    loginUser: function () {
      if (this.valid) {
        if (this.rememberMe) {
          this.$store.commit('addRUserData', this.loginData)
        } else {
          this.$store.commit('addUserData', this.loginData)
        }
        this.$router.push({ path: '/' })
      }
    }
  }
}
