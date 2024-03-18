<template>
  <div v-if="contestLoad">
    <div v-if="contests.length > 0">
      <ContestList>
        <ContestCardEdit v-for="contest in contests"
                         :key="contest.uuid"
                         :contest="contest"
                         @delete="deleteContest(contest.uuid)"
                         @edit="openSelectTool(contest)"

        />
      </ContestList>
      <CastomPagination :countPage="countPage" class="pag" @updatePage="getListContest"/>
    </div>
    <div v-else>
      <h1>Нет зарегистрированных соревнований</h1>
    </div>
    <FixedButton @click="$router.push(`/admin/contest/add`)"/>
    <SelectToolTip ref="selectTool" @close="clearSelect">
      <li>
        <div class="user-view">
          <img class="circle" src="../../static/solo_olimp.jpg">
          <span class="name">{{selectContest.name_contest}}</span>
        </div>
      </li>
      <li><div class="divider"></div></li>
      <li><a @click="editContest">Редактировать</a></li>
      <li><a @click="openModelWindowTask">Задания</a></li>
      <li><a @click="openModelWindowUser">Добавить пользователей</a></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Проведение</a></li>
      <li><a @click="tableContestResult">Отчет</a></li>
      <li><a @click="controllerContest">Ручная проверка</a></li>
      <li><div class="divider"></div></li>
      <li><a @click="deleteContest(selectContest.uuid)">Удалить</a></li>
    </SelectToolTip>
    <CustomModelWindowCenter ref="taskContest">
      <RegistrateTask
          :uuid_contest="selectContest.uuid"
          ref="regTask"
          @addTaskInContest="regTask"
          @deleteTaskInContest="delTask"
      />
    </CustomModelWindowCenter>
    <CustomModelWindowCenter ref="userContest">
      <RegistrateUser
          :uuid_contest="selectContest.uuid"
          ref="regUser"
          @addUserInContest="regUser"
          @deleteUserInContest="delUser"
      />
    </CustomModelWindowCenter>
  </div>
  <castom-loader  v-else/>
</template>

<script>
import FixedButton from "@/components/UI/FixedButton";
import ContestList from "@/components/ContestList";
import ContestCardEdit from "@/components/ContestCardEdit";
import axios from "axios";
import SelectToolTip from "@/components/UI/SelectToolTip";
import CastomPagination from "@/components/CastomPagination";
import CastomLoader from "@/components/UI/CastomLoader";
import M from "materialize-css";
import CustomModelWindowCenter from "@/components/UI/CustomModelWindowCenter";
import RegistrateTask from "@/components/RegistrateTask";
import RegistrateUser from "@/components/RegistrateUser";
export default {
  name: "AdminContestListPage",
  components: {
    RegistrateUser,
    RegistrateTask,
    CustomModelWindowCenter,
    CastomLoader, SelectToolTip, ContestCardEdit, ContestList, FixedButton, CastomPagination},
  data(){
    return{
      contests: [],
      selectContest: {},
      listUsers: [],
      contestListUsers: [],
      countPage: null,
      contestLoad: false
    }
  },
  methods: {
    async getListContest(page=1){
      const response = await axios.get(
          `contests/list_contest/?number_page=${page}`
      );
      this.countPage = parseInt(response.headers["x-count-page"])
      this.contestLoad = true
      this.contests = response.data
    },
    async deleteContest(idContest){
      await axios.delete(
          `contests/${idContest}`
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "Соревнование удалено"})
            this.$router.push(`/admin/contest`)
          }
      )
      this.$refs.selectTool.close()
      await this.getListContest()
    },

    editContest(){
      this.$router.push(`/admin/contest/edit/${this.selectContest.uuid}`)
      this.$refs.selectTool.close()
    },

    tableContestResult(){
      this.$router.push(`/admin/contest/result/${this.selectContest.uuid}`)
      this.$refs.selectTool.close()
    },

    controllerContest(){
      this.$router.push(`/admin/contest/controller/${this.selectContest.uuid}`)
      this.$refs.selectTool.close()
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
          `users/in_contest/${this.selectContest.id}`,
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
    },

    openModelWindowTask(){
      this.$refs.taskContest.open()
      this.$refs.regTask.getListTask()
    },
    async regTask(uuidTask){
      await axios.post(
          `/contests/registration_task`,
          {
            "uuid_task": uuidTask,
            "uuid_contest": this.selectContest.uuid
          }
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "Задание добавлено"})
            this.$refs.regTask.getListTask()
          }
      )
    },
    async delTask(uuidTask){
      await axios.delete(
          `/contests/registration_task/${uuidTask}/${this.selectContest.uuid}`,
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "Задание удалено"})
            this.$refs.regTask.getListTask()
          }
      )
    },

    openModelWindowUser(){
      this.$refs.userContest.open()
      this.$refs.regUser.getListUser()
    },
    async regUser(idUser){
      await axios.post(
          `/contests/registration_user`,
          {
            "id_user": idUser,
            "uuid_contest": this.selectContest.uuid
          }
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "Ученик добавлено"})
            this.$refs.regUser.getListUser()
          }
      )
    },
    async delUser(idUser){
      await axios.delete(
          `/contests/registration_user/${idUser}/${this.selectContest.uuid}`,
      ).catch((e)=>{
        M.toast({html: e.response.message})
      }).then((response)=> {
            response.status
            M.toast({html: "Ученик удален"})
            this.$refs.regUser.getListUser()
          }
      )
    }
  },
  mounted() {
    this.getListContest()
  }
}
</script>

<style scoped>
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