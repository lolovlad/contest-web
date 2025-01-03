<template>
  <v-form @submit.prevent>
    <v-row>
      <v-col cols="12" md="10">
        <v-textarea
            label="Ответ"
            v-model="answerText"
            variant="filled"
            auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
    <AgreeButton @click="sendAnswer">Отправить</AgreeButton>

  </v-form>
  <v-snackbar
      :timeout="4000"
      v-model="snackbar"
  >
    {{message}}
  </v-snackbar>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
import AnswerService from "@/store/answer.service";
export default {
  name: "FormSendEditAnswer",
  data(){
    return{
      answerText: "",
      snackbar: false,
      message: ""
    }
  },
  components: {AgreeButton},
  methods: {
    sendAnswer(){
      AnswerService.sendEditAnswer(this.uuidContest, this.uuidTask, this.answerText)
          .then((response) => {
            this.$emit("sendAnswer", response)
            this.snackbar = true
            this.message = "Ответ отправлен"
            this.$nextTick(() => {
              this.answerText = ""

            })
          })
          .catch((error) => {
            console.log(error)
          })
    },
  }
}
</script>

<style scoped>

</style>