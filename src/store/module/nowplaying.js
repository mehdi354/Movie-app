import axios from 'axios';
const state = {
    nowplayingMovieList :[],
    nowfilteredMovies:[]
};
const mutations = {
    'NOW_PLAYING_MOVIES'(state,data) {
        const responseDatas = data;
        state.nowplayingMovieList = [];
        //console.log(responseDatas);
        for( let i= 0 ;i < responseDatas.results.length;i++ ) {
            state.nowplayingMovieList.push(responseDatas.results[i]);
        }   
        console.log(state.nowplayingMovieList);
    },
    'NOW_PLAYING_FILTER_POPULER'(state,type) {
        setTimeout( ()=> {
            let min = Math.min.apply(null,type);
            console.log(type);
            console.log(min);
            for(let i = 0; i< state.nowplayingMovieList.length ; i++) {
                console.log(type);
                if(state.nowplayingMovieList[i].vote_average >= min) {
                    console.log("mathced");
                    if(state.nowfilteredMovies.length == 0 ) {
                        state.nowfilteredMovies.push(state.nowplayingMovieList[i]);
                    }else if (state.nowfilteredMovies.length > 0) {
                        const ifMovieExist = state.nowfilteredMovies.find(movie => movie.id == state.nowplayingMovieList[i].id)
                        if(!ifMovieExist) {
                            state.nowfilteredMovies.push(state.nowplayingMovieList[i]);
                        }
                    }
                }
                else {
                    const ifMovieExist = state.nowfilteredMovies.find(movie => movie.id == state.nowplayingMovieList[i].id)
                    if(ifMovieExist) {
                        state.nowfilteredMovies.splice(state.nowplayingMovieList[i], 1);
                    }
                }
            }
        console.log(state.nowfilteredMovies);
        } ,2000);
        
    }
};
const actions = {
    async nowPlayingMoviess({commit}) {
        let {data} = await axios.get(`now_playing?api_key=YOUR_KEY`);
        commit('NOW_PLAYING_MOVIES',data)
    },
    nowplayingfilterPopuler({commit}, type) {
        commit('NOW_PLAYING_FILTER_POPULER',type)
    }
};
const getters = {
    newComingMovieList: state => {
        return state.nowplayingMovieList
    },
    nowplayingfilteredMovies: state => {
        return state.nowfilteredMovies;
    }
};

export default {
    state,mutations,actions,getters
}