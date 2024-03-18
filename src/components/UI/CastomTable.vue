<template>
  <div class="row">
    <div class="col s10">
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
    </div>
  </div>
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

</style>