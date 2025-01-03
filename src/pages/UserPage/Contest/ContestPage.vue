<template>
  <navbar-contest :contest="contest" v-if="contest != null" @timerClose="closeContest">
  </navbar-contest>
  <v-main>
    <router-view>

    </router-view>
  </v-main>
</template>

<script>
import NavbarContest from "@/components/NavbarContest.vue";
import ContestService from "@/store/contest.service";
import UserService from "@/store/user.service";

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
    closeContest(){
      ContestService.closeContest(this.idContest)
          .then(() => {
            this.$store.dispatch('contestUser/closeContest')
            this.getContest()
          })
    },

    getContest(){
      ContestService.getSelectContestByUser(this.idContest)
          .then((contest) => {
            this.contest = contest
            this.isCloseContestDate(this.contest.datetime_end)
          })
    },

    getStateUser(){
      UserService.getStatusUserByContest(this.idContest)
          .then((statusContest) => {
            if(statusContest.status === 1){
              this.$store.dispatch('contestUser/openUserContest')
            }else{
              this.$store.dispatch('contestUser/closeUserContest')
            }
          })
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
</style>