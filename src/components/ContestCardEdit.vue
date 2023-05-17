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
  </div>
</template>

<script>
export default {
  name: "ContestCardEdit",
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
      if(this.contest.type === 0){
        return "Зарегестрированна"
      }else if(this.contest.type === 2){
        return "Законченна"
      }else if(this.contest.type === 1){
        return "Проходит"
      }
      return "браааа"
    }
  },
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