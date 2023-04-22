<template>
  <div class="list__contest">
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
.list__contest{
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px
}
</style>