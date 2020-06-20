<template>
    <v-row>
        <v-col cols="12">
            <!-- {{ singleMovie.poster_path}} -->
            <v-row>
                <div class="single-movie-list">
                    <v-row>
                        <v-col cols="3" class="px-5">
                            <img :src="'https://image.tmdb.org/t/p/w500/' + singleMovie.poster_path" alt="">
                        </v-col>

                        <v-col cols="9" class="px-5">
                            <div>
                                <h3 class="single-list-movie-title"> {{singleMovie.title}} </h3>
                                 <ul class="movie-short-desc">
                                    <li>
                                        <div class="ratings">
                                            <img src="../../../public/images/star.svg" alt="" class="movie-rating-img">  <span>{{ singleMovie.vote_average | movie-ratings  }}</span>
                                        </div>
                                    </li>
                                    <li>Release data: {{ singleMovie.release_date | date-format }}</li>
                                    <li> {{ genreName(singleMovie.genres)}} </li>
                                </ul>
                            </div>
                            <div class="description mt-10">
                                <p>{{singleMovie.overview}}</p>
                                <v-list class="single-movie-list-btn">
                                    <v-list-item>
                                        <v-btn v-if="singleMovie.videos" :href="'https://www.youtube.com/watch?v='+ singleMovie.videos.results[0].key" target="_blank">Play Trailer</v-btn>
                                        <v-btn v-else href="https://youtbe.com/" >Play Trailer</v-btn>
                                    </v-list-item>
                                    <v-list-item v-if="theater=='yes'">
                                        <v-btn href="" target="_blank">Book Your Seat</v-btn>
                                    </v-list-item>
                                </v-list>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12"><h4 class="single-list-movie-title"> Cast & crew </h4> <hr></v-col>
                        <v-col cols="2" v-for="cast in castLimit"  :key='cast.index'>
                            <img :src="'https://image.tmdb.org/t/p/w300/'+cast.profile_path" alt="" >
                            <h4 class="single-list-movie-title">{{cast.name}}</h4>
                            <h5>{{cast.character}}</h5>
                        </v-col>
                    </v-row>
                    <!-- <v-row v-else>
                        <v-col cols="12"><h4 lass="single-list-movie-title"> Cast & crew </h4></v-col>
                    </v-row> -->

                    <v-row class="mt-10">
                        <v-col cols="12"><h4 class="single-list-movie-title"> Images </h4> <hr></v-col>
                        <v-col cols="2" v-for="image in imageLimit"  :key='image.index'>
                            <img :src="'https://image.tmdb.org/t/p/w500/'+image.file_path" alt="" >
                        </v-col>
                    </v-row>

                </div>
            </v-row>
        </v-col>

    </v-row>
</template>
<script>
export default {
    props:['id','movieDetails','theater'],
    data(){
        return {
            movieDetailed: this.$route.params.movieDetails,
            isCast: false
        }
    },
    methods: {
        genreName(genres) {
            const genreName = [];
            if(genres){
                genres.forEach(element => {
                const record = this.allGenre.find( genre => genre.id == element.id);
                if(record) {
                    genreName.push(record.name);
                }
            })
            }
            
            console.log(genres);
            return genreName.join(', ');
        },
    },
    computed: {
        singleMovie(){
            return this.$store.getters.singleMovie;
        },
        castLimit(){
            return this.$store.getters.singleMovie.credits.cast.slice(0, 6);
        },
        imageLimit(){
            return this.$store.getters.singleMovie.images.backdrops.slice(0, 12);
        },
        allGenre() {
            return this.$store.getters.allGenres;
        },

    },
    mounted(){
        // return this.castLimit();
        // this.isCast = true
        // if(this.castLimit) {
        //     this.isCast = true
        // }
        // if(this.singleMovie) {
        //     if(this.castLimit.length>0) {
        //         this.isCast = true
        //     }
        // }
    },
    created(){
        return this.$store.dispatch('movieDetails', this.id) 
    },
    // watch: {
    //     castLimit(){
    //         if(this.castLimit.length>0) {
    //             this.isCast = true
    //         }
            
    //     }
    // }
}
</script>