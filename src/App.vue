<template>
  <div class="app">
    <div>
      <my-button @click="addPost">Add post</my-button>
      <my-select
          v-bind:options="optionsData"
          v-model:modelValue="optionValue"
          @update:model-value="setSelected"
      />
    </div>
    <my-dialog
        v-bind:show="showDialog"
        v-if="showDialog"
        @closeDialog="closeDialog"
    >
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <div v-if="!loading">
      <post-list
          v-if="posts.length > 0"
          v-bind:posts="posts"
          @remove="removePost"
      />
      <h4 class="app__empty-list" v-else>This list is empty</h4>
    </div>
    <h3 v-else><strong>LOADING...</strong></h3>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import MyButton from "@/components/UI/MyButton"
import axios from "axios";
import MySelect from "@/components/UI/MySelect";

export default {
  components: {
    MySelect,
    MyButton,
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      showDialog: false,
      loading: false,
      optionValue: '',
      optionsData: [
        'title', 'body'
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.showDialog = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    addPost() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
    async fetchPosts() {
      try {
        this.loading = true
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
          this.posts = response.data
          this.loading = false
        }, 2000)

      } catch (e) {
        alert('Error')
      }
    },
    setSelected(){
      // console.log(this.optionValue)
    }
  },
  mounted() {
    this.fetchPosts()
  },
  watch: {
    optionValue(newValue) {
      this.posts.sort((a,b) => {
        return a[this.optionValue]?.localeCompare(b[this.optionValue])
      })
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

.app__empty-list {
  color: red;
}

</style>

