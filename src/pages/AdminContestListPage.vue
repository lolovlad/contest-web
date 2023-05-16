<template>
  <h1>Contest</h1>
  <FixedButton @click="$router.push(`/admin/contest/add`)"/>
</template>

<script>
import FixedButton from "@/components/UI/FixedButton";
export default {
  name: "AdminContestListPage",
  components: {FixedButton}
}
</script>

<style scoped>

</style>