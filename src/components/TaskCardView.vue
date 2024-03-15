<template>
  <div class="col s12 m6">
    <div class="card light-blue darken-3">
      <div class="card-content white-text">
        <span class="card-title">{{task.name_task}}</span>
        <p>{{task.complexity}}</p>
        <p>{{task.type_task.description}}</p>
      </div>
      <div class="card-action">
        <agree-button @click="$emit('update')">Редактировать</agree-button>
        <agree-button v-if="task.type_task.name === 'programming'" @click="$emit('settings')">Настройки среды</agree-button>
        <agree-button @click="$emit('delete')">Удалить</agree-button>
      </div>
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

</style>