<template>
  <v-app>
    <div class="spinner-position">
    <spinner v-show="loading!==0" :size="spinnerSize"></spinner>
    </div>
    <router-view></router-view>
  </v-app>
</template>

<script>
import VueSpinner from '../node_modules/vue-loading-spinner/src/index'

export default {
  data () {
    return {
      spinnerSize: '150px'
    }
  },
  components: {spinner: VueSpinner.Circle},
  computed: {
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>

<styles <style lang="scss" scoped>
@mixin centerer() {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner-position {
  z-index:900;
  @include centerer;
}
</style>
