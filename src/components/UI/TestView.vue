<template>
  <v-divider/>
  <p class="text-left text-h4 pt-5">Номер теста {{numberTest}}</p>
  <v-row>
    <v-col cols="12" md="6">
      <p class="text-left text-h5 pt-5">Ввод</p>
      <p class="pt-3 pb-3">{{examplePrintVariable}}</p>
    </v-col>
    <v-col cols="12" md="6">
      <p class="text-left text-h5 pt-5">Ввод</p>
      <p class="pt-3 pb-3">{{examplePrintAnswer}}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props:{
    numberTest: {
      type: Number
    },
    fillingTypeVariable:{
      type: String
    },
    answer: {
      type: String
    }

  },
  computed: {
    examplePrintVariable(){
      const newVal = this.fillingTypeVariable
      return newVal
    },
    examplePrintAnswer(){
      const newVal = this.answer
      return newVal
    },
  },
  name: "TestView"
}
</script>

<style scoped>
</style>