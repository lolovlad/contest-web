<template>
  <v-col cols="12" md="12">
    <v-card class="mx-auto my-8"
            elevation="16"
            max-width="700">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-alert
                  density="compact"
                  :text="error"
                  title="Ошибка входа"
                  type="warning"
                  v-if="error !== null"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                          v-model="login"
                          label="Login"
                          variant="underlined"
                          type="text"
                          required
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                          v-model="password"
                          label="Пароль"
                          variant="underlined"
                          type="password"
                          required
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <AgreeButton @click="signin">Вход</AgreeButton>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton.vue";

export default {
  components: {AgreeButton},
  props: {
    error: {
      type: String,
      required: true,
      default: null
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
</style>