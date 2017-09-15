export default {
  name: 'userInfo',
  data () {
    return {
      msg: 'userInfo Page',
      userInfo: {},
      errors: []
    }
  },
  computed: {
  },
  methods: {
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$http.get(`users/` + this.$route.params.id)
    .then(response => {
      this.userInfo = response.data
      this.$store.commit('showSpinner', false)
    })
    .catch(e => {
      this.errors.push(e)
      this.$store.commit('showSpinner', false)
    })
  }
}
