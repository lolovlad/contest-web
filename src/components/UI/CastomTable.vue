<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header" class="text-left">{{header}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(content, idElem) in contents" :key="idElem" class="main">
        <td v-for="(data, idElemDot) in Object.values(content)" :key="idElemDot">{{data}}</td>
      </tr>
    </tbody>
  </v-table>
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