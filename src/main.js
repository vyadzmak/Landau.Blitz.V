// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import store from './store/index'
import http from './httpClient/index'

// create vue plugins to use them in our components without import
Vue.use(Vuetify)
Vue.use(Object.defineProperty(Vue.prototype, '$http', { value: http }))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // define our plugins as shorthand objects
  router,
  store,
  http,
  template: '<App/>',
  components: { App }
})
