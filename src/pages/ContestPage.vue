<template>
  <div class="menu">
    <navbar-contest :contest="this.contest" v-if="contest != null" @timerClose="closeContest">

    </navbar-contest>
  </div>
  <div class="content">
    <router-view>

    </router-view>
  </div>
</template>

<script>

import axios from "axios";
import NavbarContest from "@/components/NavbarContest";

export default {
  components: {
    NavbarContest
  },
  data(){
    return{
      idContest: this.$route.params.id_contest,
      contest: null
    }
  },
  methods: {
    async closeContest(){
      console.log(`Bearer ${this.$store.state.token}`)
      const response = await axios.put(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/update_state_user_in_contest/${this.idContest}`,
          {},
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      );
      this.contest = response.data
      this.$store.commit("setCloseContest", true)
    },
    async getContest(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/user_contest_view/get_contest/${this.idContest}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      );
      console.log(response.data)
      this.contest = response.data
      this.isCloseContestDate(this.contest.datetime_end)
    },
    async getStateUser(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/users/status/${this.idContest}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      this.isCloseContestUser(response.data.status)
    },
    isCloseContestDate(dateFContest){
      const dateNow = new Date()
      const dateContest = new Date(dateFContest)
      if(dateNow >= dateContest){
        this.$store.commit("setCloseContest", true)
      }
    },
    isCloseContestUser(state){
      this.$store.commit("setCloseContest", state !== 1)
    }
  },
  created() {
    this.getContest()
    this.getStateUser()
  },
  name: "ContestPage"
}
</script>

<style scoped>
.menu{
  width: 16.6666666667%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.content{
  margin-left: 16.6666666667%;
  background: #ffffff;
  min-height: 100vh;
}
</style>