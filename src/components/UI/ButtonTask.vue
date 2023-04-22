<template>
  <div class="task__btn">
    <div class="ball" :class="colorBlock">{{score}}</div>
    <AgreeButton><slot></slot></AgreeButton>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  components: {AgreeButton},
  props: {
    score:{
      type: String,
      default: "-"
    },
  },
  computed:{
    colorBlock(){
      if(this.score === "-")
        return
      if(!isNaN(this.score))
        return "good"
      return "bad"
    }
  },
  name: "ButtonTask"
}
</script>

<style scoped>
  .task__btn{
    display: flex;
    flex-direction: row;
    color: white;
    justify-content: left;
    justify-items: center;
    align-items: center;
    font-size: 25px;
    cursor: pointer;
    height: 50px;
  }
  .ball{
    width: 60px;
    height: 100%;
    padding: 12px;
    background: white;
    color: black;
    text-align: center;
    font-size: 20px;
    margin-right: 30px;
    border: 1px solid black;
    border-radius: 10px;
  }

  .good{
    background: green;
    color: white;
    font-weight: bold;
  }
  .bad{
    background: red;
    color: white;
    font-weight: bold;
  }
</style>