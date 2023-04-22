<template>
  <table>
    <thead>
    <tr class="header">
      <td v-for="(header, id) in header" :key="id">{{header}}</td>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(user, id) in this.result.users" class="main" :key="id">
        <td>{{id + 1}}</td>
        <td>{{user.name}}</td>
        <td v-for="(total, id) in user.total" :key="id">{{total}}</td>
        <td>{{user.sum_point}}</td>
      </tr>
    </tbody>
  </table>
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
      const head = ["№"]
      if(this.result.type_contest === 1)
        head.push("Участник")
      else
        head.push("Название команды")
      for(let i = 1; i <= this.result.count_task; i++){
        head.push(`Задание ${i}`)
      }
      head.push(`Сумма баллов`)
      return head
    },
    content(){
      const content = []
      for(let user of this.result.users){
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
.header{
  font-size: 20px;
  text-align: left;
  font-weight: bold;
}
.header td{
  padding: 0 10px 10px 0;
}
.main{
  font-size: 18px;
  text-align: left;
}
.main td{
  padding: 0 10px 10px 0;
}
</style>