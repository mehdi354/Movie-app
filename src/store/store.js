
import Vue from 'vue'
import Vuex from 'vuex'
import movies from './module/movies.js';
import topRated from './module/topRated.js';
import nowplaying from './module/nowplaying.js';
import upcoming from './module/upcoming.js';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        movies,topRated,nowplaying,upcoming
    }
})