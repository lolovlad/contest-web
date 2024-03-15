<template>
  <div v-if="taskLoad">
    <div v-if="tasks.length > 0">
      <TaskList class="list">
        <TaskCardView v-for="(task, index) in tasks" :key="index" :task="task"
                      @update="updateTask(task.uuid)"
                      @delete="deleteTask(task.uuid)"
                      @settings="updateSettings(task.uuid)"
        />
      </TaskList>
      <CastomPagination :countPage="countPage" class="pag" @updatePage="getListTask"/>
    </div>
    <div v-else>
      <h1>Нет зарегистрированных заданий</h1>
    </div>
  </div>
  <castom-loader  v-else/>
  <FixedButton @click="$router.push(`/admin/task/add`)"/>
</template>

<script>

import FixedButton from "@/components/UI/FixedButton";
import TaskList from "@/components/TaskList";
import TaskCardView from "@/components/TaskCardView";
import CastomPagination from "@/components/CastomPagination";
import axios from "axios";
import CastomLoader from "@/components/UI/CastomLoader";
import M from "materialize-css";
export default {
  name: "AdminTaskViewPage",
  components: {CastomLoader, TaskCardView, TaskList, FixedButton, CastomPagination},
  data(){
    return{
      countPage: null,
      taskLoad: false,
      tasks: []
    }
  },
  methods: {
    async getListTask(page=1){
      const response = await axios.get(
          `tasks/get_list_task/?num_page=${page}`,
      );
      this.tasks = response.data
      this.countPage = parseInt(response.headers["x-count-page"])
      console.log(this.tasks )
      this.taskLoad = true
    },

    updateTask(idTask){
      this.$router.push(`/admin/task/edit/${idTask}`)
    },

    async deleteTask(idTask){
      await axios.delete(
          `tasks/${idTask}`
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            if(response.status === 200){
              M.toast({html: "Задание удалено"})
              this.getListTask()
            }
          }
      )
    },

    updateSettings(idTask){
      this.$router.push(`/admin/task/${idTask}/settings`)
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