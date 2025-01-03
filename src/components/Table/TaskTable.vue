<script>
import TaskService from "@/store/task.service";

export default {
  name: "TaskTable",
  data(){
    return{
      itemsPerPage: 20,
      headers: [
        { title: 'Название', align: 'start', sortable: false, key: 'name_task',  value: item => {
            if(item.name_task !== null)
              return `${item.name_task}`
            return "Нет"
          }
        },
        { title: 'Сложность', key: 'complexity', align: 'start', value: item => {return item.complexity}},
        { title: 'Тип', key: 'type_task', align: 'start', value: item => `${item.type_task.description}` },
        { title: 'Действия', key: "actions", align: 'center' }
      ],
      tasks: [],
      totalItems: 0,
      loading: true,
      search: '',
    }
  },
  methods: {
    loadItem({page}){
      this.loading = true
      if(this.search.length === 0){
        TaskService.getListTask(page).then(
            response => {
              console.log(response, "taskTable")
              this.tasks = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },
    update(uuid){
      this.$emit("update", uuid)
    },
    deleteTask(uuid){
      this.$emit("delete", uuid)
    },
    settingsTask(uuid){
      this.$emit("settings", uuid)
    }
  },
}
</script>

<template>
  <v-card
      title="Задания"
      flat
  >
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="tasks"
        :items-length="totalItems"
        :loading="loading"
        item-value="uuid"
        @update:options="loadItem"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            class="me-2"
            size="small"
            @click="deleteTask(item.uuid)"
        >
          mdi-delete
        </v-icon>
        <v-icon
            class="me-2"
            size="small"
            @click="update(item.uuid)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            class="me-2"
            size="small"
            @click="this.$emit('settings', item.uuid)"
        >
          mdi-cog
        </v-icon>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

</style>