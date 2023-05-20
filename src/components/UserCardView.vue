<template>
  <div class="card">
    {{user.sename}} {{user.name[0]}}. {{user.secondname[0]}}.
  </div>
</template>

<script>
export default {
  name: "UserCardView",
  props: {
    user: {
      type: Object
    }
  }
}
</script>

<style scoped>
.card{
  background: #0273bb;
  padding: 4px;
  border-radius: 5px;
  width: 100%;
  height: 60px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>