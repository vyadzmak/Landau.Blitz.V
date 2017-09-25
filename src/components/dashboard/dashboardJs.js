export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'this is dashboard',
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Blitz',
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
  computed: {
    userData: function () {
      return this.$store.state.userData
    },
    items: function () {
      return [
      { icon: 'perm_contact_calendar', title: 'Компании', path: '/companies', visible: this.userData.UserRoleId !== 4 },
      { icon: 'developer_board', title: 'Проекты', path: '/projects', visible: this.userData.UserRoleId !== 4 },
      { icon: 'settings', title: 'Настройки', path: '/settings', visible: this.userData.UserRoleId === 1 },
      { icon: 'history', title: 'Лог', path: '/log', visible: this.userData.UserRoleId === 1 }
      ]
    }
  },
  methods: {
    logOut: function () {
      this.$store.commit('deleteUserData')
      this.$router.push({path: '/login'})
    }
  }
}
