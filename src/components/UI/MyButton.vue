<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'my-button'
}
</script>
<style>
.btn {
  background: none;
  color: teal;
  border: 1px solid teal;
  padding: 10px 15px;
}
</style>