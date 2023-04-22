<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AgreeButton"
}
</script>

<style scoped>
.btn{
  padding: 10px 20px;
  color: #ffffff;
  background: #b50034;
  border: none;
  font-size: 17px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
}

.btn:hover{
  color: black;
  background: #ffffff;
}
</style>