<template>
  <form class="form__sign" @submit.prevent>
    <TextInput
        placeholder="логин"
        type="text"
        v-model="login"
    />
    <TextInput
        placeholder="пароль"
        type="password"
        v-model="password"
    />
    <AgreeButton class="btn__agr" @click="signin">вход</AgreeButton>
    <span class="helper-text" data-error="wrong" data-success="right">{{error}}</span>
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