<template>
  <div class="row">
    <form class="col s12" @submit.prevent>
      <div class="row">
        <div class="col s4">
          <TextInput
              placeholder="Фамилия"
              type="text"
              v-model="user.sename"
          />
        </div>
        <div class="col s4">
          <TextInput
              placeholder="Имя"
              type="text"
              v-model="user.name"
          />
        </div>
        <div class="col s4">
          <TextInput
              placeholder="Отчество"
              type="text"
              v-model="user.secondname"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s3">
          <ComboBox
              v-model="typeEdu"
              :data="publishedTypeEdu"
              @change="switchSelectEdu($event.target.value)"
          />
        </div>
        <div class="col s3">
          <ComboBox
              :data="targetRange"
              v-model="user.stage_edu"
          />
        </div>
        <div class="col s6">
          <ComboBox
              :data="publishedNameOrganization"
              v-model="user.id_edu_organization"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <TextInput
              placeholder="Логин"
              type="text"
              v-model="user.login"
          />
        </div>
        <div class="col s6">
          <TextInput
              placeholder="Пароль"
              type="text"
              v-model="user.password"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <ComboBox
              :data="publishedTypeUser"
              v-model="user.id_type"
          />
        </div>
      </div>
      <ButtonFormMenu :is-add="isAddUser"
                      @add="$emit('add', user)"
                      @update="$emit('update', user, idUser)"
                      @clear="clearForm"
      />
    </form>
  </div>
</template>

<script>
import TextInput from "@/components/UI/TextInput";
import ComboBox from "@/components/UI/ComboBox";
import axios from "axios";
import ButtonFormMenu from "@/components/UI/ButtonFormMenu";
export default {
  name: "UserForm",
  components: {ButtonFormMenu, ComboBox, TextInput},
  data(){
    return{
      isAddUser: true,
      typeEdu: 1,
      userScheme: {
        login: null,
        id_type: null,
        name: null,
        sename: null,
        secondname: null,
        password: null,
        id_edu_organization: null,
        stage_edu: null
      },

      user: {
        login: null,
        id_type: null,
        name: null,
        sename: null,
        secondname: null,
        password: null,
        id_edu_organization: null,
        stage_edu: null
      },
      selectTypeEdu: [],
      nameOrganization: [],
      selectLearningStage: {},
      selectTypeUser: [],
      targetRange: [],
      idUser: 0
    }
  },
  computed: {
    publishedTypeUser() {
      return this.selectTypeUser.map((data) => {
        return {
          value: data.id,
          text: data.name
        }
      })
    },
    publishedTypeEdu(){
      return this.selectTypeEdu.map((data) => {
        return {
          value: data.id,
          text: data.name
        }
      })
    },
    publishedNameOrganization(){
      return this.nameOrganization.map((data) => {
        return {
          value: data.uuid,
          text: data.name_organizations
        }
      })
    }
  },
  methods: {
    async getTypeUser(){
      const response = await axios.get(
          `users/type_user/all`
      )
      this.selectTypeUser = response.data
    },
    async getTypeEdu(){
      const response = await axios.get(
          `educational_organizations/type_edu/`
      )
      this.selectTypeEdu = response.data


      for(const data of response.data){
        let ranges = []
        for(let i = data.start_range; i <= data.end_range; i++){
          ranges.push({value: `${i} ${data.postfix}`, text: `${i} ${data.postfix}`})
        }
        this.selectLearningStage[data.id] = ranges
      }
    },

    async switchSelectEdu(value){
      this.targetRange = this.selectLearningStage[value]
      await this.selectUpdateTargetEdu(value)
    },

    async selectUpdateTargetEdu(value){
      const response = await axios.get(
          `educational_organizations/by_type/${value}`,
      )
      this.nameOrganization = response.data
    },
    clearForm(){
      this.user = JSON.parse(JSON.stringify(this.userScheme))
    },

    async setUser(userTarget){
      this.idUser = userTarget.id
      this.user.login = userTarget.login
      this.user.id_type = userTarget.type.id
      this.user.name = userTarget.name
      this.user.sename = userTarget.sename
      this.user.secondname = userTarget.secondname
      this.user.password = ""
      this.user.id_edu_organization = userTarget.edu_organization.uuid
      this.user.stage_edu = userTarget.stage_edu
      this.typeEdu = userTarget.edu_organization.type_organizations.id
      await this.switchSelectEdu(this.typeEdu)

    }
  },
  mounted() {
    this.getTypeUser()
    this.getTypeEdu()
  }
}
</script>

<style scoped>
</style>