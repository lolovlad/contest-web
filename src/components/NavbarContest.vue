<template>
  <div class="navbar__left">
    <img src="../static/logo.png">
    <h1>{{contest.name_contest}}</h1>
    <div class="navbar__info">
      <h3>début du cours: {{dateView(contest.datetime_start)}}</h3>
      <h3>fin de parcours: {{dateView(contest.datetime_end)}}</h3>
      <h3>Durée: {{distante}}</h3>
    </div>

    <div class="navbar__link">
      <AgreeButton @click="$router.push(`/contest/${contest.id}/`)">théorie</AgreeButton>
      <!--<AgreeButton @click="$router.push(`/contest/${contest.id}/result`)">Таблица участников</AgreeButton>-->
      <AgreeButton @click="$router.push(`/contest/${contest.id}/tasks`)">Tâches</AgreeButton>
    </div>

    <div class="navbar__button">
      <agree-button @click="$router.push(`/menu`)">Sortir</agree-button>
      <!--<agree-button @click="$emit('timerClose')">finir</agree-button>-->
    </div>

    <div class="navbar__timer">
      <my-timer :data-json="contest.datetime_end" @close="closeContest"/>
    </div>
  </div>
</template>

<script>
import MyTimer from "@/components/MyTimer";
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  components:{
    AgreeButton,
    MyTimer
  },
  data(){
    return{
    }
  },
  props:{
    contest:{
      type: Object,
      required: true
    }
  },
  methods: {
    dateView(date){
      return new Date(date).toLocaleDateString('en-GB');
    },
    zeroAdd: (number) => {
      return number < 10 ? "0" + number: number
    },
    closeContest(){
      this.$emit('timerClose')
    }
  },
  computed: {
    distante(){
      const dist = new Date(this.contest.datetime_end) - new Date(this.contest.datetime_start)
      const days = Math.floor(dist / this.days)
      const hours = Math.floor((dist % this.days) / this.hours)
      const minutes = Math.floor((dist % this.hours) / this.minutes)
      const seconds = Math.floor((dist % this.minutes) / this.seconds)

      return `${this.zeroAdd(days)}:${this.zeroAdd(hours)}:${this.zeroAdd(minutes)}:${this.zeroAdd(seconds)}`
    },
    seconds: () => 1000,
    minutes() {
      return this.seconds * 60
    },
    hours(){
      return this.minutes * 60
    },
    days(){
      return this.hours * 24
    }
  },
  mounted() {
  },
  name: "NavbarContest"
}
</script>

<style scoped>
.navbar__left{
  color: white;
  height: 100vh;
  width: 100%;
  background: #0273bb;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 1);
}
.navbar__left h1{
  font-size: 40px;
  text-align: center;
}
.navbar__info{
  text-align: center;
  font-size: 17px;
  margin: 30px 0;
}
.navbar__left img{
  display: block;
  margin: 20px auto;
  width: 65%;
}
.navbar__timer{
  margin-top: 20px;
  width: 100%;
  text-align: center;
  background: black;
  color: white;
}
.navbar__link{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.navbar__button{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px
}
</style>