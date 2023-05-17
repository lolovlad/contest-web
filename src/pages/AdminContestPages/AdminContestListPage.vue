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
    </div>
  </SelectToolTip>
</template>

<script>
import FixedButton from "@/components/UI/FixedButton";
import ContestList from "@/components/ContestList";
import ContestCardEdit from "@/components/ContestCardEdit";
import axios from "axios";
import SelectToolTip from "@/components/UI/SelectToolTip";
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  name: "AdminContestListPage",
  components: {AgreeButton, SelectToolTip, ContestCardEdit, ContestList, FixedButton},
  data(){
    return{
      contests: [],
      selectContest: {}
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
</style>