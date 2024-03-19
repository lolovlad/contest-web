<template>
  <div v-if="isLoaded">
    <SearchAnswer :users="contest.users" :tasks="contest.tasks" @search="searchAnswer"/>
    <div v-if="answers.length > 0">
      <TableAnswerAdmin
          :answers="answers"
          :id-contest="idContest"
          :id-task="targetUuidTask"/>
    </div>
  </div>
  <CastomLoader v-else/>
</template>

<script>
import SearchAnswer from "@/components/SearchAnswer";
import axios from "axios";
import M from "materialize-css";
import CastomLoader from "@/components/UI/CastomLoader";
import TableAnswerAdmin from "@/components/TableAnswerAdmin";
export default {
  name: "AdminContestControllerPage",
  components: {TableAnswerAdmin, CastomLoader, SearchAnswer},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      contest: null,
      answers: [],
      isLoaded: false,
      targetTypeTask: null,
      targetUuidTask: null
    }
  },
  methods: {
    async getContest(){
      await axios.get(
          `contests/contest_controller/${this.idContest}`
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            this.contest = response.data
            this.isLoaded = true
          }
      )
    },
    async searchAnswer(uuidTask, idUser){
      await axios.get(
          `answers/${this.idContest}/${uuidTask}/${idUser}/list`
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            //this.getTask(uuidTask)
            this.targetUuidTask = uuidTask
            this.answers = response.data
          }
      )
    },

    async getTask(uuidTask){
      const response = await axios.get(
          `tasks/get_task/${uuidTask}`
      )
      this.targetTypeTask = response.data.targetTypeTask.name
    }
  },
  mounted() {
    this.getContest()
  }
}
</script>

<style scoped>

</style>