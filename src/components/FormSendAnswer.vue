<template>
  <div class="form__send">
    <combo-box :data="compilationComboBox" v-model="selectLanguage" v-if="isLoadCompilations"/>
    <file-input v-model:data="fileData" ref="fileInput"/>
    <AgreeButton @click="sendAnswer">Envoyer</AgreeButton>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
import FileInput from "@/components/UI/FileInput";
import ComboBox from "@/components/UI/ComboBox";
import axios from "axios";
export default {
  data(){
    return{
      selectLanguage: 1,
      compilations: null,
      isLoadCompilations: false,
      fileData: null
    }
  },
  computed: {
    compilationComboBox(){
      return this.compilations.map((val)=>{
        return{
          value: val.id,
          text: val.name
        }
      })
    },
  },
  methods:{
    async getCompilations(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/compilations/list_compilations`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }

      );
      this.compilations = response.data
      this.isLoadCompilations = true
    },
    sendAnswer(){
      this.$emit('sendAnswer', this.selectLanguage, this.fileData)
    },
    clearForm(){
      this.$refs.fileInput.clearSelected()
    }
  },
  mounted() {
    this.getCompilations()
  },
  name: "FormSendAnswer",
  components: {ComboBox, FileInput, AgreeButton}
}
</script>

<style scoped>
.form__send{
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>