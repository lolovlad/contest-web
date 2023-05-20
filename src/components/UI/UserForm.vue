<template>
  <form class="form__user" @submit.prevent>
    <TextInput
        placeholder="Nom de famille"
        type="text"
        v-model="user.sename"
    />
    <TextInput
        placeholder="Nom"
        type="text"
        v-model="user.name"
    />
    <TextInput
        placeholder="Prénom"
        type="text"
        v-model="user.secondname"
    />
    <ComboBox
        :data="typeEducation"
        v-model="user.data.type_education"
        @change="switchSelectEdu($event)"
    />
    <ComboBox
        :data="nameOrganizationData"
        v-model="user.data.name_organization"
    />
    <ComboBox
        :data="targetLearningStage"
        v-model="user.data.learning_stage"
    />
    <TextInput
        placeholder="Login"
        type="text"
        v-model="user.login"
    />
    <TextInput
        placeholder="mot de passe"
        type="text"
        v-model="user.password"
    />
    <ComboBox
        :data="selectTypeUser"
        v-model="user.type"
    />
    <ButtonFormMenu :is-add="isAddUser"
                    @add="$emit('add', user)"
                    @update="$emit('update', user)"
                    @clear="clearForm"
    />
  </form>
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
      userChemsa: {
        login: "",
        type: 1,
        name: "",
        sename: "",
        secondname: "",
        data: {
          learning_stage: "9e année",
          type_education: 1,
          name_organization: ""
        },
        password: ""
      },




      user: {
        login: "",
        type: 1,
        name: "",
        sename: "",
        secondname: "",
        data: {
          learning_stage: "9e année",
          type_education: 1,
          name_organization: ""
        },
        password: ""
      },
      typeEducation: [
        {value: 1, text: "École"},
        {value: 2, text: "Université"},
        {value: 3, text: "Collège"},
        {value: 4, text: "Autre"}
      ],
      nameOrganization: [],
      selectLearningStage: {
        1: [
          { text: '8e année', value: '8e année' },
          { text: '9e année', value: '9e année' },
          { text: '10 e année', value: '10 e année' },
          { text: '11e année', value: '11e année' }
        ],
        2: [
          { text: '1 cours', value: '1 cours' },
          { text: '2 cours', value: '2 cours' },
          { text: '3 cours', value: '3 cours' },
          { text: '4 cours', value: '4 cours' }
        ],
        3: [
          { text: '1 cours', value: '1 cours' },
          { text: '2 cours', value: '2 cours' },
          { text: '3 cours', value: '3 cours' },
          { text: '4 cours', value: '4 cours' }
        ],
        4: [
          { text: 'Éducation', value: 'Éducation' },
        ],
      },
      selectTypeUser: [
        { text: 'Administrateur', value: 1 },
        { text: 'Utilisateur', value: 2 }
      ],
    }
  },
  computed: {
    targetLearningStage(){
      return this.selectLearningStage[this.user.data.type_education]
    },
    nameOrganizationData(){
      return this.nameOrganization.map((val)=>{
        return{
          value: val.name_organizations,
          text: val.name_organizations
        }
      })
    }
  },
  methods: {
    async switchSelectEdu(event){
      const value = event.target.value
      await this.selectUpdateTargetEdu(value)
    },
    async selectUpdateTargetEdu(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/educational_organizations/${this.user.data.type_education}`,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      this.nameOrganization = response.data
    },
    clearForm(){
      this.user = JSON.parse(JSON.stringify(this.userChemsa))
    }
  },
  mounted() {
    this.selectUpdateTargetEdu()
  }
}
</script>

<style scoped>
.form__user{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
}
</style>