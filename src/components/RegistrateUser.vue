<template>
  <ul class="collection">
    <li class="collection-item" v-for="obj in users" :key="obj.user.id">
      <div>
        {{obj.user.name}}

        <a v-if="obj.in_contest" @click="$emit('deleteUserInContest', obj.user.id)" class="secondary-content"><i class="material-icons">close</i></a>
        <a v-else @click="$emit('addUserInContest', obj.user.id)" class="secondary-content"><i class="material-icons">add</i></a>
      </div>
    </li>
  </ul>
  <CastomPagination :countPage="countPage" class="pag" @updatePage="getListUser"/>
</template>

<script>
import CastomPagination from "@/components/CastomPagination";
import axios from "axios";
export default {
  name: "RegistrateUser",
  components: {CastomPagination},
  props: {
    uuid_contest: String
  },
  data(){
    return{
      users: [],
      countPage: null,
    }
  },
  methods: {
    async getListUser(numPage=1){
      const response = await axios.get(

          `/users/user_flag_contest/${this.uuid_contest}?number_page=${numPage}`
      );
      this.countPage = parseInt(response.headers["x-count-page"])
      this.users = response.data
    }
  }
}
</script>

<style scoped>

</style>