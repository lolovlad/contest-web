<template>
  <navbar-user></navbar-user>
  <div class="main">
    <h1>Carte des cours</h1>
    <ListContest :contests="contests">

    </ListContest>
  </div>
</template>

<script>
import NavbarUser from "@/components/NavbarUser";
import ListContest from "@/components/ListContest";
import axios from "axios";
export default {
  data(){
    return{
      contests: []
    }
  },
  methods: {
    async getContestView(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/contests_by_user_id/`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      );
      this.contests = response.data
    }
  },
  mounted() {
    this.getContestView()
  },
  name: "MenuPage",
  components: {ListContest, NavbarUser}
}
</script>

<style scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px auto;
  width: 80%;
}
.main > h1{
  text-align: center;
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 30px;
}
</style>