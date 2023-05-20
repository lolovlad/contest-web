<template>
  <ContestList class="list">
    <ContestCardEdit v-for="(contest, index) in contests"
                     :key="index"
                     :contest="contest"
                     @delete="deleteContest(contest.id)"
                     @click="openSelectTool(contest)"

    />
  </ContestList>
  <FixedButton @click="$router.push(`/admin/contest/add`)"/>
  <SelectToolTip ref="selectTool" @close="clearSelect">
    <h3 class="__name">{{selectContest.name_contest}}</h3>
    <div class="btn__menu">
      <agree-button @click="deleteContest(selectContest.id)">Удалить</agree-button>
      <agree-button @click="$router.push(`/admin/contest/edit/${selectContest.id}`)">Редактировать</agree-button>
      <agree-button @click="$router.push(`/admin/contest/${selectContest.id}/task`)">Задания</agree-button>
      <agree-button @click="$router.push(`/admin/contest/edit/${selectContest.id}`)">Отчет</agree-button>
      <agree-button @click="openModelWindow">Добавить пользователей</agree-button>
    </div>
  </SelectToolTip>
  <CastomModelWindow ref="modelWindow" @close="closeWindow">
    <div class="main__model__window">
      <div class="main__list__user">
        <user-list class="list__user">
          <UserCardView v-for="(user, index) in listUsers" :key="index" :user="user" @click="addUserContest(index)"/>
        </user-list>
        <user-list class="list__user">
          <UserCardView v-for="(user, index) in contestListUsers" :key="index" :user="user" @click="deleteUser(index)"/>
        </user-list>
      </div>
      <agree-button @click="regUsers">Сохранить</agree-button>
    </div>
  </CastomModelWindow>
</template>

<script>
import FixedButton from "@/components/UI/FixedButton";
import ContestList from "@/components/ContestList";
import ContestCardEdit from "@/components/ContestCardEdit";
import axios from "axios";
import SelectToolTip from "@/components/UI/SelectToolTip";
import AgreeButton from "@/components/UI/AgreeButton";
import CastomModelWindow from "@/components/UI/CastomModelWindow";
import UserList from "@/components/UserList";
import UserCardView from "@/components/UserCardView";
export default {
  name: "AdminContestListPage",
  components: {
    UserCardView,
    UserList, CastomModelWindow, AgreeButton, SelectToolTip, ContestCardEdit, ContestList, FixedButton},
  data(){
    return{
      contests: [],
      selectContest: {},
      listUsers: [],
      contestListUsers: []
    }
  },
  methods: {
    async getListContest(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/list_light_contest/`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      );
      this.contests = response.data
    },
    async deleteContest(idContest){
      const response = await axios.delete(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/${idContest}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      await this.getListContest()
    },
    clearSelect(){
      this.selectContest = {}
    },
    openSelectTool(contest){
      this.selectContest = contest
      this.$refs.selectTool.open()
    },
    async openModelWindow(){
      const data = await this.getUser()
      this.listUsers.push(...data.user_not_in_contest)
      this.contestListUsers.push(...data.user_in_contest)
      this.$refs.modelWindow.open()
    },
    async getUser(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/users/in_contest/${this.selectContest.id}`,
      )
      return response.data
    },
    closeWindow(){
      this.listUsers = []
      this.contestListUsers = []
    },
    addUserContest(index){
      const user = this.listUsers[index]
      this.listUsers.splice(index, 1)
      this.contestListUsers.push(user)
    },
    deleteUser(index){
      const user = this.contestListUsers[index]
      this.contestListUsers.splice(index, 1)
      this.listUsers.push(user)
    },
    async regUsers(){
      const data = {
        id: this.selectContest.id,
        users: this.contestListUsers
      }
      const response = await axios.put(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/registration_users/`,
          data,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      response.status
      const users = await this.getUser()
      this.listUsers = []
      this.contestListUsers = []
      this.listUsers.push(...users.user_not_in_contest)
      this.contestListUsers.push(...users.user_in_contest)
    }
  },
  mounted() {
    this.getListContest()
  }
}
</script>

<style scoped>
.list{
  width: 90%;
  margin: 50px auto;
  flex-wrap: wrap;
}
.btn__menu{
  display: flex;
  gap: 5px;
  margin-left: 30px;
}
.__name{
  color: white;
  font-size: 30px;
}
.main__list__user{
  display: flex;
  margin-bottom: 20px;
  gap: 10px;

}
.list__user{
  width: 50%;
}
.main__model__window{
  width: 70%;
  margin: 100px auto;
}
</style>