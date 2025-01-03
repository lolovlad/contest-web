<script>
import ContestService from "@/store/contest.service";
import moment from "moment";

export default {
  name: "ContestTable",
  data(){
    return{
      itemsPerPage: 20,
      headers: [
        { title: 'Название', align: 'start', sortable: false, key: 'name',  value: item => {
            if(item.name_contest !== null)
              return `${item.name_contest}`
            return "Нет"
          }
        },
        { title: 'Тип', key: 'type', align: 'start', value: item => {
            if(item.type === null)
              return "Нет"
            return item.type.description
          }
        },
        { title: 'Состояние', key: 'state_contest', align: 'start', value: item => `${item.state_contest.description}` },
        { title: 'Начало соревнования', key: 'datetime_start', align: 'start', value: item => {
            let dateNew = new Date(item.datetime_start)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }
        },
        { title: 'Конец Соревнования', key: 'datetime_end', align: 'start', value: item => {
            let dateNew = new Date(item.datetime_end)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }
        },
        { title: 'Действия', key: "actions", align: 'center' }
      ],
      contests: [],
      totalItems: 0,
      loading: true,
      search: '',
    }
  },
  methods: {
    loadItem({page}){
      this.loading = true
      if(this.search.length === 0){
        ContestService.getListContest(page).then(
            response => {
              console.log(response, "contestTable")
              this.contests = response.data
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
    editContest(uuid){
      this.$emit("editContest", uuid)
    },
  }
}
</script>

<template>
  <v-card
      title="Соревнование"
      flat
  >
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="contests"
        :items-length="totalItems"
        :loading="loading"
        item-value="uuid"
        @update:options="loadItem"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            class="me-2"
            size="small"
            @click="editContest(item.uuid)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

</style>