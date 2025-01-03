<template>
  <div v-if="isLoadData">
    <p>
      {{result.name_contest}}
    </p>
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