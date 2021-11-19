<template>
  <div class="app">
    <post-form
        @create="createPost"
    />
    <post-list
        v-bind:posts="posts"
        @remove="removePost"
    />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [
        {id: 1, name: 'JS is a single flow dynamic typical language', body: "Description 1"},
        {id: 2, name: 'Title 2', body: "Description 2"},
        {id: 3, name: 'Title 3', body: "Description 3"},
      ]
    }
  },
  methods: {
    createPost (post, second, third){
      this.posts.push(post)
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  padding: 20px;
}


</style>

