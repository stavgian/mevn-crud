// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import Vue from 'vue'
import Vuetify from 'vuetify'
import CKEditor from '@ckeditor/ckeditor5-vue'
import VueSwal from 'vue-swal'
import App from './App'
import { store } from './store/store'
import router from './router'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuetify)
Vue.use(VueSwal)
Vue.use(CKEditor)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
