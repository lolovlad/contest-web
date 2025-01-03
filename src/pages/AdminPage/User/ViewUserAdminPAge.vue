<script>
import UserTable from "@/components/Table/UserTable.vue";
import UserService from "@/store/user.service";
import FixedButton from "@/components/UI/FixedButton.vue";

export default {
  name: "ViewUserAdminPAge",
  data(){
    return{
      snackbar: false,
      error: ""
    }
  },
  components: {FixedButton, UserTable},
  methods: {
    updateUser(idUser){
      this.$router.push(`/admin/user/edit/${idUser}`)
    },
    deleteUser(idUser){
      UserService.deleteUser(idUser)
          .then(() => {
            this.snackbar = true;
            this.error = "Пользователь удален"
          })
          .catch(() => {
            this.snackbar = true;
            this.error = "Произошла ошибка"
          })
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <UserTable @updateUser="updateUser" @deleteUser="deleteUser"/>
      </v-col>
    </v-row>
    <v-snackbar
        :timeout="4000"
        v-model="snackbar"
    >
      {{error}}
    </v-snackbar>
  </v-container>
  <FixedButton @click="$router.push(`/admin/user/add`)"/>
</template>

<style scoped>

</style>