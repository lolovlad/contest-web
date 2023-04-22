<template>
  <input class="input" :value="modelValue" @input="updateInput">
</template>

<script>
export default {
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  },
  name: "TextInput"
}
</script>

<style scoped>
.input{
  width: 100%;
  border: 1px solid black;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>