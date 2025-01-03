<template>
  <v-form @submit.prevent>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
            type="text"
            v-model="user.sename"
            label="Фамилия"
            variant="underlined"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            type="text"
            v-model="user.name"
            label="Имя"
            variant="underlined"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            type="text"
            v-model="user.secondname"
            label="Отчество"
            variant="underlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-select
            v-model="user.edu_organization.type_organizations.id"
            :items="selectTypeEdu"
            item-title="name"
            item-value="id"
            label="Тип ОР"
            variant="underlined"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
            v-model="user.stage_edu"
            :items="targetRange"
            item-title="text"
            item-value="value"
            label="Состояние"
            variant="underlined"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
            v-model="user.edu_organization.uuid"
            :items="nameOrganization"
            item-title="name_organizations"
            item-value="uuid"
            label="ОР"
            variant="underlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
            type="text"
            v-model="user.login"
            label="Логин"
            variant="underlined"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            type="password"
            v-model="user.password"
            label="Пароль"
            variant="underlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-select
            v-model="this.user.type.id"
            :items="selectTypeUser"
            item-title="name"
            item-value="id"
            label="Тип ОР"
            variant="underlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-if="addMode">
        <AgreeButton @click="$emit('add', user)">Сохранить</AgreeButton>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <AgreeButton @click="$emit('update', user)">Обновить</AgreeButton>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AgreeButton from "@/components/UI/AgreeButton.vue";
import userService from "@/store/user.service";
export default {
  name: "UserForm",
  components: {AgreeButton},
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
    idUser: {
      type: String,
      default: null
    }
  },
  data(){
    return{
      typeEdu: 1,
      userScheme: {
        login: null,
        type: {
          id: 1,
        },
        name: null,
        sename: null,
        secondname: null,
        password: "",
        edu_organization: {
          uuid: null,
          type_organizations: {
            id: null,
          },
        },
        stage_edu: null
      },

      user: {
        login: null,
        type: {
          id: 1
        },
        name: null,
        sename: null,
        secondname: null,
        password: "",
        edu_organization: {
          uuid: null,
          type_organizations: {
            id: null,
          },
        },
        stage_edu: null
      },

      selectTypeEdu: [],
      nameOrganization: [],
      selectLearningStage: {},
      selectTypeUser: [],
      targetRange: [],
    }
  },
  methods: {
    getTypeUser(){
      userService.getTypeUser().then((types) => {
        this.selectTypeUser = types
      })
    },
    getTypeEdu(){
      userService.getTypeEducation().then((typeEdu) => {
        this.selectTypeEdu = typeEdu
        for(const data of this.selectTypeEdu){
          let ranges = []
          for(let i = data.start_range; i <= data.end_range; i++){
            ranges.push({value: `${i} ${data.postfix}`, text: `${i} ${data.postfix}`})
          }
          this.selectLearningStage[data.id] = ranges
        }
      })
    },

    selectUpdateTargetEdu(value){
      userService.getTargetEducation(value).then((org) => {
        this.nameOrganization = org
      })
    },

    getUser(){
      userService.getUserByUuid(this.idUser).then((user) => {
        this.user = user
      })
    }
  },
  mounted() {
    this.getTypeUser()
    this.getTypeEdu()
    if(!this.addMode)
      this.getUser()
  },
  watch:{
    'user.edu_organization.type_organizations.id'(val){
      this.targetRange = this.selectLearningStage[val]
      this.selectUpdateTargetEdu(val)
    }
  }
}
</script>

<style scoped>
</style>