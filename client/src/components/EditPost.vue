<template>
  <div class="posts">
    <h1>Edit Post</h1>
      <div class="form">



               <v-text-field name="short_title"
        v-model="title"
        :counter="10"
        label="Title"
        required
      ></v-text-field>

        <v-text-field name="short_title"
        v-model="short_title"
        :counter="10"
        label="short_title"
        required
      ></v-text-field>

          <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>

          <button class="app_post_btn" @click="updatePost">Update</button>
          <router-link class="btn btn-default" v-bind:to="'/posts'">Cancel</router-link>
        </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'EditPost',
  data () {
    return {
      title: '',
      short_title: '',
      description: '',
       editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                }
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.title = response.data.title
      this.short_title = response.data.short_title
      this.description = response.data.description
    },
    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        title: this.title,
        short_title: this.short_title,
        description: this.description
      })
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
