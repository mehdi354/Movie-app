import axios from 'axios';
const state = {
    upcomingMovieList :[],
    upcomingfilteredMovies:[]
};
const mutations = {
    'UPCOMING_MOVIES'(state,data) {
        const responseDatas = data;
        state.upcomingMovieList = [];
        //console.log(responseDatas);
        for( let i= 0 ;i < responseDatas.results.length;i++ ) {
            state.upcomingMovieList.push(responseDatas.results[i]);
        }   
        console.log(state.upcomingMovieList);
    },
    'UPCOMING_FILTER_MOVIES'(state,type) {
        setTimeout( ()=> {
            let min = Math.min.apply(null,type);
            console.log(type);
            console.log(min);
            for(let i = 0; i< state.upcomingMovieList.length ; i++) {
                if(state.upcomingMovieList[i].vote_average > min) {
                    if(state.upcomingfilteredMovies.length == 0 ) {
                        state.upcomingfilteredMovies.push(state.upcomingMovieList[i]);
                    }else if (state.upcomingfilteredMovies.length > 0) {
                        const ifMovieExist = state.upcomingfilteredMovies.find(movie => movie.id == state.upcomingMovieList[i].id)
                        if(!ifMovieExist) {
                            state.upcomingfilteredMovies.push(state.upcomingMovieList[i]);
                        }
                    }
                }
                else {
                    const ifMovieExist = state.upcomingfilteredMovies.find(movie => movie.id == state.upcomingMovieList[i].id)
                    if(ifMovieExist) {
                        state.upcomingfilteredMovies.splice(state.upcomingMovieList[i], 1);
                    }
                }
            }
        console.log(state.upcomingfilteredMovies);
        } ,2000);
        
    }
};
const actions = {
    async upCoingMovies({commit}) {
        let {data} = await axios.get(`upcoming?api_key=YOUR_KEY`);
        commit('UPCOMING_MOVIES',data)
    },
    upcomingfilter({commit}, type) {
        commit('UPCOMING_FILTER_MOVIES',type)
    }
};
const getters = {
    upcomingMovieResult: state => {
        return state.upcomingMovieList
    },
    upcomingfilteredMovies: state => {
        return state.upcomingfilteredMovies;
    }
};

export default {
    state,mutations,actions,getters
}