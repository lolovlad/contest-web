<template>
  <ul class="collection">
    <li class="collection-item" v-for="obj in tasks" :key="obj.task.uuid">
      <div>
        {{obj.task.name_task}}

        <a v-if="obj.in_contest" @click="$emit('deleteTaskInContest', obj.task.uuid)" class="secondary-content"><i class="material-icons">close</i></a>
        <a v-else @click="$emit('addTaskInContest', obj.task.uuid)" class="secondary-content"><i class="material-icons">add</i></a>
      </div>
    </li>
  </ul>
  <CastomPagination :countPage="countPage" class="pag" @updatePage="getListTask"/>
</template>

<script>
import CastomPagination from "@/components/CastomPagination";
import axios from "axios";
export default {
  name: "RegistrateTask",
  components: {CastomPagination},
  props: {
    uuid_contest: String
  },
  data(){
    return{
      tasks: [],
      countPage: null,
    }
  },
  methods: {
    async getListTask(numPage=1){
      const response = await axios.get(
          `tasks/task_flag_contest/${this.uuid_contest}?number_page=${numPage}`
      );
      this.countPage = parseInt(response.headers["x-count-page"])
      this.tasks = response.data
    }
  }
}
</script>

<style scoped>

</style>