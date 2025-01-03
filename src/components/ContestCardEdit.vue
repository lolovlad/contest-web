<template>
  <div class="col s4">
    <div class="card">
      <div class="card-image">
        <img src="../assets/solo_olimp.jpg">
        <a class="btn-floating halfway-fab waves-effect waves-light red darken-4" @click="$emit('edit', contest)"><i class="material-icons">edit</i></a>
      </div>
      <div class="card-content">
        <span class="card-title">{{contest.name_contest}}</span>
        <p>Тип соревнования: {{contest.type.description}}</p>
        <p>Состояние: {{contest.state_contest.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContestCardEdit",
  props:{
    contest:{
      type: Object,
      required: true
    }
  },
  computed: {

  },
}
</script>

<style scoped>
.img > img{
  height: 100%;
  width: 100%;
}
</style>