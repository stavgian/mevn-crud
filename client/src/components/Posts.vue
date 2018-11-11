<template>
  <v-layout>

  <div class="posts">
    <h1>Posts: {{ fetchCount }}</h1>
     <!-- <button @click="increment">Increment</button>
     <button @click="decrement">decrement</button> -->
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="">Add Post</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Short title</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.short_title }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">
              <v-btn dark color="indigo">
          <v-icon dark>edit</v-icon>
        </v-btn>
              </router-link> |
            <a href="#" @click="deletePost(post._id)">
                <v-btn dark color="indigo">
          <v-icon dark>delete</v-icon>
        </v-btn>
            </a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>



      <!-- <button @click="crement">Decrement</button> -->
    </div>
  </div>
  <router-link v-bind:to="{ name: 'NewPost' }" class="side_bar_link">
    <v-btn fab dark color="indigo">
          <v-icon dark>add</v-icon>
        </v-btn>
  </router-link>

<div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-btn
          slot="activator"
          color="red lighten-2"
          dark
        >
          Click Me
        </v-btn>

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Privacy Policy
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>.

  </v-layout>
</template>

<script>
import PostsService from '@/services/PostsService'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'posts',
  computed: {
    ...mapGetters([
      'fetchCount'
    ])
  },
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    ...mapActions([
      'increment', 'decrement'
    ]),
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      this.getPosts()
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>

<style type="scss">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
