<template>
  <agree-button @click="$router.go(-1)">Dos</agree-button>
  <div v-if="isLoadReport">
    <report-card v-for="(repChunk, idObj) in report.list_report" :report-chunk="repChunk" :key="idObj"/>
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
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/user_contest_view/get_report/${this.idAnswer}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
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