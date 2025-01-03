<template>
  <router-view>

  </router-view>
    <!--<UserTool ref="userTool" @export="exportUsers" @addUser="addUser" @openProf="openProf"></UserTool>
    <v-snackbar
        :timeout="4000"
        v-model="snackbar"
    >
      {{error}}
    </v-snackbar>
  </v-container>
  <CustomModelWindow ref="modelWindow" @close="$refs.userForm.clearForm()">
    <user-form ref="userForm" @add="add" @update="update"/>
  </CustomModelWindow>
  <<FixedButton @click="addUser"/>-->
</template>

<script>
import axios from "axios";
//import UserTable from "@/components/Table/UserTable.vue";
//import CastomLoader from "@/components/UI/CastomLoader";
//import UserList from "@/components/UserList";
//import CustomModelWindow from "@/components/UI/CustomModelWindow.vue";
import UserService from "@/store/user.service";
//import UserForm from "@/components/UI/UserForm";
//import FixedButton from "@/components/UI/FixedButton";
//import UserCard from "@/components/UI/UserCard";
export default {
  name: "AdminUserPage",
  //components: {UserTable, CustomModelWindow},
  //components: {UserCard, FixedButton, UserForm, CastomModelWindow, UserList, CastomLoader, CastomPagination},
  data(){
    return{
      currentUser: {},
      targetUser: null
    }
  },
  methods:{

    async getUser(idUser){
      const response = await axios.get(
          `users/${idUser}`
      )
      return response.data
    },

    ///async deleteUser(idUser){
    ///  const response = await axios.delete(
    ///      `users/${idUser}`,
    ///  ).catch(
    ///      (e) => {
    ///        M.toast({html: e.response.statusText})
    ///      }
    ///  )
    ///  response.status
    ///  await this.getListUser()
    ///  M.toast({html: "Пользователь удален"})
    ///},

    updateUser(idUser){
      UserService.getUserByUuid(idUser).then((user) => {
        this.targetUser = user
        this.$refs.userForm.user.password = ""
        this.$refs.userForm.isAddUser = false
        this.$refs.modelWindow.open()
      })
    },

    ///async addUser(){
    ///  this.$refs.userForm.isAddUser = true
    ///  this.$refs.modelWindow.open()
    ///},

    //async add(user){
    //  user.id_type = parseInt(user.id_type)
    //  await axios.post(
    //      `users/`,
    //      user,
    //  ).catch((e) => {
    //        M.toast({html: e.response.statusText})
    //      }
    //  )
    //  this.$refs.userForm.clearForm()
    //  this.$refs.modelWindow.close()
    //  await this.getListUser()
    //  M.toast({html: "Пользователь добавлен"})
    //},

    //async update(user, idUser){
    //  user.id_type= parseInt(user.id_type)
    //  console.log(user)
    //  await axios.put(
    //      `users/${idUser}`,
    //      user,
    //  ).catch(
    //      (e) => {
    //        M.toast({html: e.response.statusText})
    //      }
    //  )
    //  this.$refs.userForm.clearForm()
    //  this.$refs.modelWindow.close()
    //  await this.getListUser()
    //  M.toast({html: "Пользователь обнавлен"})
    //}
  },

}
</script>

<style scoped>

</style>