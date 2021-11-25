<template>
  <div >
    <div class="app__block">
      <my-button @click="addPost">Add post</my-button>
      <my-select
          style="height: 40px"
          v-bind:options="optionsData"
          v-model:modelValue="sortedPosts"
      />
    </div>
    <my-input
        v-focus
        v-model="searchQuery"
    />

    <my-dialog
        v-bind:show="showDialog"
        v-if="showDialog"
    >
      <post-form
      />
    </my-dialog>
    <div v-if="!loading">

      <post-list
          style="margin-top: 20px"
          v-if="posts.length > 0"
          v-bind:posts="sortSearch"
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
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedSearchPosts} from "@/hooks/useSortedSearchPosts";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    PostForm,
    PostList
  },
  data() {
    return {
      optionsData: ['title', 'body'],
    }

  },

setup(props) {
  const {posts, totalPage, loading} = usePosts(10)
  const {sortedPosts, optionValue} = useSortedPosts(posts)
  const {sortSearch, searchQuery} = useSortedSearchPosts(sortedPosts)
  return {
    posts, totalPage, loading,sortedPosts, optionValue, sortSearch, searchQuery
  }
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
