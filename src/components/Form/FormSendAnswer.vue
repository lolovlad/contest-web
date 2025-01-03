<template>
    <v-form @submit.prevent>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
              v-model="selectLanguage"
              :items="this.compilations"
              item-title="name"
              item-value="id"
              label="Язык программирования"
              variant="underlined"
              v-if="isLoadCompilations"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-file-input
              v-model="fileData"
              label="Ответ"
              show-size
              prepend-icon="mdi-border-color"
          ></v-file-input>
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
import CompilationService from "@/store/compilation.service";
import AnswerService from "@/store/answer.service";
export default {
  props: {
    uuidContest: null,
    uuidTask: null,
  },
  data(){
    return{
      selectLanguage: 1,
      compilations: null,
      isLoadCompilations: false,
      fileData: null,
      snackbar: false,
      message: ""
    }
  },
  methods:{
    getCompilations(){
      CompilationService.getCompilations()
          .then((compil) => {
            this.compilations = compil
            this.isLoadCompilations = true
          })
    },
    sendAnswer(){
      AnswerService.sendAnswer(this.uuidContest, this.uuidTask, this.fileData, this.selectLanguage)
          .then((response) => {
            this.$emit("sendAnswer", response)
            this.snackbar = true
            this.message = "Ответ отправлен"
            this.$nextTick(() => {
              this.fileData = null

            })
          })
          .catch((error) => {
            console.log(error)
          })
    },
    clearForm(){
      this.$refs.fileInput.clearSelected()
    }
  },
  mounted() {
    this.getCompilations()
  },
  name: "FormSendAnswer",
  components: {AgreeButton}
}
</script>

<style scoped>
</style>