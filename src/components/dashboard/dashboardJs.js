export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'this is dashboard',
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        { icon: 'people', title: 'Users', path: '/users' },
        { icon: 'developer_board', title: 'Log', path: '/log' }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Landau',
      fabSettings: {
        direction: 'bottom',
        fab: false,
        fling: false,
        hover: false,
        tabs: null,
        top: false,
        right: true,
        bottom: false,
        left: false,
        transition: 'slide-y-reverse-transition'
      }
    }
  },
  methods: {
    logOut: function () {
      this.$store.commit('deleteUserData')
      this.$router.push({path: '/login'})
    }
  }
}
