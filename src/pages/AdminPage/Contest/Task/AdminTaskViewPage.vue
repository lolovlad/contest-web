<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <TaskTable @update="updateTask"
                   @delete="openDeleteWindow"
                   @settings="updateSettings"
                   ref="taskTable"/>
      </v-col>
    </v-row>
  </v-container>
  <FixedButton @click="$router.push(`/admin/task/add`)"/>
  <v-dialog
      v-model="dialogDelete"
      max-width="500"
      persistent
  >
    <v-card
        prepend-icon="mdi-close"
        text="При согласиии задание будет удалено"
        title="Вы действиетльно хотите удалить задание?"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialogDelete = false">
          Отмена
        </v-btn>

        <v-btn @click="deleteTask">
          Подтвердить
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
  <v-snackbar
      :timeout="4000"
      v-model="snackbar"
  >
    {{message}}
  </v-snackbar>
</template>

<script>

import FixedButton from "@/components/UI/FixedButton.vue";
import TaskTable from "@/components/Table/TaskTable.vue";
import TaskService from "@/store/task.service";
export default {
  name: "AdminTaskViewPage",
  components: {TaskTable, FixedButton},
  data(){
    return{
      countPage: null,
      taskLoad: false,
      tasks: [],
      dialogDelete: false,
      snackbar: false,
      message: "",
      targetDeleteTask: null
    }
  },
  methods: {
    updateTask(uuidTask){
      this.$router.push(`/admin/task/edit/${uuidTask}`)
    },

    openDeleteWindow(uuid){
      this.dialogDelete = true
      this.targetDeleteTask = uuid
    },

    deleteTask(){
      TaskService.deleteTask(this.targetDeleteTask)
          .then(()=>{
            this.message = "Задание удалено"
            this.dialogDelete = false
            this.$nextTick(()=>{
              this.snackbar = true
              this.$refs.taskTable.loadItem(1)
              this.targetDeleteTask = null
            })
          })
          .catch((e) => {
            this.snackbar = true
            this.message = e.response.message
          })
    },

    updateSettings(idTask){
      this.$router.push(`/admin/task/${idTask}/settings`)
    }
  }
}
</script>

<style scoped>
</style>