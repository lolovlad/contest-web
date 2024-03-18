<template>
  <navbar-contest :contest="contest" v-if="contest != null" @timerClose="closeContest">
  </navbar-contest>
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
      await axios.put(
          `contests/update_state_user_in_contest/${this.idContest}`,
      );
      this.$store.dispatch('contestUser/closeContest')
      await this.getContest()
    },

    async getContest(){
      const response = await axios.get(
          `user_contest_view/get_contest/${this.idContest}`
      );
      this.contest = response.data
      this.isCloseContestDate(this.contest.datetime_end)
    },

    async getStateUser(){
      const response = await axios.get(
          `users/status/${this.idContest}`
      )
      if(response.data.status === 1){
        this.$store.dispatch('contestUser/openUserContest')
      }else{
        this.$store.dispatch('contestUser/closeUserContest')
      }
    },

    isCloseContestDate(dateFContest){
      const dateNow = new Date()
      const dateContest = new Date(dateFContest)
      if(dateNow >= dateContest){
        this.$store.dispatch('contestUser/closeContest')
      }
    }
  },
  mounted() {
    this.getContest()
    this.getStateUser()
  },
  name: "ContestPage"
}
</script>

<style scoped>


.content{
  margin-left: 300px;
  background: #ffffff;
  min-height: 100vh;
}
</style>