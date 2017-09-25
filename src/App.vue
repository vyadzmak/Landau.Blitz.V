<template>
  <v-app>
    <div class="spinner-position">
    <spinner v-show="loading!==0" :size="spinnerSize"></spinner>
    </div>
    <v-snackbar
      :timeout="snackbarOptions.timeout"
      :top="snackbarOptions.ylay === 'top'"
      :bottom="snackbarOptions.ylay === 'bottom'"
      :right="snackbarOptions.xlay === 'right'"
      :left="snackbarOptions.xlay === 'left'"
      :success="snackbarOptions.context === 'success'"
      :info="snackbarOptions.context === 'info'"
      :warning="snackbarOptions.context === 'warning'"
      :error="snackbarOptions.context === 'error'"
      :primary="snackbarOptions.context === 'primary'"
      :secondary="snackbarOptions.context === 'secondary'"
      :multi-line="snackbarOptions.mode === 'multi-line'"
      :vertical="snackbarOptions.mode === 'vertical'"
      :text = "snackbarOptions.text"
      v-model="snackbarOptions.snackbar"
    >
      {{ snackbarOptions.text }}
      <v-btn dark flat @click.native="closeSnackbar">Закрыть</v-btn>
    </v-snackbar>
    <modal-dialog></modal-dialog>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Circle from '../node_modules/vue-loading-spinner/src/Components/Circle'
export default {
  data () {
    return {
      spinnerSize: '150px'
    }
  },
  components: {spinner: Circle},
  computed: {
    loading () {
      return this.$store.state.loading
    },
    snackbarOptions () {
      return this.$store.state.snackbarOptions
    }
  },
  methods: {
    closeSnackbar () {
      this.$store.commit('showSnackbar', {snackbar: false})
    }
  }
}
</script>

<styles <style lang="scss">
@import "~vue-modal-dialog/src/modal";

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
