<template>
  <div class="item__contest">
    <div class="img">
      <img src="../static/solo_olimp.jpg">
    </div>
    <div class="main_info_contest">
      <h2>{{contest.name_contest}}</h2>
      <h2>{{typeContest}}</h2>
      <h2>{{stateContest}}</h2>
    </div>
    <agree-button @click="$router.push(`/contest/${contest.id}`)">Перейти в контест</agree-button>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  components: {AgreeButton},
  props:{
    contest:{
      type: Object,
      required: true
    }
  },
  computed: {
    typeContest() {
      if(this.contest.type === 1){
        return "Не командная"
      }else{
        return "Командная"
      }
    },
    stateContest(){
      if(this.contest.type === 1){
        return "Зарегестрированна"
      }else if(this.contest.type === 2){
        return "Проходит"
      }
      return "Законченна"
    }
  },

  name: "ContestItemCard"
}
</script>

<style scoped>
.item__contest{
  width: 300px;
  height: 450px;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  background: #0273bb;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.5);
}

.img{
  width: 100%;
  height: 220px;
}
.img > img{
  height: 100%;
  width: 100%;
}
.main_info_contest{
  width: 80%;
  margin: auto;
  height: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
  gap: 15px;
}

</style>