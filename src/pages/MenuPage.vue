<template>
  <navbar-user></navbar-user>
  <div class="container">
    <h1>Меню пользователя</h1>
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
          `contests/contests_by_user_id`,
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
  margin: 40px 0;
}
</style>