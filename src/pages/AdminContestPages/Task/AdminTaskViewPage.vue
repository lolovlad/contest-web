<template>
  <TaskList class="list">
    <TaskCardView v-for="(task, index) in tasks" :key="index" :task="task"
                  @update="updateTask(task.id)"
                  @delete="deleteTask(task.id)"
                  @settings="updateSettings(task.id)"
    />
  </TaskList>
  <FixedButton @click="$router.push(`/admin/contest/${idContest}/task/add`)"/>
</template>

<script>

import FixedButton from "@/components/UI/FixedButton";
import TaskList from "@/components/TaskList";
import TaskCardView from "@/components/TaskCardView";
import axios from "axios";
export default {
  name: "AdminTaskViewPage",
  components: {TaskCardView, TaskList, FixedButton},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      tasks: []
    }
  },
  methods: {
    async getListTask(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/get_list_task/${this.idContest}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      );
      this.tasks = response.data
    },
    updateTask(idTask){
      this.$router.push(`/admin/contest/${this.idContest}/task/edit/${idTask}`)
    },
    async deleteTask(idTask){
      const response = await axios.delete(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/tasks/${idTask}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      await this.getListTask()
    },
    updateSettings(idTask){
      this.$router.push(`/admin/contest/${this.idContest}/task/${idTask}/settings`)
    }
  },
  mounted() {
    this.getListTask()
  }
}
</script>

<style scoped>
.list{
  width: 70%;
  margin: 50px auto;
}
</style>