<template>
  <div class="header__main">
    <ul class="menu">
      <li><a @click="$router.push(`/admin/user/`)">Пользователи</a></li>
      <li><a @click="$router.push(`/admin/contest/`)">Контесты</a></li>
      <li><a @click="$router.push(`/admin/team/`)">Команды</a></li>
    </ul>
    <div class="btn__menu">
      <agree-button>Выход</agree-button>
    </div>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  name: "AdminHeader",
  components: {AgreeButton}
}
</script>

<style scoped>
.header__main{
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #b50034;
}
.menu{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
}
.menu > li{
  padding: 10px 20px;
  font-size: 25px;
  font-weight: bold;
  color: white;
  list-style-type: none;
  cursor: pointer;
}
.menu > li:hover{
  background: white;
  color: black;
}
.btn__menu{
  margin: 0 20px;
}
</style>