<template>
  <v-navigation-drawer :width="300" class="bg-red-darken-4 pa-2">
    <template v-slot:prepend>
      <v-row align="center" justify="center">
        <v-col class="d-flex child-flex" cols="12" md="9">
          <v-img :src="require('@/assets/logo.png')"
                 cover
                 aspect-ratio="1"/>
        </v-col>
      </v-row>
      <v-row class="pa-1">
        <v-col cols="12" md="12">
          <v-toolbar-title @click="$router.push(`/contest/${contest.uuid}/`)">{{contest.name_contest}}</v-toolbar-title>

          <p class="white-text">Старт: {{dateView(contest.datetime_start)}}</p>
          <p class="white-text">Конец: {{dateView(contest.datetime_end)}}</p>
          <p class="white-text">Длительность: {{distante}}</p>
        </v-col>
      </v-row>
    </template>
    <v-divider></v-divider>
    <v-list-item @click="$router.push(`/contest/${contest.uuid}/result`)" title="Таблица участнико"></v-list-item>
    <v-list-item @click="$router.push(`/contest/${contest.uuid}/tasks`)" title="Задания"></v-list-item>
    <v-divider></v-divider>
    <v-list-item @click="$emit('timerClose')" title="Закончить"></v-list-item>
    <v-list-item @click="$router.push(`/menu`)" title="Выйти"></v-list-item>
    <v-divider></v-divider>
    <v-list-item><MyTimer :data-json="contest.datetime_end" @close="closeContest"/></v-list-item>
  </v-navigation-drawer>
</template>

<script>
import MyTimer from "@/components/MyTimer";
export default {
  components:{
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
</style>