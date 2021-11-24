<template>
  <div >
    <div class="app__block">
      <my-button @click="addPost">Add post</my-button>
      <my-select
          style="height: 40px"
          v-bind:options="optionsData"
          v-model:modelValue="optionValue"
          @update:model-value="setSelected"
      />
    </div>
    <my-input
        v-focus
        v-model="searchQuery"
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
    <!--    <div class="pagination__wrapper">-->
    <!--      <div-->
    <!--          class="pagination__item"-->
    <!--          :key="pageNum"-->
    <!--          @click="changePage(pageNum)"-->
    <!--          v-for="pageNum in totalPage"-->
    <!--          :class="{current_page: pageNum === page}"-->
    <!--      >{{ pageNum }}-->
    <!--      </div>-->
    <!--    </div>-->
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
      posts: [],
      // showDialog: false,
      loading: false,
      optionValue: '',
      optionsData: [
        'title', 'body'
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0,

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
    // closeDialog() {
    //   this.showDialog = false
    // },
    // changePage(page) {
    //   this.page = page
    // },
    async fetchPosts() {
      try {
        this.loading = true
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _limit: this.limit,
              _page: this.page
            }
          })
          this.posts = response.data
          this.loading = false
          this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        }, 2000)

      } catch (e) {
        alert('Error')
      }
    },
    async fetchNewPosts() {
      try {

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page += 1
          }
        })
        this.posts = [...this.posts, ...response.data]


      } catch (e) {
        alert('Error')
      }
    },
    setSelected() {
      // console.log(this.optionValue)
    }
  },
  mounted() {
    this.fetchPosts()
    // const lastElement = this.$refs.observer
    // // this.fetchNewPosts.bind(this.methods)
    //
    // const options = {
    //   root: null,
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = function (entries, observer) {
    //   if (entries[0].isIntersecting && this.page < this.totalPage) {
    //     this.fetchNewPosts()
    //   }
    // }.bind(this);
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(lastElement)
  },
  watch: {
    // page(){
    //   this.fetchPosts()
    // }
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        return a[this.optionValue]?.localeCompare(b[this.optionValue])
      })
    },
    sortSearch() {
      return this.sortedPosts.filter((option) => {
        return option.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      })
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

