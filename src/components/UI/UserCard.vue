<template>
  <div class="user__card">
    <div class="main__info">
      <div class="header__card">
        <h1>{{userData.name}} {{userData.sename}} {{userData.secondname}}</h1>
      </div>
      <div class="main__card">
        <div class="info">
          <p>Логин: {{userData.login}}</p>
          <p>Тип пользователя: {{typeUser(userData.type)}}</p>
        </div>
        <div class="info__data" v-if="userData.data">
          <p>{{userData.data.learning_stage}}</p>
          <p>{{userData.data.name_organization}}</p>
        </div>
        <div class="info__data" v-else>
          <p>Не определнно</p>
        </div>
      </div>
    </div>
    <div class="buttons">
      <agree-button @click="$emit('deleteUser')">Удалить</agree-button>
      <agree-button @click="$emit('updateUser')">Редактировать</agree-button>
    </div>
  </div>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton";
export default {
  name: "UserCard",
  components: {AgreeButton},
  props: {
    userData: {
      type: Object
    }
  },
  methods: {
    typeUser(typeUser){
      const typeUserD = {
        1: "Администратор",
        2: "Пользователь"
      }
      return typeUserD[typeUser]
    }
  }
}
</script>

<style scoped>
.user__card{
  display: flex;
  justify-content: space-between;
  height: 150px;
  background: #0273bb;
  border-radius: 7px;
  color: white;
  padding: 20px;
}
.buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 7px;
}
.main__info{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.main__card{
  display: flex;
  align-items: center;
  gap: 50px;
  font-size: 20px;
}
</style>