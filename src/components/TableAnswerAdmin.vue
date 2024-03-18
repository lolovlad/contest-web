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
          <td>{{answer.total}}</td>
          <td>{{answer.time}}</td>
          <td>{{answer.memory_size}} Mb</td>
          <td>{{answer.number_test}}</td>
          <td>{{answer.points}}</td>
          <td>
            <AgreeButton @click="$router.push(`/admin/contest/answer/${idContest}/${idTask}/${answer.id}`)">Редактировать</AgreeButton>
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
  name: "TableAnswerAdmin",
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
    }
  },
  computed:{
    headersTableAnswer(){
      const header = [
          "Время отправки",
          "ID",
          "Вердикт",
          "Время",
          "Память",
          "Номер теста",
          "Баллы",
          ""
      ]
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
  },
  methods: {
    convertDate(date){
      return new Date(date).toLocaleString("ru", this.options)
    }
  },
}
</script>

<style scoped>

</style>