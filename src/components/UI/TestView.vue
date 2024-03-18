<template>
  <div class="divider"></div>
  <h4>Номер теста {{numberTest}}</h4>
  <div class="test__body">
    <div class="test__chunk">
      <h5 class="text-bold">Ввод</h5>
      <p>{{examplePrintVariable}}</p>
    </div>
    <div class="test__chunk">
      <h5 class="text-bold">Ввод</h5>
      <p>{{examplePrintAnswer}}</p>
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

.top__margin{
  margin-top: 40px;
}

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
.test__chunk > p{
  white-space: pre;
}

.text-bold{
  font-weight: 500;
}
</style>