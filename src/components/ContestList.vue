<template>
  <div class="row list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContestList"
}
</script>

<style scoped>
.list{
  margin-top: 30px;
}
</style>