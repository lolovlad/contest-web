<template>
  <div class="row form">
    <form class="col s12" @submit.prevent>
      <div class="row">
        <div class="col s5">
          <ComboBox :data="publishedTask"
                    v-model="idTask"/>
        </div>
        <div class="col s4">
          <ComboBox :data="publishedUser"
                    v-model="idUser"/>
        </div>
        <div class="col s3">
          <AgreeButton @click="search">Найти</AgreeButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ComboBox from "@/components/UI/ComboBox";
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  name: "SearchAnswer",
  components: {AgreeButton, ComboBox},
  props:{
    users: Array,
    tasks: Array
  },
  data(){
    return{
      idTask: null,
      idUser: null
    }
  },
  computed: {
    publishedTask(){
      return this.tasks.map((data) => {
        return {
          value: data.uuid,
          text: data.name_task
        }
      })
    },
    publishedUser(){
      return this.users.map((data) => {
        return {
          value: data.id,
          text: `${data.sename} ${data.name} ${data.secondname}`
        }
      })
    }
  },
  methods:{
    isSelected(){
      return this.idTask !== null && this.idUser !== null
    },
    search(){
      if(this.isSelected()){
        this.$emit("search", this.idTask, this.idUser)
      }
    }
  }
}
</script>

<style scoped>
.form{
  margin-top: 40px;
}
</style>