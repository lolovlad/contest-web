<template>
  <form class="form__sign" @submit.prevent>
    <TextInput
        placeholder="Login"
        type="text"
        v-model="login"
    />
    <TextInput
        placeholder="mot de passe"
        type="password"
        v-model="password"
    />
    <AgreeButton class="btn__agr" @click="signin">entrée</AgreeButton>
    <label>{{error}}</label>
  </form>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      login: "",
      password: ""
    }
  },
  methods: {
    signin(){
      this.$emit('signin', this.login, this.password)
    }
  },
  computed: {
  },
  name: "FormLogin"
}
</script>

<style scoped>
.form__sign{
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.btn__agr{
  align-self: flex-start;
  margin: 10px 0;
}
</style>