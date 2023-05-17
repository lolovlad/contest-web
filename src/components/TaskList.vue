<template>
  <div class="task__list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TaskList"
}
</script>

<style scoped>
.task__list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>