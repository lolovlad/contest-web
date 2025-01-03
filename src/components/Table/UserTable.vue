<script>
import UserService from "@/store/user.service";

export default {
  name: "UserTable",
  data(){
    return{
      itemsPerPage: 20,
      headers: [
        { title: 'ФИО', align: 'start', sortable: false, key: 'name',  value: item => {
            if(item.name !== null)
              return `${item.secondname} ${item.name[0]}. ${item.sename[0]}.`
            return "Нет"
          }
        },
        { title: 'Login', key: 'login', align: 'start', value: item => {
            if(item.login === null)
              return "Нет"
            return item.login
          }
        },
        { title: 'Роль', key: 'type', align: 'start', value: item => `${item.type.name}` },
        { title: 'Ученик', key: 'edu_organization', align: 'start', value: item => {
            if(item.edu_organization === null)
              return "Нет"
            return `${item.stage_edu} ${item.edu_organization.type_organizations.postfix}`
          }
        },
        { title: 'Действия', key: "actions", align: 'center' }
      ],
      users: [],
      totalItems: 0,
      loading: true,
      search: '',
    }
  },
  methods: {
    loadItem({page}){
      this.loading = true
      if(this.search.length === 0){
        UserService.getPageUser(page).then(
            response => {
              console.log(response, "userTable")
              this.users = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item-user"])
              this.itemsPerPage = parseInt(response.headers["x-count-item-user"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },
    updateUser(id){
      this.$emit("updateUser", id)
    },
    deleteUser(id){
      this.$emit("deleteUser", id)
    },
  },
}
</script>

<template>
  <v-card
      title="Пользователи"
      flat
  >
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="users"
        :items-length="totalItems"
        :loading="loading"
        item-value="uuid"
        @update:options="loadItem"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            class="me-2"
            size="small"
            @click="deleteUser(item.id)"
        >
          mdi-delete
        </v-icon>
        <v-icon
            class="me-2"
            size="small"
            @click="updateUser(item.id)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

</style>