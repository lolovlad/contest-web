<template>
  <v-app-bar color="red-darken-4"
             prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title @click="$route.push('/')">Админ панель</v-app-bar-title>
    <template v-slot:append>
      <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end"
      >
        <template v-slot:activator="{ props }">
          <v-btn
              color="white"
              v-bind="props"
          >
            Аккаунт
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item
                prepend-avatar="/account-icon-33.png"
                :subtitle="prof"
                :title="fullName"
            >
            </v-list-item>
          </v-list>


          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                variant="text"
                @click="menu = false"
            >
              Закрыть
            </v-btn>
            <v-btn
                color="primary"
                variant="text"
                @click="logout"
            >
              Выйти из аккаунта
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
  <v-navigation-drawer
      v-model="drawer"
      temporary
  >
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account" title="Пользователи" @click="$router.push(`/admin/user/`)"/>
      <v-list-item prepend-icon="mdi-file-outline" title="Контесты" @click="$router.push(`/admin/contest/`)"/>
      <v-list-item prepend-icon="mdi-bank-outline" title="Банк заданий" @click="$router.push(`/admin/task/`)"/>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import router from "@/router/router";
export default {
  name: "AdminHeader",
  data(){
    return{
      drawer: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/logout')
      router.push('/')
    }
  },
  computed: {
    fullName(){
      const user = this.$store.state.auth.user
      if(user === null)
        return `Неизветно`
      if(user.name !== undefined){
        return `${user.surname} ${user.name[0]}. ${user.patronymic[0]}.`
      }
      return `Неизветно`
    },
    prof(){
      const user = this.$store.state.auth.user
      if(user === null)
        return `Неизветно`
      if(user.profession !== null){
        return `${user.profession.description}`
      }
      return "Неизветно"
    }
  }
}
</script>

<style scoped>
</style>