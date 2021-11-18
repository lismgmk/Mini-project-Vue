<template>
  <div class="post" v-for="post in posts">
    <div><strong>Name: </strong>{{post.name}}</div>
    <div><strong>Description: </strong> {{post.body}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [
        {id: 1, name: 'JS is a single flow dynamic typical language', body: "Description 1"},
        {id: 2, name: 'Title 2', body: "Description 2"},
        {id: 3, name: 'Title 3', body: "Description 3"},
      ]
    }
  },
  methods: {
    addLike (){
      this.likes += 1
    },
    addDislike (){
     this.dislikes += 1
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

.post {
  margin-top: 15px;
  padding: 15px;
  border: 1px solid teal;
}
</style>

