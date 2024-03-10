<template>
  <div class="card blue-grey darken-1">
    <div class="card-content white-text">
      <span class="card-title">{{userData.sename}} {{userData.name[0]}}. {{userData.secondname[0]}}.</span>
      <p>Логин: {{userData.login}}</p>
      <p>Тип пользователя: {{userData.type.name}}</p>
      <div v-if="userData.edu_organization">
        <p>{{userData.stage_edu}}</p>
        <p>{{userData.edu_organization.name_organizations}}</p>
      </div>
      <div v-else>
        <p>Не определнно</p>
      </div>
    </div>
    <div class="card-action">
      <agree-button @click="$emit('deleteUser', userData.id)">Удалить</agree-button>
      <agree-button @click="$emit('updateUser', userData.id)">Редактировать</agree-button>
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
  }
}
</script>

<style scoped>
</style>