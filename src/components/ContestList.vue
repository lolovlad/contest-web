<template>
  <div class="contest__list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContestList"
}
</script>

<style scoped>
.contest__list{
  display: flex;
  gap: 20px;
}
</style>