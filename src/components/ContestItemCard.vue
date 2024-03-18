<template>
  <div class="col s4">
    <div class="card">
      <div class="card-image">
        <img src="../static/solo_olimp.jpg">
      </div>
      <div class="card-content">
        <span class="card-title">{{contest.contest.name_contest}}</span>
        <p>Тип соревнования: {{contest.contest.type.description}}</p>
        <p>Состояние: {{contest.contest.state_contest.description}}</p>
        <agree-button @click="$router.push(`/contest/${contest.contest.uuid}`)">Перейти в контест</agree-button>
      </div>
    </div>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  components: {AgreeButton},
  props:{
    contest: Object
  },

  name: "ContestItemCard"
}
</script>

<style scoped>
</style>