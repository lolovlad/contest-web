<template>
  <div class="form">
    <TextInput
        placeholder="Nom du cours"
        type="text"
        v-model="contest.name_contest"
    />
    <ComboBox
        :data="selectTypeContest"
        v-model="contest.type"
        :disabled="!isAdd"
    />
    <ComboBox
        :data="selectStateContest"
        v-model="contest.state_contest"
        :disabled="!isAdd"
    />
    <TextEditor
        :placeholder="'Description du cours'"
        v-model="contest.description"
        ref="description"
    />

    <DateTimePicker
        :placeholder="'Heure de début'"
        :min-date=Date()
        v-model="contest.datetime_start"
    />
    <DateTimePicker
        :placeholder="'Heure de fin'"
        :min-date=Date()
        v-model="contest.datetime_end"
    />
    <ButtonFormMenu
      :is-add="isAdd"
      @add="addContest"
      @clear="clearForm"
      @update="updateContest"
    />
  </div>
</template>

<script>
import ComboBox from "@/components/UI/ComboBox";
import TextEditor from "@/components/UI/TextEditor";
import DateTimePicker from "@/components/UI/DateTimePicker";
import TextInput from "@/components/UI/TextInput";
import ButtonFormMenu from "@/components/UI/ButtonFormMenu";
import axios from "axios";
export default {
  name: "AdminContestForm",
  components: {ButtonFormMenu, TextInput, DateTimePicker, TextEditor, ComboBox},
  data(){
    return{
      idContest: this.$route.params.id_contest,
      isAdd: (this.$route.params.id_contest === undefined),

      contestSchema: {
        description: "",
        name_contest: "",
        type: 1,
        state_contest: 0,
        datetime_start: new Date().toISOString(),
        datetime_end: new Date().toISOString()
      },
      contest: {
        description: "",
        name_contest: "",
        type: 1,
        state_contest: 0,
        datetime_start: new Date().toISOString(),
        datetime_end: new Date().toISOString(),
      },

      selectTypeContest: [
        {text: "Cours Python", value: 1},
        //{text: "Олимпида", value: 1},
        //{text: "Командная олимпиада", value: 2},
        //{text: "Хакатон", value: 3}
      ],
      selectStateContest: [
        {text: "Inscrit", value: 0},
        {text: "Confirmé", value: 1},
        {text: "Passe", value: 2},
        {text: "Complété", value: 3}
      ],
    }
  },
  methods: {
    isDateValid(){
      const dateStart = new Date(this.contest.datetime_start)
      const dateEnd = new Date(this.contest.datetime_end)
      return dateEnd > dateStart
    },

    async addContest(){
      if(this.isDateValid()){
        const isAgree = confirm("Le champ du type de cours ne peut pas être modifié. Êtes-vous d'accord avec les données saisies ?");
        if(isAgree){
          this.contest.state_contest = parseInt(this.contest.state_contest)
          const response = await axios.post(
              `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests`,
              this.contest,
              {
                headers: {
                  "Authorization": `Bearer ${this.$store.state.token}`
                }
              }
          )
          response.status
          this.$router.push(`/admin/contest`)
        }
      }
    },

    async updateContest(){
      if(this.isDateValid()){
        const response = await axios.put(
            `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/`,
            this.contest,
            {
              headers: {
                "Authorization": `Bearer ${this.$store.state.token}`
              }
            }
        )
        this.$router.push(`/admin/contest`)
        response.status
      }
    },

    clearForm(){
      this.contest = JSON.parse(JSON.stringify(this.contestSchema))
      this.$refs.description.val(this.contest.description)
    },
    async getContest(){
      const response = await axios.get(
          `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/contests/${this.idContest}`,
          this.contest,
          {
            headers: {
              "Authorization": `Bearer ${this.$store.state.token}`
            }
          }
      )
      this.contest = response.data

      this.$refs.description.val(this.contest.description)
      console.log(this.contest)
    }
  },
  mounted() {
    if(this.isAdd === false){
      this.getContest()
    }
  }
}
</script>

<style scoped>
.form{
  width: 80%;
  margin: 80px auto;
  display: flex;
  gap: 30px;
  flex-direction: column;
}
.btn__menu{

}
</style>