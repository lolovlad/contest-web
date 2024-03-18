<template>
  <div class="row">
    <div class="col s12">
      <h5>Итог тестирования {{reportChunk.state_test}}</h5>
      <h5>Количество баллов {{reportChunk.point_sum}}</h5>
      <h5>Последний номер теста {{reportChunk.number_test}}</h5>
      <h5>Количетсов тестов {{countTests}}</h5>
      <CastomTable class="block__table" v-if="countTests > 0" :headers="headerReportTable" :contents="contentReportTable"/>
    </div>
  </div>
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