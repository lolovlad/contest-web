<template>
  <form @submit.prevent>
    <div class="row">
      <div class="col s10">
        <textarea class="materialize-textarea" v-model="answerText" ref="textArea"></textarea>
      </div>
    </div>
    <AgreeButton @click="sendAnswer">Отправить</AgreeButton>

  </form>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
import M from "materialize-css"
export default {
  name: "FormSendEditAnswer",
  data(){
    return{
      answerText: ""
    }
  },
  components: {AgreeButton},
  methods: {
    sendAnswer(){
      this.$emit('sendAnswer', this.answerText)
    },
    clearForm(){
      this.answerText = ""
      M.textareaAutoResize(this.$refs.textArea);
    }
  }
}
</script>

<style scoped>

</style>