<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <ContestTable @editContest="openToolContest" ref="contestTable"/>
      </v-col>
    </v-row>
    <FixedButton @click="$router.push(`/admin/contest/add`)"/>
  </v-container>
  <v-navigation-drawer
      v-model="drawel"
      location="right"
      temporary
  >
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-pencil" title="Редактировать" @click="editContest"></v-list-item>
      <v-list-item prepend-icon="mdi-close" title="Удалить" @click="dialogDelete = true"></v-list-item>
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-file-outline" title="Задания" @click="openModelWindowTask"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Добавить пользователей" @click="openModelWindowUser"></v-list-item>
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-application-edit-outline" title="Ручная проверка" @click="controllerContest"></v-list-item>
      <v-list-item prepend-icon="mdi-newspaper" title="Отчет" @click="tableContestResult"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-dialog
      v-model="dialogDelete"
      max-width="500"
      persistent
  >
    <v-card
        prepend-icon="mdi-close"
        text="При согласиии соревнование будет удалено"
        title="Вы действиетльно хотите удалить соревнование?"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialogDelete = false">
          Отмена
        </v-btn>

        <v-btn @click="deleteContest">
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
  <UserContestAddForm ref="userContestForm" :uuid-contest="targetContest" v-if="targetContest !== null"/>
  <TaskContestAddForm ref="taskContestForm" :uuid-contest="targetContest" v-if="targetContest !== null" />
</template>

<script>
import ContestTable from "@/components/Table/ContestTable.vue";
import ContestService from "@/store/contest.service";
import FixedButton from "@/components/UI/FixedButton.vue";
import UserContestAddForm from "@/components/Form/UserContestAddForm.vue";
import TaskContestAddForm from "@/components/Form/TaskContestAddForm.vue";
export default {
  name: "AdminContestListPage",
  components: {TaskContestAddForm, UserContestAddForm, FixedButton, ContestTable},
  data(){
    return{
      drawel: false,
      targetContest: null,
      dataChip: [{tag: 'Apple'}],
      dialogDelete: false,
      snackbar: false,
      message: ""
    }
  },
  methods: {
    openToolContest(uuid){
      this.targetContest = uuid
      this.drawel = true
    },
    editContest(){
      this.$router.push(`/admin/contest/edit/${this.targetContest}`)
    },
    deleteContest(){
      ContestService.deleteContest(this.targetContest).then(() => {
        this.message = "Соревнование удалено"
        this.snackbar = true
        this.dialogDelete = false
        this.drawel = false
        this.$nextTick(()=>{
          this.snackbar = true
          this.$refs.contestTable.loadItem(1)
        })
      }).catch((e) => {
        this.message = e.response.message
        this.snackbar = true
      })
    },
    tableContestResult(){
      this.$router.push(`/admin/contest/result/${this.targetContest}`)
    },
    controllerContest(){
      this.$router.push(`/admin/contest/controller/${this.targetContest}`)
    },
    openModelWindowTask(){
      this.$refs.taskContestForm.open()
    },
    openModelWindowUser(){
      this.$refs.userContestForm.open()
    },
  }
}
</script>

<style scoped>
</style>