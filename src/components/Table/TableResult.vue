<template>
  <v-table>
    <thead>
    <tr class="header">
      <th v-for="(header, id) in header" :key="id" :class="header[1]">{{header[0]}}</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(user, id) in this.result.rows" class="main" :key="id">
        <td>{{id + 1}}</td>
        <td>{{user.FIO}}</td>
        <td v-for="(total, id) in user.task" :key="id">{{total.points}}</td>
        <td class="text-right">{{user.sum_point}}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  components: {},
  props:{
    result: {
      type: Object
    }
  },
  computed:{
    header(){
      const head = [["№", "text-left"]]
      head.push(["Участник", "text-left"])

      for(let task of Object.values(this.result.rows[0].task)){
        head.push([task.name, "text-left"])
      }
      head.push([`Сумма баллов`, "text-right"])
      return head
    },
    content(){
      const content = []
      for(let user of this.result.rows){
        console.log(user)
        const entity = {}
        entity["name"] = user.name
        for(let key in user.total){
          entity[key] = user.total[key]
        }
        entity["sum_point"] = user.sum_point
        content.push(entity)
      }
      return content
    }
  },
  name: "TableResult"
}
</script>

<style scoped>
</style>