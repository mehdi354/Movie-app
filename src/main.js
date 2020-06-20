import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment'
import {routes} from './routes';
import store from './store/store.js';
// import {filter} from './filter.js';


Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);
// Vue.use(filter)
/*------ Axios -------*/
axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie/'
/*------ Router -------*/ 
const router = new VueRouter({
  mode: 'history',
  routes,
  
});

/*-----Filters ---- */ 
Vue.filter('movie-ratings', (value) => {
  return (value*10) + '%'
})

Vue.filter('date-format', (val) => {
  return moment(val).format('Do MMMM, YYYY')
} )


import "@/assets/style.css";

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
