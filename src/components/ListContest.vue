<template>
  <div class="row">
    <ContestItemCard
        v-for="contest in contests"
        :contest=contest
        v-bind:key="contest.id"
    ></ContestItemCard>
  </div>
</template>

<script>
import ContestItemCard from "@/components/ContestItemCard";
export default {
  components: {ContestItemCard},
  props:{
    contests: {
      type: Array,
      required: true
    }
  },
  name: "ListContest"
}
</script>

<style scoped>
</style>