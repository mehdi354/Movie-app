<template>
  <v-app >
    <v-content>
		<Header/>
      <!-- <HelloWorld/> -->
		<v-container>
			<div class="contents">
				<router-view></router-view>
			</div>
		</v-container>
    </v-content>
  </v-app>
</template>
<script>
import Header from './components/Header.vue';

export default {
  name: 'App',

  components: {
    Header,
  },
  created(){
    return this.$store.dispatch('movieGenre');
  },
  data: () => ({
    //
  }),
};
</script>
