<template>
  <div class="user__list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "UserList",
}
</script>

<style scoped>
.user__list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>