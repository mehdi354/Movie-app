import axios from 'axios';
const state = {
    popularMovieList :[],
    apiKey: '',
    genres:[],
    genresnames:[],
    singleMovie: {},
    filteredMovies:[]
};
const mutations = {
    'POPULAR_MOVIES'(state,data) {
        const responseDatas = data;
        state.popularMovieList = [];
        //console.log(responseDatas);
        for( let i= 0 ;i < responseDatas.results.length;i++ ) {
            state.popularMovieList.push(responseDatas.results[i]);
        }   
        console.log(state.popularMovieList);
    },
    'GENRES'(state,data) {
        const responseDatas = data;
        state.genresnames = [];
        console.log(responseDatas);
        if(responseDatas){
            setTimeout(()=>{
                for( let i= 0 ;i < responseDatas.genres.length; i++ ) {
                    state.genres.push(responseDatas.genres[i]);
                   // state.genresnames.push(responseDatas.genres[i].name);
                }  
            },2000) 
        }
        console.log(state.genresnames);
        
    },
    'SINGLE_MOVIE'(state,name) {
        // state.singleMovie = []
        state.singleMovie = name;
    },
    'FILTER_POPULER'(state,type) {
        setTimeout( ()=> {
            let min = Math.min.apply(null,type);
            console.log(type);
            console.log(min);
            /*-------------------- Filter based on ratings --------------------*/ 
            for(let i = 0; i< state.popularMovieList.length ; i++) {
                if(state.popularMovieList[i].vote_average > min) {
                    /*=========== If no movies at the list ===============*/ 
                    if(state.filteredMovies.length == 0 ) {
                        state.filteredMovies.push(state.popularMovieList[i]);
                    }
                    /*=========== If movies list is not empty  ===============*/ 
                    else if (state.filteredMovies.length > 0) {
                        const ifMovieExist = state.filteredMovies.find(movie => movie.id == state.popularMovieList[i].id)
                        /*=========== Add movie if not in the list  ===============*/ 
                        if(!ifMovieExist) {
                            state.filteredMovies.push(state.popularMovieList[i]);
                        }
                    }
                }
                else {
                    const ifMovieExist = state.filteredMovies.find(movie => movie.id == state.popularMovieList[i].id)
                    if(ifMovieExist) {
                        state.filteredMovies.splice(state.popularMovieList[i], 1);
                    }
                }
                
            }
            // for(let i = 0; i< state.popularMovieList.length ; i++) {
            //     state.filteredMovies = [];
            //         record = state.popularMovieList[i].genre_ids.find(element => element.id == genreType.id);
            //     if(record){
            //         if(state.filteredMovies.length == 0) {
            //             state.filteredMovies.push(state.popularMovieList[i])
            //         }
            //         else{
            //             const recorded = state.filteredMovies.find(  movie => movie.id == state.popularMovieList[i].id)
            //            if( !recorded) {
            //                state.filteredMovies.push(state.popularMovieList[i])
            //             }
            //         }
                    
            //     }
            // }

        console.log(state.filteredMovies);
        } ,2000);   
    }
};
const actions = {
    async popularMovies({commit}) {
        let {data} = await axios.get(`popular?api_key=YOUR_KEY`);
        commit('POPULAR_MOVIES',data)
    },
    async movieGenre({commit}) {
        let {data} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_KEY`);
        commit('GENRES',data)
    },
    async movieDetails({commit},name) {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${name}?api_key=YOUR_KEY`);
        console.log(data);
        commit('SINGLE_MOVIE',data);
    },
    filterPopuler({commit}, type) {
        commit('FILTER_POPULER',type)
    }
};
const getters = {
    popularMovies: state => {
        return state.popularMovieList
    },
    allGenres: state => {
        return state.genres;
    },
    // genresnames: state => {
    //     return state.genresnames;
    // },
    
    singleMovie:state => {
        return state.singleMovie
    },
    filteredMovies: state => {
        return state.filteredMovies;
    }
};

export default {
    state,mutations,actions,getters
}