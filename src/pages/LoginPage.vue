<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" md="12">
        <v-sheet>
          <h1 class="text-center">АГУ им. Татищева</h1>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row align="center">
      <FormLogin :error="error" @signin="login"/>
    </v-row>
  </v-container>
</template>

<script>
import FormLogin from "@/components/Form/FormLogin.vue";
import logo from '@/assets/logo.png'
export default {
  components: {
    FormLogin
  },
  data(){
    return{
      error: null,
      logo: logo
    }
  },
  methods: {
    login(login, password) {
      this.$store.dispatch('auth/login', {url: '/login/sign-in', email: login, password: password})
          .then(
              (response) => {
                console.log(response.status !== 200)
                if (response.status !== 200) {
                  this.error = response.status.message
                } else {
                  this.redirect(response.data.user.type)
                }
              })
          .catch(() => {
            this.error = "неверный логин или пароль"
          })
    },
    redirect(typeUser){
      if (typeUser.name === "admin"){
        this.$router.push('/admin')
      }else{
        this.$router.push('/menu')
      }
    }
  },
  name: "LoginPage"
}
</script>

<style scoped>
</style>