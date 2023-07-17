<template>
  <div class="test__main">
    <h2>Numéro d'épreuve {{numberTest}}</h2>
    <div class="test__body">
      <div class="test__chunk">
        <h4>Saisir</h4>
        <p>{{examplePrintVariable}}</p>
      </div>
      <div class="test__chunk">
        <h4>Conclusion</h4>
        <p>{{examplePrintAnswer}}</p>
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
</style>