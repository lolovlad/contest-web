<template>
  <div v-if="isLoadData" class="main__block">
    <h1>
      {{result.name_contest}}
    </h1>
    <TableResult :result="result"/>
  </div>
</template>

<script>
export default {
  name: "AdminContestResultPage",
  data(){
    return{
      uuidContest: this.$route.params.id_contest,
      result: null,
      isLoadData: false
    }
  }
}
</script>

<style scoped>

</style>