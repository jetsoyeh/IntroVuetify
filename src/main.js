import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps";
import Axios from 'axios';
import store from './store';
import VeeValidate from 'vee-validate';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from './i18n'


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBEOi5XqwZULhqKj2Camo1i0drcz6Tyz3k",
    libraries: "places" //necessary for places input
  }
});

//JWT
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(VeeValidate);

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
