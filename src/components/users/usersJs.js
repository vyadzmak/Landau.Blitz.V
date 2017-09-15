export default {
  name: 'users',
  data () {
    return {
      msg: 'Users Page',
      search: '',
      users: [],
      errors: [],
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Full Name', value: 'name' },
        { text: 'Login', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Website', value: 'website' },
        { text: 'Company name', value: 'company.name' }
      ]
    }
  },
  computed: {
    userData () {
      return this.$store.state.userData
    }
  },
  methods: {
    goToUserInfo: function (userId) {
      this.$router.push({name: 'UserInfo', params: {id: userId}})
    }
  },
  created () {
    this.$store.commit('showSpinner', true)
    this.$http.get(`users`)
    .then(response => {
      this.users = response.data
      this.$store.commit('showSpinner', false)
    })
    .catch(e => {
      this.errors.push(e)
      this.$store.commit('showSpinner', false)
    })
  }
}
