<template>
  <h5 class="task__header">
    <slot></slot>
  </h5>
</template>

<script>
export default {
  name: "HeaderTask"
}
</script>

<style scoped>
.task__header{
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>