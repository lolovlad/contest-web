<template>
  <form class="form__user" @submit.prevent>
    <TextInput
        placeholder="Фамилия"
        type="text"
        v-model="user.sename"
    />
    <TextInput
        placeholder="Имя"
        type="text"
        v-model="user.name"
    />
    <TextInput
        placeholder="Отчество"
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
        placeholder="Логин"
        type="text"
        v-model="user.login"
    />
    <TextInput
        placeholder="Пароль"
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
          learning_stage: "9 класс",
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
          learning_stage: "9 класс",
          type_education: 1,
          name_organization: ""
        },
        password: ""
      },
      typeEducation: [
        {value: 1, text: "Школа"},
        {value: 2, text: "Вуз"},
        {value: 3, text: "Коледж"},
        {value: 4, text: "Иные"}
      ],
      nameOrganization: [],
      selectLearningStage: {
        1: [
          { text: '8 класс', value: '8 класс' },
          { text: '9 класс', value: '9 класс' },
          { text: '10 класс', value: '10 класс' },
          { text: '11 класс', value: '11 класс' }
        ],
        2: [
          { text: '1 курс', value: '1 курс' },
          { text: '2 курс', value: '2 курс' },
          { text: '3 курс', value: '3 курс' },
          { text: '4 курс', value: '4 курс' }
        ],
        3: [
          { text: '1 курс', value: '1 курс' },
          { text: '2 курс', value: '2 курс' },
          { text: '3 курс', value: '3 курс' },
          { text: '4 курс', value: '4 курс' }
        ],
        4: [
          { text: 'Обучение', value: 'Обучение' },
        ],
      },
      selectTypeUser: [
        { text: 'Администратор', value: 1 },
        { text: 'Пользователь', value: 2 }
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