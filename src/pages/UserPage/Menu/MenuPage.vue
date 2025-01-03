<template>
  <navbar-user/>
  <v-main>
    <v-container>
      <v-row>
        <v-col
            cols="12"
            v-for="contest in contests"
            :key="contest.uuid"
            md="4"
        >
          <v-card>
            <v-img
                :src="require('@/assets/solo_olimp.jpg')"
                class="align-end text-white"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
            >
              <v-card-title>{{contest.contest.name_contest}}</v-card-title>
            </v-img>
            <v-card-text>
              <p>Начало соревнования: {{convertDate(contest.contest.start)}}</p>
              <p>Конец соревнования: {{convertDate(contest.contest.datetime_end)}}</p>
              <v-divider></v-divider>
              <p>Состояние: {{contest.contest.state_contest.description}}</p>
              <p>Тип: {{contest.contest.type.description}}</p>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text="Открыть" @click="$router.push(`/contest/${contest.contest.uuid}`)"></v-btn>
              <v-btn color="orange" text="Итоги"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import NavbarUser from "@/components/NavbarUser.vue";
import ContestService from "@/store/contest.service";
import moment from "moment/moment";

export default {
  data(){
    return{
      contests: [],
      Img: require("@/assets/solo_olimp.jpg"),
    }
  },
  methods: {
    getContestView(){
      ContestService.getContestByUser()
          .then((contest) => {
            console.log(contest);
            this.contests = contest
          })
    },
    convertDate(date){
      return moment(date).format('DD.MM.YYYY HH:mm')
    }
  },
  mounted() {
    this.getContestView()
  },
  name: "MenuPage",
  components: {NavbarUser}
}
</script>

<style scoped>
.main{
  margin: 40px 0;
}
</style>