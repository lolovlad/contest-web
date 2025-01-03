<template>
  <v-card
      flat
  >
    <v-data-table-virtual
        :headers="(typeTask === 'programming') ? headersProgramming : headersTest"
        :items="answers"
        :loading="loading"
        item-value="uuid"
        @update:options="loadItem"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <AgreeButton @click="$router.push(`/contest/${idContest}/report/${idTask}/${item.id}`)">отчет</AgreeButton>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
import moment from "moment/moment";
import AnswerService from "@/store/answer.service";
export default {
  components: {AgreeButton},
  props: {
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
      headersProgramming: [
        { title: 'Время отправки', align: 'start', sortable: false, key: 'date_send',  value: item => {
            let dateNew = new Date(item.date_send)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }},
        { title: 'ID', key: 'id', align: 'start'},
        { title: 'Пользователь', key: 'name_user', align: 'start'},
        { title: '№ Задачи', key: 'name_task', align: 'start'},
        { title: 'Компилятор', key: 'name_compilation', align: 'start'},
        { title: 'Итог', key: "total", align: 'start' },
        { title: 'Время', key: "time", align: 'start' },
        { title: 'Память', key: "memory_size", align: 'start' },
        { title: '№ Тест', key: "number_test", align: 'start' },
        { title: 'Баллы', key: "points", align: 'start' },
        { title: 'Отчет', key: "actions", align: 'center' },
      ],
      headersTest: [
        { title: 'Время отправки', align: 'start', sortable: false, key: 'date_send',  value: item => {
            let dateNew = new Date(item.datetime_start)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }},
        { title: 'ID', key: 'id', align: 'start'},
        { title: 'Пользователь', key: 'name_user', align: 'start'},
        { title: '№ Задачи', key: 'name_task', align: 'start'},
        { title: 'Итог', key: "total", align: 'start' },
        { title: 'Баллы', key: "points", align: 'start' },
      ],
      answers: [],
      loading: true,
    }
  },
  methods: {
    loadItem(){
      this.loading = true
      AnswerService.getListAnswer(this.idContest, this.idTask)
          .then((answers) => {
            this.answers = answers
            this.$emit("updateShipments", this.answers.length)
            this.loading = false
          })
      }
  },
  mounted() {
    this.loadItem()
  },
  name: "TableAnswer"
}
</script>

<style scoped>
</style>