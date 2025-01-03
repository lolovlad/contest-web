<template>
  <v-row class="mb-10">
    <v-col cols="12" md="12">
      <p class="text-h6">Итог тестирования {{reportChunk.state_test}}</p>
      <p class="text-h6">Количество баллов {{reportChunk.point_sum}}</p>
      <p class="text-h6">Последний номер теста {{reportChunk.number_test}}</p>
      <p class="text-h6">Количетсов тестов {{countTests}}</p>
      <CastomTable class="block__table" v-if="countTests > 0" :headers="headerReportTable" :contents="contentReportTable"/>
    </v-col>
  </v-row>
</template>

<script>
import CastomTable from "@/components/UI/CastomTable";
export default {
  components: {CastomTable},
  props: {
    reportChunk: {
      type: Object
    }
  },
  computed:{
    headerReportTable(){
      return ["Время выполениея", "потребление памяти", "Вердикт"]
    },
    contentReportTable(){
      const lenArr = this.reportChunk.list_test_report.length
      const content = []
      for(let i = 0; i < lenArr; i++){
        content.push({
          time: `${this.reportChunk.time[i]} ms`,
          memory: `${this.reportChunk.memory[i]} Mb`,
          listTestReport: this.reportChunk.list_test_report[i]
        })
      }
      return content
    },
    countTests(){
      return this.reportChunk.list_test_report.length
    }
  },
  name: "ReportCard"
}
</script>

<style scoped>
.block__main{
  padding: 20px;
  margin: 20px;
  width: auto;
}
.block__table{
  margin: 30px auto;
  width: 90%;
}
</style>