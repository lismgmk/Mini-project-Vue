<template>
  <div class="dialog" @click="$emit('closeDialog', false)">
    <div class="dialog__wrapper" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-dialog',
  // props: {
  //   show: {
  //     type: Boolean,
  //     required: true
  //   }
  // }
  methods: {

  }
}
</script>
<style>

.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__wrapper {
  background: white;
  margin: auto;
  padding: 15px;
}
</style>