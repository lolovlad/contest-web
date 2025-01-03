<script>
import UserService from "@/store/user.service";
import ContestService from "@/store/contest.service";

export default {
  name: "UserContestAddForm",
  props: {
    uuidContest: null
  },
  data: () => ({
    dialog: false,
    users: [],
    selectUsers: [],
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
      UserService.getUsersSearch(this.search, 5)
          .then((users) => {
            this.users = users
          })
    }
  },
  methods: {
    regUser(idUser){
      ContestService.registrationUser(idUser, this.uuidContest)
          .then(()=>{
            this.message = "Ученик добавлено"
            this.snackbar = true
            this.getUserList()
          })
          .catch((e) => {
            this.message = e.response.message
            this.snackbar = true
          })
    },
    delUser(idUser){
      ContestService.deleteUser(idUser, this.uuidContest)
          .then(()=>{
            this.message = "Ученик дален"
            this.snackbar = true
            this.getUserList()
          })
          .catch((e) => {
            this.message = e.response.message
            this.snackbar = true
          })
    },
    getUserList(){
      UserService.getUserToContest(this.uuidContest)
          .then((users) => {
            this.selectUsers = users
          })
    },
    fieldName(user){
      return `${user.sename} ${user.name[0]}. ${user.secondname[0]}.`
    },
    open(){
      this.dialog = true
    }
  },
  mounted() {
    this.getUserList()
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
              v-for="user in selectUsers"
              :key="user.user.id"
              class="py-1 pe-0"
              cols="auto"
          >
            <v-chip
                :disabled="loading"
                closable
                @click:close="delUser(user.user.id)"
            >
              {{ fieldName(user.user) }}
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
            <v-list v-if="users.length > 0">
              <template v-for="user in users" :key="user.id">
                <v-list-item
                    :disabled="loading"
                    @click="regUser(user.id)"
                >
                  <v-list-item-title v-text="fieldName(user)"/>
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