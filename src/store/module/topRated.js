import axios from 'axios';
const state = {
    topRatedMovieList :[],
    topRatedfilteredMovies:[]
};
const mutations = {
    'TOP_RATED_MOVIES'(state,data) {
        const responseDatas = data;
        state.topRatedMovieList = [];
        //console.log(responseDatas);
        for( let i= 0 ;i < responseDatas.results.length;i++ ) {
            state.topRatedMovieList.push(responseDatas.results[i]);
        }   
        console.log(state.topRatedMovieList);
    },
    'TOP_RATED_FILTER_POPULER'(state,type) {
        setTimeout( ()=> {
            let min = Math.min.apply(null,type);
            console.log(type);
            console.log(min);
            for(let i = 0; i< state.topRatedMovieList.length ; i++) {
                if(state.topRatedMovieList[i].vote_average > min) {
                    if(state.topRatedfilteredMovies.length == 0 ) {
                        state.topRatedfilteredMovies.push(state.topRatedMovieList[i]);
                    }else if (state.topRatedfilteredMovies.length > 0) {
                        const ifMovieExist = state.topRatedfilteredMovies.find(movie => movie.id == state.topRatedMovieList[i].id)
                        if(!ifMovieExist) {
                            state.topRatedfilteredMovies.push(state.topRatedMovieList[i]);
                        }
                    }
                }
                else {
                    const ifMovieExist = state.topRatedfilteredMovies.find(movie => movie.id == state.topRatedMovieList[i].id)
                    if(ifMovieExist) {
                        state.topRatedfilteredMovies.splice(state.topRatedMovieList[i], 1);
                    }
                }
            }
        console.log(state.topRatedfilteredMovies);
        } ,2000);
        
    }
};
const actions = {
    async topRatedMovies({commit}) {
        let {data} = await axios.get(`top_rated?api_key=YOUR_KEY`);
        commit('TOP_RATED_MOVIES',data)
    },
    topRatedfilterPopuler({commit}, type) {
        commit('TOP_RATED_FILTER_POPULER',type)
    }
};
const getters = {
    topRatedMovieList: state => {
        return state.topRatedMovieList
    },
    topRatedfilteredMovies: state => {
        return state.topRatedfilteredMovies;
    }
};

export default {
    state,mutations,actions,getters
}