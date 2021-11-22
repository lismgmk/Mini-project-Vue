<template>
 <select v-model="modelValue" @change="changeValue">
   <option
       disabled value="">Select type sorting</option>
   <option :key="option" :value="option" v-for="option in options">{{option}}</option>
 </select>
</template>
<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    changeValue(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
<style>

</style>