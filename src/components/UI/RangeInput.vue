<template>
  <div class="input__box">
    <label for="range">{{placeholder}} {{modelValue}} {{metric}}</label>
    <input @input="onChange"
           :value="modelValue"
           type="range"
           id="range"
           :min="min"
           :max="max"
           :step="step"
    >
  </div>
</template>

<script>
export default {
  name: "RangeInput",
  props: {
    modelValue: {
      type: [String, Number]
    },
    max: Number,
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String
    },
    metric: {
      type: String,
      default: ""
    }
  },
  methods: {
    onChange(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input__box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>