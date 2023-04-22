<template>
  <div class="test__main">
    <h2>Номер теста {{numberTest}}</h2>
    <div class="test__body">
      <div class="test__chunk">
        <h4>Ввод</h4>
        <p v-html="examplePrintVariable"></p>
      </div>
      <div class="test__chunk">
        <h4>Ввод</h4>
        <p v-html="examplePrintAnswer"></p>
      </div>
    </div>
  </div>
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
      const newVal = this.fillingTypeVariable.replaceAll("\n", "<br />")
      return newVal
    },
    examplePrintAnswer(){
      const newVal = this.answer.replaceAll("\n", "<br />")
      return newVal
    },
  },
  name: "TestView"
}
</script>

<style scoped>
.test__main{
  font-size: 20px;
  margin-bottom: 30px;
}
.test__body{
  display: flex;
  padding: 5px;
  min-width: 80%;
}
.test__chunk{
  min-width: 25%;
}
.test__chunk h4{
  margin-bottom: 15px;
}
.test__main h2{
  margin-bottom: 30px;
}
</style>