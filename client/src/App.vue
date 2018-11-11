  <template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <router-link v-bind:to="{ name: 'HelloWorld' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-content>Home</v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link v-bind:to="{ name: 'Posts' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-content>Posts</v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link v-bind:to="{ name: 'Login' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-content>Login</v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link v-bind:to="{ name: 'Register' }" class="side_bar_link">
          <v-list-tile>
            <v-list-tile-content>Register</v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
     <v-toolbar-title>Vue Crud App</v-toolbar-title>

   </v-toolbar>

   <v-content>

     <v-container fluid>

       <div id="app">

         <router-view/>

       </div>

     </v-container>

   </v-content>

   <v-footer color="indigo" app>

     <span class="white--text">Yiannis Stavgianoudakis &copy; 2018</span>

   </v-footer>

 </v-app>
</template>


<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null,
  }),
  props: {
    source: String,
  },

}
</script>

<style lang="scss">
@import './assets/stylesheets/main.scss';
</style>
