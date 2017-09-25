import _ from 'lodash'
export default {
  name: 'project',
  data () {
    return {
      msg: 'Проект'
    }
  },
  computed: {
    userData () {
      return this.$store.state.userData
    },

    project () {
      return _.cloneDeep(this.$store.getters.currentProject)
    }
  },
  methods: {

  },
  watch: {
    project: {
      handler: function (newValue) {
        if (_.isEqual(this.project, this.$store.getters.currentProject)) {
          console.log(true)
        } else { console.log(false) }
      },
      deep: true
    }
  },
  created () {
    this.$store.dispatch('getProjectById', {http: this.$http, projectId: this.$route.params.id})
  }
}
