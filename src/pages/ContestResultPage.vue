<template>
  <div v-if="isLoadData" class="main__block">
    <h1>
      {{result.name_contest}}
    </h1>
    <TableResult :result="result"/>
  </div>
</template>

<script>
import axios from "axios";
import TableResult from "@/components/TableResult";

export default {
  components: {TableResult},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      result: null,
      isLoadData: false
    }
  },
  methods: {
    async getResult(){
      const response = await axios.get(
          `/contests/report_total/${this.idContest}`,
      );
      this.result = response.data
      this.isLoadData = true
    }
  },
  mounted() {
    this.getResult()
  },
  name: "ContestResultPage"
}
</script>

<style scoped>
.main__block{
  width: 90%;
  margin: auto;
  min-height: 80%;
  padding: 20px 0;
}
.main__block > h1{
  margin-bottom: 40px;
}
</style>