import Vue from 'vue';
import Gravatar from 'vue-gravatar';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(require('vue-moment'));

Vue.component('v-gravatar', Gravatar);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
