<template>
  <div class="model" :class="{active: !isOpen}">
    <div class="content">
      <slot></slot>
    </div>
    <div class="close" @click="close">
      x
    </div>
  </div>
</template>

<script>
export default {
  name: "CastomModelWindow",
  data(){
    return{
      isOpen: false
    }
  },
  methods:{
    close(){
      this.isOpen = false
      this.$emit("close")
    },
    open(){
      this.isOpen = true
    }
  }
}
</script>

<style scoped>
.model{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 999;
  overflow: auto;
}
.content{
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.active{
  display: none;
}
.close{
  position: absolute;
  top: 40px;
  left: 40px;
  width: 70px;
  height: 70px;
  font-size: 30px;
  border-radius: 50%;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>