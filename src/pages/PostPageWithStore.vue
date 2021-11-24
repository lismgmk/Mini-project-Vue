<template>
  <div >
    <div class="app__block">
      <my-button @click="addPost">Add post</my-button>
      <my-select
          style="height: 40px"
          :options="optionValue"
          v-model:modelValue="optionsData"
          @update:model-value="setOptionsData"
      />
    </div>
    <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
    />

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
          style="margin-top: 20px"
          v-if="posts.length > 0"
          v-bind:posts="sortSearch"
          @remove="removePost"
      />
      <h4 class="app__empty-list" v-else>This list is empty</h4>
    </div>
    <h3 v-else><strong>LOADING...</strong></h3>
    <div v-intersaction="fetchNewPosts"  class="app__observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import MyButton from "@/components/UI/MyButton"
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import toggleMixin from "@/mixins/toggleMixin";
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  mixins: [toggleMixin],
  components: {
    MyInput,
    MySelect,
    MyButton,
    PostForm,
    PostList
  },
  data() {
    return {
      showDialog: false
    }
  },


  methods: {

    ...mapMutations({
      setPage: 'posts/setPage',
      setSearchQuery: 'posts/setSearchQuery',
      setOptionsData: 'posts/setOptionsData'
    }),
    ...mapActions({
      fetchPosts: 'posts/fetchPosts',
      fetchNewPosts: 'posts/fetchNewPosts'
    }),

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

  },
  mounted() {
    this.fetchPosts()
  },
  watch: {
  },
  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      loading: state => state.posts.loading,
      optionValue: state => state.posts.optionValue,
      optionsData: state => state.posts.optionsData,
      searchQuery: state => state.posts.searchQuery,
      page: state => state.posts.page,
      limit: state => state.posts.limit,
      totalPage: state => state.posts.totalPage
    }),
    ...mapGetters({
      sortedPosts: 'posts/sortedPosts',
      sortSearch: 'posts/sortSearch'
    })
  },
}
</script>

<style>


.app__block {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.app__empty-list {
  color: red;
}

.pagination__wrapper {
  display: flex;
  margin-top: 15px;
}

.pagination__item {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
  margin-left: 5px;
}

.current_page {
  color: teal;
  border: 2px solid teal;
}
</style>

