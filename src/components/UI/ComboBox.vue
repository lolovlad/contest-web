<template>
  <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="browser-default"
  >
    <option v-for="val in data" :value=val.value :key="val.value">{{ val.text }}</option>
  </select>
</template>

<script>
import M from "materialize-css"
export default {
  props: {
    modelValue: [String, Number],
    data: {
      type: Array,
      default: null
    }
  },
  data(){
    return{
      modelInstance: null
    }
  },
  methods: {
    initElem(){
      const elem = this.$refs.selectInstance;
      this.modelInstance = M.FormSelect.init(elem);
    }
  },
  mounted() {
  },
  name: "ComboBox"
}
</script>

<style scoped>
</style>