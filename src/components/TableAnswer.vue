<template>
  <div class="row">
    <div class="col s12">
      <table>
        <thead>
        <tr class="header">
          <td v-for="header in headersTableAnswer" :key="header">{{header}}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="answer in answers" class="main" :key="answer.id">
          <td>{{convertDate(answer.date_send)}}</td>
          <td>{{answer.id}}</td>
          <td>{{answer.name_user}}</td>
          <td>{{answer.name_task}}</td>
          <td v-if="isProgramming">{{answer.name_compilation}}</td>
          <td>{{answer.total}}</td>
          <td v-if="isProgramming">{{answer.time}}</td>
          <td v-if="isProgramming">{{answer.memory_size}} Mb</td>
          <td v-if="isProgramming">{{answer.number_test}}</td>
          <td>{{answer.points}}</td>
          <td v-if="isProgramming">
            <AgreeButton @click="$router.push(`/contest/${idContest}/report/${idTask}/${answer.id}`)">отчет</AgreeButton>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  components: {AgreeButton},
  props: {
    answers:{
      type: Array
    },
    idTask: {
      type: String,
      default: ""
    },
    idContest: {
      type: String,
      default: ""
    },
    typeTask: {
      type: String
    }
  },
  data(){
    return{

    }
  },
  computed:{
    headersTableAnswer(){
      let header = []
      if(this.typeTask === 'programming'){
        header = [
          "Время отправки",
          "ID",
          "Пользователь",
          "№ Задачи",
          "Компилятор",
          "Итог",
          "Время",
          "Память",
          "№ Тест",
          "Баллы",
          "Отчет",
        ]
      }else{
        header = [
          "Время отправки",
          "ID",
          "Пользователь",
          "№ Задачи",
          "Итог",
          "Баллы",
        ]
      }
      return header
    },
    options(){
      return{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    },
    isProgramming(){
      return this.typeTask === 'programming'
    }
  },
  methods: {
    convertDate(date){
      return new Date(date).toLocaleString("ru", this.options)
    }
  },
  name: "TableAnswer"
}
</script>

<style scoped>
</style>