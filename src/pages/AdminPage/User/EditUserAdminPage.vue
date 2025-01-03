<script>
import UserForm from "@/components/Form/UserForm.vue";
import UserService from "@/store/user.service";

export default {
  name: "EditUserAdminPage",
  components: {UserForm},
  data(){
    return{
      idUser: this.$route.params.id_user,
      addMode: (this.$route.params.id_user === undefined),
      error: null
    }
  },
  methods:{
    addUser(user){

      const userUpdate = {
        login: user.login,
        name: user.name,
        sename: user.sename,
        secondname: user.secondname,
        foto: "Photo/default.png",
        stage_edu:  user.stage_edu,
        data: user.data,
        password:  user.password,
        id_type: user.type.id,
        id_edu_organization: user.edu_organization.uuid
      }

      UserService.addUser(userUpdate)
          .then(() => {
            this.$router.push(`/admin/user/`)
          })
          .catch((response) => {
            this.error = response.data.message
          })

    },
    updateUser(user){
      let userUpdate = {
        login: user.login,
        name: user.name,
        sename: user.sename,
        secondname: user.secondname,
        foto: "Photo/default.png",
        stage_edu:  user.stage_edu,
        data: {},
        id_type: user.type.id,
        id_edu_organization: user.edu_organization.uuid,
      }
      console.log(userUpdate)
      userUpdate.password = user.password
      UserService.updateUser(this.idUser, userUpdate)
          .then(() => {
            this.$router.push(`/admin/user/`)
          })
          .catch((response) => {
            this.error = response.data.message
          })
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-alert
            density="compact"
            :text="error"
            title="Ошибка"
            type="warning"
            v-if="error !== null"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <UserForm
            :add-mode="addMode"
            :id-user="idUser"
            @add="addUser"
            @update="updateUser"

        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>