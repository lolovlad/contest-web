<template>
  <select
      class="combobox"
      :value="modelValue"
      @change="$emit('update:modelValue', parseInt($event.target.value))"
  >
    <option v-for="(val, index) in data" :value=val.value :key="index">{{ val.text }}</option>
  </select>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    data: {
      type: Array
    }
  },
  name: "ComboBox"
}
</script>

<style scoped>
.combobox{
  font-size: 20px;
  padding: 10px 50px;
  border: 1px solid black;
  width: 100%;
}
</style>