<template>
    <form @submit.prevent>
      <div class="row">
        <div class="col s6">
          <ComboBox :data="compilationComboBox" v-model="selectLanguage" v-if="isLoadCompilations"/>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <FileInput v-model:data="fileData" ref="fileInput"/>
        </div>
      </div>

      <AgreeButton @click="sendAnswer">Отправить</AgreeButton>

    </form>
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
          `compilations/list_compilations`
      );
      this.compilations = response.data
      this.isLoadCompilations = true
    },
    sendAnswer(){
      this.$emit('sendAnswer', this.selectLanguage, this.$refs.fileInput.bytesData)
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
</style>