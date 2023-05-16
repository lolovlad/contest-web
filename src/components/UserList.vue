<template>
  <div class="user__list">
    <UserCard v-for="user in userList" :key="user.id" :userData="user"
    @deleteUser="$emit('deleteUser', user.id)"
    @updateUser="$emit('updateUser', user.id)"/>
  </div>
</template>

<script>
import UserCard from "@/components/UI/UserCard";
export default {
  name: "UserList",
  components: {UserCard},
  props: {
    userList: {
      type: Array,
      default: null
    }
  },
}
</script>

<style scoped>
.user__list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>