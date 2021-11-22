<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <my-input
        v-model="post.title"
        type="text"
        placeholder="Title posts"
    />
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Description"
    />
    <my-button
        @click="createPost"
        style="align-self: flex-end"
    >Create
    </my-button>
  </form>

</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
        id: Date.now()
      }
    }
  },
  methods: {
    createPost() {
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
        id: ''
      }
    }
  }
}
</script>

<style>


form {
  display: flex;
  flex-direction: column;
}

</style>