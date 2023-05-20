<template>
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
        <td>{{answer.name_compilation}}</td>
        <td>{{answer.total}}</td>
        <td>{{answer.time}}</td>
        <td>{{answer.memory_size}} Mb</td>
        <td>{{answer.number_test}}</td>
        <td>{{answer.points}}</td>
        <td><agree-button @click="$router.push(`/contest/${idContest}/report/${idTask}/${answer.id}`)">rapport</agree-button></td>
      </tr>
    </tbody>
  </table>
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
      type: Number,
      default: 0
    },
    idContest: {
      type: Number,
      default: 0
    }
  },
  data(){
    return{

    }
  },
  computed:{
    headersTableAnswer(){
      return [
        "Délai d'expédition",
        "ID",
        "Utilisateur",
        "№ Tâches",
        "Compilateur",
        "Résultat",
        "Temps",
        "Mémoire",
        "№ Test",
        "Points",
        "Rapport",
      ]
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
.header{
  font-size: 20px;
  text-align: left;
  font-weight: bold;
}
.header td{
  padding: 0 10px 10px 0;
}
.main{
  font-size: 18px;
  text-align: left;
}
.main td{
  padding: 0 10px 10px 0;
}
</style>