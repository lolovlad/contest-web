<template>
  <admin-header/>
  <v-main>
    <router-view>

    </router-view>
  </v-main>
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