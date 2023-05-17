<template>
  <div class="bottom__tooltip" :class="{active: isActive, close: !isActive}">
    <div class="main__block">
      <slot></slot>
    </div>
    <div class="close__select" @click="close">
      <h1>X</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectToolTip",
  data(){
    return{
      isActive: false
    }
  },
  methods: {
    open(){
      this.isActive = true
    },
    close(){
      this.$emit("close")
      this.isActive = false
    }
  }
}
</script>

<style scoped>
.bottom__tooltip{
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  background: #0273bb;
  width: 100%;
  transition: 0.3s;
}
.main__block{
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close__select{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background: white;
  width: 70px;
  cursor: pointer;
}
.active{
  transform: translate(0, 0);
}
.close{
  transform: translate(0, 100%);
}
</style>