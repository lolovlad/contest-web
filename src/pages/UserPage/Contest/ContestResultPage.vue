<template>
  <v-container class="pl-15" v-if="isLoadData">
    <v-row class="mb-10">
      <v-col cols="12" md="12">
        <p class="text-h3 text-center">{{result.name_contest}}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TableResult :result="result"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import TableResult from "@/components/Table/TableResult.vue";

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