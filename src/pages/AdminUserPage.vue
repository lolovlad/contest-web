<template>
  <div class="main" v-if="userLoad">
    <user-list>
      <UserCard v-for="user in listUsers" :key="user.id" :userData="user"
                @deleteUser="$emit('deleteUser', user.id)"
                @updateUser="$emit('updateUser', user.id)"/>
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
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/users/${idUser}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      return response.data
    },

    async getListUser(page=1){
      const typeUser = "all"
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/users/?number_page=${page}&type_user=${typeUser}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      this.listUsers = response.data
      this.countPage = parseInt(response.headers["x-count-page"])
      this.userLoad = true
    },
    async deleteUser(idUser){
      const response = await axios.delete(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/users/${idUser}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      await this.getListUser()
      await this.getListUser()
    },
    async updateUser(idUser){
      this.$refs.userForm.user = await this.getUser(idUser)
      this.$refs.userForm.user.password = ""
      this.$refs.userForm.isAddUser = false
      this.$refs.modelWindow.open()
      console.log(idUser)
    },
    async addUser(){
      this.$refs.userForm.isAddUser = true
      this.$refs.modelWindow.open()
    },
    async add(user){
      user.data.type_education = parseInt(user.data.type_education)
      user.type = parseInt(user.type)
      const response = await axios.post(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/users`,
          user,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      this.$refs.userForm.clearForm()
      this.$refs.modelWindow.close()
      await this.getListUser()
      response.status
    },
    async update(user){
      user.data.type_education = parseInt(user.data.type_education)
      console.log(user)
      const response = await axios.put(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/users/`,
          user,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      this.$refs.userForm.clearForm()
      this.$refs.modelWindow.close()
      await this.getListUser()

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