<template>
  <div class="form">
    <img src="../static/logo.png">
    <FormLogin :error="error" @signin="signin">

    </FormLogin>
    <h3></h3>
  </div>
</template>

<script>
import FormLogin from "@/components/FormLogin";
import axios from "axios";
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
    async signin(login, password){
      try{
        const payload = `grant_type=&username=${login}&password=${password}&client_id=&client_secret=`
        const response = await axios.post(
            `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/login/sign-in/`,

            payload,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
              }
            }
        );
        this.$store.commit("setToken", response.data.access_token)
        this.$store.commit("setTypeUser", response.data.type_user)
        this.redirect(response.data.type_user)
      } catch (e){
        this.error = e
      }
    },
    redirect(typeUser){
      if (typeUser === 1){
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