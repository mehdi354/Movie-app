<template>
    <v-app-bar class="navbar" color="#264653">
        <v-container>
            <v-row>
                <v-toolbar-title>
                    <v-icon>mdi-movie</v-icon>
                    <router-link to="/" color="white">
                        <a>Vue <strong> Movies </strong></a>
                    </router-link>
                </v-toolbar-title>
                <v-toolbar-items class="menu-items">
                <v-btn text small >
                    <router-link to="/">
                        Home
                    </router-link>
                </v-btn>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text small 
                            v-bind="attrs"
                            v-on="on"
                            class="dropdownmenu-btn"
                        >
                            Movies
                        </v-btn>
                    </template>
                    <v-list class="dropdown-menu">
                        <v-list-item>
                            <router-link to="/Popular"><a>Popular Movies</a></router-link>     
                        </v-list-item>
                        <v-list-item>
                            <router-link to="/TopRated"><a>Top Rated Movies</a></router-link>     
                        </v-list-item>
                        <v-list-item>
                            <router-link to="/NowPlaying"><a>Now Playing Movies</a></router-link>     
                        </v-list-item>
                        <v-list-item>
                            <router-link to="/Upcoming"><a>Upcoming Movies</a></router-link>     
                        </v-list-item>
                    </v-list>  
                </v-menu> 
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text small 
                            v-bind="attrs"
                            v-on="on"
                            class="dropdownmenu-btn"
                        >
                            Tv-series
                        </v-btn>
                    </template>
                    <v-list class="dropdown-menu">
                        <v-list-item>
                            <router-link to="/Popular"><a>Popular Tv-series</a></router-link>     
                        </v-list-item>
                        <v-list-item>
                            <router-link to="/TopRated"><a>Top Rated Movies</a></router-link>     
                        </v-list-item>
                    </v-list>  
                </v-menu>      
                <!-- <v-btn text small  v-for="navItem in navItems" :key="navItem.index">
                    <router-link to="/">
                        Home
                    </router-link>
                </v-btn> -->
                
                
                
                
                <!-- <v-btn text small  v-for="navItem in navItems" :key="navItem.index">
                    <router-link :to="navItem.path">
                        {{navItem.title}}
                    </router-link>
                </v-btn> -->

                </v-toolbar-items>
            <v-spacer></v-spacer>
            
            <v-toolbar-items>
                <v-card-text>
                   
                    <!-- <v-autocomplete
                        dark
                        class="top-searchbar"
                        background-color= "#FFFFF"
                        color="#FFFFFF"
                        :items="states"
                        placeholder="Start typing to Search"
                        prepend-icon="mdi-database-search"
                        return-object
                    >
                        <template v-slot:item="{ item }">
                            <v-list-item-avatar
                                color="indigo"
                                class="headline font-weight-light white--text"
                            >
                                {{ item }}
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="iteme"></v-list-item-title>
                                <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-icon>mdi-coin</v-icon>
                            </v-list-item-action>
                        </template>
                    </v-autocomplete> -->
                    <v-autocomplete
                        class="top-searchbar"
                        :label="label"
                        :items="popularMovies"
                        item-text="title"
                        cache-items
                        
                        solo
                    >

                    </v-autocomplete>
                   
                </v-card-text>        
            </v-toolbar-items>

            </v-row>
            
        </v-container>
    </v-app-bar>
</template>
<script>
export default {
    data(){
        return{
            label: "Search your movie",
            navItems : [
                {path: '/', title: 'Home'},
                {path: '/Movies', title: 'Movies'},
                {path: '/Tv-series', title: 'Tv-series'},
            ],
            states: [
            'Alabama',
            'Alaska',
            'American Samoa',
            'Arizona',
            'Arkansas',
            'California',
            'Colorado',
        ]
        }
    },
    computed:{
        popularMovies() {
            return this.$store.getters.popularMovies;
        },
    }
}
</script>