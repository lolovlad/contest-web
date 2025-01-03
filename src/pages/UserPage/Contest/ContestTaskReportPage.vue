<template>
  <v-container class="pl-15">
    <v-row>
      <v-col cols="12" md="12" class="mb-15">
        <AgreeButton @click="$router.go(-1)">Назад</AgreeButton>
      </v-col>
    </v-row>
    <div v-if="isLoadReport">
      <ReportCard v-for="(repChunk, idObj) in report.list_report" :report-chunk="repChunk" :key="idObj"/>
    </div>
  </v-container>
</template>

<script>
import ReportCard from "@/components/ReportCard.vue";
import AgreeButton from "@/components/UI/AgreeButton.vue";
import AnswerService from "@/store/answer.service";

export default {
  components: {AgreeButton, ReportCard},
  data(){
    return {
      idTask: this.$route.params.id_task,
      idAnswer: this.$route.params.id_answer,
      report: null,
      isLoadReport: false
    }
  },
  methods: {
    getReport(){
      AnswerService.getReportAnswer(this.idAnswer)
          .then((report) => {
            this.report = report.report
            this.isLoadReport = true
          })
    }
  },
  mounted() {
    this.getReport()
  },
  name: "ContestTaskReportPage"
}
</script>

<style scoped>

</style>