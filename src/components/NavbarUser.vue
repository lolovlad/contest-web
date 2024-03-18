<template>
  <nav class="blue darken-1">
    <div class="container">
      <div class="nav-wrapper">
        <a href="#Main" class="logo">
          <img src="../static/logo.png" class="circle responsive-img">
        </a>
        <ul class="right hide-on-med-and-down">
          <li>
            <a class="waves-effect" href="#home">Соревнования</a>
          </li>
          <li>
            <a class="waves-effect" href="#info">Профиль</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarUser"
}
</script>

<style>
.logo {
  display: inline-block;
  height: 100%;
}

.logo>img {
  vertical-align: middle;
  position: relative;
  top:1px;
}
</style>