import Home from './components/Home.vue';
// import Movies from './components/Movies.vue';
import Tvseries from './components/Tvseries.vue';
import SingleMovies from './components/Movie/SingleMovies.vue';
import NowPlaying from './components/Movie/NowPlaying.vue';
import Upcoming from './components/Movie/Upcoming.vue';
import Popular from './components/Movie/Popular.vue';
import TopRated from './components/Movie/TopRated.vue';

export const routes = [
    {path:'/',component : Home},
    {path:'/Popular',component : Popular},
    {path:'/TopRated',component : TopRated},
    {path:'/NowPlaying',component : NowPlaying},
    {path:'/Upcoming',component : Upcoming},
    {name: 'details',path:'/:id/details',component : SingleMovies,props: true,},
    {path:'/Tv-series',component : Tvseries},
];