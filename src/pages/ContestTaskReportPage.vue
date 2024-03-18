<template>
  <AgreeButton @click="$router.go(-1)">Назад</AgreeButton>
  <div v-if="isLoadReport" class="container">
    <ReportCard v-for="(repChunk, idObj) in report.list_report" :report-chunk="repChunk" :key="idObj"/>
  </div>
</template>

<script>
import axios from "axios";
import ReportCard from "@/components/ReportCard";
import AgreeButton from "@/components/UI/AgreeButton";

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
    async getReport(){
      const response = await axios.get(
          `user_contest_view/get_report/${this.idAnswer}`,
      )
      console.log(response.data)
      this.report = response.data.report
      this.isLoadReport = true
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