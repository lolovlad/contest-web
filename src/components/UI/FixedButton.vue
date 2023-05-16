<template>
  <div class="btn__fix">
    +
  </div>
</template>

<script>
export default {
  name: "FixedButton"
}
</script>

<style scoped>
.btn__fix{
  display: flex;
  padding: 10px;
  width: 70px;
  height: 70px;
  text-align: center;
  border-radius: 50%;
  background: #b50034;
  color: white;
  position: fixed;
  right: 30px;
  bottom: 30px;
  font-size: 40px;
  font-weight: bolder;
  justify-content: center;
  cursor: pointer;
}
</style>