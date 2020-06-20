<template>
    <v-row>
        <v-col cols="12">
            <h4 class="single-list-movie-title">Top Rated Movies</h4>
            <hr>
        </v-col>
        <v-col cols="9">
            <v-row>
                <!-- <div v-if="filteredMovies.length > 0"> {{ filteredMovies }}</div> -->
                <!-- To show Filter Value -->
                <v-col cols="12" class="pt-0" v-if="selectedMovieGenre.length > 0 || selectedRatings.length > 0">
                    <v-col cols="12" class="py-0">
                        <ul class="movie-tag">
                            <li v-for="selectedMovie in selectedMovieGenre" :key="selectedMovie.index"> {{selectedMovie.name}} </li>
                        </ul>
                    </v-col>
                    <v-col cols="12" class="py-0">
                        <ul class="movie-tag">
                            <li v-for="selectedMovie in selectedRatings" :key="selectedMovie.index"> {{selectedMovie | movie-ratings }} </li>
                        </ul>
                    </v-col>
                </v-col>
                <!-- /To show Filter Value -->
                <!-- <v-row>
                    <v-col cols="12">
                        <div id="loader">
                            <v-progress-linear :value="loadingvalue"></v-progress-linear>
                        </div> 
                    </v-col> 
                </v-row> -->
                
                 <!-- To show Popler  Movie -->
                <v-row v-if="topRatedfilteredMovies.length == 0 && selectedMovieGenre.length == 0 && selectedRatings.length == 0">
                    <v-col cols="3" class="px-5" v-for="movie in topRatedMovies" :key="movie.index">
                        <div class="single-movie-list">
                            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="">
                            <h4 class="single-list-movie-title">
                                <router-link  :to="{ name: 'details', params: { id: movie.id, movieDetails: movie}}"> {{ movie.title }}  </router-link> 
                                <!-- <router-link :to="{ name: 'details', params: { projectId: project.id }}">{{project.name}}</router-link> -->
                            </h4>
                            <div class="movie-genre">
                                <!-- <ul>
                                    <li v-for="genre in movie.genre_ids" :key="genre.index" >{{genreNamebyList(genre)}}</li>
                                </ul> -->
                                <p> {{ genreName(movie.genre_ids)}} </p>
                                <p>Release data: {{ movie.release_date | date-format }} </p>
                            </div>
                            <div class="single-movie-bottom">
                                <div class="ratings">
                                    <img src="../../../public/images/star.svg" alt="" class="movie-rating-img">  <span>{{ movie.vote_average | movie-ratings  }}</span>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <!-- /To show Popler  Movie -->

                <!-- If no filtered movie Filtered Movie  result is none-->
                <v-row v-else-if="(topRatedfilteredMovies.length == 0) && (selectedMovieGenre.length >0 || selectedRatings.length > 0)">
                    <v-col cols="12">
                        <h4 class="single-list-movie-title pl-5">Sorry! No movies Found</h4>
                    </v-col>
                </v-row>
                <!-- /If no filtered movie Filtered  Movie -->
                
                <!-- To show Filtered  Movie -->
                <v-row v-else-if="topRatedfilteredMovies.length > 0 && selectedMovieGenre.length >0 || selectedRatings.length > 0">
                    <v-col cols="3" class="px-5" v-for="movie in topRatedfilteredMovies" :key="movie.index">
                        <div class="single-movie-list">
                            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="">
                            <h4 class="single-list-movie-title">
                                <router-link  :to="{ name: 'details', params: { id: movie.id, movieDetails: movie}}"> {{ movie.title }}  </router-link> 
                                <!-- <router-link :to="{ name: 'details', params: { projectId: project.id }}">{{project.name}}</router-link> -->
                            </h4>
                            <div class="movie-genre">
                                <!-- <ul>
                                    <li v-for="genre in movie.genre_ids" :key="genre.index" >{{genreNamebyList(genre)}}</li>
                                </ul> -->
                                <p> {{ genreName(movie.genre_ids)}} </p>
                                <p>Release data: {{ movie.release_date | date-format }} </p>
                            </div>
                            <div class="single-movie-bottom">
                                <div class="ratings">
                                    <img src="../../../public/images/star.svg" alt="" class="movie-rating-img">  <span>{{ movie.vote_average | movie-ratings  }}</span>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <!-- /To show Filtered  Movie -->
                
            </v-row>
        </v-col>
        <v-col cols="3" class="px-5">
            <div>
                <h4 class="single-list-movie-title ">Movie Genre</h4>
                <hr>
                <ul class="filteredList mt-5">
                    <li  v-for="gname in allGenre" :key="gname.index" class="text-white">
                        <v-checkbox v-model="selectedMovieGenre" :label="gname.name" :value="gname"  color="#FFFFFF" @change="filterByGenre"></v-checkbox>
                    </li>
                </ul>
            </div>
            <div class="mt-5">
                <h4 class="single-list-movie-title ">Movie Rating</h4>
                <hr>
                <ul class="filteredList mt-5">
                    <li  v-for="rate in ratingList" :key="rate.index" class="text-white">
                        <v-checkbox v-model="selectedRatings" :label="rate.value  | movie-ratings" :value="rate.id" color="#FFFFFF" @change="filterByRating"></v-checkbox>
                    </li>
                </ul>
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data(){
        return {
            loadingvalue : 15,
            // isLoading: false,
            selectedMovieGenre : [],
            selectedRatings : [],
            ratingList: [
                {id: 1, value: '1'},
                {id:2, value: '2'},
                {id:3, value: '3'},
                {id:4, value: '4'},
                {id:5, value: '5'},
                {id: 6, value: '6'},
                {id:7, value: '7'},
                {id:8, value: '8'},
                {id:9, value: '9'},
                {id:10, value: '10'},
            ]
            
        }
    },
    methods: {
        // genreNamebyList(genreType) {
        //     const record = this.allGenre.find( genre => genre.id == genreType);
        //     if(record) {
        //         return  record.name
        //     } 
        // },
        genreName(genres) {
            const genreName = [];
            genres.forEach(element => {
                const record = this.allGenre.find( genre => genre.id == element);
                if(record) {
                    genreName.push(record.name);
                }
            })
            return genreName.join(', ');
        },
        genreList(){
            for(let i=0;i<= this.allGenre.length; i++) {
                this.movie_genre = this.allGenre[i].name;
            }
        },
        filterByGenre(){
            this.$store.dispatch('topRatedfilterPopuler', this.selectedMovieGenre);
        },
        filterByRating(){
            this.$store.dispatch('topRatedfilterPopuler', this.selectedRatings);
        },
    },
    computed: {
        topRatedMovies() {
            return this.$store.getters.topRatedMovieList;
        },
        allGenre() {
            return this.$store.getters.allGenres;
        },
        topRatedfilteredMovies() {
            return this.$store.getters.topRatedfilteredMovies;
        }
        
    },
    mounted(){
    },
    created() {
        return this.$store.dispatch('topRatedMovies');
    },
}
</script>