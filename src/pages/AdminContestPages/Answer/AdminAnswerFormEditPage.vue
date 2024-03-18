<template>
  <div v-if="isLoad">
    <h3>id: {{answer.id}}</h3>
    <div class="row">
      <div class="col s12">
        <textarea disabled class="cus__textarea" v-model="answer.file_answer"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col s6">
        <TextInput v-model="answer.points"/>
      </div>
      <div class="col s6">
        <AgreeButton @click="savePoint">Сохранить</AgreeButton>
      </div>
    </div>
  </div>
  <CastomLoader v-else/>
</template>

<script>
import TextInput from "@/components/UI/TextInput";
import AgreeButton from "@/components/UI/AgreeButton";
import axios from "axios";
import M from "materialize-css";
import CastomLoader from "@/components/UI/CastomLoader";
export default {
  name: "AdminAnswerFormEditPage",
  components: {CastomLoader, AgreeButton, TextInput},
  data(){
    return{
      uuidContest: this.$route.params.id_contest,
      uuidTask: this.$route.params.id_task,
      idAnswer: this.$route.params.id_answer,
      answer: null,
      fileContest: "",
      isLoad: false
    }
  },
  methods: {
    async getReviewAnswer(){
      await axios.get(`answers/review/${this.idAnswer}`).
      catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            this.answer = response.data
            this.isLoad = true
         }
      )
    },
    async savePoint(){
      await axios.put(`answers/review/point/${this.idAnswer}`, {
        "points": this.answer.points
      }).
      catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "оценка сохранена"})
            this.getReviewAnswer()
      }
      )
    }
  },
  mounted() {
    this.getReviewAnswer()
  }
}
</script>

<style scoped>
.cus__textarea{
  height: 400px;
}
</style>