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
</style>