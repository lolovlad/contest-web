<template>
  <ul id="slide-out" class="sidenav red darken-4">
    <li><div class="user-view">
      <img class="circle__custom" src="../static/logo.png">
      <a @click="$router.push(`/contest/${contest.uuid}/`)"><p class="white-text name__custom">{{contest.name_contest}}</p></a>
      <span class="white-text email">Старт контеста: {{dateView(contest.datetime_start)}}</span>
      <span class="white-text email">Конец контеста: {{dateView(contest.datetime_end)}}</span>
      <span class="white-text email">Длительность: {{distante}}</span>
    </div></li>
    <li><div class="divider"></div></li>
    <li><a @click="$router.push(`/contest/${contest.uuid}/result`)" class="white-text">Таблица участников</a></li>
    <li><a @click="$router.push(`/contest/${contest.uuid}/tasks`)" class="white-text">Задания</a></li>
    <li><div class="divider"></div></li>
    <li><a @click="$emit('timerClose')" class="white-text">Закончить</a></li>
    <li><a @click="$router.push(`/menu`)" class="white-text">Выйти</a></li>
    <li><div class="divider"></div></li>
    <li><a class="subheader white-text">Таймер</a></li>
    <li><a class="white-text"><MyTimer :data-json="contest.datetime_end" @close="closeContest"/></a></li>
  </ul>
</template>

<script>
import MyTimer from "@/components/MyTimer";
export default {
  components:{
    //AgreeButton,
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
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric" };
      return new Date(date).toLocaleDateString('ru-RU', options);
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

      return `${this.zeroAdd(days)} д. ${this.zeroAdd(hours)} ч. ${this.zeroAdd(minutes)} м. ${this.zeroAdd(seconds)} с.`
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
  name: "NavbarContest"
}
</script>

<style scoped>
.navbar__left h1{
  font-size: 40px;
  text-align: center;
}
.navbar__left img{
  display: block;
  margin: 20px auto;
  width: 65%;
}



.sidenav {
  transform: translateX(0%) !important;
}
.name__custom{
  font-size: 30px;
  margin-top: 16px;
  font-weight: 500;
  line-height: 70px;
}
.circle__custom{
  height: 130px;
  width: 130px;
}
</style>