<template>
  <div class="navbar">
    <div @click="$router.push('/')">Mini blog</div>
    <div class="navbar__btn">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/contacts')" style="margin-left: 20px">About us</my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 20px">Store</my-button>
    </div>
  </div>
</template>
<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: {MyButton}
}

</script>
<style>
.navbar{
  height: 50px;
  background: grey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 15px;
}
.navbar__btn{
  margin-left: auto;
}

</style>