<template>
  <div class="card">
    <div class="card__content">
      <span class="card__title">{{task.name_task}}</span>
      <p>{{task.type_task}}</p>
    </div>
    <div class="card__btn__menu">
      <agree-button @click="$emit('update')">Modifier</agree-button>
      <agree-button @click="$emit('settings')">Paramètres d'environnement</agree-button>
      <agree-button @click="$emit('delete')">Supprimer</agree-button>
    </div>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  name: "TaskCardView",
  components: {AgreeButton},
  props: {
    task: {
      type: Object
    }
  }
}
</script>

<style scoped>
.card{
  display: flex;
  justify-content: space-between;
  height: 150px;
  background: #0273bb;
  border-radius: 7px;
  color: white;
  padding: 20px;
}
.card__btn__menu{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 7px;
}
.card__content{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>