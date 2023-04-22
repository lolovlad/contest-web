<template>
  <table>
    <thead>
      <tr class="header">
        <td v-for="header in headers" :key="header">{{header}}</td>
      </tr>
    </thead>
    <tbody>
    <tr v-for="(content, idElem) in contents" :key="idElem" class="main">
      <td v-for="(data, idElemDot) in Object.values(content)" :key="idElemDot">{{data}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array
    },
    contents:{
      type: Array
    }
  },
  name: "CastomTable"
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}

tr{
  border-bottom: 1px solid #b1b1b1;
}

.header{
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #b1b1b1;
}
.header td{
  padding: 15px;
}
.main{
  font-size: 18px;
  text-align: left;
}
.main td{
  padding: 15px;
}
</style>