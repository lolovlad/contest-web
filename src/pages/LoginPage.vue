<template>
  <div class="form">
    <img src="../static/logo.png">
    <FormLogin :error="error" @signin="login">

    </FormLogin>
    <h3></h3>
  </div>
</template>

<script>
import FormLogin from "@/components/FormLogin";
export default {
  components: {
    FormLogin
  },
  data(){
    return{
      error: ""
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
.form{
  height: 100%;
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

.form > img{
  width: 200px;
  height: 200px;
  margin: 30px 0;
}
</style>