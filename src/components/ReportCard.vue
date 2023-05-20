<template>
  <div class="block__main">
    <h3>Résultat du test {{reportChunk.state_test}}</h3>
    <h3>Nombre de points {{reportChunk.point_sum}}</h3>
    <h3>dernier numéro de test {{reportChunk.number_test}}</h3>
    <h3>Nombre d'essais {{countTests}}</h3>
    <castom-table class="block__table" v-if="countTests > 0" :headers="headerReportTable" :contents="contentReportTable"/>
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
      return ["Délai de mise en œuvre", "consommation de mémoire", "Verdict"]
    },
    contentReportTable(){
      const lenArr = this.reportChunk.list_test_report.length
      const content = []
      for(let i = 0; i < lenArr; i++){
        content.push({
          time: this.reportChunk.time[i],
          memory: this.reportChunk.memory[i],
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
  border: 1px solid black;
  margin: 20px;
  width: auto;
}
.block__table{
  margin: 30px auto;
  width: 90%;
}
</style>