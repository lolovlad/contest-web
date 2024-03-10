<template>
  <admin-header/>
  <div class="container">
    <router-view>

    </router-view>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
export default {
  name: "AdminPage",
  components: {AdminHeader}
}
</script>

<style scoped>

</style>