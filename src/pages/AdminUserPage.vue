<template>
  <div class="main" v-if="userLoad">
    <user-list>
      <UserCard v-for="user in listUsers" :key="user.id" :userData="user"
                @deleteUser="deleteUser"
                @updateUser="updateUser"/>
    </user-list>
    <CastomPagination :countPage="countPage" class="pag" @updatePage="getListUser"/>
  </div>
  <CastomLoader v-else/>
  <CastomModelWindow ref="modelWindow" @close="$refs.userForm.clearForm()">
    <user-form ref="userForm" @add="add" @update="update"/>
  </CastomModelWindow>
  <FixedButton @click="addUser"/>
</template>

<script>
import CastomPagination from "@/components/CastomPagination";
import axios from "axios";
import CastomLoader from "@/components/UI/CastomLoader";
import UserList from "@/components/UserList";
import CastomModelWindow from "@/components/UI/CastomModelWindow";
import UserForm from "@/components/UI/UserForm";
import FixedButton from "@/components/UI/FixedButton";
import UserCard from "@/components/UI/UserCard";
import M from "materialize-css"
export default {
  name: "AdminUserPage",
  components: {UserCard, FixedButton, UserForm, CastomModelWindow, UserList, CastomLoader, CastomPagination},
  data(){
    return{
      countPage: null,
      listUsers: null,
      currentUser: {

      },
      userLoad: false
    }
  },
  methods:{

    async getUser(idUser){
      const response = await axios.get(
          `users/${idUser}`
      )
      return response.data
    },

    async getListUser(page=1){
      const typeUser = "all"
      const response = await axios.get(
          `users/?number_page=${page}&type_user=${typeUser}`
      )
      this.listUsers = response.data
      this.countPage = parseInt(response.headers["x-count-page"])
      this.userLoad = true
    },
    async deleteUser(idUser){
      const response = await axios.delete(
          `users/${idUser}`,
      ).catch(
          (e) => {
            M.toast({html: e.response.statusText})
          }
      )
      response.status
      await this.getListUser()
      M.toast({html: "Пользователь удален"})
    },

    async updateUser(idUser){
      let user = await this.getUser(idUser)
      await this.$refs.userForm.setUser(user)
      this.$refs.userForm.user.password = ""
      this.$refs.userForm.isAddUser = false
      this.$refs.modelWindow.open()
    },

    async addUser(){
      this.$refs.userForm.isAddUser = true
      this.$refs.modelWindow.open()
    },

    async add(user){
      user.id_type = parseInt(user.id_type)
      await axios.post(
          `users/`,
          user,
      ).catch((e) => {
            M.toast({html: e.response.statusText})
          }
      )
      this.$refs.userForm.clearForm()
      this.$refs.modelWindow.close()
      await this.getListUser()
      M.toast({html: "Пользователь добавлен"})
    },
    async update(user, idUser){
      user.id_type= parseInt(user.id_type)
      console.log(user)
      await axios.put(
          `users/${idUser}`,
          user,
      ).catch(
          (e) => {
            M.toast({html: e.response.statusText})
          }
      )
      this.$refs.userForm.clearForm()
      this.$refs.modelWindow.close()
      await this.getListUser()
      M.toast({html: "Пользователь обнавлен"})
    }
  },
  mounted() {
    this.getListUser()
  }
}
</script>

<style scoped>
.main{
  width: 80%;
  margin: 50px auto;

}
.pag{
  margin-top: 40px;
}
</style>