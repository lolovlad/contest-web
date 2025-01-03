<script>
import ContestService from "@/store/contest.service";
import TaskService from "@/store/task.service";

export default {
  name: "TaskContestAddForm",
  props: {
    uuidContest: null
  },
  data: () => ({
    dialog: false,
    tasks: [],
    selectTasks: [],
    loading: false,
    search: '',
    selected: [],

    snackbar: false,
    message: ""
  }),
  computed: {
    allSelected() {
      return this.selected.length === 5
    },
  },
  watch: {
    selected() {
      this.search = ''
    },
    search(){
      TaskService.getTasksSearch(this.search, 5)
          .then((tasks) => {
            this.tasks = tasks
          })
    }
  },
  methods: {
    regTask(uuidTask){
      ContestService.registrationTask(uuidTask, this.uuidContest)
          .then(()=>{
            this.message = "Задание добавлено"
            this.snackbar = true
            this.getTaskList()
          })
          .catch((e) => {
            this.message = e.response.message
            this.snackbar = true
          })
    },
    delTask(uuidTask){
      ContestService.deleteTask(uuidTask, this.uuidContest)
          .then(()=>{
            this.message = "Задание дален"
            this.snackbar = true
            this.getTaskList()
          })
          .catch((e) => {
            this.message = e.response.message
            this.snackbar = true
          })
    },
    getTaskList(){
      TaskService.getTaskToContest(this.uuidContest)
          .then((tasks) => {
            this.selectTasks = tasks
          })
    },
    open(){
      this.dialog = true
    }
  },
  mounted() {
    this.getTaskList()
  }
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      max-width="500"
  >
    <v-card
    >
      <v-container>
        <v-row align="center" justify="start">
          <v-col
              v-for="task in selectTasks"
              :key="task.task.uuid"
              class="py-1 pe-0"
              cols="auto"
          >
            <v-chip
                :disabled="loading"
                closable
                @click:close="delTask(task.task.uuid)"
            >
              {{ task.task.name_task }}
            </v-chip>

          </v-col>

          <v-col v-if="!allSelected" cols="12">
            <v-text-field
                ref="searchField"
                v-model="search"
                label="Поиск"
                hide-details
                single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider v-if="!allSelected"></v-divider>
        <v-row>
          <v-col cols="12" md="12">
            <v-list v-if="tasks.length > 0">
              <template v-for="task in tasks" :key="task.uuid">
                <v-list-item
                    :disabled="loading"
                    @click="regTask(task.uuid)"
                >
                  <v-list-item-title v-text="task.name_task"/>
                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
  <v-snackbar
      :timeout="4000"
      v-model="snackbar"
  >
    {{message}}
  </v-snackbar>
</template>

<style scoped>

</style>