<template>
  <nav class="navbar">
    <div class="logo">
      <img src="../static/logo.png">
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarUser"
}
</script>

<style>
.navbar{
  height: 80px;
  width: 100%;
  background: #ffffff;
  color: #b50034;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo{
  height: 90%;
  margin: 10px 10px;
}

.navbar::after{
  content: '';
  width: 95%;
  height: 1px;
  background: #999393;
  position: absolute;
  bottom: -7px;
}

.logo > img{
  height: 100%;
}
</style>